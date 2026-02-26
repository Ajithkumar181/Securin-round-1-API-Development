const express = require("express");
const cors = require("cors");
const db = require("./db");
const { importRecipes } = require("./service/LoadingData");
const app = express();

app.use(cors());
app.use(express.json());


app.get("/api/recipes", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const [countRows] = await db.query(
      "SELECT COUNT(*) AS total FROM recipes"
    );

    const total = countRows[0].total;
    const [rows] = await db.query(
      `SELECT id, title, cuisine, rating, prep_time, cook_time, total_time, description, nutrients, serves
       FROM recipes
       ORDER BY rating DESC
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    res.json({ page, limit, total, data: rows });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get("/api/recipes/search", async (req, res) => {
  try {
    const { title, cuisine, rating, total_time, calories } = req.query;

    let conditions = [];
    let values = [];
    if (title) {
      conditions.push("title LIKE ?");
      values.push(`%${title}%`);
    }

    if (cuisine) {
      conditions.push("cuisine = ?");
      values.push(cuisine);
    }

    if (rating) {
      conditions.push("rating >= ?");
      values.push(rating);
    }


    if (total_time) {
      conditions.push("total_time <= ?");
      values.push(total_time);
    }
    if (calories) {
      conditions.push(`
        CAST(
          JSON_UNQUOTE(JSON_EXTRACT(nutrients, '$.calories')) 
          AS UNSIGNED
        ) <= ?
      `);
      values.push(calories);
    }

    let sql = `
      SELECT 
        id,
        title,
        cuisine,
        rating,
        prep_time,
        cook_time,
        total_time,
        description,
        nutrients,
        serves
      FROM recipes
    `;

    if (conditions.length > 0) {
      sql += " WHERE " + conditions.join(" AND ");
    }

    sql += " ORDER BY rating DESC";

    const [rows] = await db.query(sql, values);

    res.json({
      data: rows  
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//insert data from json to db
app.post("/api/recipes/import", async (req, res) => {
  try {
    console.log("import Triggered");

    const result = await importRecipes();

    res.json({
      status: "SUCCESS",
      ...result,
    });

  } catch (err) {
    console.error("Import Error:", err.message);

    res.status(500).json({
      status: "ERROR",
      message: err.message,
    });
  }
});


const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


