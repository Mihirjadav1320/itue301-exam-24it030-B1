import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const API = import.meta.env.VITE_API_URL;

export default function MyTicketsPage() {
  const { token } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API}/tickets/my`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        if (!res.ok) throw new Error('Failed to load tickets');
        return res.json();
      })
      .then(data => setTickets(data.tickets))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <p style={{ padding: 20 }}>Loading tickets...</p>;
  if (error) return <p style={{ padding: 20, color: 'red' }}>Error: {error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>My Tickets</h2>
      {tickets.length === 0 && <p>No tickets booked yet.</p>}
      {tickets.map(t => (
        <div key={t._id} style={{ border: '1px solid #ccc', padding: 10, margin: 8 }}>
          <b>{t.eventId?.title}</b> | {t.eventId?.venue} | {t.eventId && new Date(t.eventId.date).toLocaleDateString()}
          <br />Quantity: {t.quantity} | Status: {t.status}
        </div>
      ))}
    </div>
  );
}