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
    // console.log(arr)
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


//chart
const types = ['Fruits and Vegetables', 'Starchy food', 'Dairy', 'Protien', 'Fat']


//counter

const count = () => {
    const counter = []
    const fType = []
    const occurrence = findOcc(foodList, 'type')
    for (let i = 0; i < occurrence.length; i++) {
        counter.push(occurrence[i].occurrence)
        fType.push(occurrence[i].type)
    } return { 'types': fType, 'count': counter }
}

const priceList = (arr) => {
    const names = []
    const prices = []
    arr.forEach(element => {
        names.push(element.name)
        prices.push(element.price)
    });
    return { names, prices }
}

//counting function from geeksforgeeks.com
function findOcc(arr, key) {
    let arr2 = [];

    arr.forEach((x) => {

        // Checking if there is any object in arr2
        // which contains the key value
        if (arr2.some((val) => { return val[key] == x[key] })) {

            // If yes! then increase the occurrence by 1
            arr2.forEach((k) => {
                if (k[key] === x[key]) {
                    k["occurrence"]++
                }
            })

        } else {
            // If not! Then create a new object initialize 
            // it with the present iteration key's value and 
            // set the occurrence to 1
            let a = {}
            a[key] = x[key]
            a["occurrence"] = 1
            arr2.push(a);
        }
    })

    return arr2
}



const data = {
    labels: count().types,
    datasets: [{
        label: 'Food Types',
        data: count().count,
        backgroundColor: [
            '#ceabb1',
            '#5f0a87',
            '#f4f7be',
            '#bbbac6',
            '#a31621'
        ],
        hoverOffset: 4
    }]
};
const config = {
    type: 'pie',
    data: data,
};
const myChart = new Chart(
    document.getElementById('myChart'),
    config
);


// bar chart

const labels2 = priceList(foodList).names;
const data2 = {
    labels: labels2,
    datasets: [{
        label: 'Prices',
        data: priceList(foodList).prices,
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
        ],
        borderWidth: 1
    }]
};
const config2 = {
    type: 'bar',
    data: data2,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    },
};
const myChart2 = new Chart(
    document.getElementById('myChart2'),
    config2
);