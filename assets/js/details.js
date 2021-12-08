const profileImgEL = document.querySelector(".profile-img");
const consumableTitleEl = document.querySelector(".consumable-title");
const consumableEl = document.querySelector(".consumable-type");
const ingredientsListEl = document.querySelector(".ingredients-list");
const instructionsEl = document.querySelector(".instructions");
const urlParams = new URLSearchParams(window.location.search);
const foodType = urlParams.get("food-type");
const foodId = urlParams.get("food-id");
const drinkType = urlParams.get("drink-type");
const drinkId = urlParams.get("drink-id");
const prevList = localStorage.getItem('itemObj') || JSON.stringify({items: []});
const prev = JSON.parse(prevList);

function setPrevHistoryLS(type, id, name) {

    var itemObj = {
        item1: type,
        item2: id,
        item3: name
      }
      prev.items.push(itemObj);
      localStorage.setItem("itemObj", JSON.stringify(prev));
}

function ingredientAndMeasurementInfo(data) {
    const consumable = data?.meals?.[0] || data?.drinks?.[0];
    let looping = true;
    let i = 1;
    while (looping) {
      const strIngredient = consumable[`strIngredient${i}`];
      const strMeasure = consumable[`strMeasure${i}`];
      if (strIngredient) {
        const ingredientListItem = document.createElement("li");
        ingredientListItem.textContent = `${strIngredient} ${strMeasure}`;
        ingredientsListEl.appendChild(ingredientListItem);
        i++;
      } else {
        looping = false;
      }
    }
}

function displayDrinkDetails(drinkID) {
  const drinkUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkID}`;

  fetch(drinkUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
    const { strDrink, strDrinkThumb, strAlcoholic, strInstructions, idDrink } = data.drinks[0];

    profileImgEL.src = strDrinkThumb;
    consumableTitleEl.textContent = strDrink;
    consumableEl.textContent = strAlcoholic;
    instructionsEl.textContent = strInstructions;

      ingredientAndMeasurementInfo(data);

    setPrevHistoryLS(drinkType, idDrink, strDrink);
    });
}

function displayFoodDetails(foodId) {
  var foodUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`;

  fetch(foodUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const { strMeal, strMealThumb, strArea, strInstructions, idMeal } = data.meals[0];

      profileImgEL.src = strMealThumb;
      consumableTitleEl.textContent = strMeal;
      consumableEl.textContent = strArea;
      instructionsEl.textContent = strInstructions;

      ingredientAndMeasurementInfo(data);

    setPrevHistoryLS(foodType, idMeal, strMeal);
    });
}

function displayConsumableItemDetails() {

  if (foodType) {
    displayFoodDetails(foodId);
  }

  if (drinkType) {
    displayDrinkDetails(drinkId);
  }

  if (!foodType && !drinkType) {
    // go back to previous page if no query params are present
    window.history.back();
  }
}

displayConsumableItemDetails();
