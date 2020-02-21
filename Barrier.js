class Barrier
{
    width = 8;
    height = 8;
    position = { x: 0, y: -this.height};
    constructor({width, height, points}, position)
    {
        this.width = width;
        this.height = height;
        this.position = position;
        this.position.y -= this.height;
        //создаем новый массив, который будет переносить текущий элемент в нужное нам место 
        this.points = JSON.parse(JSON.stringify(points)).map(([x, y]) => [this.position.x + x, this.position.y + y]);
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
        for (let i = 0; i < this.points.length; i++) {
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
            if (!((typeof(y)) === "number")) {
                stringError = "Type of y: " + typeY + ", expected number."; 
                throw new TypeError(stringError);
            }
        
            // Обработка исключения: число выходит за диапозон
            if ((x >= xCount) || (y >= yCount) || (x < 0) || (y < 0)) {
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
    reachingTheWall(field)
    {
        for (let i = 0; i < this.points.length; i++)
        if (this.points[i][1] >= yCount) 
            {
                this.points[i][1] = this.points[i][1] - Math.sqrt(this.points.length);
              
                this.remove(field);
            }
    }
   
    // Движение барьера 
    barrierMovement (field)
    {
        this.remove(field);
        for (let i = 0; i < this.points.length; i++) {
            this.points[i][1] = this.points[i][1] + 1;
        }
        this.painting(field);
        
    }

  

    // Проверка выхода за пределы поля
    isFullOutside(field)
    {
        return this.points.every((point) => point[1] > yCount)
    }

}