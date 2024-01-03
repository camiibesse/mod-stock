import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/Routes";
import { ItemsContext, ItemsReducer } from "./Context/ItemsContext";
import { useReducer } from "react";

function App() {
  const initialState = [];
  const [items, dispatch] = useReducer(ItemsReducer, initialState);
  return (
    <>
      <Router>
        <ItemsContext.Provider value={{items, dispatch}}>
          <Navbar />
          <AppRoutes />
        </ItemsContext.Provider>
      </Router>
    </>
  );
}

export default App;
