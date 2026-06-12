<?php
// scripts/notificar_boletos_cron.php
// Script para rodar diariamente (ex: as 08:00)
require_once __DIR__ . '/../vendor/autoload.php';

use Core\Connect;
use Core\Mailer;

if (php_sapi_name() !== 'cli' && !isset($_GET['force'])) {
    die("Acesso negado. Execute via Cron ou use ?force=1 para testes.");
}

echo "Buscando boletos proximos do vencimento...\n";

try {
    $db = Connect::getInstance();
    
    // Pega pendentes que vencem em 3 dias, 1 dia, hoje, ou venceram ontem
    $sql = "SELECT f.*, e.nome as empresa_nome, e.email as empresa_email 
            FROM financeiro f 
            JOIN empresas e ON f.empresa_id = e.id 
            WHERE f.status = 'pendente' 
            AND (
                f.data_vencimento = CURDATE() + INTERVAL 3 DAY OR 
                f.data_vencimento = CURDATE() + INTERVAL 1 DAY OR 
                f.data_vencimento = CURDATE() OR 
                f.data_vencimento = CURDATE() - INTERVAL 1 DAY
            )";
            
    $stmt = $db->query($sql);
    $boletos = $stmt->fetchAll();

    $qtd = 0;
    foreach ($boletos as $b) {
        if (empty($b['empresa_email'])) continue;
        
        $vencDb = $b['data_vencimento'];
        $hoje = date('Y-m-d');
        
        $assunto = "";
        $mensagem = "";
        
        $valor = number_format($b['valor'], 2, ',', '.');
        $vencStr = date('d/m/Y', strtotime($vencDb));

        if ($vencDb > $hoje) {
            $assunto = "Aviso de Vencimento - Sophie Link";
            $mensagem = "Olá, {$b['empresa_nome']}.<br><br>Lembramos que a sua mensalidade referente a <b>{$b['competencia']}</b> no valor de R$ {$valor} vencerá no dia <b>{$vencStr}</b>.<br><br>Acesse a plataforma para gerar a linha digitável ou QR Code do PIX.<br><br>Atenciosamente,<br>Equipe Sophie Link.";
        } elseif ($vencDb == $hoje) {
            $assunto = "Sua mensalidade vence HOJE - Sophie Link";
            $mensagem = "Olá, {$b['empresa_nome']}.<br><br>Este é um lembrete de que a mensalidade referente a <b>{$b['competencia']}</b> no valor de R$ {$valor} <b>vence hoje</b> ({$vencStr}).<br><br>Acesse a plataforma para realizar o pagamento e evitar juros.<br><br>Atenciosamente,<br>Equipe Sophie Link.";
        } else {
            $assunto = "Aviso de Atraso - Sophie Link";
            $mensagem = "Olá, {$b['empresa_nome']}.<br><br>Notamos que a sua mensalidade referente a <b>{$b['competencia']}</b> no valor de R$ {$valor} encontra-se <b>em atraso</b> (vencimento original em {$vencStr}).<br><br>Por favor, acesse o portal da empresa para gerar uma nova fatura atualizada ou entre em contato conosco.<br><br>Atenciosamente,<br>Equipe Sophie Link.";
        }

        // Enfileira o e-mail
        Mailer::queue($b['empresa_email'], $assunto, $mensagem, true);
        $qtd++;
    }

    echo "Notificações de boletos geradas e enviadas para a fila: $qtd\n";

} catch (\Exception $e) {
    echo "Erro: " . $e->getMessage() . "\n";
}
