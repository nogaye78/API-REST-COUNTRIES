

export default function Card({ country, onSelect }) {
  return (
    <div className="card" onClick={onSelect}>
      <img src={country.flags.svg} alt={`${country.name.common} flag`} />
      <h2>{country.name.common}</h2>
      <p>🌍 {country.region}</p>
      <p>{country.capital ? country.capital[0] : "No capital"}</p>
      <button>Voir plus</button>
    </div>
  );
}
