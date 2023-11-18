const section = document.querySelector('#section');
let rightGuessEl = document.querySelector('.right-guess');
let wrongGuessEl = document.querySelector('.wrong-guess');
let rightGuess = 0;
let wrongGuess = 0;
let totalAttempts = 0;
let totalAttemptsEl = document.querySelector('#total-attempts');
let resetBtnEl = document.querySelector('#resetGameBtn');

//status bar for game
let statusBarEl = document.querySelector('#statusBar');

//store top players

let player1Name = JSON.parse(localStorage.getItem('player1Name')) || 'player';
let player1Score = Number(JSON.parse(localStorage.getItem('player1Score'))) || 0;

let player2Name = JSON.parse(localStorage.getItem('player2Name')) || 'player';
let player2Score = Number(JSON.parse(localStorage.getItem('player2Score'))) || 0;

let player3Name = JSON.parse(localStorage.getItem('player3Name')) || 'player';
let player3Score = Number(JSON.parse(localStorage.getItem('player3Score'))) || 0;

let topPlayersArr = [
  { player1: `${player1Name}`, score: `${player1Score}`},
  { player2: `${player2Name}`, score: `${player2Score}`},
  { player3: `${player3Name}`, score: `${player3Score}`},
];


let player1NameEl = document.querySelector('#player1Name');
let player1ScoreEl = document.querySelector('#player1Score');

let player2NameEl = document.querySelector('#player2Name');
let player2ScoreEl = document.querySelector('#player2Score');

let player3NameEl = document.querySelector('#player3Name');
let player3ScoreEl = document.querySelector('#player3Score');


function updateScoreboard() {
  player1NameEl.textContent = player1Name;
  player1ScoreEl.textContent = player1Score;
  player2NameEl.textContent = player2Name;
  player2ScoreEl.textContent = player2Score;
  player3NameEl.textContent = player3Name;
  player3ScoreEl.textContent = player3Score;
};

updateScoreboard();


//link text
rightGuessEl.textContent = rightGuess;
wrongGuessEl.textContent = wrongGuess;
totalAttemptsEl.textContent = totalAttempts;

//Generate the data
const getData = () => [
  { imgSrc: "./images/card1.jpg", name: "card 1" },
  { imgSrc: "./images/card2.jpg", name: "card 2" },
  { imgSrc: "./images/card3.jpg", name: "card 3" },
  { imgSrc: "./images/card4.jpg", name: "card 4" },
  { imgSrc: "./images/card5.jpg", name: "card 5" },
  { imgSrc: "./images/card6.jpg", name: "card 6" },
  { imgSrc: "./images/card7.jpg", name: "card 7" },
  { imgSrc: "./images/card8.jpg", name: "card 8" },
  { imgSrc: "./images/card1.jpg", name: "card 1" },
  { imgSrc: "./images/card2.jpg", name: "card 2" },
  { imgSrc: "./images/card3.jpg", name: "card 3" },
  { imgSrc: "./images/card4.jpg", name: "card 4" },
  { imgSrc: "./images/card5.jpg", name: "card 5" },
  { imgSrc: "./images/card6.jpg", name: "card 6" },
  { imgSrc: "./images/card7.jpg", name: "card 7" },
  { imgSrc: "./images/card8.jpg", name: "card 8" }
];

//Randomize card array
const randomize = () => {
  const cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
}

//Card generator function

const cardGenerator = () => {
  const cardData = randomize();
  //generate html
  cardData.forEach((item) => {
    const card = document.createElement('div');
    const face = document.createElement('img');
    const back = document.createElement('div');
    card.classList = 'card';
    face.classList = 'face';
    back.classList = 'back';

    //Attach the data to the cards
    face.src = item.imgSrc;
    card.setAttribute('name', item.name);
    //Attach the cards to the section
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);
    card.addEventListener('click', (e) => {
      card.classList.toggle('toggleCard');
      checkCards(e);
    });
  });
}

