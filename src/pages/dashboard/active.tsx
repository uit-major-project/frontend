import type { NextPage } from 'next';

import styled from '@emotion/styled';
import Cookies from 'js-cookie';
import Router from 'next/router';
// import { useReactiveVar } from '@apollo/client';

// import { userVar } from 'src/apollo/reactiveVars';
import React from 'react';
import EmptyDisplay from 'src/components/EmptyDisplay';

import { RiTodoLine } from 'react-icons/ri';

const StyledDiv = styled.div`
  padding: 3rem;
`;

const Active: NextPage = () => {
  // const user = useReactiveVar(userVar);

  React.useEffect(() => {
    if (!Cookies.get('signedin')) {
      Router.push('/login');
    }
  }, []);

  const bookingAction = {
    href: '/dashboard/explore',
    name: 'Book now',
  };

  return (
    <StyledDiv>
      <EmptyDisplay
        icon={<RiTodoLine />}
        title="Have something you want to get done?"
        action={bookingAction}
      />
    </StyledDiv>
  );
};

export default Active;
