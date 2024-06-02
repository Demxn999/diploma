document.addEventListener('DOMContentLoaded', () => {
    const fontSamples = document.querySelectorAll('.font-sample');
    let selectedFonts = [];
    let correctCombinationsCount = 0;
    let usedCombinations = [];
    const requiredCorrectCombinations = 4;

    fontSamples.forEach(font => {
        font.addEventListener('click', () => {
            if (selectedFonts.length < 2 && !font.classList.contains('selected')) {
                font.classList.add('selected');
                selectedFonts.push(font);
            } else if (font.classList.contains('selected')) {
                font.classList.remove('selected');
                selectedFonts = selectedFonts.filter(f => f !== font);
            }
        });
    });

    const checkButton = document.getElementById('checkButton');
    const resultMessage = document.getElementById('resultMessage');
    const justificationMessage = document.getElementById('justificationMessage');

    checkButton.addEventListener('click', () => {
        if (selectedFonts.length === 2) {
            const font1 = selectedFonts[0].textContent.trim();
            const font2 = selectedFonts[1].textContent.trim();
            const combinationKey = [font1, font2].sort().join(' & ');
            if (!usedCombinations.includes(combinationKey)) {
                const isCorrect = checkFontCombination(font1, font2);
                resultMessage.textContent = isCorrect ? 'Правильно!' : 'Неправильно. Попробуйте ещё раз.';
                resultMessage.style.color = isCorrect ? 'green' : 'red';
                justificationMessage.textContent = getJustification(font1, font2);
                fontSamples.forEach(f => f.classList.remove('selected'));
                selectedFonts = [];
                if (isCorrect) {
                    correctCombinationsCount++;
                    usedCombinations.push(combinationKey);
                    if (correctCombinationsCount === requiredCorrectCombinations) {
                        localStorage.setItem('achievement_1', 'completed');
                        alert('Поздравляем! Вы выбрали все правильные сочетания шрифтов.');
                    }
                }
            } else {
                resultMessage.textContent = 'Эта комбинация уже использовалась.';
                resultMessage.style.color = 'orange';
                justificationMessage.textContent = '';
                fontSamples.forEach(f => f.classList.remove('selected'));
                selectedFonts = [];
            }
        } else {
            resultMessage.textContent = 'Пожалуйста, выберите два шрифта.';
            resultMessage.style.color = 'red';
            justificationMessage.textContent = '';
        }
    });

    function checkFontCombination(font1, font2) {
        const correctCombinations = [
            ['Roboto', 'Merriweather'],
            ['Lora', 'Open Sans'],
            ['Arial', 'Times New Roman'],
            ['Roboto', 'Courier New']
        ];
        return correctCombinations.some(pair =>
            (pair.includes(font1) && pair.includes(font2) && font1 !== font2)
        );
    }

    function getJustification(font1, font2) {
        const descriptions = {
            'Roboto & Merriweather': 'Roboto и Merriweather: современный сан-сериф сочетается с традиционным и читаемым серифом для сбалансированной комбинации.',
            'Lora & Open Sans': 'Lora и Open Sans: комбинация декоративного серифа и современного сан-серифа обеспечивает гармоничное сочетание для заголовков и основного текста.',
            'Arial & Times New Roman': 'Arial и Times New Roman: это классическое сочетание шрифтов, часто используемое в печатных изданиях и академических текстах.',
            'Roboto & Courier New': 'Roboto и Courier New: контраст между современным, гладким шрифтом и моноширинным шрифтом, который ассоциируется с печатными машинами и кодированием.'
        };

        const key = `${font1} & ${font2}`;
        const reverseKey = `${font2} & ${font1}`;

        return descriptions[key] || descriptions[reverseKey] || 'Эта комбинация шрифтов не рекомендуется.';
    }
});
