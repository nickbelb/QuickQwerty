'use strict';

import { Score } from "./Score.js";
import * as utils from "./utils.js"

const wordsBoard=utils.selectObject('.word-board');
const userInput= utils.selectObject('.user-type-input');
const startBtn =utils.selectObject('.start-game-button');
const clock = utils.selectObject('.clock');
const pointsBoard = utils.selectObject('.points-board');
const message= utils.selectObject('.message');
const words = [
    'dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building',
    'population', 'weather', 'bottle', 'history', 'dream', 'character', 'money',
    'absolute', 'discipline', 'machine', 'accurate', 'connection', 'rainbow',
    'bicycle', 'eclipse', 'calculator', 'trouble', 'watermelon', 'developer',
    'philosophy', 'database', 'periodic', 'capitalism', 'abominable',
    'component', 'future', 'pasta', 'microwave', 'jungle', 'wallet', 'canada',
    'coffee', 'beauty', 'agency', 'chocolate', 'eleven', 'technology', 'promise',
    'alphabet', 'knowledge', 'magician', 'professor', 'triangle', 'earthquake',
    'baseball', 'beyond', 'evolution', 'banana', 'perfume', 'computer',
    'management', 'discovery', 'ambition', 'music', 'eagle', 'crown', 'chess',
    'laptop', 'bedroom', 'delivery', 'enemy', 'button', 'superman', 'library',
    'unboxing', 'bookstore', 'language', 'homework', 'fantastic', 'economy',
    'interview', 'awesome', 'challenge', 'science', 'mystery', 'famous',
    'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow',
    'keyboard', 'window', 'beans', 'truck', 'sheep', 'band', 'level', 'hope',
    'download', 'blue', 'actor', 'desk', 'watch', 'giraffe', 'brazil', 'mask',
    'audio', 'school', 'detective', 'hero', 'progress', 'winter', 'passion',
    'rebel', 'amber', 'jacket', 'article', 'paradox', 'social', 'resort', 'escape'
   ];
const scoreBoardDate=utils.selectObject('.date');
const scoreBoardPoints=utils.selectObject('.points');
const scoreBoardPercentage=utils.selectObject('.percentage');
const startGameBoard =utils.selectObject('.start-game-board');
const gameBoard=utils.selectObject('.game-board');
const scoreBoardDetails = utils.selectObject('.score-board-details')
const restartBtn=utils.selectObject('.restart-btn');
const cancelBtn=utils.selectObject('.cancel-btn');
let gameAudio = new Audio('./assets/media/game-music.mp3');
let gameOverAudio = new Audio('./assets/media/game-over.mp3');
let count = 15;
let timerId;
let points = 0;
let gameWords;
const wordCount = utils.selectObject('.word-count');

function checkWord(){
    if(wordsBoard.value===userInput.value){
        gameWords.splice(gameWords.indexOf(wordsBoard.value),1);
        points++;
        pointsBoard.textContent=points;
        chooseWord();
        userInput.value='';
    }
}

function chooseWord(){
    if(gameWords.length!=0){
        gameWords.sort(()=>Math.random()-0.5);
        wordsBoard.value=gameWords[0];
        wordCount.textContent=gameWords[0].split('').length;
    }else{
        showScoreBoard(true);
    }
} 

function copyArray() {
    gameWords = [...words];
}

function startGame(){
    startGameBoard.classList.add('hidden');
    gameBoard.classList.remove('hidden');
    chooseWord();
    userInput.focus();
    playSound(gameAudio);
    timerId = setInterval(checkClock,1000);
}

function playSound(audio) {
    audio.play();
}

function stopSound(audio){
    audio.pause();
    restartAudio(audio);
}

function restartAudio(audio){
    audio.onpause=function() {
        audio.currentTime=0;
    };
}

function checkClock(){
    clock.textContent = count;
    if(count!=0){
        if(count==10){
            clock.classList.add('fadeInOut');
            clock.classList.add('red');
        }
        count--
    }else{
        clearInterval(timerId);
        stopSound(gameAudio);
        showScoreBoard();
        playSound(gameOverAudio);
    }
}

function showScoreBoard(userWin) {
    gameBoard.classList.add('hidden');
    scoreBoardDetails.classList.remove('hidden');
    if(userWin){
        message.classList.add('green');
        message.textContent='!Congratulations, You Win';
    }else{
        message.classList.add('red');
        message.textContent='!Sorry, Your time is Up!';
    }
    const score = new Score(points,new Date());
    scoreBoardDate.textContent =`${score.date}`;
    scoreBoardPoints.textContent = `${score.score}`;
    scoreBoardPercentage.textContent = `${score.percentage}`;
}
 
function restartValues(){
    wordCount.textContent='0';
    count = 15;
    clock.textContent=count;
    points = 0;
    pointsBoard.textContent=points;
    copyArray();
    clock.classList.remove('fadeInOut');
    clock.classList.remove('red');
    userInput.value = '';
    if(message.classList.contains('red')){
        message.classList.remove('red');
    }else{
        message.classList.remove('green');
    }
}

function restartGame() {
    stopSound(gameOverAudio);
    restartValues();
    scoreBoardDetails.classList.add('hidden');
    gameBoard.classList.remove('hidden');
    startGame();
}

utils.onEvent('keyup',userInput,checkWord);
utils.onEvent('click',startBtn,startGame);
utils.onEvent('load',window,copyArray);
utils.onEvent('click',restartBtn,restartGame);
utils.onEvent('click',cancelBtn,function(){
    stopSound(gameOverAudio);
    scoreBoardDetails.classList.add('hidden');
    gameBoard.classList.add('hidden');
    startGameBoard.classList.remove('hidden');
    restartValues();
})
