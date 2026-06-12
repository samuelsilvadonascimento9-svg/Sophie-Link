<?php
// api/alunos/get_alunos_paginated.php — Lista paginada de alunos via server-side
session_start();
require_once '../../../includes/auth.php';
protect_page(['colaborador', 'admin']);
require_once '../../../includes/db.php';
/** @var PDO $pdo */

header('Content-Type: application/json; charset=utf-8');

// Parâmetros de paginação e filtro
$page     = max(1, (int)($_GET['page']    ?? 1));
$limit    = in_array((int)($_GET['limit'] ?? 10), [10, 20, 50, 100]) ? (int)$_GET['limit'] : 10;
$search   = trim($_GET['search']   ?? '');
$situacao = trim($_GET['situacao'] ?? '');
$offset   = ($page - 1) * $limit;

// --- Construção da query dinâmica com filtros ---
$where  = ['a.deleted_at IS NULL'];
$params = [];

if ($search !== '') {
    $where[]  = '(a.nome LIKE ? OR a.email LIKE ? OR LPAD(a.id, 6, "0") LIKE ?)';
    $params[] = "%{$search}%";
    $params[] = "%{$search}%";
    $params[] = "%{$search}%";
}

if ($situacao !== '') {
    $where[]  = 'a.situacao_aluno = ?';
    $params[] = $situacao;
}

$whereSQL = implode(' AND ', $where);

// --- Contagem total (para calcular total de páginas no JS) ---
$stmtCount = $pdo->prepare("
    SELECT COUNT(*) FROM aprendizes a WHERE {$whereSQL}
");
$stmtCount->execute($params);
$totalRegistros = (int)$stmtCount->fetchColumn();

// --- Dados da página atual ---
$stmtData = $pdo->prepare("
    SELECT
        a.id,
        a.nome,
        a.email,
        a.situacao_aluno,
        e.nome  AS empresa_nome,
        c.nome  AS curso_nome,
        t.nome  AS turma_nome
    FROM aprendizes a
    LEFT JOIN contratos cont ON a.id = cont.aprendiz_id AND cont.status = 'ativo'
    LEFT JOIN empresas  e    ON cont.empresa_id = e.id
    LEFT JOIN turmas    t    ON a.turma_id = t.id
    LEFT JOIN cursos    c    ON t.curso_id  = c.id
    WHERE {$whereSQL}
    ORDER BY a.nome ASC
    LIMIT {$limit} OFFSET {$offset}
");
$stmtData->execute($params);
$alunos = $stmtData->fetchAll(PDO::FETCH_ASSOC);

// Formata o RA para exibição
foreach ($alunos as &$a) {
    $a['ra'] = str_pad($a['id'], 6, '0', STR_PAD_LEFT);
}
unset($a);

echo json_encode([
    'success'   => true,
    'total'     => $totalRegistros,
    'page'      => $page,
    'limit'     => $limit,
    'pages'     => (int)ceil($totalRegistros / $limit),
    'alunos'    => $alunos,
]);
