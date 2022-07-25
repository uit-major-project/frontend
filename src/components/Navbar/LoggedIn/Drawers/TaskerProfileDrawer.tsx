import React from 'react';

import NextLink from 'next/link';

import { useReactiveVar } from '@apollo/client';
import styled from '@emotion/styled';
import { Drawer, Row, Col, Divider, Modal } from 'antd';
// import { useTheme } from '@emotion/react';

import { taskerVar } from 'src/apollo/reactiveVars';
import { AiOutlineLogout } from 'react-icons/ai';
import { BiSupport } from 'react-icons/bi';
import { logout } from 'src/utils/logoutUtil';
import { MdAddTask } from 'react-icons/md';
import { FaTasks } from 'react-icons/fa';

interface Props {
  className?: string;
  children?: JSX.Element;
  profileDrawerClose(): void;
  isProfileDrawerVisible: boolean;
  // tasker: any;
}

const SUPPORT_EMAIL = 'support@handymanservices.in';

const LogoutModal = styled(Modal)`
  p {
    font-size: 1.15em;
  }
`;

const StyledDrawer = styled(Drawer)`
  .ant-drawer-content-wrapper {
    // height: calc(100vh - 5em) !important;
    bottom: 0;
    min-width: 22.5em;
  }
  .ant-drawer-content {
    background-color: ${(props) => props.theme.colors.background};
  }
  .ant-drawer-body {
    padding: 0;
  }
  .menuitem {
    margin-bottom: 0;
    padding: 0.75em 0 0.75em 0.5em;
    // height: 5.25em;
    cursor: pointer;
  }
  .menuitem:hover {
    background-color: ${(props) => props.theme.colors.primary};
    .menuitem-heading,
    .menuitem-desc {
      color: ${(props) => props.theme.colors.text} !important;
    }

    color: ${(props) => props.theme.colors.background};
  }
  .menuitem:active {
    background-color: ${(props) => props.theme.colors.primary};
  }
  .menuitem-info {
    padding-left: 0.7em;
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
  }
  .menuitem-heading {
    font-size: 1.25em;
    color: ${(props) => props.theme.colors.text};
  }
  .menuitem-desc {
    font-size: 1em;
    color: ${(props) => props.theme.colors.text};
  }
  .icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .icon {
    color: ${(props) => props.theme.colors.text};
    fill: ${(props) => props.theme.colors.text};
    width: 1.75rem;
    height: 3.5rem;
  }
  .logout-icon {
  }
  .avatar-divider {
    margin: 0;
    background-color: ${(props) => props.theme.colors.text};
    width: 100%;
  }
  .user {
    margin: 0;

    img {
      width: 5em;
      height: 5em;
      border-radius: 50%;
    }
  }
`;

