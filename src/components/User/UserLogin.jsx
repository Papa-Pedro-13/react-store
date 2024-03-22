import { useState } from 'react';
import styles from '../../styles/User.module.css';
import { useDispatch } from 'react-redux';
import { loginUser, toggleFormType } from '../../features/user/userSlice';
const UserLogin = ({ closeForm }) => {
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isNotEmpty = Object.values(values).every((val) => val);
    if (!isNotEmpty) return;
    console.log(values);
    dispatch(loginUser(values));
    closeForm();
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.close}
        onClick={() => closeForm()}
      >
        <svg className='icon'>
          <use xlinkHref={`${import.meta.env.BASE_URL}sprite.svg#close`} />
        </svg>
      </div>
      <div className={styles.title}>Sign Up</div>
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
            name='password'
            type='password'
            value={values.password}
            required
            placeholder='Your password'
            onChange={handleChange}
          />
        </div>

        <div
          className={styles.link}
          onClick={() => dispatch(toggleFormType('signup'))}
        >
          Create an account
        </div>
        <button
          type='submit'
          className={styles.submit}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default UserLogin;
