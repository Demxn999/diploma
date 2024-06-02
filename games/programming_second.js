document.addEventListener("DOMContentLoaded", () => {
    let score = 0;
    const gameContainer = document.getElementById("game");
    const scoreDisplay = document.getElementById("score");
    const warningsContainer = document.getElementById("warnings");
    const restartButton = document.getElementById("restart-btn");

    const initialCodeBlocks = `
        <div class="code-block" data-correct="false">print("Hello World" + 123)</div>
        <div class="code-block" data-correct="false">x = 5 + "10"</div>
        <div class="code-block" data-correct="false">for i in range(10): print i</div>
        <div class="code-block" data-correct="true">x = 5 + 10</div>
        <div class="code-block" data-correct="true">for i in range(10): print(i)</div>
        <div class="code-block" data-correct="false">class Animal object: pass</div>
        <div class="code-block" data-correct="false">if x = 10: print("Equal")</div>
        <div class="code-block" data-correct="false">try: result = 10 / 0 finally: pass</div>
        <div class="code-block" data-correct="true">try: result = 10 / 0 except ZeroDivisionError: pass</div>
        <div class="code-block" data-correct="true">class Animal: pass</div>
        <div class="code-block" data-correct="true">lambda x: x * 2</div>
        <div class="code-block" data-correct="true">def greet(name): return f"Hello, {name}"</div>
        <div class="code-block" data-correct="false">def greet(name): print "Hello, " + name</div>
        <div class="code-block" data-correct="true">sum(range(10))</div>
        <div class="code-block" data-correct="false">sum(x for x in range(10)</div>
        <div class="code-block" data-correct="false">numbers = {1, 2, 3, 4, 5}</div>
        <div class="code-block" data-correct="true">numbers = [1, 2, 3, 4, 5]</div>
        <div class="code-block" data-correct="true">while x < 10: x += 1</div>
        <div class="code-block" data-correct="false">while x < 10 x += 1</div>
        <div class="code-block" data-correct="true">import math</div>
        <div class="code-block" data-correct="false">import maths</div>
    `;

    gameContainer.innerHTML = initialCodeBlocks;

    gameContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("code-block")) {
            const isCorrect = e.target.getAttribute("data-correct") === "true";
            if (isCorrect) {
                showWarning("Ой. Ты ошибся, это верная строка!");
                score = 0;
                updateScore();
            } else {
                score += 10;
                e.target.remove();
                updateScore();
            }

            checkForCompletion();
        }
    });

    restartButton.addEventListener("click", () => {
        score = 0;
        updateScore();
        gameContainer.innerHTML = initialCodeBlocks;
        warningsContainer.innerHTML = "";
    });

    function updateScore() {
        scoreDisplay.textContent = `Счет: ${score}`;
    }

    function showWarning(message, color = "red", persistent = false) {
        const warning = document.createElement("div");
        warning.textContent = message;
        warning.style.color = color;
        warningsContainer.innerHTML = "";
        warningsContainer.appendChild(warning);
        if (!persistent) {
            setTimeout(() => warning.remove(), 5000);
        }
    }

    function checkForCompletion() {
        const incorrectBlocks = gameContainer.querySelectorAll('.code-block[data-correct="false"]');
        if (incorrectBlocks.length === 0) {
            localStorage.setItem('achievement_3', 'completed');
            showWarning("Поздравляю! Ты выполнил задание! Ты победил!", "green", true);
        }
    }
});
