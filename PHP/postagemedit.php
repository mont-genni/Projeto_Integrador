<?php
session_start();
include 'config.php';

if (!isset($_SESSION['logado']) || $_SESSION['logado'] !== true || !isset($_SESSION['id'])) {
    die("Acesso negado.");
}

$id_comentario = $_GET['id'] ?? null;
if (!$id_comentario) {
    die("ID inválido.");
}

// Buscar o comentário
$stmt = $conn->prepare("SELECT * FROM tb_comentarios WHERE id = ?");
$stmt->bind_param("i", $id_comentario);
$stmt->execute();
$result = $stmt->get_result();
$comentario = $result->fetch_assoc();

if (!$comentario || $comentario['id_usuario'] != $_SESSION['id']) {
    die("Você não tem permissão para editar este comentário.");
}

// Atualizar comentário
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $novoTexto = $_POST['comentario'];
    $update = $conn->prepare("UPDATE tb_comentarios SET comentario = ? WHERE id = ?");
    $update->bind_param("si", $novoTexto, $id_comentario);
    $update->execute();
    header("Location: coment.php");
    exit;
}
?>

<link rel="stylesheet" href="style.css">

<h2>Editar Comentário</h2>

<form method="post">
  <textarea name="comentario" required><?= htmlspecialchars($comentario['comentario']) ?></textarea><br>
  <button type="submit">Salvar</button>
</form>

<a href="comentarios.php">Cancelar</a>