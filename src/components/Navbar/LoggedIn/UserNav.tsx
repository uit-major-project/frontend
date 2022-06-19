import React from 'react';

import styled from '@emotion/styled';
import NextLink from 'next/link';
// assets and icons
import { IoNotificationsOutline } from 'react-icons/io5';

import { MdOutlineHandyman } from 'react-icons/md';

// components
import NotificationDrawer from './Drawers/NotificationDrawer';
// import PreferencesDrawer from '../PreferencesDrawer';
import ProfileDrawer from './Drawers/ProfileDrawer';
import { User } from 'src/utils/types';

const StyledTopbar = styled.nav`
  .topbar-container {
    width: 100%;
    // height: 5em;
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    // min-width: 60em;
    font-family: ${(props) => props.theme.colors.text};
    box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.25);
    position: relative;
    z-index: 10;
  }
  .left-panel {
    // padding-left: 2em;
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    height: 100%;
  }
  .title {
    // margin-left: 1em;
    font-size: 1.25em;
    font-weight: 600;
    color: ${(props) => props.theme.colors.text};
    cursor: pointer;
    display: flex;
    align-items: center;

    svg {
      margin-right: 0.5em;
    }
  }
  .right-panel {
    padding-right: 1em;
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    // min-width: 12em;
    height: 100%;
  }
  .items {
    display: flex;
    align-items: center;
    justify-content: space-around;
    text-align: center;
    width: 100%;
    height: 100%;
  }
  .icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.1em;
    height: 2.1em;
    border-radius: 50%;

    :active {
      // background-color:
      color: #333;
    }

    :hover {
      // background-color:
    }
  }
  .avatar {
    margin-left: 0.5em;
    padding: 0.25em;
    img {
      width: 3em;
      border-radius: 50%;
    }
  }
`;

const StyledIoNotificationsOutline = styled(IoNotificationsOutline)`
  width: 1.85em;
  height: 1.85em;
`;

function UserLoggedInNav({
  user,
  className,
  title,
}: {
  user: User;
  className?: string;
  title: string;
}): JSX.Element {
  // profile drawer
  const [isProfileDrawerVisible, setIsProfileDrawerVisible] =
    React.useState(false);
  const showProfileDrawer = () => {
    setIsProfileDrawerVisible(true);
  };
  const profileDrawerClose = () => {
    setIsProfileDrawerVisible(false);
  };

  // notifications drawer
  const [isNotificationsDrawerVisible, setIsNotificationsDrawerVisible] =
    React.useState(false);
  const showNotificationsDrawer = () => {
    setIsNotificationsDrawerVisible(true);
  };
  const notificationsDrawerClose = () => {
    setIsNotificationsDrawerVisible(false);
  };

  // preferences drawer
  // const [isPreferencesDrawerVisible, setIsPreferencesDrawerVisible] =
  //   React.useState(false);
  // const showPreferencesDrawer = () => {
  //   setIsPreferencesDrawerVisible(true);
  // };
  // const preferencesDrawerClose = () => {
  //   setIsPreferencesDrawerVisible(false);
  // };
  return (
    <StyledTopbar>
      <div className={className}>
        <div className={'topbar-container'}>
          <div className={'left-panel'}>
            <NextLink href="/" passHref>
              <div className="title">
                <MdOutlineHandyman />
                <span>{title}</span>
              </div>
            </NextLink>
          </div>
          <div className={'right-panel'}>
            <div className={'items'}>
              <div
                className={'icon-container'}
                onClick={() => {
                  showNotificationsDrawer();
                }}
                onKeyDown={() => showNotificationsDrawer()}
                role="button"
                tabIndex={0}
              >
                <StyledIoNotificationsOutline />
              </div>
              {/* <div
                className={'icon-container'}
                onClick={() => {
                  showPreferencesDrawer();
                }}
                onKeyDown={() => showPreferencesDrawer()}
                role="button"
                tabIndex={0}
              >
                <StyledIoSettingsOutline />
              </div> */}
              <div
                className={'avatar'}
                onClick={() => {
                  console.log('*************');
                  showProfileDrawer();
                }}
                onKeyDown={() => showProfileDrawer()}
                role="button"
                tabIndex={0}
              >
                <img
                  // size="default"
                  src={user.image}
                  alt="avatar"
                />
              </div>
            </div>
          </div>
        </div>
        <NotificationDrawer
          isNotificationsDrawerVisible={isNotificationsDrawerVisible}
          notificationsDrawerClose={notificationsDrawerClose}
          // closable={false}
        />
        {/* <PreferencesDrawer
          isPreferencesDrawerVisible={isPreferencesDrawerVisible}
          preferencesDrawerClose={preferencesDrawerClose}
          closable={false}
        /> */}
        <ProfileDrawer
          isProfileDrawerVisible={isProfileDrawerVisible}
          profileDrawerClose={profileDrawerClose}
        />
      </div>
    </StyledTopbar>
  );
}

export default UserLoggedInNav;
