import React, { useEffect, useState } from 'react';
import stylesProf from '../../styles/Profile.module.css';
import styles from '../../styles/User.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../features/user/userSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(({ user }) => user);
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    avatar: '',
  });

  useEffect(() => {
    if (!currentUser) return;

    setValues(currentUser);
  }, [currentUser]);

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isNotEmpty = Object.values(values).every((val) => val);
    if (!isNotEmpty) return;
    console.log(values);
    dispatch(updateUser(values));
  };

  return (
    <section className={stylesProf.profile}>
      {!currentUser ? (
        <span>You need to login</span>
      ) : (
        <>
          <form
            className={styles.form}
            onSubmit={handleSubmit}
          >
            <div className={styles.group}>
              <input
                name='email'
                type='email'
                value={values.email}
                required
                placeholder='Your email'
                onChange={handleChange}
              />
            </div>
            <div className={styles.group}>
              <input
                name='name'
                type='name'
                value={values.name}
                required
                placeholder='Your name'
                onChange={handleChange}
              />
            </div>
            <div className={styles.group}>
              <input
                name='password'
                type='password'
                value={values.password}
                required
                placeholder='Your password'
                onChange={handleChange}
              />
            </div>

            <div className={styles.group}>
              <input
                name='avatar'
                type='avatar'
                value={values.avatar}
                required
                placeholder='Your avatar'
                onChange={handleChange}
              />
            </div>

            <button
              type='submit'
              className={styles.submit}
            >
              Update
            </button>
          </form>
        </>
      )}
    </section>
  );
};

export default Profile;
