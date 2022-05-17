import React from 'react';
import Router from 'next/router';
import type { NextPage } from 'next';
// import Head from 'next/head';

import styled from '@emotion/styled';
import Cookies from 'js-cookie';

const StyledDiv = styled.div``;

const Home: NextPage = () => {
  React.useEffect(() => {
    if (Cookies.get('jwt')) {
      Router.push('/dashboard/explore');
    }
  }, []);

  return (
    <StyledDiv>
      <p>Start</p>
      {/* {Cookies.get('signedin') && <p> You are signed in</p>} */}
    </StyledDiv>
  );
};

export default Home;
