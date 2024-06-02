var eventInput = document.getElementById('eventInput');
var colorInput = document.getElementById('colorInput');
var myBlock = document.getElementById('myBlock');

myBlock.onclick = function () {
    var eventWord = eventInput.value.trim().toLowerCase();
    var colorWord = colorInput.value.trim().toLowerCase();

    if (eventWord === 'onclick' && colorWord === 'red') {

        this.style.transition = "background-color 1s";
        this.style.backgroundColor = colorWord;

        showResult(true);
    } else {

        showResult(false);
    }
};

function showResult(success) {
    var output = document.getElementById('output');
    localStorage.setItem('achievement_2', 'completed');
    output.innerHTML = success ? '<p>Поздравляем! Ты успешно создал анимацию для элемента по клику.</p>' : '<p class="wrong">Что-то пошло не так. Попробуй еще раз!</p>';
}