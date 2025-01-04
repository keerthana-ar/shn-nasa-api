import axios from "axios";

const API_BASE = "https://eonet.gsfc.nasa.gov/api/v3"; // Base URL for EONET API

// Function to fetch ongoing natural disaster events
export const fetchEvents = async () => {
  try {
    const response = await axios.get(`${API_BASE}/events?status=ongoing`);
    return response.data.events; // Return events data
  } catch (error) {
    console.error("Error fetching events:", error);
    return []; // Return empty array if there's an error
  }
};