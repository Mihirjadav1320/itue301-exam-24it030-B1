require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Attendee = require('./models/Attendee');
const Event = require('./models/Event');

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Attendee.deleteMany();
  await Event.deleteMany();

  const pass = await bcrypt.hash('123456', 10);
  await Attendee.create([
    { name: 'Mihir', email: 'attendee@test.com', phone: '9999999999', password: pass, role: 'attendee' },
    { name: 'Organizer', email: 'organizer@test.com', phone: '8888888888', password: pass, role: 'organizer' }
  ]);

  await Event.create([
    { title: 'Tech Conference 2026', category: 'Technology', date: '2026-11-10', venue: 'Ahmedabad', ticketsAvailable: 50 },
    { title: 'Music Fest', category: 'Music', date: '2026-12-01', venue: 'Vadodara', ticketsAvailable: 100 },
    { title: 'Startup Meetup', category: 'Business', date: '2026-11-20', venue: 'Surat', ticketsAvailable: 30 },
    { title: 'Art Exhibition', category: 'Art', date: '2026-12-15', venue: 'Rajkot', ticketsAvailable: 0 },
    { title: 'Food Carnival', category: 'Food', date: '2026-11-25', venue: 'Anand', ticketsAvailable: 20 }
  ]);

  console.log('Seeded: attendee@test.com / organizer@test.com, password 123456');
  process.exit();
})();