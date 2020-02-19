
class Car {
    width = 8;
    height = 8;
    position = { x: Math.floor(xCount / 2) - this.width / 2, y: yCount - this.height};
    constructor (points) {
        this.startPoints = JSON.parse(JSON.stringify(points)).map(([x, y]) => [this.position.x + x, this.position.y + y]);
        this.points = JSON.parse(JSON.stringify(this.startPoints));
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
        let xMove = 0;
        let yMove = 0
        for (let i = 0; i < this.points.length; i++)
        {
           ;
            if (this.points[i][0] < 0)
            {
                xMove += 1;
                break;
            }
            else if (this.points[i][0] >= xCount) 
            {
                xMove -=1;
                break;
            }
            else if ((this.points[i][1] < 0))
            {
                yMove +=1;
                break;
            }
            else if (this.points[i][1] >= yCount) 
            {
                yMove -=1;
                break;
            }
        }

        for (let i=0; i <this.points.length; i++)
        {
            this.points[i][0] += xMove;
            this.points[i][1] += yMove;
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