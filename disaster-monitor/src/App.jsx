import { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EventList from './components/EventList';
import EventDetails from './components/EventDetails';
import './App.css';

const API_BASE = "https://eonet.gsfc.nasa.gov/api/v3";

function App() {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${API_BASE}/categories`);
                setCategories(response.data.categories);
            } catch (error) {
                console.error("Error fetching categories:", error);
                setError("Error fetching categories.");
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            setError(null);
            try {
                let url = `${API_BASE}/events`;

                if (selectedCategoryId) {
                    url += `&category=${selectedCategoryId}`;
                }

                if (startDate && endDate) {
                    url += `&start=${startDate.toISOString().slice(0, 10)}&end=${endDate.toISOString().slice(0, 10)}`;
                }

                const response = await axios.get(url);
                setEvents(response.data.events);
            } catch (err) {
                setError(err.message || "Failed to fetch events.");
                console.error("Error fetching events:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [selectedCategoryId, startDate, endDate]);

    if (loading) return <div className="loading">Loading events...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="App">
            <h1>Natural Disaster Monitor</h1>
            <div className="filter-area">
                <select value={selectedCategoryId || ''} onChange={(e) => setSelectedCategoryId(e.target.value === "" ? null : e.target.value)}>
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.title}
                        </option>
                    ))}
                </select>

                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    maxDate = {endDate}
                    placeholderText="Start Date"
                />
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    placeholderText="End Date"
                />
            </div>
            <div className="content-area">
                <EventList events={events} onSelectEvent={setSelectedEvent} />
                <EventDetails event={selectedEvent} />
            </div>
        </div>
    );
}

export default App;