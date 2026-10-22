import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const API = import.meta.env.VITE_API_URL;

export default function OrganizerPanel() {
  const { attendee } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/events`)
      .then(res => res.json())
      .then(data => setEvents(data.events))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Organizer Panel</h2>
      <p>Welcome, {attendee?.name}</p>
      <table border="1" cellPadding="6">
        <thead>
          <tr><th>Event</th><th>Venue</th><th>Tickets Available</th></tr>
        </thead>
        <tbody>
          {events.map(e => (
            <tr key={e._id}>
              <td>{e.title}</td><td>{e.venue}</td><td>{e.ticketsAvailable}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}