'use strict'

//selectors
const foodForm = document.querySelector('#foodForm')
const foodList = []

//constructor
const Dish = function (foodName, foodType, price) {
    this.id = foodType[0].toUpperCase() + (Math.floor(Math.random() * (1000 - 100 + 1)) + 100);
    this.name = foodName;
    this.type = foodType;
    this.price = price;
    foodList.push(this)
}

//table rendering
const renderTable = document.querySelector('#renderTable')
foodForm.addEventListener('submit', function (e) {
    e.preventDefault();
    renderTable.classList.remove('hidden')
    const dish = new Dish(e.target.foodName.value, e.target.foodType.value, e.target.price.value)
    fillRender(renderTable, dish)
})

function createCells(rowName) {
    const cells = new Array()
    for (let i = 0; i < 4; i++) {
        let cell = rowName.insertCell()
        cells.push(cell)
    }
    return cells
}


function fillRender(table, element) {
    let row = table.insertRow();

    const cells = createCells(row)

    //this needs to be refactored(mapping etc)....
    let id = document.createTextNode(element.id)
    let name = document.createTextNode(element.name)
    let type = document.createTextNode(element.type)
    let price = document.createTextNode(element.price)
    cells[0].append(id)
    cells[1].append(name)
    cells[2].append(type)
    cells[3].append(price)
    //.....
    row.append(...cells)

}