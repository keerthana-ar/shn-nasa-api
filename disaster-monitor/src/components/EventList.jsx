import PropTypes from 'prop-types';

const EventList = ({ events, onSelectEvent }) => {
    if (!events || events.length === 0) {
        return <div className="no-events">No events found.</div>;
    }

    return (
        <ul className="event-list">
            {events.map((event) => (
                <li key={event.id} className="event-item" onClick={() => onSelectEvent(event)}>
                    <span className="event-title">{event.title}</span>
                    {event.categories && event.categories.length > 0 && (
                        <span className="event-category"> ({event.categories[0].title})</span>
                    )}
                </li>
            ))}
        </ul>
    );
};

EventList.propTypes = {
    events: PropTypes.array,
    onSelectEvent: PropTypes.func.isRequired,
};

export default EventList;