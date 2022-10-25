import React from 'react';
import { featureProps } from '../../types/feature';
import CardFeature from '../Card/Feature';

const Feature: React.FC<featureProps> = ({ feature, title }: featureProps) => {
  return (
    <section className="c-feature">
      <h2 className="c-feature__title">{title}</h2>
      <div className="c-feature__wrapper">
        {feature.map(({ title, description, image }) => (
          <CardFeature
            image={image}
            title={title}
            description={description}
            key={title}
          />
        ))}
      </div>
    </section>
  );
};

export default Feature;
