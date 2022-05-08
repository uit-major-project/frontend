import type { NextPage } from 'next';

import styled from '@emotion/styled';
import Cookies from 'js-cookie';
import Router from 'next/router';
import { useReactiveVar } from '@apollo/client';

import { userVar } from 'src/apollo/reactiveVars';
import React from 'react';

const StyledDiv = styled.div``;

const Dashboard: NextPage = () => {
  const user = useReactiveVar(userVar);

  React.useEffect(() => {
    if (!Cookies.get('signedin')) {
      Router.push('/login');
    }
  }, []);

  return (
    <StyledDiv>
      <p>Book your task {user?.firstname}</p>
    </StyledDiv>
  );
};

export default Dashboard;
