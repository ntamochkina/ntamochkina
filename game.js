
// Размеры поля
const fieldWidth = 1000;
const fieldHeight = 900;

// Поле идентифицируется по ид блока в верстке
const field = document.querySelector('.game-field');
// Массив клеток
const cells = [];
let key_down = null;
let pointsCar = [[4,0], [4, 1], [5,0], [5,1]];

function painting(){
    for (let i = 0; i < 10; i++)
    {
        for (let k = 0; k < 10; k++)
        {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cells.push(cell);
            field.appendChild(cell);
        }
    }
}

// Закраска барьера
function barrierPainting(points) {
    // Обработка исключения: к нам пришел не массив точек
    if (!((type_points = typeof(points)) === "object")) {
        stringError = "Type of points: " + type_points + ", expected object.";
        throw new TypeError(stringError);
    }
    // Количество строк
    const countX = 10;
    // Закраска
    for (let i = 0; i < points.length; i++)
    {
        let x = points[i][0];
        let y = points[i][1];

        // Обработка исключения: к нам пришло не число x
        if (!((typeX = typeof(x)) === "number")) {
            stringError = "Type of x: " + typeX + ", expected number.";
            throw new TypeError(stringError);
        }
        
        // Обработка исключения: к нам пришло не число y
        if (!((typeY = typeof(y)) === "number")) 
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

// Функция отрисовки машины
function carPainting()
{
  // Количество строк
  let xCount = 10;  
  // Отрисовка машины по координатам
  for (let i = 0; i < pointsCar.length; i++) {
    setTimeout(function()
    {
        return function() {
                const index = xCount * pointsCar[i][1] + pointsCar[i][0];
                cells[index].classList.add('car');
            }
        
        },3000);
     }
   
}

// Функция удаления машины
function carRemove()
{
    // Количество строк
    let xCount = 10; 
    // Удаление машины по координатам
    for (let i = 0; i < pointsCar.length; i++) {
        setTimeout(function()
        {
            return function() {
                    const index = xCount * pointsCar[i][1] + pointsCar[i][0];
                    cells[index].classList.remove('car');
                }
            
            },3000);
         }
}

function main()
{
    try {
        painting();

        points = [[0,2], [1,2], [0,3]];
        barrierPainting(points);
        carPainting();
    } catch (e) {    
        // Вывод ошибок в консоль           
        console.log(e.stack);                
        return;
    }
}

main();

// Обработчик события keydown
document.addEventListener('keydown', function(event) {
    // Вычислить новые координаты, в зависимости от клавиши
    key_down = (event.keyCode);
    });



let isRunning = true;
function tick() {
    // Обработчик события keydown
document.addEventListener('keydown', function(event) {
    // Удалить машину
   carRemove();
    // Вычислить новые координаты, в зависимости от клавиши
   switch(event.keyCode)
   {
       //право
        case 39: {
            for (let i = 0; i < pointsCar.length; i++) {
                pointsCar[i][0] = pointsCar[i][0] + 1;
            }
            break; 
        }
        //лево
        case 37: {
            for (let i = 0; i < pointsCar.length; i++) {
                pointsCar[i][0] = pointsCar[i][0] - 1;
            }
            break; 
        }
        //вверх
        case 38: {
            for (let i = 0; i < pointsCar.length; i++) {
                pointsCar[i][1] = pointsCar[i][1] - 1;
            }
            break; 
        }
        //вниз
        case 40: {
            for (let i = 0; i < pointsCar.length; i++) {
                pointsCar[i][1] = pointsCar[i][1] + 1;
            }
            break; 
        }
   }
   if (isRunning) setTimeout(tick,1000);
   // Нарисовать машину
   carPainting();
   //key_down.pop();
});
  
}

tick();

