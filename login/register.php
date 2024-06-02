<?php
$servername = "localhost";
$username = "fbki_pi55";
$password = "XeHTjaCM";
$dbname = "fbki_pi55";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$email_exists = false;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    $sql = "SELECT id FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $email_exists = true;
    } else {
        $stmt->close();
        
        $sql = "INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssss", $firstname, $lastname, $email, $password);
        $stmt->execute();

        if ($stmt->affected_rows === 1) {
            session_start();
            $_SESSION['user_id'] = $stmt->insert_id;
            header("Location: profile.php");
            exit();
        } else {
            echo "Ошибка: " . $stmt->error;
        }
    }

    $stmt->close();
}
$conn->close();
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="style.css">
    <script src="../menu.js"></script>
</head>
<body>
<nav>
    <div class="nav__logo">
        <a href="../index.html"><img src="../assets/logo.svg" alt="logo" /></a>
    </div>
    <ul class="nav__links">
        <li class="link"><a href="../about.html">О нас</a></li>
        <li class="link"><a href="../profiles.html">Профили обучения</a></li>
        <li class="link"><a href="../games.html">Тесты и игры</a></li>
        <li class="link"><a href="#footer">Контакты</a></li>
        <li class="link"><a href="../login/profile.php">Личный кабинет</a></li>
    </ul>
    <a class="btn_des" href="../login/register.php" class="btn">Зарегистрироваться</a>
    <div class="hamburger">
        <span></span>
        <span></span>
        <span></span>
    </div>
    <div class="mobile-nav">
        <ul class="mobile-nav__links">
            <li class="link"><a href="../about.html">О нас</a></li>
            <li class="link"><a href="../profiles.html">Профили обучения</a></li>
            <li class="link"><a href="../games.html">Тесты и игры</a></li>
            <li class="link"><a href="#footer">Контакты</a></li>
            <li class="link"><a href="../login/profile.php">Личный кабинет</a></li>
        </ul>
        <a href="../login/register.php" class="btn">Зарегистрироваться</a>
    </div>
</nav>
<div class="container">
    <h1>Регистрация</h1>
    <?php
    if ($email_exists) {
        echo '<p class="error">Пользователь с таким email уже существует</p>';
    }
    ?>
    <form action="register.php" method="post">
        <input class="fields" type="text" name="firstname" placeholder="Имя" required>
        <input class="fields" type="text" name="lastname" placeholder="Фамилия" required>
        <input class="fields" type="email" name="email" placeholder="Email" required>
        <input class="fields" type="password" name="password" placeholder="Пароль" required>
        <button class="subscribe" type="submit">Зарегистрироваться</button>
        <p>Уже есть аккаунт? <a class="login" href="login.php">Войти</a></p>
    </form>
</div>
<footer id="footer">
        <div class="footer-container">
            <div class="footer-left">
                <div class="footer-logo"><img src="../assets/logo2.svg" alt="logo" /></div>

                <div class="footer-description">
                    Будьте в курсе всех новостей!<br>
                    Мероприятия, обновления, полезная информация
                </div>
                <div class="footer-input-container">
                    <input type="email" placeholder="Введите ваш email">
                    <button >Подписаться</button>
                </div>
                <div class="footer-social-icons">
                    <a href="https://vk.com/fsirigu" target="_blank">
                        <img src="../assets/vk.svg">
                    </a>
                    <a href="https://web.telegram.org/#/im?p=@fbki_isu" target="_blank">
                        <img src="../assets/tg.svg">
                    </a>
                    <a href="https://www.youtube.com/channel/UCyPYCqcUuWRPH3dFAS7wP5Q" target="_blank">
                        <img src="../assets/yt.svg">
                    </a>
                </div>
                <div class="address">
                    <div>Иркутск, ул.Лермонтова 126,
                        6-й корпус ИГУ</div>
                    <div>+7 (3952) 42‑64‑17
                    </div>
                    <div><a href="mailto:dekanat@fbki.isu.ru">dekanat@fbki.isu.ru</a></div>
                </div>
            </div>

            <div class="footer-right">
                <ul class="footer-menu">
                    <li class="footer-menu-item">
                        <span class="footer-menu-number">1</span>
                        <a href="../index.html">Главная</a>
                    </li>
                    <li class="footer-menu-item">
                        <span class="footer-menu-number">2</span>
                        <a href="../about.html">О нас</a>
                    </li>
                    <li class="footer-menu-item">
                        <span class="footer-menu-number">3</span>
                        <a href="../profiles.html">Профили обучения</a>
                    </li>
                    <li class="footer-menu-item">
                        <span class="footer-menu-number">4</span>
                        <a href="../games.html">Тесты и игры</a>
                    </li>
                    <li class="footer-menu-item">
                        <span class="footer-menu-number">5</span>
                        <a href="../login/profile.php">Личный кабинет</a>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
</body>
</html>
