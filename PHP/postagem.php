<?php
session_start();

if (!isset($_SESSION['logado']) || $_SESSION['logado'] !== true || !isset($_SESSION['email'])) {
    header("Location: login.php");
    exit;
}

include("config.php"); // Conexão com o banco

$email_sessao = $_SESSION['email'];

// Buscar ID do usuário logado
$stmt_cliente = $conn->prepare("SELECT id FROM tb_cadastro WHERE email = ?");
$stmt_cliente->bind_param("s", $email_sessao);
$stmt_cliente->execute();
$result_cliente = $stmt_cliente->get_result();
$usuario_logado = $result_cliente->fetch_assoc();

if ($usuario_logado) {
    $_SESSION['id'] = $usuario_logado['id']; // garante que $_SESSION['id'] está definido corretamente
}

$livroSelecionado = $_GET['livro'] ?? null;
$livros = $conn->query("SELECT * FROM tb_livros");

// Inserir novo comentário
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_SESSION['logado']) && $_SESSION['logado'] === true) {
    $id_usuario = $_SESSION['id'];
    $id_livro = $_POST['id_livro'];
    $comentario = $_POST['comentario'];

    $stmt = $conn->prepare("INSERT INTO tb_comentarios (id_usuario, id_livro, comentario) VALUES (?, ?, ?)");
    $stmt->bind_param("iis", $id_usuario, $id_livro, $comentario);
    $stmt->execute();
}

// Listar comentários
$query = "SELECT c.*, u.usuario, l.titulo FROM tb_comentarios c 
          JOIN tb_cadastro u ON c.id_usuario = u.id 
          JOIN tb_livros l ON c.id_livro = l.id";
if ($livroSelecionado) {
    $query .= " WHERE l.id = " . intval($livroSelecionado);
}
$query .= " ORDER BY c.data_comentario DESC";
$comentarios = $conn->query($query);
?>

<link rel="stylesheet" href="comentstyle.css">

<form method="get">
  <select name="livro" onchange="this.form.submit()">
    <option value="">Todos os livros</option>
    <?php while ($livro = $livros->fetch_assoc()): ?>
      <option value="<?= $livro['id'] ?>" <?= ($livroSelecionado == $livro['id']) ? 'selected' : '' ?>>
        <?= htmlspecialchars($livro['titulo']) ?>
      </option>
    <?php endwhile; ?>
  </select>
</form>

<?php if (isset($_SESSION['logado']) && $_SESSION['logado'] === true): ?>
  <form method="post">
    <select name="id_livro" required>
      <option value="">Selecione o livro</option>
      <?php
      $livros->data_seek(0);
      while ($livro = $livros->fetch_assoc()): ?>
        <option value="<?= $livro['id'] ?>"><?= htmlspecialchars($livro['titulo']) ?></option>
      <?php endwhile; ?>
    </select><br>
    <textarea name="comentario" placeholder="Escreva seu comentário..." required></textarea><br>
    <button type="submit">Comentar</button>
  </form>
<?php else: ?>
  <p><em>Faça login para comentar.</em></p>
<?php endif; ?>

<?php while ($com = $comentarios->fetch_assoc()): ?>
  <div class="comentario-box">
    <strong><?= htmlspecialchars($com['usuario']) ?></strong> comentou sobre <em><?= htmlspecialchars($com['titulo']) ?></em><br>
    <small><?= date('d/m/Y H:i', strtotime($com['data_comentario'])) ?></small>
    <p><?= nl2br(htmlspecialchars($com['comentario'])) ?></p>
    <?php if (isset($_SESSION['id']) && $_SESSION['id'] == $com['id_usuario']): ?>
      <a href="commentedit.php?id=<?= $com['id'] ?>">Editar</a> |
      <a href="comentdelet.php?id=<?= $com['id'] ?>" onclick="return confirm('Excluir comentário?')">Excluir</a>
    <?php endif; ?>
  </div>
<?php endwhile; ?>