import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_POSTS, GET_POSTS_BY_USER } from "../graphql/queries";

function QueryDemo() {
  const [continentCode, setContinentCode] = useState("");
  
  // Determine which query to use based on whether a continent is selected
  const isFilterActive = continentCode !== "";
  const { loading, error, data } = useQuery(
    isFilterActive ? GET_POSTS_BY_USER : GET_POSTS,
    isFilterActive ? { variables: { code: continentCode } } : {}
  );

  // Handle user selection change
  const handleContinentChange = (e) => {
    setContinentCode(e.target.value);
  };

  // Render loading state
  if (loading) return (
    <div>
      <h1>GraphQL Countries Demo</h1>
      <div>Loading countries...</div>
    </div>
  );
  
  // Render error state
  if (error) {
    console.error("Apollo Error Details:", error);
    return (
      <div>
        <h1>GraphQL Countries Demo</h1>
        <div style={{ color: "red", padding: "20px", border: "1px solid red" }}>
          <h3>Error Loading Countries</h3>
          <p>Error Message: {error.message}</p>
          <p>Try checking your browser console for more details.</p>
        </div>
      </div>
    );
  }

  // Parse data differently based on which query was used
  let countries = [];
  let title = "All Countries";
  
  if (isFilterActive && data?.continent) {
    // For filtered query (by continent)
    countries = data.continent.countries || [];
    title = `Countries in ${data.continent.name}`;
  } else if (!isFilterActive && data?.countries) {
    // For all countries query
    countries = data.countries || [];
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>GraphQL Countries Demo</h1>
      
      {/* Continent Filter Controls */}
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="continentFilter">Filter by Continent: </label>
        <select 
          id="continentFilter"
          value={continentCode}
          onChange={handleContinentChange}
          style={{ marginRight: "10px", padding: "5px" }}
        >
          <option value="">All Continents</option>
          <option value="AF">Africa</option>
          <option value="AN">Antarctica</option>
          <option value="AS">Asia</option>
          <option value="EU">Europe</option>
          <option value="NA">North America</option>
          <option value="OC">Oceania</option>
          <option value="SA">South America</option>
        </select>
      </div>
      
      {/* Countries Count Display */}
      <div style={{ marginBottom: "20px" }}>
        <h2>
          {title}
          <span style={{ color: "#666", fontSize: "0.9em" }}> 
            ({countries.length} countries)
          </span>
        </h2>
      </div>
      
      {/* Countries Display */}
      {countries.length === 0 ? (
        <p>No countries found</p>
      ) : (
        <div>
          {countries.map((country) => (
            <div 
              key={country.code} 
              style={{ 
                marginBottom: "20px", 
                border: "1px solid #eee", 
                padding: "15px",
                borderRadius: "5px" 
              }}
            >
              <h3 style={{ marginTop: 0 }}>{country.name}</h3>
              <p style={{ color: "#666" }}>
                <strong>Code:</strong> {country.code} | 
                <strong> Capital:</strong> {country.capital || "N/A"} | 
                <strong> Continent:</strong> {country.continent.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default QueryDemo;