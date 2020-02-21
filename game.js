const nameField = document.querySelector('.game-field');
const xCount = 50;
const yCount = 50;
const cellWidth = 10;
const cellHeight = 10;

nameField.style.width = `${xCount * cellWidth}px`;
nameField.style.height = `${yCount * cellHeight}px`;



function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const createBarrier = (type, position) => {
    if (type === 1) return new Barrier(barrierShapes.first(), position);
    return new Barrier(barrierShapes.first(), position);

}

let keyDown = null;

const initListeners = (el, car) => {
    // Обработчик события keydown
    el.addEventListener('keydown',async function(event) {
        // Вычислить новые координаты, в зависимости от клавиши
        keyDown = (event.keyCode);
    });
}

let countFrameSkip = 1; // 60 / countFrameSkip
let frameSkiped = 0;
let barrierCountFrameSkip = countFrameSkip * 4;
let barrierFrameSkiped = 0;

let runPoints = 0;

let main = (field, car) => {
    if (++frameSkiped >= countFrameSkip) {
        // let barriers = [];
        if (++barrierFrameSkiped >= barrierCountFrameSkip) {
            field.manageBarriers();
            field.emergingBarrier();
            barrierFrameSkiped = 0;
        }
        car.remove(field);
        car.traffic(keyDown, field);
        keyDown = null;
        car.painting(field);
        runPoints += 1;
        let divPoints = document.getElementById('runPoints');
        divPoints.innerText = runPoints;
        frameSkiped = 0;
    }
    requestAnimationFrame(main.bind(null, field, car));
}

let car = null;
let field = null;



// альтернатива событию load
document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        car = new Car(pointsCar);
        initListeners(document, car);
        field = new Field(nameField, xCount, yCount);
        field.init();
        main(field,car);
    }
}


PlayerReady.onchange = function () {
    if (PlayerReady === "Yes") {

    }
}