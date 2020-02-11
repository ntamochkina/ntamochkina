
const filedWidth = 1000;
const fieldHeight = 900;

const field = document.querySelector('.game-field');
const cells = [];

function paining(){
 for (let i = 0; i < 10; i++)
{
    for (let k = 0; k < 10; k++)
    {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        field.appendChild(cell);
    }
}
}
