<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

$servername = "localhost";
$username = "fbki_pi55";
$password = "XeHTjaCM";
$dbname = "fbki_pi55";

$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$email = $_POST['email'];

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "UPDATE users SET firstname = ?, lastname = ?, email = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssi", $firstname, $lastname, $email, $_SESSION['user_id']);

if ($stmt->execute()) {
    echo "Данные успешно обновлены";
    header("Location: profile.php");
} else {
    echo "Ошибка: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>