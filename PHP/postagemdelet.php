<?php
session_start();
include 'config.php';

if (!isset($_SESSION['id'])) {
    die("Acesso negado.");
}

$id_comentario = $_GET['id'] ?? null;
if (!$id_comentario) die("ID inválido.");

$stmt = $conn->prepare("SELECT * FROM tb_comentarios WHERE id = ?");
$stmt->bind_param("i", $id_comentario);
$stmt->execute();
$result = $stmt->get_result();
$comentario = $result->fetch_assoc();

if (!$comentario || $comentario['id_usuario'] != $_SESSION['id']) {
    die("Você não tem permissão para deletar este comentário.");
}

$delete = $conn->prepare("DELETE FROM tb_comentarios WHERE id = ?");
$delete->bind_param("i", $id_comentario);
$delete->execute();

header("Location: coment.php");
