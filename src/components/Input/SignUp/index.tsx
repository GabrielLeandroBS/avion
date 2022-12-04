import React from 'react';
import { Link } from 'react-router-dom';

const SignUp: React.FC = () => {
  return (
    <label className="c-signup">
      <section className="c-signup__wrapper">
        <input
          type="text"
          className="c-signup__input"
          placeholder="your@email.com"
        />

        <button className="c-button c-button--dark">
          <Link to={'/href'} aria-label="Change page" rel="noreferrer">
            Sign up
          </Link>
        </button>
      </section>
    </label>
  );
};

export default SignUp;
