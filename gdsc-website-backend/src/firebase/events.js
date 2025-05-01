import db from './firebase.js';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

// Function to display events on the page
function displayEvents(events) {
  const container = document.getElementById('events-container');
  container.innerHTML = ''; // Clear loading message
  
  if (events.length === 0) {
    container.innerHTML = '<p>No events found</p>';
    return;
  }
  
  // Loop through events and create HTML for each
  events.forEach(event => {
    const eventCard = document.createElement('div');
    eventCard.className = 'event-card';
    
    // Format date (Firestore Timestamp to Date object)
    let dateStr = 'Date not available';
    if (event.date && typeof event.date.toDate === 'function') {
      dateStr = event.date.toDate().toLocaleDateString();
    }
    
    // Create event HTML
    eventCard.innerHTML = `
      <h2>${event.title || 'No Title'}</h2>
      <p><strong>Date:</strong> ${dateStr}</p>
      <p><strong>Location:</strong> ${event.location || 'No Location'}</p>
      <p>${event.description || 'No Description'}</p>
    `;
    
    container.appendChild(eventCard);
  });
}

// Export the function so it can be called from elsewhere if needed
export { displayEvents };