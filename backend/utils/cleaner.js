function cleanNumber(value) {
  /* Handle ALL bad numeric cases */
  if (
    value === undefined ||
    value === null ||
    value === "" ||
    value === "NaN"
  ) {
    return null;
  }

  const num = Number(value);

  /* Prevent NaN from sneaking into DB */
  return isNaN(num) ? null : num;
}

/* ✅ Clean text safely */
function cleanText(value) {
  if (!value) return null;

  const trimmed = String(value).trim();

  return trimmed.length === 0 ? null : trimmed;
}

function cleanRecipe(recipe) {
  return {
    cuisine: cleanText(recipe.cuisine),
    title: cleanText(recipe.title),
    url: cleanText(recipe.URL),

    rating: cleanNumber(recipe.rating),
    prep_time: cleanNumber(recipe.prep_time),
    cook_time: cleanNumber(recipe.cook_time),
    total_time: cleanNumber(recipe.total_time),

    description: cleanText(recipe.description),

    ingredients: recipe.ingredients
      ? JSON.stringify(recipe.ingredients)
      : null,

    instructions: recipe.instructions
      ? JSON.stringify(recipe.instructions)
      : null,

    nutrients: recipe.nutrients
      ? JSON.stringify(recipe.nutrients)
      : null,

    serves: cleanText(recipe.serves),
  };
}

module.exports = {
  cleanRecipe,
};