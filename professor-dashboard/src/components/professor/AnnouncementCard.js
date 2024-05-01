import React from 'react';
import PropTypes from 'prop-types';

const AnnouncementCard = ({ announcement, onClick }) => {
  return (
    <div className="announcement-card" onClick={onClick} role="button" tabIndex={0}>
      <h3 className="announcement-title">{announcement.title}</h3>
      <p className="announcement-message">{announcement.message}</p>
    </div>
  );
};

AnnouncementCard.propTypes = {
  announcement: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
};

export default AnnouncementCard;
