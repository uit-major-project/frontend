import type { NextPage } from 'next';

import styled from '@emotion/styled';

import { useReactiveVar } from '@apollo/client';
import { userVar } from 'src/apollo/reactiveVars';

import { Descriptions, Avatar } from 'antd';
import Cookies from 'js-cookie';
import Router from 'next/router';
import React from 'react';

const StyledDiv = styled.div`
  align-items: center;
  padding: 8em 1em 0 1em;
  margin: 0 auto;
  max-width: 120em;
  color: ${(props) => props.theme.colors.primary};
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

const Account: NextPage = () => {
  const user = useReactiveVar(userVar);

  React.useEffect(() => {
    if (!Cookies.get('signedin')) {
      Router.push('/login');
    }
  }, []);

  return (
    <StyledDiv>
      <h2>Your Account</h2>

      {user?.image ? (
        <Avatar size={'large'} src={user?.image} />
      ) : (
        <Avatar size={'large'}>{user?.firstname[0]}</Avatar>
      )}
      <StyledDescriptions>
        <Descriptions.Item label="Name" span={3}>
          {user?.firstname} {user?.lastname}
        </Descriptions.Item>
        <Descriptions.Item label="Email" span={3}>
          {user?.email ?? user?.email}
        </Descriptions.Item>
        <Descriptions.Item label="Phone" span={3}>
          {user?.phone ? user.phone : 'please add a phone number'}
        </Descriptions.Item>
        {/* <Descriptions.Item label="Remark">empty</Descriptions.Item> */}
        <Descriptions.Item label="Address" span={3}>
          {user?.permanentAddress
            ? user.permanentAddress
            : 'please add your permanent address'}
        </Descriptions.Item>
      </StyledDescriptions>
    </StyledDiv>
  );
};

export default Account;
