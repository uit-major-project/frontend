import type { NextPage } from 'next';

import styled from '@emotion/styled';

import { useReactiveVar } from '@apollo/client';
import { taskerVar, userVar } from 'src/apollo/reactiveVars';

import { Descriptions, Avatar, Menu, Divider, MenuProps } from 'antd';
import Cookies from 'js-cookie';
import Router from 'next/router';
import React from 'react';
import UserAccount from 'src/components/Account/User';
import TaskerAccount from 'src/components/Account/Tasker';

const StyledDiv = styled.div`
  // background: #efefef;
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // justify-content: center;
  // padding: 1em;
  // margin: 0 auto;
  // max-width: 120em;
  // color: ${(props) => props.theme.colors.primary};

  // .container {
  //   display: flex;
  //   flex-direction: column;
  // }

  // .container-account-section {
  //   display: flex;
  //   align-items: center;
  //   // padding: 1em 0;
  //   border: 1px solid #000;
  // }

  // .main-account-section {
  //   // display: flex;

  //   padding: 1em;

  //   max-width: 40em;
  //   border-left: 1px solid #000;
  // }
`;

const StyledDescriptions = styled(Descriptions)`
  margin-top: 1em;
  span {
    font-size: 1em;
  }
  color: ${(props) => props.theme.colors.text};
  span {
    color: ${(props) => props.theme.colors.text};
  }
`;

const items = [
  { label: 'Profile', key: 'item-1' }, // remember to pass the key prop
  { label: 'Cancel Task', key: 'item-2' }, // which is required
  { label: 'History', key: 'item-3' }, // remember to pass the key prop
  { label: 'Deactivate', key: 'item-4' }, // which is required
  // {
  //   label: 'sub menu',
  //   key: 'submenu',
  //   children: [{ label: 'item 3', key: 'submenu-item-1' }],
  // },
];

const onClick: MenuProps['onClick'] = (e) => {
  console.log('click', e);
};

const Account: NextPage = () => {
  const person_var = Cookies.get('signedin') ? userVar : taskerVar;

  const person: any = useReactiveVar(person_var as any);

  console.log('person', { person });

  // React.useEffect(() => {
  //   if (!Cookies.get('signedin') && !Cookies.get('signedin_as_tasker')) {
  //     Router.push('/login');
  //   }
  // }, []);

  if (
    (!Cookies.get('signedin') && !Cookies.get('signedin_as_tasker')) ||
    !person
  ) {
    typeof window !== 'undefined' && Router.push('/login');
  }

  return (
    <StyledDiv>
      {Cookies.get('signedin') ? (
        <UserAccount user={person} />
      ) : (
        <TaskerAccount tasker={person?.tasker} />
      )}
    </StyledDiv>
  );
};

export default Account;
