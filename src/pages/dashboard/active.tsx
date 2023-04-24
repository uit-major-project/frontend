import type { NextPage } from 'next';

// import styled from '@emotion/styled';
import Router from 'next/router';
// import { useReactiveVar } from '@apollo/client';

// import { userVar } from 'src/apollo/reactiveVars';
import React from 'react';
import UserDashActive from 'src/components/Pages/userDashActive';
// import TaskerDashActive from 'src/components/Pages/taskerDashActive';
import { useReactiveVar } from '@apollo/client';
import { userVar } from 'src/apollo/reactiveVars';

const Active: NextPage = () => {
  const user = useReactiveVar(userVar);

  React.useEffect(() => {
    if (!user) {
      Router.push('/login');
    }
  }, []);

  return (
    <div>
      <UserDashActive />
    </div>
  );
};

export default Active;
