import UserSignUp from './UserSignUp';

import styles from '../../styles/User.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { toggleForm } from '../../features/user/userSlice';
import UserLogin from './UserLogin';

const UserForm = () => {
  const dispatch = useDispatch();
  const { showForm, formType } = useSelector(({ user }) => user);

  const closeForm = () => {
    dispatch(toggleForm(false));
  };

  return showForm ? (
    <>
      <div
        className={styles.overlay}
        onClick={closeForm}
      ></div>
      {formType === 'signup' ? (
        <UserSignUp closeForm={closeForm} />
      ) : (
        <UserLogin closeForm={closeForm} />
      )}
    </>
  ) : (
    <></>
  );
};

export default UserForm;
