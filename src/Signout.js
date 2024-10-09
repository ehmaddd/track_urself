import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function Signout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = localStorage.getItem('user');
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);

  useEffect(() => {
    dispatch({ type: 'LOGOUT_USER', payload: { user } });
    localStorage.removeItem('user');
    navigate('/login');
  });

  return (
    <div>
      <h2>Signing you out...</h2>
    </div>
  );
}

export default Signout;
