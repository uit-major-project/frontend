import React from 'react';
import Router from 'next/router';
import type { NextPage } from 'next';
// import Head from 'next/head';

import styled from '@emotion/styled';
import Cookies from 'js-cookie';
import { userVar } from 'src/apollo/reactiveVars';
import { useReactiveVar } from '@apollo/client';

const StyledDiv = styled.div``;

const Home: NextPage = () => {
  const user = useReactiveVar(userVar);

  React.useEffect(() => {
    if (Cookies.get('signedin') && user) {
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
