<?php
namespace Controllers;

use Models\Usuario;
use Security;

class AuthController {
    
    /**
     * Lida com a requisição POST de login de forma padronizada.
     * Retorna a string de erro em caso de falha, ou redireciona em caso de sucesso.
     * 
     * @param array $niveis_esperados Níveis de usuário permitidos para esta porta de entrada.
     * @return string Mensagem de erro a ser exibida na UI.
     */
    public static function handleLogin(array $niveis_esperados): string {
        require_once __DIR__ . '/../../includes/db.php';
        require_once __DIR__ . '/../../includes/auth.php';
        
        if (!Security::checkRateLimit(5, 5)) {
            $minutos = Security::getLockoutRemainingMinutes();
            return "Muitas tentativas falhas. Tente novamente em " . $minutos . " minutos.";
        }
        
        if (!Security::validateCsrfToken($_POST['csrf_token'] ?? '')) {
            return "Sessão expirada ou requisição inválida. Recarregue a página.";
        }
        
        $email = trim($_POST['email'] ?? '');
        $senha = $_POST['senha'] ?? '';

        if (!$email || !$senha) {
            return 'Preencha todos os campos.';
        }
        
        $user = Usuario::autenticar($email, $senha, $niveis_esperados);

        if ($user) {
            Security::clearLoginAttempts();
            $_SESSION['usuario_id']    = $user['id'];
            $_SESSION['usuario_nome']  = $user['nome'];
            $_SESSION['usuario_nivel'] = $user['nivel'];
            $_SESSION['empresa_id']    = $user['empresa_id'];
            
            // Verifica se tem redirecionamento pendente
            if (isset($_GET['redirect']) && !empty($_GET['redirect'])) {
                Security::safeRedirect($_GET['redirect'] ?? '');
            }

            switch ($user['nivel']) {
                case 'admin':
                    header('Location: ../admin/dashboard.php');
                    break;
                case 'coordenadora':
                    header('Location: ../admin/painel_academico.php');
                    break;
                case 'empresa':
                    header('Location: ../portais/empresa.php');
                    break;
                case 'professor':
                    header('Location: ../portais/professor.php');
                    break;
                case 'colaborador':
                    header('Location: ../portais/colaborador.php');
                    break;
                case 'aluno':
                    header('Location: ../portais/portal_aluno.php');
                    break;
                default:
                    header('Location: ../index.php');
                    break;
            }
            exit;
        } else {
            Security::registerFailedLogin();
            return 'E-mail ou senha inválidos para este portal.';
        }
    }
}
