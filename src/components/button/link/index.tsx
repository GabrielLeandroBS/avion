import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';

import { LinkButtonProps } from '../../../types/button/link';

const ButtonLink: React.FC<LinkButtonProps> = ({
  title,
  href,
  color,
  isLoading,
}: LinkButtonProps) => {
  return (
    <>
      {isLoading ? (
        <Skeleton width={170} height={60} />
      ) : (
        <button
          aria-label="only to change url"
          className={`c-button ${color ? `c-button--${color}` : ''}`}
        >
          <Link to={href}>{title}</Link>
        </button>
      )}
    </>
  );
};

export default ButtonLink;
