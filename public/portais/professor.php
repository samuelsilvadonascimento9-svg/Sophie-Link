<?php
// professor.php — Redireciona ao AVA (ponto de entrada unificado do professor)
session_start();
require_once '../../includes/auth.php';
protect_page(['professor', 'admin', 'coordenadora']);
header("Location: ava_professor.php");
exit;
