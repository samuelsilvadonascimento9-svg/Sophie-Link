<?php
// Excel Avançado — Sophie Link (Bespoke Redesign)
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Excel Avançado e Dashboards | Sophie Link</title>
    <meta name="description" content="Curso de Excel Avançado na Sophie Link. Fórmulas, Macros e Power BI.">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📊</text></svg>">
    <!-- Custom CSS ONLY for this page -->
    <link rel="stylesheet" href="../assets/css/cursos/excel-page.css?v=2">
    <!-- Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>

<div class="ex-nav-top">
    <div><i data-lucide="file-spreadsheet" style="width:16px;height:16px;vertical-align:middle;margin-right:0.5rem;"></i> Sophie_Link_Excel_Avancado.xlsx</div>
    <div><a href="../index.php">Voltar para o Início</a></div>
</div>

<div class="ex-ribbon">
    <a href="#" class="ex-ribbon-tab active">Início</a>
    <a href="#tabela" class="ex-ribbon-tab">Inserir (Grade)</a>
    <a href="#dashboard" class="ex-ribbon-tab">Layout do Dashboard</a>
    <a href="../index.php#fale-conosco" class="ex-ribbon-tab" style="margin-left:auto; color:var(--ex-green); font-weight:700;"><i data-lucide="share" style="width:16px;height:16px;vertical-align:middle;"></i> Matricular</a>
</div>

<div class="ex-formula-bar">
    <div class="ex-cell-name">A1</div>
    <div class="ex-fx">fx</div>
    <input type="text" class="ex-formula-input" value="=PROCV(SUA_CARREIRA; MERCADO; SUCESSO; FALSO)" readonly>
</div>

<div class="ex-container">
    <div class="ex-grid-area">
        <div class="ex-rows">
            <div class="ex-row-num" style="height:350px;">1</div>
            <div class="ex-row-num" style="height:350px;">2</div>
            <div class="ex-row-num" style="height:250px;">3</div>
        </div>
        <div class="ex-main">
            
            <div class="ex-cell-hero">
                <h1>Excel Avançado<br>& Dashboards</h1>
                <p>Pare de perder horas com tarefas repetitivas. Domine funções lógicas, tabelas dinâmicas, macros (VBA) e crie painéis gerenciais que vão impressionar qualquer diretoria.</p>
                <a href="../index.php#fale-conosco" class="ex-btn">Executar Macro de Inscrição</a>
            </div>

            <div id="tabela" style="margin-top:4rem;">
                <h2 style="font-weight:400; color:var(--ex-dark); margin-bottom:1.5rem;">Dados do Programa</h2>
                <table class="ex-table">
                    <thead>
                        <tr>
                            <th>Módulo</th>
                            <th>Conteúdo Principal</th>
                            <th>Carga Horária</th>
                            <th>Nível</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>1. Funções Avançadas</strong></td>
                            <td>ÍNDICE, CORRESP, SEERRO, SOMASE, CONT.VALORES e Lógica Aninhada.</td>
                            <td>20h</td>
                            <td>Intermediário</td>
                        </tr>
                        <tr>
                            <td><strong>2. Tabelas Dinâmicas</strong></td>
                            <td>Consolidação de dados massivos, Segmentação de Dados e Linha do Tempo.</td>
                            <td>20h</td>
                            <td>Avançado</td>
                        </tr>
                        <tr>
                            <td><strong>3. Dashboards</strong></td>
                            <td>Criação de painéis interativos, gráficos avançados (Cascata, Funil) e formatação condicional complexa.</td>
                            <td>20h</td>
                            <td>Especialista</td>
                        </tr>
                        <tr>
                            <td><strong>4. Macros e VBA</strong></td>
                            <td>Gravação de macros, introdução à programação VBA e automação de rotinas de escritório.</td>
                            <td>20h</td>
                            <td>Especialista</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div id="dashboard" style="margin-top:4rem;">
                <h2 style="font-weight:400; color:var(--ex-dark); margin-bottom:1.5rem;">Indicadores de Sucesso (KPIs)</h2>
                <div class="ex-dash-grid">
                    <div class="ex-dash-card">
                        <i data-lucide="bar-chart-2" style="color:var(--ex-green); width:32px; height:32px; margin-bottom:1rem;"></i>
                        <h3>Análise de Dados</h3>
                        <p>Aprenda a transformar linhas infinitas de dados em informações cruciais para a tomada de decisão.</p>
                    </div>
                    <div class="ex-dash-card">
                        <i data-lucide="clock" style="color:var(--ex-green); width:32px; height:32px; margin-bottom:1rem;"></i>
                        <h3>Automação de Rotinas</h3>
                        <p>O que levava 4 horas para ser feito manualmente, agora será resolvido com um clique através do VBA.</p>
                    </div>
                    <div class="ex-dash-card">
                        <i data-lucide="pie-chart" style="color:var(--ex-green); width:32px; height:32px; margin-bottom:1rem;"></i>
                        <h3>Apresentação Executiva</h3>
                        <p>Seus relatórios deixarão de ser planilhas chatas e se tornarão painéis interativos e visuais.</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <div class="ex-tabs-bottom">
        <div class="ex-sheet-tab">Planilha_Principal</div>
        <a href="../index.php" class="ex-sheet-tab inactive" style="text-decoration:none;">Voltar_Portal</a>
        <div class="ex-sheet-tab inactive"><i data-lucide="plus" style="width:14px;"></i></div>
    </div>
</div>

<script>
    lucide.createIcons();
</script>
</body>
</html>
