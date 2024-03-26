import { Link, useNavigate } from 'react-router-dom';

import styles from '../../styles/Header.module.css';

import { ROUTES } from '../../utils/routes';

import LOGO from '../../images/logo.svg';
import AVATAR from '../../images/avatar.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { toggleForm } from '../../features/user/userSlice';
import { useEffect, useState } from 'react';
import { useGetProductsQuery } from '../../features/api/apiSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser } = useSelector(({ user }) => user);

  const [values, setValues] = useState({ name: 'Guest', avatar: AVATAR });
  const [searchValue, setSearchValue] = useState('');

  const { data, isLoading } = useGetProductsQuery({ title: searchValue });

  useEffect(() => {
    if (!currentUser) return;

    setValues(currentUser);
  }, [currentUser]);

  const handleClick = () => {
    if (!currentUser) {
      dispatch(toggleForm(true));
    } else {
      navigate(ROUTES.PROFILE);
    }
  };

  const handleSearch = ({ target: { value } }) => {
    setSearchValue(value);
  };

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}>
          <img
            src={LOGO}
            alt=''
          />
        </Link>
      </div>
      <div className={styles.info}>
        <div
          className={styles.user}
          onClick={handleClick}
        >
          <div
            className={styles.avatar}
            style={{ backgroundImage: `url(${values.avatar})` }}
          />
          <div className={styles.username}>{values.name}</div>
        </div>
      </div>
      <form className={styles.form}>
        <div className={styles.icon}>
          <svg className='icon'>
            <use xlinkHref={`../../../public/sprite.svg#search`} />
          </svg>
        </div>
        <div className={styles.input}>
          <input
            type='search'
            className=''
            name='search'
            placeholder='Search...'
            autoComplete='off'
            onChange={handleSearch}
            value={searchValue}
          />
        </div>
        {searchValue && (
          <div className={styles.box}>
            {isLoading
              ? 'Loading'
              : !data.length
              ? 'No results'
              : data.map(({ title, images, id }) => (
                  <Link
                    to={`/products/${id}`}
                    key={id}
                    onClick={() => setSearchValue('')}
                    className={styles.item}
                  >
                    <div
                      className={styles.image}
                      style={{ backgroundImage: `url(${images[0]})` }}
                    ></div>
                    <div className={styles.title}>{title}</div>
                  </Link>
                ))}
          </div>
        )}
      </form>
      <div className={styles.account}>
        <Link
          to={ROUTES.PROFILE}
          className={styles.favourites}
        >
          <svg className={styles['icon-fav']}>
            <use xlinkHref={`../../../public/sprite.svg#heart`} />
          </svg>
        </Link>
        <Link
          to={ROUTES.CART}
          className={styles.cart}
        >
          <svg className={styles['icon-cart']}>
            <use xlinkHref={`../../../public/sprite.svg#bag`} />
          </svg>
          <span className={styles.count}>2</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
