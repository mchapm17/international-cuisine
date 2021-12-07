const profileImgEL = document.querySelector("#profile-img");
const consumableTitleEl = document.querySelector("#consumable-title");
const consumableTypeEl = document.querySelector("#consumable-type");
const ingredientsListEl = document.querySelector(".ingredients-list");
const instructionsEl = document.querySelector(".instructions");

function detailsInfo(consumableType) {}

function displayDrinkDetails(drinkID) {
  const drinkUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkID}`;

  fetch(drinkUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // for(var i = 0; i< data.drinks.length; i++){
      //     var container = document.createElement('div');
      //     container.setAttribute('class', 'column');
      //     var pic = document.createElement('img');
      //     pic.setAttribute('src', `${data.drinks[i].strDrinkThumb}`)
      //     var title = document.createElement('p');
      //     title.textContent = data.drinks[i].strDrink;
      //     container.append(pic);
      //     container.append(title)
      //     display.append(container);

      //     }
      // console.log(data);
    });
}

function displayFoodDetails(foodId) {
  var foodUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`;

  fetch(foodUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const { strMeal, strMealThumb, strArea, strInstructions } = data.meals[0];

      profileImgEL.src = strMealThumb;
      consumableTitleEl.textContent = strMeal;
      consumableTypeEl.textContent = strArea;
      instructionsEl.textContent = strInstructions;

      let looping = true;
      let i = 1;
      while (looping) {
        const strIngredient = data.meals[0][`strIngredient${i}`];
        const strMeasure = data.meals[0][`strMeasure${i}`];
        if (strIngredient) {
          const ingredientListItem = document.createElement("li");
          ingredientListItem.textContent = `${strIngredient} ${strMeasure}`;
          ingredientsListEl.appendChild(ingredientListItem);
          i++;
        } else {
          looping = false;
        }
      }
    });
}

function displayConsumableItemDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const foodType = urlParams.get("food-type");
  const foodId = urlParams.get("food-id");
  const drinkType = urlParams.get("drink-type");
  const drinkId = urlParams.get("drink-id");

  if (foodType) {
    displayFoodDetails(foodId);
  }

  if (drinkType) {
    displayDrinkDetails(drinkId);
  }

  console.log("foodType", foodType, "drinkType", drinkType);
  if (!foodType && !drinkType) {
    // go back to previous page
    console.log("No type added");
  }
}

displayConsumableItemDetails();
