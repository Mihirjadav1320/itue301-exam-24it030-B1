export default function EventCard({ title, category, date, venue, ticketsAvailable, onBook }) {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: 8, padding: 12, margin: 8, width: 260 }}>
      <h3>{title}</h3>
      <p>Category: {category}</p>
      <p>Date: {new Date(date).toLocaleDateString()}</p>
      <p>Venue: {venue}</p>
      <p>Tickets available: {ticketsAvailable}</p>
      {ticketsAvailable === 0
        ? <span style={{ background: 'red', color: 'white', padding: '2px 8px', borderRadius: 4 }}>Sold Out</span>
        : <button onClick={onBook}>Book</button>}
    </div>
  );
}
