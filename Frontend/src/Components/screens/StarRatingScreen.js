import React from 'react';
import PropTypes from 'prop-types';

const StarRating = ({ rating, onRatingChange }) => {
    const handleClick = (newRating) => {
        onRatingChange(newRating);
    };

    return (
        <div>
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    style={{ cursor: 'pointer', color: star <= rating ? '#ffd700' : '#ccc' }}
                    onClick={() => handleClick(star)}>
                    &#9733;
                </span>
            ))}
        </div>
    );
};

StarRating.propTypes = {
    rating: PropTypes.number.isRequired,
    onRatingChange: PropTypes.func.isRequired,
};

export default StarRating;
