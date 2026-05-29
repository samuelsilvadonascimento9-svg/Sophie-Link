<?php
// backup_db.php — Script de Rotina de Backup | Sophie Link
session_start();
if (!isset($_SESSION['usuario_id']) || $_SESSION['usuario_nivel'] !== 'admin') {
    die("Acesso negado. Apenas o administrador pode realizar backups manuais.");
}

$host = 'localhost';
$user = 'root';
$pass = '';
$dbname = 'sophie_link';
$backup_file = __DIR__ . '/database/backup_' . date("Y-m-d_H-i-s") . '.sql';

// Monta o comando do mysqldump 
// (Atenção: No Windows/XAMPP, certifique-se de que o mysqldump está nas variáveis de ambiente ou passe o caminho completo)
// Exemplo genérico:
$command = "mysqldump --user={$user} --password={$pass} --host={$host} {$dbname} > \"{$backup_file}\"";

exec($command, $output, $return_var);

if ($return_var === 0) {
    require_once 'includes/db.php';
    // Salva log de auditoria
    $stmtLog = $pdo->prepare("INSERT INTO logs_auditoria (usuario_id, acao, descricao) VALUES (?, ?, ?)");
    $stmtLog->execute([$_SESSION['usuario_id'], 'BACKUP_DB', 'Backup completo do banco de dados realizado com sucesso.']);
    
    echo "<h3>Backup concluído com sucesso!</h3>";
    echo "<p>Arquivo salvo em: <strong>" . htmlspecialchars($backup_file) . "</strong></p>";
    echo "<a href='painel_academico.php'>Voltar ao Painel</a>";
} else {
    echo "<h3>Erro ao realizar backup.</h3>";
    echo "<p>Verifique se o mysqldump está instalado e acessível no PATH do servidor.</p>";
    echo "<p>Código de erro: $return_var</p>";
    echo "<a href='painel_academico.php'>Voltar ao Painel</a>";
}
?>
