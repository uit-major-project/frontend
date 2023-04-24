import type { NextPage } from 'next';

import styled from '@emotion/styled';
import Router from 'next/router';
import { useReactiveVar } from '@apollo/client';

import { userVar } from 'src/apollo/reactiveVars';
import React from 'react';
import BookTask from 'src/components/BookTask';

const StyledDiv = styled.div``;

const Explore: NextPage = () => {
  const user = useReactiveVar(userVar);

  React.useEffect(() => {
    if (!user) {
      Router.push('/login');
    }
  }, []);

  return (
    <StyledDiv>
      <BookTask title="Book Your Next Task" />
    </StyledDiv>
  );
};

export default Explore;
