import React from 'react';
import { FilterButtonProps } from '../../../types/button/filter';

const ButtonFilter: React.FC<FilterButtonProps> = ({
  filterButtonProps,
}: FilterButtonProps) => {
  const handleClick = () => {
    return filterButtonProps();
  };

  return (
    <button
      type="button"
      aria-label="add filter"
      className="c-button  c-button--dark c-button--smaller"
      onClick={() => handleClick()}
    >
      <span>Add</span>
    </button>
  );
};

export default ButtonFilter;
