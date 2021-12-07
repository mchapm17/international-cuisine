var selection = document.querySelector("#text-search");
var display = document.querySelector("#display");
var btnList = document.querySelector('#btn-list');

var food = function (food) {
  var foodUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${food}`;

  fetch(foodUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (var i = 0; i < data.meals.length; i++) {
        var aTagEl = document.createElement("a");
        aTagEl.setAttribute(
          "href",
          `./assets/html/details.html?food-type=${food}&food-id=${data.meals[i].idMeal}`
        );
        var container = document.createElement("div");
        container.setAttribute("class", "column");
        var pic = document.createElement("img");
        pic.setAttribute("src", `${data.meals[i].strMealThumb}`);
        var title = document.createElement("p");
        title.textContent = data.meals[i].strMeal;
        container.append(pic);
        container.append(title);
        aTagEl.append(container);
        display.append(aTagEl);
      }
    });
};

var singleMeal = function (nameID) {
  var mealUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${nameID}`;

  fetch(mealUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
};

var drink = function (drink) {
  var drinkUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${drink}`;

  fetch(drinkUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (var i = 0; i < data.drinks.length; i++) {
        var aTagEl = document.createElement("a");
        aTagEl.setAttribute(
          "href",
          `./assets/html/details.html?drink-type=${drink}&drink-id=${data.drinks[i].idDrink}`
        );
        var container = document.createElement("div");
        container.setAttribute("class", "column");
        var pic = document.createElement("img");
        pic.setAttribute("src", `${data.drinks[i].strDrinkThumb}`);
        var title = document.createElement("p");
        title.textContent = data.drinks[i].strDrink;
        container.append(pic);
        container.append(title);
        aTagEl.append(container);
        display.append(aTagEl);
      }
    });
};

var singleDrink = function (name) {
  var drinkUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;

  fetch(drinkUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
};


var prevList = JSON.parse(localStorage.getItem('itemObj') || JSON.stringify({items: []}));
    if(prevList.items.length <= 5){
        for(var i = 0; i < prevList.items.length; i++){
            if(document.querySelector(`#format option[value="${prevList.items[i].item1}"` )?.dataset.type === "meal"){
                //console.log(prevList.items[i].item1)
                var a2TagEl = document.createElement("a");
                a2TagEl.setAttribute("href",`./assets/html/details.html?food-type=${prevList.items[i].item1}&food-id=${prevList.items[i].item2}`);
                var btn = document.createElement('button');
                btn.setAttribute('class', 'list-btns button');
                btn.textContent = prevList.items[i].item1;
                a2TagEl.append(btn);
                btnList.append(a2TagEl);
            } else{
                //console.log('winner winner');
                var a2TagEl = document.createElement("a");
                a2TagEl.setAttribute("href",`./assets/html/details.html?drink-type=${prevList.items[i].item1}&drink-id=${prevList.items[i].item2}`);
                var btn = document.createElement('button');
                btn.setAttribute('class', 'list-btns button');
                btn.textContent = prevList.items[i].item1;
                a2TagEl.append(btn);
                btnList.append(a2TagEl);
            }
            }       
    } else {
        localStorage.setItem("itemObj", JSON.stringify({items: []}));

    }


selection.addEventListener("change", function (event) {
  event.preventDefault();
  display.textContent = "";

  const selectedVal = event.target.value;
  const foodType = document.querySelector(
    `#format option[value="${selectedVal}"`
  )?.dataset.type;

  if (selectedVal) {
    if (foodType === "meal") {
      food(selectedVal);
    } else {
      drink(selectedVal);
    }
  }
});
