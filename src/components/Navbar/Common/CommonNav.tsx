/* eslint-disable @next/next/no-html-link-for-pages */
import React from 'react';
import styled from '@emotion/styled';
import NextLink from 'next/link';

import { CgMenuRight } from 'react-icons/cg';
import { Drawer } from 'antd';
import { AiOutlineClose } from 'react-icons/ai';
import { MdOutlineHandyman } from 'react-icons/md';

// import Cookies from 'js-cookie';

const StyledNavbar = styled.nav`
  position: absolute;
  width: 100%;
  // padding: 1em 0;
  color: ${(props) => props.theme.colors.text};
  background: ${(props) => props.theme.colors.background};
  background: transparent;
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.25);
  // -webkit-box-shadow: 0 6px 9px 1px rgba(0, 0, 0, 0.84);
  // -moz-box-shadow: 0 6px 9px 1px rgba(0, 0, 0, 0.84);
  font-family: ${(props) => props.theme.fontBase};
  .nav-container {
    color: inherit;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 0.5em 2em;
    // font-size: 1.25em;
  }

  .title {
    // margin-left: 1em;
    font-size: 1.5em;
    font-weight: 600;
    color: ${(props) => props.theme.colors.text};
    cursor: pointer;
    display: flex;
    align-items: center;

    svg {
      margin-right: 0.5em;
    }
  }

  .nav-links {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .nav-link {
    cursor: pointer;
    color: ${(props) => props.theme.colors.text};
    margin: 0 0 0 2em;
    border-bottom: 2px solid transparent;
    font-weight: 500;
    display: flex;

    &:after {
      display: block;
      content: '';
      border-bottom: 3px solid ${(props) => props.theme.colors.accent};
      transition: all 0.2s ease-in-out;
      transform: scaleX(0);
    }
  }
  .nav-link: hover {
    &:after {
      transform: scaleX(1);
    }
    // outline-bottom: 3px solid ${(props) => props.theme.colors.accent};
    // color: ${(props) => props.theme.colors.accent};
  }

  .smallscreen-menu {
    svg {
      color: ${(props) => props.theme.colors.text};
    }
    display: none;
  }

  // @media screen and (min-width: 2000px) {
  //   .app__navbar-logo img {
  //     width: 210px;
  //   }
  // }

  @media screen and (max-width: 1150px) {
    .nav-links {
      display: none;
    }

    // .title {
    //   font-size: 1.5em;
    // }

    .smallscreen-menu {
      display: flex;
    }
  }

  @media screen and (max-width: 700px) {
    .nav-container {
      padding: 1em 1em;
    }
    .title {
      margin-left: 0;
      font-size: 1.25em;
    }
  }
`;

const StyledDrawer = styled(Drawer)`
  .ant-drawer-content {
    background: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
  }
  .ant-drawer-body {
    display: flex;
    justify-content: center;
  }

  .close-icon {
    position: absolute;
    top: 1.25em;
    right: 0.75em;
    font-size: 2em;
    color: ${(props) => props.theme.colors.text};
  }
  .nav-smallscreen-links {
    // margin: auto 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 2rem;
    cursor: pointer;
    // color: var(--color-golden);
    font-size: 1.25em;
    // text-align: center;
  }

  .nav-smallscreen-links .nav-link {
    cursor: pointer;
    color: ${(props) => props.theme.colors.text};
    margin: 0.5em 0;
    font-weight: 500;

    &:after {
      display: block;
      content: '';
      border-bottom: 3px solid ${(props) => props.theme.colors.accent};
      transition: all 0.2s ease-in-out;
      transform: scaleX(0);
    }
  }
  .nav-link: hover {
    &: after {
      transform: scaleX(1);
    }
    // border-bottom: 3px solid ${(props) => props.theme.colors.accent};
    // color: ${(props) => props.theme.colors.accent};
  }
`;

interface Props {
  className?: string;
  title: string;
}

const CommonNav = ({ className, title }: Props) => {
  const [isMenuVisible, setIsMenuVisible] = React.useState(false);

  return (
    <StyledNavbar className={className}>
      <div className={'nav-container'}>
        <NextLink href="/" passHref>
          <div className="title">
            <MdOutlineHandyman />
            <span>{title}</span>
          </div>
        </NextLink>
        <div className="nav-links">
          <NextLink href="/about">
            <a href="/about" className="nav-link">
              About Us
            </a>
          </NextLink>
          <NextLink href="/login">
            <a href="/login" className="nav-link">
              Sign up / Log in
            </a>
          </NextLink>
          {/* <NextLink href="/become-a-tasker">
            <a href="/become-a-tasker" className="nav-link">
              Become a Tasker
            </a>
          </NextLink> */}
        </div>

        <div className="smallscreen-menu">
          <CgMenuRight
            fontSize={27}
            onClick={() => setIsMenuVisible(!isMenuVisible)}
            className="overlay-close"
          />
          <StyledDrawer
            open={isMenuVisible}
            closable={false}
            onClose={() => setIsMenuVisible(false)}
          >
            <AiOutlineClose
              className="close-icon"
              onClick={() => setIsMenuVisible(false)}
            />
            <div className="nav-smallscreen-links">
              <NextLink href="/about">
                <a
                  href="/about"
                  className="nav-link"
                  onClick={() => setIsMenuVisible(false)}
                >
                  About Us
                </a>
              </NextLink>
              <NextLink href="/login">
                <a
                  href="/login"
                  className="nav-link"
                  onClick={() => setIsMenuVisible(false)}
                >
                  Sign up / Log in
                </a>
              </NextLink>
              {/* <NextLink href="/become-a-tasker">
                <a
                  href="/become-a-tasker"
                  className="nav-link"
                  onClick={() => setIsMenuVisible(false)}
                >
                  Become a Tasker
                </a>
              </NextLink> */}
            </div>
          </StyledDrawer>
        </div>
      </div>
    </StyledNavbar>
  );
};
export default CommonNav;
