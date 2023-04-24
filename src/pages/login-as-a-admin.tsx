import React from 'react';
import type { NextPage } from 'next';

import styled from '@emotion/styled';

import { adminVar } from 'src/apollo/reactiveVars';
import Cookies from 'js-cookie';
import Router from 'next/router';
import { useReactiveVar } from '@apollo/client';
import LoginCard from 'src/components/Admin/components/LoginCard';
import { getLoggedInAdminDetails } from 'src/components/Admin/utils/auth';

// import h2 from '../../public/img/h2.jpg';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .login-content-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    // height: 100%;
    align-items: center;
    // justify-content: center;
    // margin: 0 auto;
  }

  p {
    margin: 2em 0 0.75em 0;
    letter-spacing: 0.1rem;
    font-size: 1.5rem;
    font-weight: 200;
    text-transform: uppercase;
  }
`;

const onCompleted = (data: any) => {
  adminVar(data.loginWithGoogle);

  Cookies.set('signedin_as_admin', 'true');

  Router.push('/admin/dashboard');
};

const Login: NextPage = () => {
  const admin = useReactiveVar(adminVar);

  if (Cookies.get('signedin_as_admin')) {
    const adminDetails = getLoggedInAdminDetails();
    adminVar(adminDetails);
    Router.push('/admin/dashboard');
  }

  return (
    <StyledDiv>
      <LoginCard />
      {/* <div className="login-content-container">
          <p>Login / Sign up With Google</p>
        </div> */}
    </StyledDiv>
  );
};

export default Login;
