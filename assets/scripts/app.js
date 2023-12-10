'use strict';

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
const scoreBoardDate = utils.selectObject('.date');
const scoreBoardPoints = utils.selectObject('.points');
const scoreBoardPercentage = utils.selectObject('.percentage');
const startGameBoard = utils.selectObject('.start-game-board');
const gameBoard = utils.selectObject('.game-board');
const scoreBoardDetails = utils.selectObject('.score-board-details')
const restartBtn = utils.selectObject('.restart-btn');
const cancelBtn = utils.selectObject('.cancel-btn');
const highScoreTableBoard = utils.selectObject('.high-scores-board');
const highScoreTable = utils.selectObject('.high-scores-table');
const highScoresTableBtn = utils.selectObject('.high-scores-table-btn');
const wordCount = utils.selectObject('.word-count');
const hsRestartButton = utils.selectObject('.hs-restart-btn');
const hsCancelButton = utils.selectObject('.hs-cancel-btn');
const gameRestartButton = utils.selectObject('.game-restart-btn');
const hsStartTableBtn = utils.selectObject('.hs-table-btn');
const noScoreMessage = utils.selectObject('.no-score-message');
let scoreList=[]
let gameAudio = new Audio('./assets/media/game-music.mp3');
let gameOverAudio = new Audio('./assets/media/game-over.mp3');
let count = 20;
let timerId;
let points = 0;
let gameWords;


function checkWord(){
    if(wordsBoard.value===(userInput.value).toLowerCase()){
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

function showScoreTable(div,prevWindow) {
    div.classList.add('hidden');
    highScoreTableBoard.classList.remove('hidden');
    if(prevWindow === 'start-game'){
        hsRestartButton.classList.add('hidden');
        hsCancelButton.classList.add('margin-right-button-alone')   
    }
    else{
        hsRestartButton.classList.remove('hidden');
        hsCancelButton.classList.add('margin-right-button-alone-pair')   
    }
    showHighScores();
}

function showHighScores() {
    highScoreTable.innerHTML="";
    createTableTitles();
    if(localStorage.length>0){
        noScoreMessage.textContent="";
        scoreList=JSON.parse(localStorage.getItem('array'));
        scoreList.forEach(scoreObjt => {
            if(scoreList.indexOf(scoreObjt)<9){
                const singleScore = document.createElement('tr');
                const number = document.createElement('td');
                const highScore = document.createElement('td');
                const percentage = document.createElement('td');
                utils.addClassToItems(number,'gradient-color-text')
                number.textContent=`${scoreList.indexOf(scoreObjt)+1}`;
                highScore.textContent =`${scoreObjt.score} pts`;
                percentage.textContent = `${scoreObjt.percentage}%`;
                utils.addChildToElement(singleScore,number,highScore,percentage);
                utils.addChildToElement(highScoreTable,singleScore);
            }
        });
    }
    else{
        noScoreMessage.textContent='No scores available';
    }
}

function createTableTitles() {
    const tableTitles = document.createElement('tr');
    const numberTitle = document.createElement('th');
    const highScoreTitle = document.createElement('th');
    const percentageTitle = document.createElement('th');
    utils.addClassToItems(numberTitle,'gradient-color-text');
    utils.addClassToItems(highScoreTitle,'gradient-color-text');
    utils.addClassToItems(percentageTitle,'gradient-color-text');
    numberTitle.textContent='#';
    highScoreTitle.textContent='Score';
    percentageTitle.textContent='Percentage';
    utils.addChildToElement(tableTitles,numberTitle,highScoreTitle,percentageTitle);
    utils.addChildToElement(highScoreTable,tableTitles);
}

function showScoreBoard(userWin) {
    gameBoard.classList.add('hidden');
    scoreBoardDetails.classList.remove('hidden');
    if(userWin){
        message.classList.add('green');
        message.textContent='!Congratulations, You Win';
    }else{
        message.classList.add('red');
        message.textContent= 'Game Over';
    }

    const scoreObjt = {
        date:(new Date).toDateString(),
        score:points,
        percentage:parseInt((points*100)/120),
    }
    scoreBoardDate.textContent =`${scoreObjt.date}`;
    scoreBoardPoints.textContent = `${scoreObjt.score} words`;
    scoreBoardPercentage.textContent = `${scoreObjt.percentage} %`;
    if(scoreList.length<15){
        removeScores();
    }
    saveScore(scoreObjt);
}
 
function saveScore(scoreObj){
    if(localStorage.length>0){
        scoreList=JSON.parse(localStorage.getItem('array'));
        scoreList.push(scoreObj);
        scoreList.sort((a,b) => {
            if ( a.score > b.score )return -1;
            if ( a.score < b.score )return 1;
            return 0;
          });
        localStorage.setItem('array',JSON.stringify(scoreList));
    }else{
        scoreList.push(scoreObj);
        localStorage.setItem('array',JSON.stringify(scoreList));
    }
}

function removeScores(){
    scoreList.pop();
}

function restartValues(){
    stopSound(gameOverAudio);
    stopSound(gameAudio);
    clearInterval(timerId);
    count = 20;
    points = 0;
    copyArray();
    clock.textContent=count;
    wordCount.textContent='0';
    pointsBoard.textContent=points;
    clock.classList.remove('fadeInOut');
    clock.classList.remove('red');
    userInput.value = '';
    if(message.classList.contains('red')){
        message.classList.remove('red');
    }else{
        message.classList.remove('green');
    }

}

function restartGame(divBoard) {
    restartValues();
    divBoard.classList.add('hidden');
    gameBoard.classList.remove('hidden');
    startGame();
}

function cancelGame(divBoard){
    stopSound(gameOverAudio);
    divBoard.classList.add('hidden');
    gameBoard.classList.add('hidden');
    startGameBoard.classList.remove('hidden');
    restartValues();
}

utils.onEvent('keyup',userInput,checkWord);
utils.onEvent('click',startBtn,startGame);
utils.onEvent('load',window,copyArray);
utils.onEvent('click',restartBtn,()=>{
    restartGame(scoreBoardDetails);
});

utils.onEvent('click',gameRestartButton,()=>{
    restartGame(gameBoard);
});

utils.onEvent('click',hsRestartButton,()=>{
    restartGame(highScoreTableBoard)
});
utils.onEvent('click',cancelBtn,()=>{
    cancelGame(scoreBoardDetails);
});

utils.onEvent('click',hsCancelButton,()=>{
    cancelGame(highScoreTableBoard)
});

utils.onEvent('click',highScoresTableBtn,()=>{
    showScoreTable(scoreBoardDetails,'score-table');
});

utils.onEvent('click',hsStartTableBtn,()=>{
    showScoreTable(startGameBoard,'start-game');
});
