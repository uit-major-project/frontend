import React from 'react';
import Head from 'next/head';
import styled from '@emotion/styled';
import { ThemeProvider, Global, css } from '@emotion/react';

import { themes } from '../../utils/themes';
import Navbar from '../Navbar';
import { gql, useQuery } from '@apollo/client';
import { userVar } from 'src/apollo/reactiveVars';

const StyledMain = styled.main`
  // height: calc(100vh - 5em);
  width: 100%;
  margin-top: 3.5em;
`;

const MainLayoutContainer = styled.div`
  // width: 100vw;
  // height: 100vh;
  display: flex;
  flex-direction: column;
`;

interface Props {
  title?: string;
  children: JSX.Element;
}

const MainLayout = (props: Props): JSX.Element => {
  const currentTheme = themes.light;

  const theme = currentTheme;

  const GET_CURRENT_USER = gql`
    query getCurrentUser {
      getCurrentUser {
        id
        createdAt
        updatedAt
        firstname
        lastname
        email
        image
        phone
        permanentAddress
        tasks {
          id
        }
      }
    }
  `;

  const { data, error, loading } = useQuery(GET_CURRENT_USER);

  if (error) {
    console.error('error fetching current user', error);
  }

  if (loading) {
    console.log('fetching current user...');
  }

  React.useEffect(() => {
    console.log('user', data?.getCurrentUser);
    if (data && data.getCurrentUser) {
      userVar(data.getCurrentUser);
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>{props.title ? '- ' + props.title : ''}Handy Services</title>
      </Head>
      <Global
        styles={css`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          html {
            overflow-x: hidden;
            font-size: 14px;
          }
          body {
            background-color: ${theme.colors.background};
            color: ${theme.colors.text};
            font-family: ${theme.fontBase};
            font-size: 1.25rem;
          }
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            padding: 0;
            margin: 0;
          }
          .section-heading {
            color: ${theme.colors.text};
            font-size: 3em;
            font-weight: 300;
            letter-spacing: 0.15em;
            margin: 0 0 1em 0;
            text-transform: uppercase;
            text-align: center;
          }

          @media (max-width: 800px) {
            .section-heading {
              font-size: 1.5em;
            }
          }
        `}
      />
      <ThemeProvider theme={theme}>
        <MainLayoutContainer>
          <Navbar title="Handy Services" />
          <StyledMain>{props.children}</StyledMain>
        </MainLayoutContainer>
      </ThemeProvider>
    </>
  );
};

export default MainLayout;
