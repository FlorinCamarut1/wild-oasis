import styled from 'styled-components';
import { useUser } from '../features/authentication/useUser';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import Spinner from './Spinner';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1.Load auth user
  const { isLoading, isAuthenticated } = useUser();
  // 3.if there is not auth user , redirect to /login
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  // 2.Loading spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  // 4.if there is a user, render app

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
