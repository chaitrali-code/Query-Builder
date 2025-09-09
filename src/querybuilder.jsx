import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const fields = ["Math", "Science", "English", "Hindi", "SocialScience", "Marathi", "Total", "Percentage"];
const operators = [">", "<", "=", "AND", "OR"];
const shortcuts = [
  { label: "Top 5 in Math", query: "Math ORDER DESC LIMIT 5" },
  { label: "Top 5 Overall", query: "Total ORDER DESC LIMIT 5" },
  { label: "Failing Students", query: "Math < 35 OR Science < 35 OR English < 35 OR Hindi < 35 OR SocialScience < 35 OR Marathi < 35" },
  { label: "Above 90% Students", query: "Percentage > 90" },
];

export default function QueryBuilder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleFieldClick = (field) => setQuery((q) => q + " " + field);
  const handleOperatorClick = (op) => setQuery((q) => q + " " + op);
  const handleShortcut = (shortcutQuery) => setQuery(shortcutQuery);

  const runQuery = () => {
    navigate("/results", { state: { query } });
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Student Query Builder</h1>

      {/* Query Box */}
      <div className="mb-3">
        <textarea
          className="form-control"
          rows={3}
          placeholder="Write your query here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Field Gallery */}
      <div className="mb-3">
        <h5>Fields</h5>
        {fields.map((f) => (
          <button
            key={f}
            className="btn btn-outline-primary btn-sm me-2 mb-2"
            onClick={() => handleFieldClick(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Operators */}
      <div className="mb-3">
        <h5>Operators</h5>
        {operators.map((op) => (
          <button
            key={op}
            className="btn btn-outline-secondary btn-sm me-2 mb-2"
            onClick={() => handleOperatorClick(op)}
          >
            {op}
          </button>
        ))}
      </div>

      {/* Prebuilt Shortcuts */}
      <div className="mb-3">
        <h5>Shortcuts</h5>
        <select
          className="form-select w-auto"
          onChange={(e) => {
            const shortcut = shortcuts.find((s) => s.label === e.target.value);
            if (shortcut) handleShortcut(shortcut.query);
          }}
        >
          <option value="">-- Select Shortcut --</option>
          {shortcuts.map((s) => (
            <option key={s.label} value={s.label}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Run Query */}
      <button className="btn btn-success" onClick={runQuery}>
        Run Query
      </button>
    </div>
  );
}