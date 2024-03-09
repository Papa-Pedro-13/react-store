import { NavLink } from 'react-router-dom';

import styles from '../../styles/Sidebar.module.css';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const { list } = useSelector(({ categories }) => categories);

  return (
    <section className={styles.sidebar}>
      <div className={styles.title}>CATEGORIES</div>
      <nav>
        <ul className={styles.menu}>
          {list.map((item) => (
            <li key={item.id}>
              <NavLink
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ''}`
                }
                to={`/categories/${item.id}`}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.footer}>
        <a
          href='/help'
          target='_blank'
          className={styles.link}
        >
          Help
        </a>
        <a
          href='/terms'
          target='_blank'
          className={styles.link}
          style={{ textDecoration: 'underline' }}
        >
          Terms & Conditions
        </a>
      </div>
    </section>
  );
};

export default Sidebar;
