import type { NextPage } from 'next';

import styled from '@emotion/styled';
import Cookies from 'js-cookie';
import Router from 'next/router';

const StyledDiv = styled.div``;

const Dashboard: NextPage = () => {
  if (!Cookies.get('signedin')) {
    Router.push('/login');
  }

  return (
    <StyledDiv>
      <p>Book your task</p>
    </StyledDiv>
  );
};

export default Dashboard;
