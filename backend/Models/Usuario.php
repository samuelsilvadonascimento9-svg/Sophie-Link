<?php
namespace Models;

use Core\Model;
use PDO;

class Usuario extends Model
{
    protected string $table = 'usuarios';

    /**
     * Autentica um usuário com base no e-mail, senha e nos níveis permitidos
     */
    public static function autenticar(string $email, string $senha, array $niveis_esperados)
    {
        if (empty($email) || empty($senha) || empty($niveis_esperados)) {
            return false;
        }

        // Instancia o próprio model para ter acesso aos métodos do Core\Model
        $instance = new self();
        
        $placeholders = implode(',', array_fill(0, count($niveis_esperados), '?'));
        $sql = "SELECT * FROM {$instance->table} WHERE email = ? AND nivel IN ($placeholders) AND deleted_at IS NULL LIMIT 1";
        
        $params = array_merge([$email], $niveis_esperados);
        
        // Acessa o $pdo protegido definido na classe pai Core\Model
        $stmt = clone $instance; // Hack para contornar contexto protected num contexto static, ou melhor, tornar a query interna.
        
        // Em vez de hack, podemos apenas instanciar e chamar um método não-estático interno
        return $instance->executarAutenticacao($email, $senha, $niveis_esperados);
    }

    private function executarAutenticacao(string $email, string $senha, array $niveis_esperados)
    {
        $placeholders = implode(',', array_fill(0, count($niveis_esperados), '?'));
        $sql = "SELECT * FROM {$this->table} WHERE (email = ? OR email LIKE CONCAT(?, '@%')) AND nivel IN ($placeholders) AND deleted_at IS NULL LIMIT 1";
        
        $params = array_merge([$email, $email], $niveis_esperados);
        
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($senha, $user['senha'])) {
            return $user;
        }

        return false;
    }
}
?>
