
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
        let xCount = 10;  
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
        let xCount = 10; 
        // Удаление машины по координатам
        let cells = field.getCells();
        for (let i = 0; i < this.points.length; i++) {
        const index = xCount * this.points[i][1] + this.points[i][0];
        cells[index].classList.remove('car');
        }
    }
    

   
   //выход за границы дороги 
    borderCheck()
    {
        for (let i = 0; i < this.points.length; i++)
        {
            if (this.points[i][0] < 0)
            {
                this.points[i][0] = this.points[i][0] + 2;
            }
            else if (this.points[i][0] > 9) 
            {
                this.points[i][0] = this.points[i][0] - 2;
            }
            else if ((this.points[i][1] < 0))
            {
                this.points[i][1] = this.points[i][1] + 2;
            }
            else if (this.points[i][1] > 9) 
            {
                this.points[i][1] = this.points[i][1] - 2;
            }
        }
    }
 //проверка на барьер 
 //возращаем в начало при сталновении с барьером 
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
        this.borderCheck();
        this.barrierCheck(field);
        // Нарисовать машину
        this.painting(field);
   }
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
        const countX = 10;
        // Закраска
        let cells = field.getCells();
        for (let i = 0; i < this.points.length; i++)
        {
            let x = this.points[i][0];
            let y = this.points[i][1];

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
            if ((x >= 10) || (y >= 10) || (x < 0) || (y < 0))
            {
                stringError = "X = " + x + ", Y = " + y + ". Range is (0; 10)";
                throw new RangeError(stringError, "index.js", 28);
            }
    
            let index = countX * y + x;
        
            cells[index].classList.add('barrier');
        }
        
    }
    

}


let pointsCar = [[4,8], [4, 9], [5,8], [5,9]];
let car = new Car(pointsCar);

const nameField = document.querySelector('.game-field');
const xCount = 10;
const yCount = 10;
let field = new Field(nameField, xCount, yCount);

// Размеры поля
const fieldWidth = 1000;
const fieldHeight = 900;
let isRunning = true;

let keyDown = null;



function main()
{
    try {
        field.painting();

        let points = [[0,2], [1,2], [0,3]];
        let barrier = new Barrier(points);
        barrier.painting(field);

        let point2 = [[4,2], [5,2]];
        let barrier2 = new Barrier(point2);
        barrier2.painting(field);

        
        let point3 = [[2,5], [2,6], [2,7], [1,8], [1,9],[0,10]];
        let barrier3 = new Barrier(point3);
        barrier3.painting(field);

        
        

        car.painting(field);
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