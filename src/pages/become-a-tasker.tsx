import type { NextPage } from 'next';
// import Head from 'next/head';
// import { useForm } from 'react-hook-form';

import styled from '@emotion/styled';
import { gql, useMutation, useReactiveVar } from '@apollo/client';

import { taskerVar } from 'src/apollo/reactiveVars';
import Cookies from 'js-cookie';
import Router from 'next/router';
import React from 'react';
import { StyledLoader } from '../components/Loader';

// import h3 from '../../public/img/h3.jpg';

const StyledDiv = styled.div`
  height: calc(100vh - 3.5em);
  display: flex;
  // max-width: 90%;
  // align-items: center;
  // justify-content: center;

  .tasker-content-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    // justify-content: center;
    margin: 0 auto;
    padding: 0 1.25em 0 1.5em;

    // z-index: 2;

    h1 {
      font-size: 2em;
      font-weight: bold;
      margin: 2em 0 0.75em 0;
      letter-spacing: 0.25rem;
      // width: 80%;
    }
    p {
      letter-spacing: 0.1rem;
      font-size: 1.5rem;
      font-weight: 200;
      text-transform: uppercase;
      // width: 80%;
      margin: 0 0 1.5em 0;
    }
  }

  // .tasker-image-container {
  //   width: 50%;
  //   height: 100%;

  //   img {
  //     width: 100%;
  //     height: 100%;
  //   }

  //   // position: relative;
  // }
  // .tasker-image-container: after {
  //   content: '';
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   width: 20%;
  //   height: 100%;
  //   pointer-events: none;
  //   z-index: 1;
  //   // background: #fff;
  //   opacity: 0.5;
  //   background-image: linear-gradient(
  //     to left,
  //     rgba(255, 255, 255, 0),
  //     rgba(255, 255, 255, 1) 70%
  //   );
  //   // background: linear-gradient(90deg, transparent, #fff 10%);
  // }
`;

const onCompleted = (data: any) => {
  taskerVar(data.taskerLoginWithGoogle);

  console.log('tasker data', data);

  Cookies.set('signedin_as_tasker', 'true');

  Router.push('/account');
};

const BecomeATasker: NextPage = () => {
  const tasker = useReactiveVar(taskerVar);

  if (Cookies.get('signedin_as_tasker') && tasker?.email) {
    Router.push('/account');
  }

  const LOGIN_WITH_GOOGLE = gql`
    mutation taskerLoginWithGoogle($jwt: String!) {
      taskerLoginWithGoogle(jwt: $jwt) {
        tasker {
          id
          createdAt
          updatedAt
          firstname
          lastname
          email
          image
        }
        hasAccount
        message
      }
    }
  `;

  const [loginWithGoogle, { error, loading, data }] = useMutation(
    LOGIN_WITH_GOOGLE,
    {
      onCompleted,
    }
  );

  console.log({ error, loading, data });

  if (error) {
    console.error('TASKER LOGIN ERROR', error);
  }

  const handleCredentialResponse = (credential: any) => {
    // eslint-disable-next-line unicorn/no-document-cookie

    console.log('type 1', credential);
    loginWithGoogle({
      variables: {
        jwt: credential,
      },
    });
    localStorage.setItem('handy_services_tasker_token', credential);
    console.log('type 2', credential);

    // api call to check if user exits
    // if yes then login and start a session

    // if no then create a new user then login and start a session
  };

  React.useEffect(() => {
    const initializeGoogleLogin = () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (!window.google) return;
      // console.log(process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID);
      const options = {
        client_id: `${process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID}`,
        callback: async ({ credential }: { credential: string }) =>
          handleCredentialResponse(credential),
      };

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      google.accounts.id.initialize(options);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      google.accounts.id.renderButton(
        document.querySelector('#buttonDivTasker'),
        { theme: 'outline', size: 'large' } // customization attributes
      );

      console.log('google login setup complete');
    };

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.addEventListener('load', initializeGoogleLogin);
    script.async = true;
    script.id = 'google-script';
    document.querySelector('head')?.appendChild(script);
  }, []);

  if (Cookies.get('signedin_as_tasker') && tasker?.email) {
    Router.push('/dashboard/active');
  }

  return (
    <StyledDiv>
      {loading ? (
        <StyledLoader />
      ) : (
        <div className="tasker-content-container">
          <h1>Work when you want, doing whatever you want.</h1>
          {/* <p>Login / Sign up</p> */}
          <p>Earn upto Rs. 50,000 on Handy Services</p>
          <div id="buttonDivTasker"></div>
        </div>
        /* <div className="tasker-image-container">
          <img src={h3.src} alt="" />
        </div> */
      )}
    </StyledDiv>
  );
};

export default BecomeATasker;
