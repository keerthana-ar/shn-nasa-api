import PropTypes from 'prop-types';

const EventDetails = ({ event }) => {
    if (!event) {
        return <div className="no-event-selected">Select an event to view details.</div>;
    }

    return (
        <div className="event-details">
            <h2>{event.title}</h2>
            <p><strong>Type:</strong> {event.categories && event.categories.length > 0 ? event.categories[0].title : "N/A"}</p>
            <p><strong>Date:</strong> {event.geometry && event.geometry.length > 0 ? new Date(event.geometry[0].date).toLocaleString() : "N/A"}</p>
            <p><strong>Description:</strong> {event.description || "No description available."}</p>
            {event.sources && event.sources.length > 0 && (
                <div>
                    <strong>Sources:</strong>
                    <ul>
                        {event.sources.map((source, index) => (
                            <li key={index}>
                                <a href={source.url} target="_blank" rel="noopener noreferrer">
                                    {source.url}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

EventDetails.propTypes = {
    event: PropTypes.shape({
        title: PropTypes.string.isRequired,
        categories: PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string,
            })
        ),
        geometry: PropTypes.arrayOf(
            PropTypes.shape({
                date: PropTypes.string,
            })
        ),
        description: PropTypes.string,
        sources: PropTypes.arrayOf(
            PropTypes.shape({
                url: PropTypes.string,
            })
        ),
    }),
};

export default EventDetails;