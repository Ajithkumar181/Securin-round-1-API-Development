const db = require("../db");
const rawData = require("../utils/US_recipes_null.json");
const { cleanRecipe } = require("../utils/cleaner");

const recipes = Object.values(rawData);

async function importRecipes() {
  try {
    console.log("Starting Import...");
    console.log("Total Recipes:", recipes.length);

    let inserted = 0;
    let skipped = 0;

    for (const recipe of recipes) {
      
      const cleaned = cleanRecipe(recipe);

     //no title skip it 
      if (!cleaned.title) {
        skipped++;
        continue;
      }
      console.log(cleaned);
      await db.query(
        `INSERT INTO recipes
        (cuisine, title, rating, prep_time, cook_time, total_time, description, nutrients, serves, url, ingredients, instructions)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          cleaned.cuisine,
          cleaned.title,
          cleaned.rating,
          cleaned.prep_time,
          cleaned.cook_time,
          cleaned.total_time,
          cleaned.description,
          cleaned.nutrients,
          cleaned.serves,
          cleaned.url,
          cleaned.ingredients,
          cleaned.instructions,
        ]
      );

      inserted++;
    }

    console.log("Import Completed");
    console.log("Inserted:", inserted);
    console.log("Skipped (Invalid Title):", skipped);

    process.exit();

  } catch (err) {
    console.error("Import Failed:", err.message);
    process.exit(1);
  }
}
module.exports = { importRecipes };

// importRecipes();