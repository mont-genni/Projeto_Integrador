<?php
// configuraçoes de conexao com o banco de dado
$host = 'localhost';
$usuario = 'root';
$senha = '';
$banco = 'p_integrador';

//cria a conexao com o MySQL
$conn = new mysqli($host, $usuario, $senha, $banco);

//Verifica se ocorreu algum erro na conexao
if ($conn->connect_error) {
    die("Erro na conexão: " . $conn->connect_error);
}
?>