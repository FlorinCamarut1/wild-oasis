import React from 'react';
import Select from './Select';
import { useSearchParams } from 'react-router-dom';

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e) => {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  };
  const sortBy = searchParams.get('sortBy') || '';

  return (
    <Select
      options={options}
      type='white'
      onChange={handleChange}
      value={sortBy}
    />
  );
}

export default SortBy;
