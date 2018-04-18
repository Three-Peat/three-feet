import React from 'react';
import PropTypes from 'prop-types';

const SearchProducts = props => {

  const handleChange = props.handleChange;
  const inputValue = props.inputValue;

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name or brand.."
        onChange={handleChange}
        value={inputValue}
      />
    </div>
  );
};

export default SearchProducts;
