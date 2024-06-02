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

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$user_id = $_SESSION['user_id'];
$sql = "SELECT firstname, lastname, email FROM users WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$stmt->bind_result($firstname, $lastname, $email);
$stmt->fetch();
$stmt->close();

$conn->close();
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="style.css">
    <link rel="stylesheet" type="text/css" href="../styles.css">
    <script src="../menu.js"></script>
    <script>
        function checkAchievements() {
            if (localStorage.getItem('achievement') === 'completed' && localStorage.getItem('achievement_1') === 'completed'){
                document.getElementById('achievement-3').classList.add('completed');
                document.getElementById('achievement-img-3').classList.remove('locked');
            }
            if (localStorage.getItem('achievement_2') === 'completed' && localStorage.getItem('achievement_3') === 'completed'){
                document.getElementById('achievement-2').classList.add('completed');
                document.getElementById('achievement-img-2').classList.remove('locked');  
            }
            if (localStorage.getItem('achievement_4') === 'completed'){
                document.getElementById('achievement-1').classList.add('completed');
                document.getElementById('achievement-img-1').classList.remove('locked');  }
            if (localStorage.getItem('achievement_5') === 'completed'){
                document.getElementById('achievement-4').classList.add('completed');
                document.getElementById('achievement-img-4').classList.remove('locked');  }
        }
        document.addEventListener('DOMContentLoaded', checkAchievements);
    </script>
</head>
<body onload="checkAchievements()">
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
    <h1>Личный кабинет</h1>
    <form action="update_profile.php" method="post">
        <input class="fields" type="text" name="firstname" value="<?php echo htmlspecialchars($firstname); ?>" required>
        <input class="fields" type="text" name="lastname" value="<?php echo htmlspecialchars($lastname); ?>" required>
        <input class="fields" type="email" name="email" value="<?php echo htmlspecialchars($email); ?>" required>
        <button class="subscribe" type="submit">Обновить</button>
    </form>
    <form action="logout.php" method="post">
        <button class="subscribe" type="submit">Выйти</button>
    </form>
    <div class="achievements">
        <h2>Ваши достижения</h2>
        <ul>
            <li id="achievement-1">
                <img id="achievement-img-1" src="../assets/1.jpg" alt="Achievement 1" class="achievement-img locked">
                Кто я? - за прохождение теста на определение профиля
            </li>
            <li id="achievement-2">
                <img id="achievement-img-2" src="../assets/2.jpg" alt="Achievement 2" class="achievement-img locked">
                Junior-разработчик - за прохождение заданий по разработке
            </li>
            <li id="achievement-3">
                <img id="achievement-img-3" src="../assets/3.jpg" alt="Achievement 3" class="achievement-img locked">
                Junior-дизайнер - за прохождение заданий по дизайну
            </li>
            <li id="achievement-4">
                <img id="achievement-img-4" src="../assets/4.jpg" alt="Achievement 4" class="achievement-img locked">
                Исследователь - за исследование всех страниц сайта
            </li>
        </ul>
    </div>
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
                    <button>Подписаться</button>
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