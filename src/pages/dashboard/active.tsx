import type { NextPage } from 'next';

// import styled from '@emotion/styled';
import Cookies from 'js-cookie';
import Router from 'next/router';
// import { useReactiveVar } from '@apollo/client';

// import { userVar } from 'src/apollo/reactiveVars';
import React from 'react';
import UserDashActive from 'src/components/Pages/userDashActive';
import TaskerDashActive from 'src/components/Pages/taskerDashActive';

if (!Cookies.get('signedin') && !Cookies.get('signedin_as_tasker')) {
  typeof window !== 'undefined' && Router.push('/login');
}

const Active: NextPage = () => {
  return (
    <div>
      {Cookies.get('signedin') ? <UserDashActive /> : <TaskerDashActive />}
    </div>
  );
};

export default Active;
