import { useEffect, useState } from 'react';
import EventCard from '../components/EventCard';
import { useAuth } from '../context/AuthContext';

const API = import.meta.env.VITE_API_URL;

export default function EventsPage() {
  const { token } = useAuth();

  // Task 4 states
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  // Task 2 booking form states
  const [selectedEvent, setSelectedEvent] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState(null);

  const loadEvents = () => {
    fetch(`${API}/events`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load events');
        return res.json();
      })
      .then(data => setEvents(data.events))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadEvents(); }, []);

  // filter on render, no new API call
  const filtered = events.filter(e => e.title.toLowerCase().includes(search.toLowerCase()));

  const handleBook = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      const res = await fetch(`${API}/tickets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ eventId: selectedEvent, quantity: Number(quantity) })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Booking failed');
      setMessage({ type: 'success', text: 'Tickets booked successfully!' });
      loadEvents(); // refresh availability
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  if (loading) return <p style={{ padding: 20 }}>Loading events...</p>;
  if (error) return <p style={{ padding: 20, color: 'red' }}>Error: {error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Events</h2>

      <input
        placeholder="Search by title..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filtered.map(ev => (
          <EventCard
            key={ev._id}
            title={ev.title}
            category={ev.category}
            date={ev.date}
            venue={ev.venue}
            ticketsAvailable={ev.ticketsAvailable}
            onBook={() => setSelectedEvent(ev._id)}
          />
        ))}
      </div>

      <h3>Book Tickets</h3>
      <form onSubmit={handleBook}>
        <select value={selectedEvent} onChange={e => setSelectedEvent(e.target.value)} required>
          <option value="">-- Select event --</option>
          {events.map(ev => (
            <option key={ev._id} value={ev._id}>{ev.title}</option>
          ))}
        </select>{' '}
        <input type="number" min="1" value={quantity} onChange={e => setQuantity(e.target.value)} />{' '}
        <button type="submit">Confirm Booking</button>
      </form>
      {message && (
        <p style={{ color: message.type === 'error' ? 'red' : 'green' }}>{message.text}</p>
      )}
    </div>
  );
}