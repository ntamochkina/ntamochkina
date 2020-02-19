const nameField = document.querySelector('.game-field');
const xCount = 50;
const yCount = 50;
const cellWidth = 10;
const cellHeight = 10;

nameField.style.width = `${xCount * cellWidth}px`;
nameField.style.height = `${yCount * cellHeight}px`;

class Field
{

    cells = [];
    barriers = [];

    constructor(nameField, xCount, yCount) {
        this.nameField = nameField;
        this.xCount = xCount;
        this.yCount = yCount;
    }

    painting()
    {
        for (let i = 0; i < yCount; i++)
        {
            for (let k = 0; k < xCount; k++)
            {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.style.width = `${cellWidth}px`;
                cell.style.height = `${cellHeight}px`;
                this.cells.push(cell);
                this.nameField.appendChild(cell);
            }
        }
    }

    getCells() {
        return this.cells;
    }

    getXCount() {
        return this.xCount;
    }

    getYCount() {
        return this.yCount;
    }

    // Управление движением барьера 
    manageBarriers() {
        
        // Cравнить длину с каким то числом 
            let a = 5 - this.barriers.length;
            let b = getRandomInRange(0, a);
            for (let i = 0; i < a; i++) {
                this.barriers.push(createBarrier(getRandomInRange(1,5)));
            }
        this.barriers = this.barriers.filter((barrier) => !barrier.isFullOutside(this));
    }

    // Появление барьера 
    emergingBarrier() {
        if (this.barriers.length === 0) return;

        for (let i = 0; i < this.barriers.length; i++) {
            this.barriers[i].barrierMovement(this);
            this.barriers[i].painting(this);
        }
    }
}

function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
  

class Barrier 
{
    constructor(points) {
        this.points = points;
    }

    painting(field) 
    {
        // Обработка исключения: к нам пришел не массив точек
        if (!((typeof(this.points)) === "object")) {
            stringError = "Type of points: " + type_points + ", expected object.";
            throw new TypeError(stringError);
        }
        // Количество строк
        const countX = field.getXCount();
        const countY = field.getYCount();
        // Закраска
        let cells = field.getCells();
        for (let i = 0; i < this.points.length; i++)
        {
            let x = this.points[i][0];
            let y = this.points[i][1];
            if (y >= yCount) continue;
            if (y < 0) continue;

            // Обработка исключения: к нам пришло не число x
            if (!((typeof(x)) === "number")) {
                stringError = "Type of x: " + typeX + ", expected number.";
                throw new TypeError(stringError);
            }
        
            // Обработка исключения: к нам пришло не число y
            if (!((typeof(y)) === "number")) 
            {
                stringError = "Type of y: " + typeY + ", expected number."; 
                throw new TypeError(stringError);
            }
        
            // Обработка исключения: число выходит за диапозон
            if ((x >= xCount) || (y >= yCount) || (x < 0) || (y < 0))
            {
                let stringError = "X = " + x + ", Y = " + y + ". Range is (0; 10)";
                throw new RangeError(stringError, "index.js", 28);
            }
    
            let index = countX * y + x;
        
            cells[index].classList.add('barrier');
        }
  
    }

    remove(field)
    {
        // Количество строк
        let xCount = field.getXCount(); 
        // Удаление машины по координатам
        let cells = field.getCells();
        for (let i = 0; i < this.points.length; i++) {
            const index = xCount * this.points[i][1] + this.points[i][0];
            if (index >= 0 && index < yCount*xCount) cells[index].classList.remove('barrier');
        }
    }


    // Проверка на достижение стены
    reachingTheWall(field){
        for (let i = 0; i < this.points.length; i++)
        if (this.points[i][1] >= yCount) 
            {
                this.points[i][1] = this.points[i][1] - Math.sqrt(this.points.length);
              
                this.remove(field);
            }
    }

    // Движение барьера 
    barrierMovement (field) {

        this.remove(field);
        for (let i = 0; i < this.points.length; i++) {
            this.points[i][1] = this.points[i][1] + 1;
        }
        this.painting(field);
        
    }

  

    // Проверка выхода за пределы поля
    isFullOutside(field) {
        return this.points.every((point) => point[1] > yCount)
    }

}
let pointsCar = [
    [1, 1], [0, 2], [1, 2], [1, 3],
    [2, 0], [2, 1], [2, 2], [2, 3],
    [2, 4], [2, 5], [2, 6], 
    [3, 0], [3, 1], [3, 2], [3, 3],
    [3, 4], [3, 5], [3, 6], [3, 7],
    [4, 0], [4, 1], [4, 2], [4, 3],
    [4, 4], [4, 5], [4, 6], [4, 7],
    [5, 0], [5, 1], [5, 2], [5, 3],
    [5, 4], [5, 5], [5, 6], [5, 7],
    [6, 0], [6, 1], [6, 2], [6, 3],
    [6, 4], [6, 5], [6, 6], [6, 7],
    [7, 0], [7, 1], [7, 2], [7, 3],
    [7, 4], [7, 5], [7, 6], 
    [8, 1], [8, 2], [9, 2], [8, 3],
    [8, 4], [8, 5], 
];


