
// Размеры поля
const fieldWidth = 1000;
const fieldHeight = 900;

// Поле идентифицируется по ид блока в верстке
const field = document.querySelector('.game-field');
// Массив клеток
const cells = [];

// Функция рисования
/*function painting(){
    // 10*10=100 клеток/шагов
    for (let i = 0; i < 10; i++)
    {
        for (let k = 0; k < 10; k++)
        {
           // Создаем клетку типа div
           const cell = document.createElement('div');
           // Даем ей класс cell, который прописан у нас в css
           cell.classList.add('cell');
           if (i === 3)
           {
               switch (k) {
                    case 0: cell.classList.add('barrier');
                        break;
                    case 1: cell.classList.add('barrier');
                        break;
                    case 2: cell.classList.add('barrier');
                        break;
                    case 7: cell.classList.add('barrier');
                        break;
                    case 8: cell.classList.add('barrier');
                        break;  
                    case 9: cell.classList.add('barrier');
                        break;  
               }
           }
           // В наше поле добавляем клетку
           field.appendChild(cell);
        }
    }
}*/



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
 //paining();
painting();




function the_car()
{
  let xCount = 10;
  let yCount = 10;
  let x = 4;
  let y = 8;
  a = [[4,0], [4, 1], [5,0], [5,1]];
  
  for (let i = 0; i < a.length; i++) {
    const index = xCount * a[i][1] + a[i][0];
    cells[index].classList.add('cell--black');
    
  
   }
}

the_car();






