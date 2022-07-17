const renderTable = document.querySelector('#renderTable')
foodList = []

//constructor
const Dish = function (foodName, foodType, price) {
    this.id = foodType[0].toUpperCase() + (Math.floor(Math.random() * (1000 - 100 + 1)) + 100);
    this.name = foodName;
    this.type = foodType;
    this.price = price;
    foodList.push(this)
}
//data retrival 
const retriveData = function (key) {
    const retrivedDishes = JSON.parse(localStorage.getItem(key))
    return retrivedDishes
}

const reInstance = function (constructor, cllbck, key) {
    const arr = cllbck(key)
    console.log(arr)
    if (arr) {
        arr.forEach(element => {
            const dish = new constructor(element.name, element.type, element.price)
            fillRender(renderTable, dish)
        })
    } else alert('database is empty');
}
reInstance(Dish, retriveData, 'dishes')



//table render
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

