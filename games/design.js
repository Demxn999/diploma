const questions = [
  {
    paletteImage: '../assets/logo_one.png',
    companyImage: '../assets/s7.png',
    options: ['Sprite', 'Fairy', 'S7', 'Android'],
    correctAnswer: 2
  },
  {
    paletteImage: '../assets/logo_two.png',
    companyImage: '../assets/spot.png',
    options: ['Cars7', 'Spotify', 'Starbucks', 'Panasonic'],
    correctAnswer: 1
  },
  {
    paletteImage: '../assets/logo_three.png',
    companyImage: '../assets/chup.png',
    options: ['Lucoil', 'Chupa Chups', 'McDonalds', 'DHL'],
    correctAnswer: 1
  }
];

let currentQuestion = 0;

function displayQuestion() {
  const question = questions[currentQuestion];
  document.getElementById('palette-img').src = question.paletteImage;
  document.getElementById('company-img').src = question.companyImage;
  document.getElementById('company-img').style.display = 'none';
  document.getElementById('notification-correct').style.display = 'none';
  document.getElementById('notification-incorrect').style.display = 'none';

  const optionElements = document.querySelectorAll('.option');
  question.options.forEach((option, index) => {
    optionElements[index].textContent = option;
  });
}

function checkAnswer(selectedIndex) {
  const question = questions[currentQuestion];
  if (selectedIndex === question.correctAnswer) {
    document.getElementById('notification-correct').style.display = 'block';
    document.getElementById('company-img').style.display = 'block';
    setTimeout(() => {
      document.getElementById('notification-correct').style.display = 'none';
      document.getElementById('company-img').style.display = 'none';
      if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        displayQuestion();
      } else {
        document.getElementById('notification-correct').textContent = 'Вы молодец!';
        document.getElementById('notification-correct').style.display = 'block';
        document.getElementById('notification-incorrect').style.display = 'none';

        localStorage.setItem('achievement', 'completed');
      }
    }, 2000);
  } else {
    document.getElementById('notification-incorrect').style.display = 'block';
    document.getElementById('notification-correct').style.display = 'none';
  }
}

displayQuestion();