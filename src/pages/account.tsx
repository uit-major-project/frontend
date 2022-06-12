import type { NextPage } from 'next';

import styled from '@emotion/styled';

import { useReactiveVar } from '@apollo/client';
import { userVar } from 'src/apollo/reactiveVars';

import { Descriptions, Avatar, Menu, Divider, MenuProps } from 'antd';
import Cookies from 'js-cookie';
import Router from 'next/router';
import React from 'react';

const StyledDiv = styled.div`
  // background: #efefef;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1em;
  margin: 0 auto;
  max-width: 120em;
  color: ${(props) => props.theme.colors.primary};

  .container {
    display: flex;
    flex-direction: column;
  }

  .container-account-section {
    display: flex;
    align-items: center;
    // padding: 1em 0;
    border: 1px solid #000;
  }

  .main-account-section {
    // display: flex;

    padding: 1em;

    max-width: 40em;
    border-left: 1px solid #000;
  }
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
  const user = useReactiveVar(userVar);

  React.useEffect(() => {
    if (!Cookies.get('signedin')) {
      Router.push('/login');
    }
  }, []);

  return (
    <StyledDiv>
      <div className="container">
        <h2>Your Account</h2>

        <div className="container-account-section">
          <div className="account-menu">
            <Menu
              items={items}
              onClick={onClick}
              style={{ width: 200 }}
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode="inline"
            />
          </div>

          <div className="main-account-section">
            {user?.image ? (
              <Avatar
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                src={user?.image}
              />
            ) : (
              <Avatar size={'large'}>{user?.firstname[0]}</Avatar>
            )}

            <Divider type="vertical" />

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
          </div>
        </div>
      </div>
    </StyledDiv>
  );
};

export default Account;
