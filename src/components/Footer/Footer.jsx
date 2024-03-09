import { Link } from 'react-router-dom';

import styles from '../../styles/Footer.module.css';

import { ROUTES } from '../../utils/routes';

import LOGO from '../../images/logo.svg';

const Footer = () => {
  return (
    <section className={styles.footer}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}>
          <img
            src={LOGO}
            alt=''
          />
        </Link>
      </div>
      <div className={styles.rights}>
        Developed by{' '}
        <a
          href=''
          target='_blank'
          rel='noreferrer'
        >
          Aleksandr Ostrovskii
        </a>
      </div>

      <div className={styles.socials}>
        <a
          href='https://instagram.com'
          target='_blank'
          rel='noreferrer'
        >
          <svg className='icon'>
            <use xlinkHref={`../../../public/sprite.svg#instagram`} />
          </svg>
        </a>

        <a
          href='https://facebook.com'
          target='_blank'
          rel='noreferrer'
        >
          <svg className='icon'>
            <use xlinkHref={`../../../public/sprite.svg#facebook`} />
          </svg>
        </a>

        <a
          href='https://youtube.com'
          target='_blank'
          rel='noreferrer'
        >
          <svg className='icon'>
            <use xlinkHref={`../../../public/sprite.svg#youtube`} />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Footer;
