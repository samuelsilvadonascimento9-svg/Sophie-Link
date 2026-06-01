<?php
// includes/Mailer.php

class Mailer {
    
    /**
     * Envia um e-mail. 
     * Simula o envio escrevendo num log se estiver no localhost ou não tiver SMTP configurado.
     */
    public static function send(string $to, string $subject, string $body, bool $isHtml = true) {
        $headers = [];
        $headers[] = 'From: Sophie Link <noreply@sophielink.com.br>';
        $headers[] = 'Reply-To: suporte@sophielink.com.br';
        $headers[] = 'X-Mailer: PHP/' . phpversion();

        if ($isHtml) {
            $headers[] = 'MIME-Version: 1.0';
            $headers[] = 'Content-type: text/html; charset=utf-8';
        }
        
        $headers_str = implode("\r\n", $headers);
        
        // Verifica se está em ambiente local (XAMPP não envia email nativamente sem config extra)
        $isLocalhost = in_array($_SERVER['REMOTE_ADDR'] ?? '', ['127.0.0.1', '::1']);
        
        if ($isLocalhost) {
            // Apenas registra no log para debugging local
            $logMsg = "\n=== SIMULAÇÃO DE E-MAIL ===\nPara: $to\nAssunto: $subject\nCorpo:\n$body\n===========================\n";
            error_log($logMsg, 3, __DIR__ . '/../app_mail.log');
            return true;
        }

        return mail($to, $subject, $body, $headers_str);
    }
}
?>
