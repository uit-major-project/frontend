import type { NextPage } from 'next';
// import Head from 'next/head';

import styled from '@emotion/styled';
import Cookies from 'js-cookie';

const StyledDiv = styled.div``;

const Home: NextPage = () => {
  return (
    <StyledDiv>
      <p>Start</p>
      {Cookies.get('signedin') && <p> You are signed in</p>}
    </StyledDiv>
  );
};

export default Home;
