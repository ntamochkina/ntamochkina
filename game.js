
class Field
{

    cells = [];

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

    //управление движением барьера 
    manageBarriers() {
        if (barriers.length === 0) { 

            barriers.push(createBarrier('first'));
            barriers.push(createBarrier('second'));
            barriers = barriers.filter((barrier) => !barrier.isFullOutside(field));
           
    }

    }

    //появление барьера 
    emergingBarrier(){
        if (barriers.length === 0) return;

        for (let i = 0; i < barriers.length; i++) {
            barriers[i].barrierMovement(field);
            barriers[i].painting(field);
        }
    }
}

class Car 
{
    
    constructor (points)
    {
        this.points = points;
        this.startPoints = JSON.parse(JSON.stringify(points));
    }    

    // Функция отрисовки машины
    painting(field)
    {
        // Количество строк
        let xCount = field.getXCount();  
        // Отрисовка машины по координатам
        let cells = field.getCells();
        for (let i = 0; i < this.points.length; i++) {
        const index = xCount * this.points[i][1] + this.points[i][0];
        cells[index].classList.add('car');
        }
    }

    // Функция удаления машины
    remove(field)
    {
        // Количество строк
        let xCount = field.getXCount(); 
        // Удаление машины по координатам
        let cells = field.getCells();
        for (let i = 0; i < this.points.length; i++) {
        const index = xCount * this.points[i][1] + this.points[i][0];
        cells[index].classList.remove('car');
        }
    }

    borderCheck(field)
    {
        const xCount = field.getXCount();
        const yCount = field.getYCount();
        let carLenght = Math.sqrt(this.points.length);
        for (let i = 0; i < this.points.length; i++)
        {
            if (this.points[i][0] < 0)
            {
                this.points[i][0] = this.points[i][0] + carLenght;
            }
            else if (this.points[i][0] >= xCount) 
            {
                this.points[i][0] = this.points[i][0] - carLenght;
            }
            else if ((this.points[i][1] < 0))
            {
                this.points[i][1] = this.points[i][1] + carLenght;
            }
            else if (this.points[i][1] >= yCount) 
            {
                this.points[i][1] = this.points[i][1] - carLenght;
            }
        }
    }

    barrierCheck(field)
    {
        let cells = field.getCells();
        for (let i=0; i < this.points.length; i++)
        {
            let point = field.getXCount() * this.points[i][1] + this.points[i][0];
            let isBarrier = cells[point].classList.contains('barrier');
            if (isBarrier) {
                this.points = JSON.parse(JSON.stringify(this.startPoints));
                return;
            }
        }
    }
    
    traffic(keyDown, field) 
    {
        // Удалить машину
        this.remove(field);
        // Вычислить новые координаты, в зависимости от клавиши
        switch(keyDown)
        {
        // Право
            case 39: {
                for (let i = 0; i < this.points.length; i++) {
                    this.points[i][0] = this.points[i][0] + 1;
                }
                break; 
            }
        // Лево
            case 37: {
                for (let i = 0; i < this.points.length; i++) {
                    this.points[i][0] = this.points[i][0] - 1;
                }
                break; 
            }
        // Вверх
            case 38: {
                for (let i = 0; i < this.points.length; i++) {
                    this.points[i][1] = this.points[i][1] - 1;
                }
                break; 
            }
        // Вниз
            case 40: {
                for (let i = 0; i < this.points.length; i++) {
                    this.points[i][1] = this.points[i][1] + 1;
                }
                break; 
            }
        }
        this.borderCheck(field);
        this.barrierCheck(field);
        // Нарисовать машину
        this.painting(field);
   }
}
let barriers = [];

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


    // проверка на достижение стены
    reachingTheWall(field){
        for (let i = 0; i < this.points.length; i++)
        if (this.points[i][1] >= yCount) 
            {
                this.points[i][1] = this.points[i][1] - Math.sqrt(this.points.length);
                //this.removeLineByLine(field);
                this.remove(field);
            }
    }

    //движение барьера 
    barrierMovement (field) {

        this.remove(field);
        for (let i = 0; i < this.points.length; i++) {
            this.points[i][1] = this.points[i][1] + 1;
        }
        // this.reachingTheWall(field);
        this.painting(field);
        
    }

  

//проверка выхода за пределы поля
   isFullOutside(field) {
        return this.points.every((point) => point[1] > yCount)
   }

}



