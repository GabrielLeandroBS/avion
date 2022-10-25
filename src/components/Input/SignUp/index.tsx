import React from 'react';

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
          <a
            href={'href'}
            aria-label="Change to list page products"
            rel="noreferrer"
          >
            {'Sign up'}
          </a>
        </button>
      </section>
    </label>
  );
};

export default SignUp;
