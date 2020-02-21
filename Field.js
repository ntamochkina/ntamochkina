class Field
{

    cells = [];
    barriers = [];

    constructor(nameField, xCount, yCount) {
        this.nameField = nameField;
        this.xCount = xCount;
        this.yCount = yCount;
    }

    init()
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
            const maxBarriers = 10;
            const maxBarriersInLine = 3;
            if (this.barriers[0] && this.barriers[0].points[0s][1] < this.barriers[0].height * 2) return;
        // Cравнить длину с каким то числом 
            let a = Math.min(maxBarriers - this.barriers.length, maxBarriersInLine);
            let b = getRandomInRange(0, a);
            console.log(b)
            for (let i = 0; i < a; i++) {
                this.barriers.push(
                    createBarrier(
                        getRandomInRange(1,4), {
                            x: getRandomInRange(0,4) * 10,
                            y: 0,
                        }
                    )
                );
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