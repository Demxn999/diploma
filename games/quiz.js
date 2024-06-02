let currentQuestion = 1;
const totalQuestions = 10;

function showQuestion(num) {
    document.querySelectorAll('.question').forEach(q => q.classList.remove('active'));
    document.querySelector(`[data-question="${num}"]`).classList.add('active');
}

function nextQuestion() {
    if (currentQuestion < totalQuestions) {
        currentQuestion++;
        showQuestion(currentQuestion);
    }
}

function prevQuestion() {
    if (currentQuestion > 1) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
}

function showResult() {
    let answeredAll = true;

    for (let i = 1; i <= totalQuestions; i++) {
        const question = document.querySelector(`[data-question="${i}"]`);
        const inputsRadio = question.querySelectorAll('input[type="radio"]');
        const inputsCheckbox = question.querySelectorAll('input[type="checkbox"]:checked');
        const textarea = question.querySelector('textarea');

        // Проверка radiobutton
        if (inputsRadio.length && !Array.from(inputsRadio).some(input => input.checked)) {
            answeredAll = false;
            break;
        }

        // Проверка чекбоксов
        if (question.querySelector('input[type="checkbox"]') && !inputsCheckbox.length) {
            answeredAll = false;
            break;
        }

        // Проверка текстовых полей
        if (textarea && !textarea.value.trim()) {
            answeredAll = false;
            break;
        }
    }

    if (!answeredAll) {
        document.getElementById('warning').style.display = 'block';
        return;
    } else {
        document.getElementById('warning').style.display = 'none';
    }

    let correctAnswers = 0;

    // Проверка ответов
    const answers = {
        q1: 'c',
        q2: 'c',
        q3: 'a',
        q4: 'с',
        q5: 'c',
        q6: 'p { color: blue; }',
        q7: ['a', 'b', 'd'],
        q8: 'print("Hello, World!")',
        q9: ['a', 'c', 'd'],
        q10: ['a', 'b', 'c']
    };

    if (document.querySelector('input[name="q1"]:checked')?.value === answers.q1) correctAnswers++;
    if (document.querySelector('input[name="q2"]:checked')?.value === answers.q2) correctAnswers++;
    if (document.querySelector('input[name="q3"]:checked')?.value === answers.q3) correctAnswers++;
    if (document.querySelector('input[name="q4"]:checked')?.value === answers.q4) correctAnswers++;
    if (document.querySelector('input[name="q5"]:checked')?.value === answers.q5) correctAnswers++;

    const q6 = document.querySelector('textarea[name="q6"]').value.trim();
    if (q6 === answers.q6) correctAnswers++;

    const q7 = Array.from(document.querySelectorAll('input[name="q7"]:checked')).map(cb => cb.value);
    if (q7.length === answers.q7.length && q7.every(v => answers.q7.includes(v))) correctAnswers++;

    const q8 = document.querySelector('textarea[name="q8"]').value.trim();
    if (q8 === answers.q8) correctAnswers++;

    const q9 = Array.from(document.querySelectorAll('input[name="q9"]:checked')).map(cb => cb.value);
    if (q9.length === answers.q9.length && q9.every(v => answers.q9.includes(v))) correctAnswers++;

    const q10 = Array.from(document.querySelectorAll('input[name="q10"]:checked')).map(cb => cb.value);
    if (q10.length === answers.q10.length && q10.every(v => answers.q10.includes(v))) correctAnswers++;
    // Показ результата
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    document.getElementById('resultText').innerText = `Вы правильно ответили на ${correctAnswers} из ${totalQuestions} вопросов.\n${getEvaluation(correctAnswers)}`;
}

function getEvaluation(score) {
    if (score === 10) return "Отлично! Вы хорошо разбираетесь в дизайне и программировании!";
    if (score >= 8) return "Очень хорошо! Есть пара ошибок, но вы - молодец!";
    if (score >= 6) return "Хорошо, но есть куда расти!";
    if (score >= 4) return "Нужно больше практиковаться!";
    return "Вам нужно изучить основы программирования и дизайна!";
}

function resetAnswers() {
    document.querySelectorAll('input[type="radio"]').forEach(input => input.checked = false);
    document.querySelectorAll('input[type="checkbox"]').forEach(input => input.checked = false);
    document.querySelectorAll('textarea').forEach(textarea => textarea.value = '');
}

function restartQuiz() {
    resetAnswers();
    currentQuestion = 1;
    showQuestion(currentQuestion);
    document.getElementById('quiz').style.display = 'block';
    document.getElementById('result').style.display = 'none';
    document.getElementById('warning').style.display = 'none';
}

showQuestion(currentQuestion);