const barrierShapes = {
    first: () => {
        return [
            [4, -8], [5, -8], [6, -8], [7, -8],
            [0, -8], [1, -8], [2, -8], [3, -8],

            [4, -7], [5, -7], [6, -7], [7, -7], 
            [0, -7], [1, -7], [2, -7], [3, -7],

            [4, -6], [5, -6], [6, -6], [7, -6], 
            [0, -6], [1, -6], [2, -6], [3, -6], 

            [4, -5], [5, -5], [6, -5], [7, -5], 
            [0, -5], [1, -5], [2, -5], [3, -5],

            [4, -4], [5, -4], [6, -4], [7, -4], 
            [0, -4], [1, -4], [2, -4], [3, -4], 

            [4, -3], [5, -3], [6, -3], [7, -3], 
            [0, -3], [1, -3], [2, -3], [3, -3], 

            [4, -2], [5, -2], [6, -2], [7, -2], 
            [0, -2], [1, -2], [2, -2], [3, -2],

            [4, -1], [5, -1], [6, -1], [7, -1], 
            [0, -1], [1, -1], [2, -1], [3, -1],

            [4, 0],  [5, 0],  [6, 0],  [7, 0],
            [0, 0],  [1, 0],  [2, 0],  [3, 0]
        ];
    },
    second: () => {
        return [
            [24, -8], [25, -8], [26, -8], [27, -8],
            [20, -8], [21, -8], [22, -8], [23, -8],

            [24, -7], [25, -7], [26, -7], [27, -7], 
            [20, -7], [21, -7], [22, -7], [23, -7],

            [24, -6], [25, -6], [26, -6], [27, -6], 
            [20, -6], [21, -6], [22, -6], [23, -6], 

            [24, -5], [25, -5], [26, -5], [27, -5], 
            [20, -5], [21, -5], [22, -5], [23, -5],

            [24, -4], [25, -4], [26, -4], [27, -4], 
            [20, -4], [21, -4], [22, -4], [23, -4], 

            [24, -3], [25, -3], [26, -3], [27, -3], 
            [20, -3], [21, -3], [22, -3], [23, -3], 

            [24, -2], [25, -2], [26, -2], [27, -2], 
            [20, -2], [21, -2], [22, -2], [23, -2],

            [24, -1], [25, -1], [26, -1], [27, -1], 
            [20, -1], [21, -1], [22, -1], [23, -1],

            [24, 0],  [25, 0],  [26, 0],  [27, 0],
            [20, 0],  [21, 0],  [22, 0],  [23, 0]];
    },
    third: () =>{
        return [[42, -6],[43, -6] ,[44, -6] ,[45, -6],[46, -6],[47, -6],[48, -6],[49, -6],
        [42, -5],[43, -5] ,[44, -5] ,[45, -5],[46, -5],[97, -5],[48, -5],[49, -5],
        [48, -4],[49, -4] ,[40, -4] ,[41, -4],[42, -4],[93, -4],[44, -4],[45, -4],
        [48, -3],[49, -3] ,[40, -3] ,[41, -3],[42, -3],[93, -3],[44, -3],[45, -3],
        [48, -2],[49, -2] ,[40, -2] ,[41, -2],[42, -2],[93, -2],[44, -2],[45, -2],
        [48, -1],[49, -1] ,[40, -1] ,[41, -1],[42, -1],[93, -1],[44, -1],[45, -1],
        [48, 0],[49, 0] ,[40, 0] ,[41, 0],[92, 0],[43, 0],[44, 0],[45, 0]
        ];
    },
    fourth:() =>{
        return [
        [9, -3], [10, -3],[11, -3],[12, -3],[13, -3],[14, -3],[15, -3],[16, -3],[17, -3],
        [9, -2], [10, -2],[11, -2],[12, -2],[13, -2],[14, -2],[15, -2],[16, -2],[17, -2],
        [9, -1], [10, -1],[11, -1],[12, -1],[13, -1],[14, -1],[15, -1],[16, -1],[17, -1],
        [9, 0],  [10, 0], [ 11, 0],[12, 0], [13, 0], [14, 0], [15, 0], [16, 0], [17, 0]
        ];
    },
    fifth:() =>{
        return [
        [10, -3],[11, -3],[12, -3],[13, -3],[14, -3],[15, -3], 
        [10, -2],[1, -2], [12, -2],[13, -2],[14, -2],[15, -2],   
        [10, -1],[11, -1],[12, -1],[13, -1],[14, -1],[15, -1],   
        [10, 0], [11, 0], [12, 0], [13, 0], [14, 0],[15, 0]    
        ];
    }
};

const createBarrier = (type) => {
        if (type == 1)  return new Barrier(barrierShapes.first());
        else if (type == 2) return new Barrier(barrierShapes.second());
        else if (type == 3) return new Barrier(barrierShapes.third());
        else if (type == 4) return new Barrier(barrierShapes.fourth());
         else if (type == 5) return new Barrier(barrierShapes.fifth());
        return null;
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Обработчик события keydown
document.addEventListener('keydown',async function(event) {
    // Вычислить новые координаты, в зависимости от клавиши
    let keyDown = (event.keyCode);
    // 
    
   await sleep(300);
   car.traffic(keyDown, field);
});

const countFrameSkip = 10; // 60 / countFrameSkip
let frameSkiped = 0;

let main = (field, car) => {
    if (++frameSkiped >= countFrameSkip) {
        // let barriers = [];
        field.manageBarriers();
        field.emergingBarrier();
        car.remove(field);
        car.barrierCheck(field);
        car.painting(field);
        frameSkiped = 0;
    }
    if (true) requestAnimationFrame(main.bind(null, field, car));
}


// альтернатива событию load
document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        let car = new Car(pointsCar);
        let field = new Field(nameField, xCount, yCount);

        field.painting();
        car.painting(field);
        main(field, car);
    }
}