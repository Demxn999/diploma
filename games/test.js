// Вопросы и ответы
const questions = [
    "Какое занятие вас больше привлекает?",
    "Что вам больше нравится делать в свободное время?",
    "Как вы предпочитаете работать над проектами?",
    "Какое из этих утверждений вас больше описывает?",
    "Какой предмет в школе вам нравился больше?",
    "Как вы относитесь к работе в команде?",
    "На выставке современных автомобилей на что бы вы больше обратили свое внимание?",
    "Как вы относитесь к изменениям и неопределенности?",
    "Как вы относитесь к учебному процессу и постоянному обучению?",
    "Каким образом вы предпочитаете решать проблемы?",
    "Как ты изучаешь новые программы или программное обеспечение?",
    "Считаешь ли ты себя терпеливым человеком?",
    "Какое качество ты больше всего ценишь в руководителе?",
    "Как вы относитесь к работе в условиях ограниченных ресурсов?",
    "Как вы предпочитаете отдыхать?"
];

const answers = [
    ["Создание визуально привлекательных интерфейсов", "Решение логических задач и головоломок", "Работа с текстовым контентом и мультимедиа", "Оптимизация процессов и повышение эффективности"],
    ["Рисовать или заниматься фотографией", "Программировать или экспериментировать с техниками кодирования", "Читать книги и журналы о технологиях", "Заниматься рукоделием или DIY-проектами"],
    ["Работаю над тем, чтобы проект выглядел эстетично", "Сосредотачиваюсь на функциональности и технических аспектах", "Люблю добавлять креативные и необычные решения", "Стремлюсь к максимальной эффективности и производительности"],
    ["Я визуал и обращаю внимание на детали", "Я аналитически мыслю и люблю структурировать информацию", "Я творческий человек, люблю экспериментировать с формами и цветами", "Я предпочитаю работать с числами и алгоритмами"],
    ["Изобразительное искусство", "Математика", "Литература", "Физика"],
    ["Я предпочитаю работать в команде, чтобы обмениваться идеями и получать обратную связь", "Мне нравится работать самостоятельно, чтобы сосредоточиться на задаче и достичь хороших результатов", "Участвую в коллективной разработке дизайн-концепций и прототипов", "Взаимодействую с разработчиками для создания функциональных продуктов"],
    ["На внешний вид автомобилей", "На внутреннее устройство автомобилей", "На то, как они будут эксплуатироваться в жизни", "На то, как презентуют автомобили"],
    ["Вижу в них возможность для креативного роста и экспериментов", "Предпочитаю стабильность и планирование, чтобы избежать неожиданных ситуаций", "Умею гибко реагировать на изменения и адаптироваться к новым условиям", "Планирую и структурирую работу, чтобы минимизировать риски и неопределенность"],
    ["Вижу в обучении возможность для расширения своего творческого потенциала и профессионального роста", "Предпочитаю учиться для того, чтобы овладеть новыми технологиями и методиками работы", "Готов постоянно развивать свои навыки в новых областях", "Обучение не является приоритетом, предпочитаю опыт и практику"],
    ["Творчески, генерируя разные идеи и подходы", "Логически, анализируя информацию и используя алгоритмы", "Обсуждая их с другими людьми и совместно вырабатывая решения", "Действуя по плану, шаг за шагом"],
    ["Изучаю самостоятельно, экспериментируя с разными функциями", "Читаю документацию и следую пошаговым инструкциям", "Смотрю видео или прохожу онлайн-курсы", "Учусь у коллег или друзей, которые уже знают программу"],
    ["Могу быть терпеливым, если того требует творческий процесс", "Предпочитаю видеть быстрые результаты и могу раздражаться из-за медленных процессов", "Терпелив, если работаю над четкой целью", "Мне сложно ждать, и я предпочитаю действовать быстро"],
    ["Креативность, видение и способность вдохновлять других", "Интеллект, аналитические способности и принятие эффективных решений", "Открытость общения, умение работать в команде и эмпатию", "Авторитет, опыт и способность мотивировать сотрудников"],
    ["Использую ситуацию ограниченности ресурсов как стимул для нахождения инновационных решений", "Сосредотачиваюсь на оптимизации использования имеющихся ресурсов", "Ищу креативные подходы для решения задач в условиях ограниченности", "Пытаюсь расширить доступные ресурсы путем сотрудничества с другими отделами или командами"],
    ["Посещать музеи, выставки, арт-инсталляции, концерты или театры", "Решать головоломки, играть в шахматы или другие логические игры", "Заниматься рисованием, лепкой, фотографией, создавать коллажи", "Заниматься спортом, играть в компьютерные игры, участвовать в хакатонах"]
];

