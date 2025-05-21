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
    location: '',
    image: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch events from Firebase on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollection = collection(db, 'events');
        const eventsSnapshot = await getDocs(eventsCollection);
        const eventsList = eventsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // Sort events by date (most recent first)
        eventsList.sort((a, b) => b.date.toDate() - a.date.toDate());
        
        setEvents(eventsList);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching events: ", err);
        setError("Failed to load events. Please try again later.");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Handle input changes for new event form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: value
    });
  };

  // Handle form submission to add a new event
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newEvent.title || !newEvent.description || !newEvent.date) {
      setError("Please fill in all required fields");
      return;
    }
    
    try {
      setLoading(true);
      
      // Convert date string to Firestore timestamp
      const eventData = {
        ...newEvent,
        date: Timestamp.fromDate(new Date(newEvent.date)),
        createdAt: Timestamp.now()
      };
      
      const docRef = await addDoc(collection(db, 'events'), eventData);
      
      // Add new event to state
      setEvents([
        {
          id: docRef.id,
          ...eventData
        },
        ...events
      ]);
      
      // Reset form
      setNewEvent({
        title: '',
        description: '',
        date: '',
        location: '',
        image: ''
      });
      
      setError(null);
      setLoading(false);
    } catch (err) {
      console.error("Error adding event: ", err);
      setError("Failed to add event. Please try again.");
      setLoading(false);
    }
  };

  // Format date from Firestore Timestamp
  const formatDate = (timestamp) => {
    if (!timestamp) return 'No date';
    
    const date = timestamp.toDate();
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="events-container">
      <h1>Events Management</h1>
      
      {/* New Event Form */}
      <div className="event-form-container">
        <h2>Add New Event</h2>
        <form onSubmit={handleSubmit} className="event-form">
          <div className="form-group">
            <label htmlFor="title">Event Title*</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newEvent.title}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description*</label>
            <textarea
              id="description"
              name="description"
              value={newEvent.description}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="date">Date*</label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              value={newEvent.date}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={newEvent.location}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="image">Image URL</label>
            <input
              type="url"
              id="image"
              name="image"
              value={newEvent.image}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Adding...' : 'Add Event'}
          </button>
          
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
      
      {/* Events List */}
      <div className="events-list-container">
        <h2>Upcoming Events</h2>
        
        {loading && <p>Loading events...</p>}
        
        {!loading && events.length === 0 && (
          <p>No events found. Add your first event!</p>
        )}
        
        <div className="events-list">
          {events.map(event => (
            <div key={event.id} className="event-card">
              {event.image && (
                <div className="event-image">
                  <img src={event.image} alt={event.title} />
                </div>
              )}
              
              <div className="event-details">
                <h3>{event.title}</h3>
                <p className="event-date">{formatDate(event.date)}</p>
                {event.location && <p className="event-location">{event.location}</p>}
                <p className="event-description">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;