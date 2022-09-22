import React, { useState, useCallback } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientsList from "./IngredientList";

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  const addIngredientHandler = (ingredient) => {
    fetch("https://hooks-5f129-default-rtdb.firebaseio.com/igredients.json", {
      method: "POST",
      body: JSON.stringify(ingredient),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setUserIngredients((prevIngredients) => [
          ...prevIngredients,
          { id: responseData.name, ...ingredient },
        ]);
      });
  };

  const removeIgredientHandler = (id) => {
    setUserIngredients((prevIngredients) =>
      prevIngredients.filter((ig) => ig.id !== id)
    );
  };

  const filterIngredientsHandlers = useCallback((filterIngredients) => {
    setUserIngredients(filterIngredients);
  }, []);

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadingIngredients={filterIngredientsHandlers} />
        <IngredientsList
          ingredients={userIngredients}
          onRemoveItem={removeIgredientHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;