let pointsCar = [[10, 1], [9, 2],[10, 2], [10, 3], 
                 [10, 4], [10, 5], [10, 6], 
                 [11, 0], [11, 1], [11, 2], [11, 3], 
                 [11, 4], [11, 5], [11, 6], [11, 7], 
                 [12, 0], [12, 1], [12, 2], [12, 3], 
                 [12, 4], [12, 5], [12, 6], [12, 7], 
                 [13, 0], [13, 1], [13, 2], [13, 3],
                 [13, 4], [13, 5], [13, 6], [13, 7], 
                 [14, 0], [14, 1], [14, 2], [14, 3], 
                 [14, 4], [14, 5], [14, 6], [14, 7], 
                 [15, 0], [15, 1], [15, 2], [15, 3], 
                 [15, 4], [15, 5], [15, 6], [15, 7], 
                 [16, 0], [16, 1], [16, 2], [16, 3], 
                 [16, 4], [16, 5], [16, 6], [16, 7], 
                 [17, 1], [17, 2], [17, 3], 
                 [17, 4], [17, 5], [17, 6], [18,2]];
let car = new Car(pointsCar);

const nameField = document.querySelector('.game-field');
const xCount = 100;
const yCount = 100;
let field = new Field(nameField, xCount, yCount);




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
            [40,0], [40, -1], [40, -2], [40, -3], [40, -4],[40, -5],[40, -6],[40, -7],
                     [41,0], [41, -1], [41, -2], [41, -3], [41, -4],[41, -5],[41, -6],[41, -7],
                     [42,0], [42, -1], [42, -2], [42, -3], [42, -4],[42, -5],[42, -6],[42, -7],
                     [43,0], [43, -1], [43, -2], [43, -3], [43, -4],[43, -5],[43, -6],[43, -7],
                     [44,0], [44, -1], [44, -2], [44, -3], [44, -4],[44, -5],[44, -6],[44, -7],
                                                                [45, -5],[45, -6],[45, -7],
                                                                [46, -5],[46, -6],[46, -7],
                                                                [47, -5],[47, -6],[47, -7],
                                                                [48, -5],[48, -6],[48, -7],
                                                                [49, -5],[49, -6],[49, -7]
         ];
    }
};



const createBarrier = (type) => {
        if ('first')  {
        return new Barrier(barrierShapes.first());
        }
        else 
        if ('second') {
        return new Barrier(barrierShapes.second());
        }
        return null;
}

let barrierPoints3 =  [ [92, 1],[93, 1] ,[94, 1] ,[95, 1],[96, 1],[97, 1],[98, 1],[99, 1],
                        [92, 2],[93, 2] ,[94, 2] ,[95, 2],[96, 2],[97, 2],[98, 2],[99, 2],
                        [88, 3],[89, 3] ,[90, 3] ,[91, 3],[92, 3],[93, 3],[94, 3],[95, 3],
                        [88, 4],[89, 4] ,[90, 4] ,[91, 4],[92, 4],[93, 4],[94, 4],[95, 4],
                        [88, 5],[89, 5] ,[90, 5] ,[91, 5],[92, 5],[93, 5],[94, 5],[95, 5],
                        [88, 6],[89, 6] ,[90, 6] ,[91, 6],[92, 6],[93, 6],[94, 6],[95, 6],
                        [88, 7],[89, 7] ,[90, 7] ,[91, 7],[92, 7],[93, 7],[94, 7],[95, 7]];      
let barrier3 = new Barrier(barrierPoints3);




let isRunning = true;

let keyDown = null;



function main()
{
    try {
        field.painting();
        car.painting(field);
        barrier.painting(field);
        barrier2.painting(field);   
        barrier3.painting(field); 
    } catch (e) {    
        // Вывод ошибок в консоль           
        console.log(e.stack);                
        return;
    }
}


main();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Обработчик события keydown
document.addEventListener('keydown',async function(event) {
    // Вычислить новые координаты, в зависимости от клавиши
    keyDown = (event.keyCode);
    // 
    if (isRunning) 
    {
        await sleep(300);
    }
    car.traffic(keyDown, field);
});



const countFrameSkip = 10; // 60 / countFrameSkip
let frameSkiped = 0;

function test() {
    if (++frameSkiped >= countFrameSkip) {
       // let barriers = [];
       field.manageBarriers();
       field.emergingBarrier();
        car.remove(field);
        car.barrierCheck(field);
        car.painting(field);
        frameSkiped = 0;
    }
    if (isRunning) requestAnimationFrame(test);
}

test();