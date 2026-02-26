import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import ListRecipe from "./pages/ListRecipe";
import DetailedRecipe from "./pages/DetailedRecipe";

function NavigationButton() {
  const navigate = useNavigate();

  const styles = {
    nav: {
      padding: "15px 30px",
      backgroundColor: "#111827",
      display: "flex",
      justifyContent: "flex-end",
    },

    button: {
      padding: "8px 16px",
      borderRadius: "6px",
      border: "none",
      backgroundColor: "white",
      color: "#111827",
      fontSize: "13px",
      fontWeight: "bold",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.nav}>
      <button style={styles.button} onClick={() => navigate("/search")}>
        🔍 Search Recipes
      </button>
    </div>
  );
}

function App() {
  return (
    <Router>
      {/* ✅ Top Bar */}
      <NavigationButton />

      {/* ✅ Routes */}
      <Routes>
        <Route path="/" element={<ListRecipe />} />
        <Route path="/search" element={<DetailedRecipe />} />
      </Routes>
    </Router>
  );
}

export default App;