const TaskerProfileDrawer = (props: Props): JSX.Element => {
  // Get User
  const { tasker } = useReactiveVar(taskerVar) as any;

  console.log('tasker', tasker);

  // const theme = useTheme();

  // feedback modal
  // const [isFeedbackModalVisible, setIsFeedbackModalVisible] =
  //   React.useState(false);
  // const showFeedbackModal = () => {
  //   setIsFeedbackModalVisible(true);
  // };
  // const feedbackModalClose = () => {
  //   setIsFeedbackModalVisible(false);
  // };

  // logout modal
  const [isLogoutModalVisible, setIsLogoutModalVisible] = React.useState(false);
  const showLogoutModal = () => {
    setIsLogoutModalVisible(true);
  };
  const handleLogoutOk = () => {
    setIsLogoutModalVisible(false);
    logout();
  };
  const handleLogoutCancel = () => {
    setIsLogoutModalVisible(false);
  };
  // get current loggedIn user
  // console.log('users', user);
  return (
    <div className={props.className}>
      <StyledDrawer
        placement="right"
        closable={false}
        onClose={props.profileDrawerClose}
        visible={props.isProfileDrawerVisible}
      >
        <div className="user">
          <NextLink href={'/account'}>
            <Row
              className="menuitem"
              onClick={() => {
                props.profileDrawerClose();
              }}
            >
              <Col span={6} className="icon-container">
                <img src={tasker?.image} alt="" />
              </Col>
              <Col span={18}>
                <div className="menuitem-info">
                  <div className="menuitem-heading">
                    {tasker?.firstname} {tasker?.lastname}
                  </div>
                  <div className="menuitem-desc menuitem-email">
                    {tasker?.email}
                  </div>
                </div>
              </Col>
            </Row>
          </NextLink>
        </div>

        <Divider className="avatar-divider" />
        {/* <Divider className="avatar-divider" /> */}
        <div>
          <NextLink href={'/dashboard/active'}>
            <Row
              align="middle"
              justify="space-between"
              className="menuitem"
              onClick={() => {
                props.profileDrawerClose();
              }}
            >
              <Col span={6} className="icon-container">
                <FaTasks className="icon" />
              </Col>
              <Col span={18}>
                <div className="menuitem-info">
                  <div className="menuitem-heading">Active Tasks</div>
                </div>
              </Col>
            </Row>
          </NextLink>
        </div>

        <div>
          <NextLink href={'/dashboard/completed'}>
            <Row
              align="middle"
              justify="space-between"
              className="menuitem"
              onClick={() => {
                props.profileDrawerClose();
              }}
            >
              <Col span={6} className="icon-container">
                <MdAddTask className="icon" />
              </Col>
              <Col span={18}>
                <div className="menuitem-info">
                  <div className="menuitem-heading">Completed Task</div>
                </div>
              </Col>
            </Row>
          </NextLink>
        </div>

        {/* <div>
          <Row
            align="middle"
            justify="space-between"
            className="menuitem"
            onClick={() => {
              props.profileDrawerClose();
              showFeedbackModal();
              console.log('show feedback modal');
            }}
          >
            <Col span={6} className="icon-container">
              <RiFeedbackLine className="icon" />
            </Col>
            <Col span={18}>
              <div className="menuitem-info">
                <div className="menuitem-heading">
                  {common('profileDrawer.giveFeedback')}
                </div>
                <div className="menuitem-desc">
                  {common('profileDrawer.helpUsImproveOurServices')}
                </div>
              </div>
            </Col>
          </Row>
        </div> */}
        <div>
          <Row
            align="middle"
            justify="space-between"
            className="menuitem"
            onClick={() => {
              props.profileDrawerClose();
              window.location.href = `mailto:${SUPPORT_EMAIL}`;
            }}
          >
            <Col span={6} className="icon-container">
              <BiSupport className="icon" />
            </Col>
            <Col span={18}>
              <div className="menuitem-info">
                <div className="menuitem-heading">Help And Support</div>
              </div>
            </Col>
          </Row>
        </div>
        <div>
          <Row
            align="middle"
            justify="space-between"
            className="menuitem"
            onClick={() => {
              props.profileDrawerClose();
              showLogoutModal();
            }}
          >
            <Col span={6} className="icon-container">
              <AiOutlineLogout className="icon logout-icon" />
            </Col>
            <Col span={18}>
              <div className="menuitem-info">
                <div className="menuitem-heading">logout</div>
              </div>
            </Col>
          </Row>
        </div>
        {/* <FeedbackModal
          isOpen={isFeedbackModalVisible}
          closeModal={feedbackModalClose}
        /> */}
        <LogoutModal
          visible={isLogoutModalVisible}
          onOk={handleLogoutOk}
          onCancel={handleLogoutCancel}
          okText="LOGOUT"
          cancelText="CANCEL"
        >
          <p>Are you sure you want to logout?</p>
        </LogoutModal>
      </StyledDrawer>
    </div>
  );
};

export default TaskerProfileDrawer;
