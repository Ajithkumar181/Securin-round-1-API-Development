import { useEffect, useState } from "react";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [expandedTime, setExpandedTime] = useState(false);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const totalPages = Math.ceil(total / limit);

  const fetchRecipes = async (pageNumber) => {
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:5000/api/recipes?page=${pageNumber}&limit=${limit}`
      );

      const data = await res.json();

      setRecipes(data.data || []);
      setTotal(data.total || 0);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes(page);
  }, [page]);

  const styles = {
    container: {
      padding: "30px",
      fontFamily: "Arial",
      backgroundColor: "#f5f6f8",
      minHeight: "100vh",
    },

    table: {
      width: "100%",
      borderCollapse: "collapse",
      backgroundColor: "white",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
    },

    th: {
      textAlign: "left",
      padding: "14px",
      backgroundColor: "#fafafa",
      borderBottom: "1px solid #eee",
      fontSize: "13.5px",
      fontWeight: "bold",
      color: "#444",
    },

    td: {
      padding: "14px",
      borderBottom: "1px solid #f2f2f2",
      fontSize: "13px",
      maxWidth: "220px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      color: "#333",
    },

    row: {
      cursor: "pointer",
      transition: "0.2s ease",
    },

    drawer: {
      position: "fixed",
      right: 0,
      top: 0,
      width: "380px",
      height: "100%",
      backgroundColor: "white",
      boxShadow: "-4px 0 16px rgba(0,0,0,0.08)",
      padding: "22px",
      overflowY: "auto",
    },

    drawerTitle: {
      margin: 0,
      fontSize: "18px",
    },

    drawerCuisine: {
      fontSize: "13px",
      color: "#666",
      marginTop: "4px",
    },

    section: {
      marginTop: "18px",
      fontSize: "13px",
    },

    sectionLabel: {
      fontWeight: "bold",
      marginBottom: "6px",
    },

    timeBox: {
      backgroundColor: "#fafafa",
      padding: "10px",
      borderRadius: "8px",
      marginTop: "6px",
      fontSize: "13px",
    },

    nutrientsTable: {
      width: "100%",
      marginTop: "8px",
      fontSize: "13px",
      borderCollapse: "collapse",
    },

    nutrientRow: {
      borderBottom: "1px solid #f0f0f0",
    },

    nutrientCell: {
      padding: "6px 0",
      fontSize: "13px",
    },

    pagination: {
      marginTop: "22px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    button: (disabled) => ({
      padding: "8px 16px",
      borderRadius: "8px",
      border: "none",
      cursor: disabled ? "not-allowed" : "pointer",
      backgroundColor: disabled ? "#ccc" : "#222",
      color: "white",
      fontSize: "13px",
      fontWeight: "bold",
      margin: "0 6px",
    }),

    pageText: {
      fontSize: "13px",
      margin: "0 10px",
      color: "#444",
    },

    closeButton: {
      marginTop: "20px",
      width: "100%",
      padding: "10px",
      borderRadius: "8px",
      border: "none",
      backgroundColor: "#222",
      color: "white",
      cursor: "pointer",
      fontWeight: "bold",
    },
  };

  const renderStars = (rating) => {
    if (!rating) return "N/A";
    return "⭐".repeat(Math.round(rating));
  };

  return (
    <div style={styles.container}>
      <h2>🍽 Recipes</h2>

      {loading ? (
        <p>Loading recipes...</p>
      ) : recipes.length === 0 ? (
        <p>No recipes found</p>
      ) : (
        <>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Title</th>
                <th style={styles.th}>Cuisine</th>
                <th style={styles.th}>Rating</th>
                <th style={styles.th}>Total Time</th>
                <th style={styles.th}>Serves</th>
              </tr>
            </thead>

            <tbody>
              {recipes.map((recipe) => (
                <tr
                  key={recipe.id}
                  style={styles.row}
                  onClick={() => {
                    setSelectedRecipe(recipe);
                    setExpandedTime(false);
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f9fafb")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "white")
                  }
                >
                  <td style={styles.td}>{recipe.title}</td>
                  <td style={styles.td}>{recipe.cuisine}</td>
                  <td style={styles.td}>{renderStars(recipe.rating)}</td>
                  <td style={styles.td}>
                    {recipe.total_time ?? "N/A"} mins
                  </td>
                  <td style={styles.td}>{recipe.serves ?? "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ✅ Pagination */}
          <div style={styles.pagination}>
            <button
              style={styles.button(page === 1)}
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              ⬅ Prev
            </button>

            <span style={styles.pageText}>
              Page <b>{page}</b> of <b>{totalPages}</b>
            </span>

            <button
              style={styles.button(page === totalPages)}
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next ➡
            </button>
          </div>
        </>
      )}

      {/* ✅ Drawer */}
      {selectedRecipe && (
        <div style={styles.drawer}>
          <h3 style={styles.drawerTitle}>{selectedRecipe.title}</h3>
          <div style={styles.drawerCuisine}>
            {selectedRecipe.cuisine}
          </div>

          <div style={styles.section}>
            <div style={styles.sectionLabel}>Description</div>
            <div>{selectedRecipe.description}</div>
          </div>

          <div style={styles.section}>
            <div style={styles.sectionLabel}>
              Total Time: {selectedRecipe.total_time ?? "N/A"} mins
            </div>

            <div style={styles.timeBox}>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => setExpandedTime(!expandedTime)}
              >
                {expandedTime ? "🔼 Hide Details" : "🔽 Show Details"}
              </span>

              {expandedTime && (
                <div style={{ marginTop: "6px" }}>
                  Prep: {selectedRecipe.prep_time ?? "N/A"} mins <br />
                  Cook: {selectedRecipe.cook_time ?? "N/A"} mins
                </div>
              )}
            </div>
          </div>

          {/* ✅ Nutrients */}
          {selectedRecipe.nutrients && (
            <div style={styles.section}>
              <div style={styles.sectionLabel}>Nutrients</div>

              <table style={styles.nutrientsTable}>
                <tbody>
                  <tr style={styles.nutrientRow}>
                    <td style={styles.nutrientCell}>Calories</td>
                    <td style={styles.nutrientCell}>
                      {selectedRecipe.nutrients.calories}
                    </td>
                  </tr>

                  <tr style={styles.nutrientRow}>
                    <td style={styles.nutrientCell}>Carbs</td>
                    <td style={styles.nutrientCell}>
                      {selectedRecipe.nutrients.carbohydrateContent}
                    </td>
                  </tr>

                  <tr style={styles.nutrientRow}>
                    <td style={styles.nutrientCell}>Protein</td>
                    <td style={styles.nutrientCell}>
                      {selectedRecipe.nutrients.proteinContent}
                    </td>
                  </tr>

                  <tr style={styles.nutrientRow}>
                    <td style={styles.nutrientCell}>Fat</td>
                    <td style={styles.nutrientCell}>
                      {selectedRecipe.nutrients.fatContent}
                    </td>
                  </tr>

                  <tr style={styles.nutrientRow}>
                    <td style={styles.nutrientCell}>Sugar</td>
                    <td style={styles.nutrientCell}>
                      {selectedRecipe.nutrients.sugarContent}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          <button
            style={styles.closeButton}
            onClick={() => setSelectedRecipe(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default App;