//Check cards
const checkCards = (e) => {
  console.log(e);
  const clickedCard = e.target;
  clickedCard.classList.add('flipped');
  const flippedCards = document.querySelectorAll('.flipped');
  const toggleCard = document.querySelectorAll('.toggleCard');
  
  //logic
  if(flippedCards.length === 2){
    if(flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')){
      console.log('match');
      rightGuess += 1;
      totalAttempts += 1;
      rightGuessEl.textContent = rightGuess;
      totalAttemptsEl.textContent = totalAttempts;
      statusBarEl.textContent = 'WE FOUND A MATCH!';
      flippedCards.forEach((card) => {
        card.classList.remove('flipped');
        card.style.pointerEvents = 'none';
      });
    } else {
      console.log('wrong');
      wrongGuess += 1;
      totalAttempts += 1;
      wrongGuessEl.textContent = wrongGuess;
      totalAttemptsEl.textContent = totalAttempts;
      statusBarEl.textContent = 'WRONG GUESS!';
      flippedCards.forEach((card) => {
        card.classList.remove('flipped');
        setTimeout(() => card.classList.remove('toggleCard'), 1000);
      });
    }
  }
  //check if we won the game
  if(toggleCard.length === 16){
    
    if(totalAttempts < player1Score || player1Score === 0){
      console.log('first place');

      player3Name = localStorage.setItem('player3Name',JSON.stringify(topPlayersArr[1].player2));
      player2Name = localStorage.setItem('player2Name',JSON.stringify(topPlayersArr[0].player1));

      player3Score = localStorage.setItem('player3Score',JSON.stringify(topPlayersArr[1].score));
      player2Score = localStorage.setItem('player2Score',JSON.stringify(topPlayersArr[0].score));

      let inputName1 = prompt('YOU GOT THE FIRST PLACE!\n Input your name for the leaderboard:');

      player1Name = localStorage.setItem('player1Name',JSON.stringify(inputName1));
      player1Score = localStorage.setItem('player1Score',totalAttempts);

    } else if(totalAttempts < player2Score || player2Score === 0){
      console.log('second place');
      player3Name = localStorage.setItem('player3Name',JSON.stringify(topPlayersArr[1].player2));
      player3Score = localStorage.setItem('player3Score',JSON.stringify(topPlayersArr[1].score));

      let inputName2 = prompt('YOU GOT THE SECOND PLACE!\n Input your name for the leaderboard:');
      player2Name = localStorage.setItem('player2Name',JSON.stringify(inputName2));
      player2Score = localStorage.setItem('player2Score',totalAttempts);

    } else if(totalAttempts < player3Score || player3Score === 0){
      console.log('third place');

      let inputName3 = prompt('YOU GOT THE THIRD PLACE!\n Input your name for the leaderboard:');
      player3Name = localStorage.setItem('player3Name',JSON.stringify(inputName3));
      player3Score = localStorage.setItem('player3Score',totalAttempts);

    } else {
      setTimeout(() => alert('YOU WON!'), 2000);
    };

    getDataApi();
  }

 player1Name = JSON.parse(localStorage.getItem('player1Name')) || 'player';
 player1Score = Number(JSON.parse(localStorage.getItem('player1Score'))) || 0;

 player2Name = JSON.parse(localStorage.getItem('player2Name')) || 'player';
 player2Score = Number(JSON.parse(localStorage.getItem('player2Score'))) || 0;

 player3Name = JSON.parse(localStorage.getItem('player3Name')) || 'player';
 player3Score = Number(JSON.parse(localStorage.getItem('player3Score'))) || 0;

 updateScoreboard();
}

cardGenerator();


//API fortune cookie

async function getDataApi() {
  const url = 'https://fortune-cookie2.p.rapidapi.com/fortune';
  const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '9f204ff317mshd46d29f795b6684p13d10fjsn64467f714cc4',
		'X-RapidAPI-Host': 'fortune-cookie2.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result.answer);

  statusBarEl.textContent = 'Winner gets a fortune cookie! Click it to open it 😎'
  let quote = result.answer;
  let cookieImg = document.createElement('img');
  cookieImg.classList.add('cookie');
  cookieImg.src = './images/cookie.png';
  statusBarEl.appendChild(cookieImg);
  cookieImg.addEventListener('click',() => {
    statusBarEl.textContent = quote;
    resetBtnEl.classList.remove('hidden');
    resetBtnEl.addEventListener('click', () => {
      window.location.reload();
    })
  })

} catch (error) {
	console.error(error);
}
};

