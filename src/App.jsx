import React from "react";
import { Routes, Route } from "react-router-dom";
import QueryBuilder from "./querybuilder.jsx";
import Results from "./result.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<QueryBuilder />} />  {/* Homepage */}
      <Route path="/results" element={<Results />} /> {/* Results page */}
    </Routes>
  );
}

export default App;
