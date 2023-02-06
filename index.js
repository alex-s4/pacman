var ninjaPac = document.getElementById("ninjaman").style;
var pumpky = document.getElementById("pumpky").style;
var scaredy = document.getElementById("scaredy").style;
var world = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 2, 2, 1, 0, 0, 2, 1, 0],
    [0, 2, 0, 2, 1, 1, 1, 3, 0, 0],
    [0, 2, 2, 2, 1, 2, 0, 1, 2, 0],
    [0, 2, 0, 3, 1, 0, 0, 1, 2, 0],
    [0, 2, 2, 2, 1, 1, 2, 2, 1, 0],
    [0, 2, 0, 2, 1, 2, 1, 0, 3, 0],
    [0, 2, 2, 2, 1, 2, 2, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
var elements = {
    0: "wall",
    1: "blank",
    2: "sushi",
    3: "onigiri",
    4: "pumpky",
    5: "scaredy"
};


var score = 0;
var lives = 3;
var ninjaCoordinates = { // Ninja's initial position
    x: 1,
    y: 1
}
var pumpkyCoordinates = { // Pumpky's initial position
    x: 8,
    y: 1
}
var scaredyCoordinates = { // Scaredy's initial position
    x: 8,
    y: 7
}
// var isCollidedWithPumpky = (ninjaCoordinates.x === pumpkyCoordinates.x) && (ninjaCoordinates.y === pumpkyCoordinates.y)
// var isCollidedWithScaredy = (ninjaCoordinates.x == scaredyCoordinates.x) && (ninjaCoordinates.y == scaredyCoordinates.y)


// var ninjaCurrentLocation = world[ninjaCoordinates.y][ninjaCoordinates.x];
// var pumpkyCurrentLocation = world[pumpkyCoordinates.y][pumpkyCoordinates.x];
// var scaredyCurrentLocation = world[scaredyCoordinates.y][scaredyCoordinates.x];

const createWorld = () => {
    output = "";
    for (var i = 0; i < world.length; i++) {
        output += `<div class="row">`
        for (var j = 0; j < world[i].length; j++) {
            output += `<div class="${elements[world[i][j]]}"></div>`;
        }
        output += `</div>`

    }
    output += `<p>You have ${lives} lives</p><br/><p>Score: ${score}</p>`
    document.getElementById("world").innerHTML = output;
}
createWorld();

const drawNinjaMan = () => {
    ninjaPac.left = `${ninjaCoordinates.x * 40}px`
    ninjaPac.top = `${ninjaCoordinates.y * 40}px`
}

const movePumpky = () => {
    pumpky.left = `${pumpkyCoordinates.x * 40}px`
    pumpky.top = `${pumpkyCoordinates.y * 40}px`
}

const moveScaredy = () => {
    scaredy.left = `${scaredyCoordinates.x * 40}px`
    scaredy.top = `${scaredyCoordinates.y * 40}px`
}

const moveLeftPumpky = () => {
    pumpkyCoordinates.x -= 1
    movePumpky();
}

const moveDownPumpky = () => {
    pumpkyCoordinates.y += 1
    movePumpky();
}

const moveUpPumpky = () => {
    pumpkyCoordinates.y -= 1
    movePumpky();
}

const moveRightPumpky = () => {
    pumpkyCoordinates.x += 1
    movePumpky();
}

const moveLeftScaredy = () => {
    scaredyCoordinates.x -= 1
    moveScaredy();
}

const moveDownScaredy = () => {
    scaredyCoordinates.y += 1
    moveScaredy();
}

const moveUpScaredy = () => {
    scaredyCoordinates.y -= 1
    moveScaredy();
}

const moveRightScaredy = () => {
    scaredyCoordinates.x += 1
    moveScaredy();
}

// setInterval - monsters will move depending on direction and interval (in millisecond)

// var movingPumpky = setInterval(moveLeftPumpky, 1000)

// var movingScaredy = setInterval(moveUpScaredy, 1000)  

// Execute if arrow key is pressed

document.onkeydown = function (e) {

    // isCollidedWithPumpky = (ninjaCoordinates.x === pumpkyCoordinates.x) && (ninjaCoordinates.y === pumpkyCoordinates.y);
    // isCollidedWithScaredy = (ninjaCoordinates.x == scaredyCoordinates.x) && (ninjaCoordinates.y == scaredyCoordinates.y);

    // Basic arrow movements and will not walk through walls

    if (e.key == "ArrowLeft" && world[ninjaCoordinates.y][ninjaCoordinates.x - 1] != 0) {
        ninjaCoordinates.x--
    } else if (e.key == "ArrowUp" && world[ninjaCoordinates.y - 1][ninjaCoordinates.x] != 0) {
        ninjaCoordinates.y--
    } else if (e.key == "ArrowRight" && world[ninjaCoordinates.y][ninjaCoordinates.x + 1] != 0) {
        ninjaCoordinates.x++
    } else if (e.key == "ArrowDown" && world[ninjaCoordinates.y + 1][ninjaCoordinates.x] != 0) {
        ninjaCoordinates.y++
    }
    drawNinjaMan();

    // Food will disappear if Pac eats

    if (world[ninjaCoordinates.y][ninjaCoordinates.x] == 2 || world[ninjaCoordinates.y][ninjaCoordinates.x] == 3) {
        if (world[ninjaCoordinates.y][ninjaCoordinates.x] == 2) { score += 10 }
        else if (world[ninjaCoordinates.y][ninjaCoordinates.x] == 3) { score += 5 }
        world[ninjaCoordinates.y][ninjaCoordinates.x] = 1
        createWorld();
    }


    // Life will decrement when collide by a monster (WORK IN PROGRESS)

    if ((ninjaCoordinates.x === pumpkyCoordinates.x && ninjaCoordinates.y === pumpkyCoordinates.y) || (ninjaCoordinates.x == scaredyCoordinates.x && ninjaCoordinates.y == scaredyCoordinates.y)) {
        lives--
        createWorld();
        if (lives < 0) {
            alert("You have died!")
            window.location.reload();
        }
    }

    // if ( isCollidedWithPumpky || isCollidedWithScaredy ){   
    //     lives--
    //     createWorld();
    //     if (lives<0) {
    //         alert("You have died!")
    //         window.location.reload();
    //     }
    // }

}