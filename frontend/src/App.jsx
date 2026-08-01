// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Results from "./pages/Results";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "rgba(15, 14, 26, 0.95)",
            color: "#f1f5f9",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "12px",
            padding: "12px 16px",
            fontSize: "14px",
            backdropFilter: "blur(12px)",
            boxShadow: "0 0 30px -12px rgba(99, 102, 241, 0.4)",
          },
          success: {
            iconTheme: {
              primary: "#818cf8",
              secondary: "#0F0E1A",
            },
          },
          error: {
            iconTheme: {
              primary: "#f87171",
              secondary: "#0F0E1A",
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
