import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="ht-100p d-flex align-items-center justify-content-center flex-column">
      <h1>404 - Not Found :(</h1>
      <button className="btn btn-primary" onClick={() => navigate('/')}>
        Go to Home
      </button>
    </div>
  );
};

export default NotFound;
