import React from 'react';
import { Link } from 'react-router-dom';

import { buttonProps } from '../../../types/button/button';

const ButtonLink: React.FC<buttonProps> = ({
  title,
  href,
  color,
}: buttonProps) => {
  console.log(title, href)
  return (
    <button className={`c-button ${color ? `c-button--${color}` : ''}`}>
      <Link to={href} aria-label="Change to list page products">
        {title}
      </Link>
    </button>
  );
};

export default ButtonLink;
