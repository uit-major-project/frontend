import React from 'react';

import styled from '@emotion/styled';
import { Row, Col, Divider, Drawer } from 'antd';
import { IoNotificationsOutline, IoCloseOutline } from 'react-icons/io5';

import data from './data';

const StyledIoCloseOutline = styled(IoCloseOutline)`
  margin: auto 0;
  width: 1.75em;
  height: 1.75em;
`;

const StyledDivider = styled(Divider)`
  margin: 0;
  background-color: ${(props) => props.theme.colors.text};
  width: 100%;
`;

const DrawerHeader = styled.div`
  padding-top: 0.25em;
`;

const DrawerTitle = styled.div`
  text-align: center;
  font-size: 1.5em;
`;

const DrawerHeaderRow = styled(Row)`
  margin-bottom: 0;
  padding: 1.25em 0 1.25em 0.5em;
`;

const DrawerHeaderCol = styled(Col)`
  display: flex !important;
  align-item: center;
  justify-content: center;
`;

const CloseIcon = styled.div`
  display: flex;
  align-item: center;
  justify-content: center;
`;

const MenuItemRow = styled(Row)`
  margin-bottom: 0;
  padding: 0.75em 0 0.75em 0.5em;
  cursor: pointer;

  .remove-icon {
    display: none;
  }

  &:hover {
    .remove-icon {
      display: block;
    }
  }
`;

const MenuItemCol = styled(Col)`
  display: flex;
  align-item: center;
`;

const MenuItemIconCol = styled(Col)`
  padding-left: 0.5em;
  display: flex;
  align-item: center;
`;

const ItemInfo = styled.div`
  margin-bottom: 0.1em;
`;

const ItemHeading = styled.div`
  font-size: 1.25em;
  color: ${(props) => props.theme.colors.text};
`;

const ItemDesc = styled.div`
  font-size: 1em;
  color: ${(props) => props.theme.colors.text};
`;

const ClearAllButton = styled.button`
  margin: auto 1em 1em 1em;
  font-size: 1.25em;
  padding: 0.2em;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.text};
  color: ${(props) => props.theme.colors.text};
  border: none;
`;

interface NotificationDrawerProps {
  children?: JSX.Element;
  closable?: boolean;
  className?: string;
  placement?: 'right' | 'left';
  notificationsDrawerClose(): void;
  isNotificationsDrawerVisible: boolean;
}

const NotificationDrawer = (props: NotificationDrawerProps): JSX.Element => {
  return (
    <div className={props.className}>
      <Drawer
        placement="right"
        closable={props.closable}
        // onDrawerClose={props.notificationsDrawerClose}
        // isDrawerVisible={props.isNotificationsDrawerVisible}
      >
        <DrawerHeader>
          <DrawerHeaderRow>
            <MenuItemIconCol span={4}>
              <IoNotificationsOutline className="menuitem-icon" />
            </MenuItemIconCol>
            <DrawerHeaderCol span={16}>
              <DrawerTitle>Notifications</DrawerTitle>
            </DrawerHeaderCol>
            <DrawerHeaderCol span={4}>
              <CloseIcon>
                <StyledIoCloseOutline
                  onClick={props.notificationsDrawerClose}
                />
              </CloseIcon>
            </DrawerHeaderCol>
          </DrawerHeaderRow>
        </DrawerHeader>
        <StyledDivider />
        {data.map((item: any, index: number) => {
          return (
            <div key={index}>
              <MenuItemRow
                align="middle"
                justify="space-between"
                className="menuitem"
              >
                <MenuItemIconCol span={4}>{item.icon}</MenuItemIconCol>
                <MenuItemCol span={17}>
                  <ItemInfo>
                    <ItemHeading>{item.text}</ItemHeading>
                    <ItemDesc>{item.time}</ItemDesc>
                  </ItemInfo>
                </MenuItemCol>
                <MenuItemCol span={3}>
                  <CloseIcon className={'remove-icon'}>
                    <StyledIoCloseOutline
                      onClick={() =>
                        console.log('TODO: remove this notifivation item')
                      }
                    />
                  </CloseIcon>
                </MenuItemCol>
              </MenuItemRow>
            </div>
          );
        })}
        <ClearAllButton>Clear all</ClearAllButton>
      </Drawer>
    </div>
  );
};

export default NotificationDrawer;
