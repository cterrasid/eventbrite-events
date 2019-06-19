import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const EventCard = props => {
  const { eventName, eventImage, eventDate, eventPlace } = props;

  const date = new Date(eventDate);
  const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dayWeek = week[date.getDay()];
  const month = months[date.getMonth()].substring(0, 3);
  const numDay = date.getDate();
  const formatedDate = `${dayWeek}, ${month} ${numDay} `;
  return (
    <div className="event-card__container">
      <div
        className="event-card__img"
        style={{ backgroundImage: `url(${eventImage})` }}
      />
      <div className="event-card__info-container">
        <p className="event-card__date">{formatedDate}</p>
        <h2 className="event-card__name">{eventName}</h2>
        <p className="event-card__place">{`${eventPlace}, Madrid`}</p>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  eventName: PropTypes.string.isRequired,
  eventImage: PropTypes.string.isRequired,
  eventDate: PropTypes.string.isRequired,
  eventPlace: PropTypes.string.isRequired,
};

export default EventCard;
