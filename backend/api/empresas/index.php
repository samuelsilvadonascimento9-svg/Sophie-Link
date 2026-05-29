<?php
session_start();
if (!isset($_SESSION['usuario_id'])) { http_response_code(401); exit; }

require_once '../../Core/Connect.php';
require_once '../../Core/ApiHelper.php';
require_once '../../Models/Empresa.php';

use Models\Empresa;

$model  = new Empresa();
$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? 'listar';

switch ($method . ':' . $action) {

    // GET /backend/api/empresas/index.php?action=listar
    case 'GET:listar':
        $busca  = trim($_GET['busca'] ?? '');
        $status = $_GET['status'] ?? '';
        jsonResponse(true, $model->listar($busca, $status));
        break;

    // GET /backend/api/empresas/index.php?action=buscar&id=X
    case 'GET:buscar':
        $id = (int)($_GET['id'] ?? 0);
        $empresa = $model->buscarPorId($id);
        if (!$empresa) jsonResponse(false, null, 'Empresa não encontrada.', 404);
        jsonResponse(true, $empresa);
        break;

    // POST /backend/api/empresas/index.php?action=criar
    case 'POST:criar':
        $dados = json_decode(file_get_contents('php://input'), true) ?? $_POST;
        if (empty($dados['nome'])) jsonResponse(false, null, 'O campo Nome é obrigatório.', 422);
        $id = $model->criar($dados);
        jsonResponse(true, ['id' => $id], 'Empresa cadastrada com sucesso!', 201);
        break;

    // POST /backend/api/empresas/index.php?action=atualizar&id=X
    case 'POST:atualizar':
        $id    = (int)($_GET['id'] ?? 0);
        $dados = json_decode(file_get_contents('php://input'), true) ?? $_POST;
        if (empty($dados['nome'])) jsonResponse(false, null, 'O campo Nome é obrigatório.', 422);
        $ok = $model->atualizar($id, $dados);
        jsonResponse($ok, null, $ok ? 'Empresa atualizada com sucesso!' : 'Erro ao atualizar.');
        break;

    // POST /backend/api/empresas/index.php?action=excluir&id=X
    case 'POST:excluir':
        $id = (int)($_GET['id'] ?? 0);
        $ok = $model->excluir($id);
        jsonResponse($ok, null, $ok ? 'Empresa excluída.' : 'Erro ao excluir.');
        break;

    default:
        jsonResponse(false, null, 'Ação não reconhecida.', 400);
}
