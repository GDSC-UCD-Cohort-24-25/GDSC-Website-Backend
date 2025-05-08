import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import db from './firebase';
import './events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    location: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch events from Firebase
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollection = collection(db, 'events');
        const eventsSnapshot = await getDocs(eventsCollection);
        const eventsList = eventsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setEvents(eventsList);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching events: ", err);
        setError("Failed to load events");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: value
    });
  };

  // Add new event
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newEvent.title || !newEvent.description || !newEvent.date) {
      setError("Please fill required fields");
      return;
    }
    
    try {
      setLoading(true);
      
      const eventData = {
        ...newEvent,
        date: Timestamp.fromDate(new Date(newEvent.date))
      };
      
      const docRef = await addDoc(collection(db, 'events'), eventData);
      
      setEvents([
        {
          id: docRef.id,
          ...eventData
        },
        ...events
      ]);
      
      setNewEvent({
        title: '',
        description: '',
        date: '',
        location: ''
      });
      
      setError(null);
      setLoading(false);
    } catch (err) {
      console.error("Error adding event: ", err);
      setError("Failed to add event");
      setLoading(false);
    }
  };

  // Format date from Timestamp
  const formatDate = (timestamp) => {
    if (!timestamp) return 'No date';
    
    try {
      const date = timestamp.toDate();
      return date.toLocaleDateString();
    } catch (err) {
      return 'Invalid date';
    }
  };

  return (
    <div>
      <h1>Events</h1>
      
      {/* Add Event Form */}
      <div>
        <h2>Add Event</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title*: </label>
            <input
              type="text"
              name="title"
              value={newEvent.title}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div>
            <label>Description*: </label>
            <textarea
              name="description"
              value={newEvent.description}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div>
            <label>Date*: </label>
            <input
              type="datetime-local"
              name="date"
              value={newEvent.date}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div>
            <label>Location: </label>
            <input
              type="text"
              name="location"
              value={newEvent.location}
              onChange={handleInputChange}
            />
          </div>
          
          <button type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Event'}
          </button>
          
          {error && <p>{error}</p>}
        </form>
      </div>
      
      {/* Events List */}
      <div>
        <h2>Events List</h2>
        
        {loading && <p>Loading...</p>}
        
        {!loading && events.length === 0 && (
          <p>No events found</p>
        )}
        
        <div>
          {events.map(event => (
            <div key={event.id} style={{border: '1px solid #ccc', margin: '10px 0', padding: '10px'}}>
              <h3>{event.title}</h3>
              <p>Date: {formatDate(event.date)}</p>
              {event.location && <p>Location: {event.location}</p>}
              <p>{event.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;