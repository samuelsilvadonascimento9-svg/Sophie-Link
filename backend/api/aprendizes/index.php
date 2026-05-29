<?php
session_start();
if (!isset($_SESSION['usuario_id'])) { http_response_code(401); exit; }

require_once '../../Core/Connect.php';
require_once '../../Core/ApiHelper.php';
require_once '../../Models/Aprendiz.php';
require_once '../../Models/Empresa.php';

use Models\Aprendiz;
use Models\Empresa;

$model  = new Aprendiz();
$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? 'listar';

switch ($method . ':' . $action) {

    // GET ?action=listar[&busca=X][&empresa_id=X][&situacao=X]
    case 'GET:listar':
        $busca     = trim($_GET['busca'] ?? '');
        $empresaId = (int)($_GET['empresa_id'] ?? 0);
        $situacao  = $_GET['situacao'] ?? '';
        jsonResponse(true, $model->listar($busca, $empresaId, $situacao));
        break;

    // GET ?action=buscar&id=X
    case 'GET:buscar':
        $id = (int)($_GET['id'] ?? 0);
        $a  = $model->buscarPorId($id);
        if (!$a) jsonResponse(false, null, 'Aprendiz não encontrado.', 404);
        jsonResponse(true, $a);
        break;

    // GET ?action=empresas  (lista empresas para o select do formulário)
    case 'GET:empresas':
        $emp = (new Empresa())->listar();
        jsonResponse(true, $emp);
        break;

    // POST ?action=criar
    case 'POST:criar':
        $dados = json_decode(file_get_contents('php://input'), true) ?? $_POST;
        if (empty($dados['nome'])) jsonResponse(false, null, 'O campo Nome é obrigatório.', 422);
        $id = $model->criar($dados);
        jsonResponse(true, ['id' => $id], 'Aprendiz cadastrado com sucesso!', 201);
        break;

    // POST ?action=atualizar&id=X
    case 'POST:atualizar':
        $id    = (int)($_GET['id'] ?? 0);
        $dados = json_decode(file_get_contents('php://input'), true) ?? $_POST;
        if (empty($dados['nome'])) jsonResponse(false, null, 'O campo Nome é obrigatório.', 422);
        $ok = $model->atualizar($id, $dados);
        jsonResponse($ok, null, $ok ? 'Aprendiz atualizado!' : 'Erro ao atualizar.');
        break;

    // POST ?action=excluir&id=X
    case 'POST:excluir':
        $id = (int)($_GET['id'] ?? 0);
        $ok = $model->excluir($id);
        jsonResponse($ok, null, $ok ? 'Aprendiz excluído.' : 'Erro ao excluir.');
        break;

    default:
        jsonResponse(false, null, 'Ação não reconhecida.', 400);
}
