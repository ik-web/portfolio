import React from 'react';

import styles from './Works.module.scss';
import { useAppContext } from 'hooks/useAppContext';
import PageBackground from 'components/PageBackground/PageBackground';
import Work from 'components/Work/Work';

const Works = () => {
  const { works } = useAppContext();

  return (
    <section className={styles.works}>
      <PageBackground id='works' />
      <div className='container'>
        <ul className={styles.works__inner}>
          {works.map(work => (
            <li key={work.name}>
              <Work work={work} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Works;
