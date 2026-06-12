<?php
namespace Core;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Core\Connect;

class Mailer {
    
    /**
     * Enfileira um e-mail para ser enviado pelo cron job.
     */
    public static function queue(string $to, string $subject, string $body, bool $isHtml = true): bool {
        try {
            $db = Connect::getInstance();
            $stmt = $db->prepare("INSERT INTO email_queue (to_email, subject, body, is_html, status) VALUES (?, ?, ?, ?, 'pending')");
            return $stmt->execute([$to, $subject, $body, $isHtml ? 1 : 0]);
        } catch (\PDOException $e) {
            error_log("Erro ao enfileirar email: " . $e->getMessage() . "\n", 3, __DIR__ . '/../../app_mail.log');
            return false;
        }
    }

    /**
     * Envia um e-mail de fato, via SMTP com PHPMailer, ou cai pro log local se não houver SMTP configurado.
     * Esta função normalmente será chamada pelo CronJob.
     */
    public static function sendNow(string $to, string $subject, string $body, bool $isHtml = true): bool {
        // Verifica se está em ambiente local (XAMPP) e se NÃO HÁ configurações de SMTP no .env
        $isLocalhost = in_array($_SERVER['REMOTE_ADDR'] ?? '127.0.0.1', ['127.0.0.1', '::1']);
        
        $smtpHost = Connect::getEnv('SMTP_HOST', '');
        $smtpUser = Connect::getEnv('SMTP_USER', '');
        $smtpPass = Connect::getEnv('SMTP_PASS', '');
        $smtpPort = Connect::getEnv('SMTP_PORT', 587);

        if (empty($smtpHost) && $isLocalhost) {
            // Apenas registra no log para debugging local se não tivermos SMTP no dev
            $logMsg = "\n=== SIMULAÇÃO DE E-MAIL (SMTP não configurado) ===\nPara: $to\nAssunto: $subject\nCorpo:\n$body\n===========================\n";
            error_log($logMsg, 3, __DIR__ . '/../../app_mail.log');
            return true;
        }

        // Caso haja SMTP ou estejamos em produção, vamos usar o PHPMailer
        if (file_exists(__DIR__ . '/../../vendor/autoload.php')) {
            require_once __DIR__ . '/../../vendor/autoload.php';
        }

        if (!class_exists('PHPMailer\PHPMailer\PHPMailer')) {
             error_log("Classe PHPMailer nao encontrada. Rode composer install.\n", 3, __DIR__ . '/../../app_mail.log');
             return false;
        }

        $mail = new PHPMailer(true);

        try {
            if (!empty($smtpHost)) {
                // Server settings
                $mail->isSMTP();
                $mail->Host       = $smtpHost;
                $mail->SMTPAuth   = true;
                $mail->Username   = $smtpUser;
                $mail->Password   = $smtpPass;
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                $mail->Port       = $smtpPort;
            } else {
                 // Usa mail nativo se não tiver SMTP configurado mas for prod
                 $mail->isMail();
            }

            $mail->CharSet = 'UTF-8';

            // Remetente padrão (poderia vir do .env)
            $fromEmail = Connect::getEnv('MAIL_FROM_ADDRESS', 'noreply@sophielink.com.br');
            $fromName = Connect::getEnv('MAIL_FROM_NAME', 'Sophie Link');
            $mail->setFrom($fromEmail, $fromName);
            $mail->addReplyTo('suporte@sophielink.com.br', 'Suporte Sophie Link');
            
            // Destinatário
            $mail->addAddress($to);

            // Conteúdo
            $mail->isHTML($isHtml);
            $mail->Subject = $subject;
            $mail->Body    = $body;
            $mail->AltBody = strip_tags(str_replace(['<br>', '<br/>', '<br />'], "\n", $body));

            $mail->send();
            return true;
        } catch (Exception $e) {
            error_log("Erro no PHPMailer ao enviar para {$to}: {$mail->ErrorInfo}\n", 3, __DIR__ . '/../../app_mail.log');
            return false;
        }
    }

    /**
     * Função legada para compatibilidade com partes antigas do sistema (envia na hora)
     */
    public static function send(string $to, string $subject, string $body, bool $isHtml = true) {
        return self::sendNow($to, $subject, $body, $isHtml);
    }
}
