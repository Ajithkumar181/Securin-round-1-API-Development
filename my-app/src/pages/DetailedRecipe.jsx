import { useState } from "react";

function DetailedRecipe() {
  const [recipes, setRecipes] = useState([]);
  const [filters, setFilters] = useState({
    title: "",
    cuisine: "",
    rating: "",
    total_time: "",
    calories: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const searchRecipes = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      Object.keys(filters).forEach((key) => {
        if (filters[key]) {
          params.append(key, filters[key]);
        }
      });

      const res = await fetch(
        `http://localhost:5000/api/recipes/search?${params.toString()}`
      );

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();

      setRecipes(Array.isArray(data.data) ? data.data : []);

    } catch (err) {
      console.error("Search Error:", err);
      setRecipes([]);   // ✅ Safe fallback
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      padding: "30px",
      fontFamily: "Arial",
      backgroundColor: "#f5f6f8",
      minHeight: "100vh",
    },

    filters: {
      backgroundColor: "white",
      padding: "18px",
      borderRadius: "12px",
      marginBottom: "15px",
      display: "grid",
      gridTemplateColumns: "repeat(5, 1fr)",
      gap: "12px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    },

    input: {
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #e0e0e0",
      fontSize: "13px",
    },

    button: {
      marginBottom: "20px",
      padding: "10px 18px",
      borderRadius: "8px",
      border: "none",
      backgroundColor: "#222",
      color: "white",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "bold",
    },

    card: {
      backgroundColor: "white",
      border: "1px solid #e8e8e8",
      padding: "18px",
      marginBottom: "14px",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    },

    headerRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },

    cuisine: {
      fontSize: "13px",
      color: "#666",
      marginTop: "4px",
    },

    badgeRow: {
      display: "flex",
      gap: "8px",
      marginTop: "10px",
      flexWrap: "wrap",
    },

    badge: {
      padding: "5px 10px",
      borderRadius: "20px",
      fontSize: "12px",
      backgroundColor: "#f3f4f6",
    },

    description: {
      marginTop: "10px",
      fontSize: "13px",
      color: "#444",
      lineHeight: "18px",
    },

    nutrients: {
      marginTop: "10px",
      fontSize: "12.5px",
      backgroundColor: "#fafafa",
      padding: "8px",
      borderRadius: "8px",
    },

    empty: {
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "10px",
      marginTop: "10px",
    }
  };

  return (
    <div style={styles.container}>
      <h2>🍽 Recipe Search</h2>

      {/* ✅ Filters */}
      <div style={styles.filters}>
        <input style={styles.input} name="title" placeholder="Title" onChange={handleChange} />
        <input style={styles.input} name="cuisine" placeholder="Cuisine" onChange={handleChange} />
        <input style={styles.input} name="rating" placeholder="Min Rating" onChange={handleChange} />
        <input style={styles.input} name="total_time" placeholder="Max Time" onChange={handleChange} />
        <input style={styles.input} name="calories" placeholder="Max Calories" onChange={handleChange} />
      </div>

      <button style={styles.button} onClick={searchRecipes}>
        🔍 Search
      </button>

      {/* ✅ Results */}
      {loading ? (
        <p>Loading...</p>
      ) : recipes.length === 0 ? (
        <div style={styles.empty}>No recipes found</div>
      ) : (
        recipes.map((recipe) => {
          const nutrients =
            typeof recipe.nutrients === "object" ? recipe.nutrients : {};

          const hasTiming =
            recipe.prep_time || recipe.cook_time || recipe.total_time;

          return (
            <div key={recipe.id} style={styles.card}>
              <div style={styles.headerRow}>
                <h3 style={{ margin: 0 }}>{recipe.title}</h3>
                ⭐ {recipe.rating ?? "N/A"}
              </div>

              <div style={styles.cuisine}>
                {recipe.cuisine || "Unknown Cuisine"}
              </div>

              {hasTiming && (
                <div style={styles.badgeRow}>
                  {recipe.prep_time && <div style={styles.badge}>⏱ Prep: {recipe.prep_time} mins</div>}
                  {recipe.cook_time && <div style={styles.badge}>🔥 Cook: {recipe.cook_time} mins</div>}
                  {recipe.total_time && <div style={styles.badge}>✅ Total: {recipe.total_time} mins</div>}
                </div>
              )}

              <div style={styles.description}>
                {recipe.description || "No description"}
              </div>

              <div style={styles.nutrients}>
                🔥 Calories: {nutrients.calories ?? "N/A"} | 
                💪 Protein: {nutrients.proteinContent ?? "N/A"} | 
                🧈 Fat: {nutrients.fatContent ?? "N/A"}
              </div>

              <div style={{ marginTop: "8px", fontSize: "13px" }}>
                <b>Serves:</b> {recipe.serves ?? "N/A"}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default DetailedRecipe;