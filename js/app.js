'use strict'

//selectors
const foodForm = document.querySelector('#foodForm')
const oldData = JSON.parse(localStorage.getItem('dishes'))
const foodList = []
if (oldData) {
    foodList.push(...oldData)
}

//constructor
const Dish = function (foodName, foodType, price) {
    this.id = foodType[0].toUpperCase() + (Math.floor(Math.random() * (1000 - 100 + 1)) + 100);
    this.name = foodName;
    this.type = foodType;
    this.price = price;
    foodList.push(this)
}

//data-storing function
const storeData = function (arr) {
    localStorage.setItem('dishes', JSON.stringify(arr))

}


//form data
foodForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const dish = new Dish(e.target.foodName.value, e.target.foodType.value, e.target.price.value)
    storeData(foodList)
    e.target.foodName.value = ''
    e.target.price.value = ''
})


