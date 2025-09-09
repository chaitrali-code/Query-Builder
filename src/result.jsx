import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { query } = location.state || {};
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      fetch("http://localhost:5000/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      })
        .then((res) => res.json())
        .then((data) => setResults(data))
        .catch((err) => console.error("Error fetching results:", err));
    }
  }, [query]);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Query Results</h1>
      <p><b>Query:</b> {query}</p>

      {results.length > 0 ? (
        <table className="table table-bordered table-striped mt-3">
          <thead className="table-light">
            <tr>
              {Object.keys(results[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.map((row, idx) => (
              <tr key={idx}>
                {Object.values(row).map((val, i) => (
                  <td key={i}>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-3">No results found.</p>
      )}

      <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
        Back to Query Builder
      </button>
    </div>
  );
}