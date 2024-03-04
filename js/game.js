let canvas;
let world; 
let keyboard = new Keyboard();

function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function startGame(){
    document.getElementById('startImage').style = "display: none";
    document.getElementById('startGameButton').style = "display: none";
}

window.addEventListener("keydown", (e) =>{
    if(e.keyCode == 39){
        keyboard.RIGHT = true;
    }
    if(e.keyCode == 37){
        keyboard.LEFT = true;
    }
    if(e.keyCode == 38){
        keyboard.UP = true;
    }
    if(e.keyCode == 40){
        keyboard.DOWN = true;
    }
    if(e.keyCode == 32){
        keyboard.SPACE = true;
    }
    if(e.keyCode == 68){
        keyboard.D = true;
    }

});

window.addEventListener("keyup", (e) =>{
    if(e.keyCode == 39){
        keyboard.RIGHT = false;
    }
    if(e.keyCode == 37){
        keyboard.LEFT = false;
    }
    if(e.keyCode == 38){
        keyboard.UP = false;
    }
    if(e.keyCode == 40){
        keyboard.DOWN = false;
    }
    if(e.keyCode == 32){
        keyboard.SPACE = false;
    }
    if(e.keyCode == 68){
        keyboard.D = false;
    }
    
});

function lostGame() {
    //document.getElementById('endScreenLost').classList.remove('d-none');
    //document.getElementById('lostImage').classList.remove('d-none');
    //document.getElementById('replayImage').classList.remove('d-none');
}

function replay(){
    startGame();
    document.getElementById('endScreenLost').classList.add('d-none');
    document.getElementById('lostImage').classList.add('d-none');
    document.getElementById('replayImage').classList.add('d-none');

}

function showControls(){
    document.getElementById('controller').classList.remove('d-none');
}

function closeControls(){
    document.getElementById('controller').classList.add('d-none');
}