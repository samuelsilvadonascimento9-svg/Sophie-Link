<?php
// Classe base dos Models. Centraliza INSERT, UPDATE e SELECT com proteção contra SQL Injection.

namespace Core;

use PDO;
use PDOStatement;

class Model
{
    protected $pdo;           // Conexão PDO compartilhada
    protected string $table = ''; // Nome da tabela — definido em cada Model filho

    public function __construct()
    {
        $this->pdo = Connect::getInstance();
    }

    // Insere um registro e retorna o ID gerado
    protected function insert(array $data): int
    {
        $columns = array_keys($data);
        $fields  = implode(', ', $columns);
        $params  = ':' . implode(', :', $columns);

        $this->execute("INSERT INTO {$this->table} ({$fields}) VALUES ({$params})", $data);

        return (int) $this->pdo->lastInsertId();
    }

    // Atualiza registros que satisfaçam o WHERE
    protected function update(array $data, array $where): void
    {
        $sets   = [];
        $params = [];

        foreach ($data as $column => $value) {
            $sets[]                  = "{$column} = :set_{$column}";
            $params["set_{$column}"] = $value;
        }

        [$whereSql, $whereParams] = $this->buildWhere($where);

        $this->execute(
            "UPDATE {$this->table} SET " . implode(', ', $sets) . " {$whereSql}",
            array_merge($params, $whereParams)
        );
    }

    // SELECT com filtros, ordenação e limite opcionais — retorna array de registros
    protected function findAll(
        array $where    = [],
        array $columns  = ['*'],
        string $orderBy = '',
        ?int $limit     = null
    ): array {
        [$whereSql, $params] = $this->buildWhere($where);

        $sql = "SELECT " . implode(', ', $columns) . " FROM {$this->table} {$whereSql}";
        if ($orderBy) $sql .= " ORDER BY {$orderBy}";
        if ($limit !== null) $sql .= ' LIMIT ' . $limit;

        return $this->execute($sql, $params)->fetchAll();
    }

    // SELECT com LIMIT 1 — retorna um único registro ou null
    protected function findOne(array $where = [], array $columns = ['*'], string $orderBy = ''): ?array
    {
        $row = $this->findAll($where, $columns, $orderBy, 1);
        return $row[0] ?? null;
    }

    // Monta a cláusula WHERE com placeholders para evitar SQL Injection
    private function buildWhere(array $where): array
    {
        if (!$where) return ['', []];

        $conditions = [];
        $params     = [];

        foreach ($where as $column => $value) {
            $param          = 'where_' . $column;
            $conditions[]   = "{$column} = :{$param}";
            $params[$param] = $value;
        }

        return ['WHERE ' . implode(' AND ', $conditions), $params];
    }

    // Ponto único de execução: todo SQL passa por prepare() antes de rodar
    private function execute(string $sql, array $params = []): PDOStatement
    {
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($this->normalizeParams($params));
        return $stmt;
    }

    // Garante que todos os parâmetros tenham o prefixo ':' exigido pelo PDO
    private function normalizeParams(array $params): array
    {
        $normalized = [];
        foreach ($params as $key => $value) {
            $param              = str_starts_with((string) $key, ':') ? $key : ':' . $key;
            $normalized[$param] = $value;
        }
        return $normalized;
    }
}
