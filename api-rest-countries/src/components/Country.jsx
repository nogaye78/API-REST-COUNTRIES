

export default function Details({ country, onBack }) {
  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((cur) => cur.name)
        .join(", ")
    : "Unknown";

  return (
    <div className="details">
      <button className="back" onClick={onBack}>⬅ Back</button>
      <h2>{country.name.common}</h2>
      <img src={country.flags.svg} alt={`${country.name.common} flag`} />
      <p>Region: {country.region}</p>
      <p>Capital: {country.capital ? country.capital[0] : "No capital"}</p>
      <p> Population: {country.population.toLocaleString()}</p>
      <p> Currency: {currencies}</p>
    </div>
  );
}
