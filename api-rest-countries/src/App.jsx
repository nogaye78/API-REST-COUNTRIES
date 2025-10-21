import { useEffect, useState } from "react";
import Card from "./components/Card";
import Details from "./components/Country";
import "./App.css";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("A-Z");
  const [continent, setContinent] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState(null);

  // Charger les pays
  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,region,capital,population,currencies,cca3"
    )
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setFiltered(data);
      })
      .catch((err) => console.error("Erreur de chargement :", err));
  }, []);

  // Appliquer recherche + tri + filtre
  useEffect(() => {
    let data = [...countries];

    if (search) {
      data = data.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (continent !== "All") {
      data = data.filter(
        (country) => country.region && country.region === continent
      );
    }

    data.sort((a, b) => {
      if (sort === "A-Z") return a.name.common.localeCompare(b.name.common);
      else return b.name.common.localeCompare(a.name.common);
    });

    setFiltered(data);
  }, [search, sort, continent, countries]);

  return (
    <div className="app">
      <h1 className="title">🌍 Countries of the World</h1>

      {/* Barre de recherche et filtres */}
      <div className="filters">
        <input
          type="text"
          placeholder="🔎 Search a country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="A-Z">Sort: A → Z</option>
          <option value="Z-A">Sort: Z → A</option>
        </select>

        <select value={continent} onChange={(e) => setContinent(e.target.value)}>
          <option value="All">🌍 All Continents</option>
          <option value="Africa">🌍 Africa</option>
          <option value="Americas">🌎 Americas</option>
          <option value="Asia">🌏 Asia</option>
          <option value="Europe">🌍 Europe</option>
          <option value="Oceania">🌊 Oceania</option>
        </select>
      </div>

      {/* Affichage */}
      {selectedCountry ? (
        <Details
          country={selectedCountry}
          onBack={() => setSelectedCountry(null)}
        />
      ) : (
        <div className="countries-grid">
          {filtered.map((country) => (
            <Card
              key={country.cca3}
              country={country}
              onSelect={() => setSelectedCountry(country)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
