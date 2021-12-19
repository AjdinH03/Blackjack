
const playerCards = document.querySelector('#player-cards');
const dealerCards = document.querySelector('#dealer-cards');
const newGame = document.querySelector('#new-game');
const playerValue = document.querySelector('#player-hand');
const dealerValue = document.querySelector('#dealer-hand');
const status = document.querySelector('#status');
const hit = document.querySelector('#hit');
const stay1 = document.querySelector('#stay');

hit.style.display = "none"
stay1.style.display = "none";


var deck = [2,3,4,5,6,7,8,9,10,11,
            2,3,4,5,6,7,8,9,10,11,
            2,3,4,5,6,7,8,9,10,11,
            2,3,4,5,6,7,8,9,10,11,];

var playerHand;
var dealerHand;

function drawRandomCard(deck){
    var randomCard = Math.floor(deck.length * Math.random());
    return deck[randomCard];
}

function startGame(){
    playerHand = [drawRandomCard(deck), drawRandomCard(deck)];
    dealerHand = [drawRandomCard(deck), drawRandomCard(deck)];

}

function getHandValue(hand){
    var sum = 0;
    for(var i=0; i < hand.length; i++){
        sum += hand[i];
    }
    return sum;
}


startGame();

newGame.addEventListener('click', function(){
    newGame.style.display = "none"
    hit.style.display = "inline-block";
    stay1.style.display = "inline-block";
    playerCards.innerHTML = playerCards.textContent + " " + playerHand;
    dealerCards.innerHTML = dealerCards.textContent + " " + dealerHand;

    playerValue.innerHTML = playerValue.textContent + " " + getHandValue(playerHand);
    dealerValue.innerHTML = dealerValue.textContent + " " + getHandValue(dealerHand);
    hit.addEventListener('click', function(){
        playerHand.push(drawRandomCard(deck));
        playerCards.innerHTML = playerHand;
        playerValue.innerHTML = "Player hand:" + " " + getHandValue(playerHand);
        checkPlayerStatus();
        checkDealerStatus();
        
    })
});

stay1.addEventListener('click', function(){
    stay();
});

function checkPlayerStatus(){
    if(getHandValue(playerHand) > 21){
        status.innerHTML = "BUST!"
        hit.style.display = "none";
        newGame.style.display = "inline-block";
    }else if (getHandValue(playerHand) === 21){
        status.innerHTML = "YOU WIN! BLACKJACK!";
        hit.style.display = "none";
        newGame.style.display = "inline-block";
    }else if (getHandValue(playerHand) === getHandValue(dealerHand)){
        status.innerHTML = "SPLIT!";
        hit.style.display = "none";
        newGame.style.display = "inline-block";
    }


}

function checkDealerStatus(){
    if(getHandValue(dealerHand) < 17){
        dealerHand.push(drawRandomCard(deck));
        dealerCards.innerHTML = dealerHand;
        dealerValue.innerHTML = "Dealer hand:" + " " + getHandValue(dealerHand);
    }

    if(getHandValue(dealerHand) > 21){
        status.innerHTML = "DEALER BUST, YOU WIN!";
        hit.style.display = "none";
        newGame.style.display = "inline-block";
    }else if (getHandValue(playerHand) > getHandValue(dealerHand) && getHandValue(playerHand) < 21 && getHandValue(dealerHand) > 16){
        status.innerHTML = "YOU WIN!";
        hit.style.display = "none";
        newGame.style.display = "inline-block";
    }
}

reset.addEventListener('click', function(){
    location.reload();
});

function stay(){
    checkDealerStatus();
    checkPlayerStatus();
}








