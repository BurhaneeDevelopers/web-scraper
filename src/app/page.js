"use client";
import axios from "axios";
import cheerio from "cheerio";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `https://www.google.com/search?q=${query}`,
        { headers: { "Access-Control-Allow-Origin": "*" } }
      );
      const html = response.data;
      const $ = cheerio.load(html);

      const scrapedResults = [];

      // Implement scraping logic here to extract business names, email addresses, and phone numbers
      // and populate the 'scrapedResults' array

      if (scrapedResults.length > 0) {
        setResults(scrapedResults);
      } else {
        setResults([]);
        setError("No results found."); // Set the error message if no results are found
      }
    } catch (error) {
      console.error("Error scraping Google:", error);
      setError("Error scraping Google."); // Set the error message if an error occurs during scraping
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {error && <div>Error: {error}</div>} {/* Display error message if present */}
      {results.length > 0 && (
        <ul>
          {results.map((result, index) => (
            <li key={index}>
              <div>Business Name: {result.name}</div>
              <div>Email: {result.email}</div>
              <div>Phone Number: {result.phone}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
