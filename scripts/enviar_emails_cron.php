<?php
// scripts/enviar_emails_cron.php
// Script para ser rodado via Cron (ex: a cada 5 minutos)

require_once __DIR__ . '/../vendor/autoload.php';

use Core\Connect;
use Core\Mailer;

// Garante que só rode via CLI (opcional, mas recomendado)
if (php_sapi_name() !== 'cli' && !isset($_GET['force'])) {
    die("Acesso negado. Este script deve ser executado pelo Cron (CLI) ou com o parametro ?force=1 para testes.");
}

echo "Iniciando processamento da fila de e-mails...\n";

try {
    $db = Connect::getInstance();
    
    // Busca e-mails pendentes ou que falharam mas têm menos de 3 tentativas
    $stmt = $db->query("SELECT * FROM email_queue WHERE status = 'pending' OR (status = 'failed' AND attempts < 3) ORDER BY created_at ASC LIMIT 50");
    $emails = $stmt->fetchAll();

    if (empty($emails)) {
        echo "Nenhum e-mail na fila.\n";
        exit(0);
    }

    $updateStatus = $db->prepare("UPDATE email_queue SET status = ?, sent_at = ?, attempts = attempts + 1, error_message = ? WHERE id = ?");

    $sucesso = 0;
    $falha = 0;

    foreach ($emails as $email) {
        echo "Enviando para: {$email['to_email']} - Assunto: {$email['subject']}... ";
        
        $enviado = Mailer::sendNow($email['to_email'], $email['subject'], $email['body'], (bool)$email['is_html']);
        
        if ($enviado) {
            $updateStatus->execute(['sent', date('Y-m-d H:i:s'), null, $email['id']]);
            $sucesso++;
            echo "[OK]\n";
        } else {
            $updateStatus->execute(['failed', null, "Falha no envio (verifique app_mail.log)", $email['id']]);
            $falha++;
            echo "[ERRO]\n";
        }
        
        // Pequena pausa para evitar rate limit de servidores SMTP
        usleep(500000); // 0.5s
    }

    echo "Processamento concluído. Sucesso: {$sucesso}, Falhas: {$falha}\n";

} catch (\Exception $e) {
    echo "Erro geral no script: " . $e->getMessage() . "\n";
}
