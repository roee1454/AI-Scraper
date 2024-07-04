import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/custom/Navbar";
import MainPage from "./pages/MainPage";
import ComparasionPage from "./pages/ComperasionPage";
import HistoryPage from "./pages/HistoryPage";

function App() {
  return (
    <div className="min-h-screen px-4 md:px-20 py-4 md:py-6">
      <Navbar />
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="/result/:id" element={<ComparasionPage />}></Route>
      </Routes>
    </div>
  )
}

export default App;