// Результаты
const results = {
    "Дизайн": 0,
    "Разработка ПО": 0
};

let currentQuestion = 0;
let userAnswers = [];

const renderQuestion = () => {
    document.getElementById("question").innerText = `Вопрос ${currentQuestion + 1}: ${questions[currentQuestion]}`;
    renderAnswers();
    updateButtons();
};

const renderAnswers = () => {
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";
    answers[currentQuestion].forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.addEventListener("click", () => handleAnswer(index, button));
        if (userAnswers[currentQuestion] === index) {
            button.classList.add("selected");
        }
        optionsContainer.appendChild(button);
    });
};

const updateButtons = () => {
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const resultBtn = document.getElementById("resultBtn");

    if (currentQuestion === 0) {
        prevBtn.style.display = "none";
    } else {
        prevBtn.style.display = "inline-block";
    }

    if (currentQuestion === questions.length - 1) {
        nextBtn.style.display = "none";
        resultBtn.style.display = "inline-block";
    } else {
        nextBtn.style.display = "inline-block";
        resultBtn.style.display = "none";
    }
};

const handleAnswer = (answerIndex, button) => {
    userAnswers[currentQuestion] = answerIndex;
    const selectedButtons = document.querySelectorAll('.selected');
    selectedButtons.forEach(selectedButton => selectedButton.classList.remove('selected'));
    button.classList.add('selected');
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        renderQuestion();
    }
};

const nextQuestion = () => {
    currentQuestion++;
    renderQuestion();
};

const prevQuestion = () => {
    currentQuestion--;
    renderQuestion();
};

const showResult = () => {
    if (userAnswers.length !== questions.length || userAnswers.includes(undefined)) {
        document.getElementById("warning").style.display = "block";
    } else {
        document.getElementById("warning").style.display = "none";

        userAnswers.forEach(answer => {
            if (answer === 0 || answer === 2) {
                results["Дизайн"]++;
            } else {
                results["Разработка ПО"]++;
            }
        });

        const resultContainer = document.getElementById("result");
        localStorage.setItem('achievement_4', 'completed');
        const result = Object.keys(results).reduce((a, b) => results[a] > results[b] ? a : b);
        resultContainer.textContent = `Подходящее направление: ${result}`;

        document.getElementById("question").style.display = "none";
        document.getElementById("options").style.display = "none";
        document.getElementById("resultBtn").style.display = "none";
        document.getElementById("prevBtn").style.display = "none";
        document.getElementById("restartBtn").style.display = "inline-block";
    }
};

const restartQuiz = () => {
    currentQuestion = 0;
    userAnswers = [];
    results["Дизайн"] = 0;
    results["Разработка ПО"] = 0;
    renderQuestion();
    document.getElementById("result").textContent = "";
    document.getElementById("question").style.display = "block";
    document.getElementById("options").style.display = "block";
    document.getElementById("resultBtn").style.display = "none";
    document.getElementById("prevBtn").style.display = "none";
    document.getElementById("restartBtn").style.display = "none";
    document.getElementById("warning").style.display = "none";
};
renderQuestion();
