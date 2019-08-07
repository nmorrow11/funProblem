function handFormationChange(n, a, formations) {
    // Write your code here
    let playerChoice ='X';
    let playerPosition = a;
    let winners = [];
    let newChoice;
    let change = -1;
    let playersInGame = addPlayer(n,a,formations)
    //if the players current choice is already winning they are added into the winners array (next round)
    const alreadyWinning = function(playerChoice){
        winners.push(playerChoice);
        playerPosition = winners.length -1;
    }
    //if the player needs to change his pick to win this function documents that and adds one to the change count
    const changeToWin = function(newChoice){
        winners.push(newChoice);
        playerChoice = newChoice;
        playerPosition = winners.length -1;
        change++;
    }

    while(playersInGame.length > 1) {
        for(let i = 0; i < playersInGame.length; i+=2) {
            if(i === playerPosition) {
                newChoice = getWinningPlay(playersInGame[i + 1]) || playerChoice;
                if(newChoice === playerChoice){
                    alreadyWinning(playerChoice);
                } else {
                    changeToWin(newChoice);
                }
            } else if(i + 1 === playerPosition) {
                newChoice = getWinningPlay(playersInGame[i]);
                if(newChoice === playerChoice){
                    alreadyWinning(playerChoice);
                } else {
                  changeToWin(newChoice);
                }
            } else {
                if(playersInGame[i] === playersInGame[i + 1]) {
                    continue;
                }
                if(detectWinner(playersInGame[i], playersInGame[i + 1])) {
                    winners.push(playersInGame[i]);
                } else {
                    winners.push(playersInGame[i+1]);
                }
            }
        }
        playersInGame = winners;
        winners = [];
    }
    return change;
}
//this function detects who is winning and returns true if player 1 wins and false otherwise
function detectWinner(player1, player2) {
    const player1Wins = ['RS', 'PR', 'SP']
    if(player1Wins.includes(player1.concat(player2)) || (!player2)) {
        return 1;
    }
    return 0;
}
//this functions returns the choice needed to win vs another player
function getWinningPlay(char) {
    const winnerGuide = {
        P: 'S',
        R: 'P',
        S: 'R',
    };
    return winnerGuide[char];
}
//this function adds the player into the tournament at the proper spot for some reason array.slice was not compiling 
function addPlayer(total, index, arr) {
  let players = [];
  for(let i = 0; i < total; i++) {
    if(i === index) {
        players.push('X');
      }
      if (arr[i]){
        players.push(arr[i]);
      }
  }
  return players;
}

function minimumMoves(a, m) {
    // Write your code here
    let count = 0;
    for(let i = 0; i < a.length; i++) {
        let andreaNum = a[i];
        let mariaNum = m[i];
        while(andreaNum !== mariaNum) {
            count += Math.abs(andreaNum % 10 - mariaNum % 10);
            andreaNum = Math.floor(andreaNum / 10);
            mariaNum = Math.floor(mariaNum / 10);
        }
    }
    return count;
}

function minimumSteps(loggedMoves) {
    // Write your code here
    let count = 0; 
    for(let i = 0; i < loggedMoves.length; i++) {
        if(loggedMoves[i].startsWith('..')){
            count--;
        } else if(loggedMoves[i].startsWith('.')) {
            continue;
        } else {
            count++;
        }
    }
  return count;
}