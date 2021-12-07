var selection = document.querySelector('#format');
var display = document.querySelector('#display');

var food = function (food) {
    var foodUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${food}`;

    fetch(foodUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (var i = 0; i < data.meals.length; i++) {
                var aTagEl = document.createElement('a');
                aTagEl.setAttribute('href', `./assets/html/details.html?food-type=${food}&food-id=${data.meals[i].idMeal}`);
                var container = document.createElement('div');
                container.setAttribute('class', 'column');
                var pic = document.createElement('img');
                pic.setAttribute('src', `${data.meals[i].strMealThumb}`)
                var title = document.createElement('p');
                title.textContent = data.meals[i].strMeal;
                container.append(pic);
                container.append(title);
                aTagEl.append(container);
                display.append(aTagEl);

            }
        })
}

var singleMeal = function (nameID) {
    var mealUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${nameID}`;

    fetch(mealUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
}

var drink = function (drink) {
    var drinkUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${drink}`

    fetch(drinkUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (var i = 0; i < data.drinks.length; i++) {
                var aTagEl = document.createElement('a');
                console.log(data)
                aTagEl.setAttribute('href', `./assets/html/details.html?drink-type=${drink}&drink-id=${data.drinks[i].idDrink}`);
                var container = document.createElement('div');
                container.setAttribute('class', 'column');
                var pic = document.createElement('img');
                pic.setAttribute('src', `${data.drinks[i].strDrinkThumb}`)
                var title = document.createElement('p');
                title.textContent = data.drinks[i].strDrink;
                container.append(pic);
                container.append(title);
                aTagEl.append(container);
                display.append(aTagEl);
            }
        })
}

var singleDrink = function (name) {
    var drinkUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;

    fetch(drinkUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })

}

selection.addEventListener('change', function (event) {
    event.preventDefault();
    display.textContent = '';
    var foodType = event.target.options[event.target.selectedIndex].dataset.type;

    if (foodType === 'meal') {
        food(selection.value);
    } else {
        drink(selection.value);
    }
})