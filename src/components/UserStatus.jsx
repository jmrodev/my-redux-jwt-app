import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../features/authSlice';

const UserStatus = () => {
  const dispatch = useDispatch();
  const { user, permissions, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <p>You are not logged in.</p>;
  }

  return (
    <div>
      <p>Logged in as: {user.username}</p>
      <p>Permissions: {permissions.join(', ')}</p>
      <button onClick={() => dispatch(logoutUser())}>Logout</button>
    </div>
  );
};

export default UserStatus;
