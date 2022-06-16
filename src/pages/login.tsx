import React from 'react';
import type { NextPage } from 'next';

import styled from '@emotion/styled';
import { gql, useMutation, useReactiveVar } from '@apollo/client';

import { userVar } from 'src/apollo/reactiveVars';
import Cookies from 'js-cookie';
import Router from 'next/router';

import h2 from '../../public/img/h2.jpg';

const StyledDiv = styled.div`
  display: flex;
  // flex-direction: column;
  // align-items: center;

  .login-content-container {
    display: flex;
    flex-direction: column;
    width: 30%;
    // height: 100%;
    align-items: center;
    // justify-content: center;
    margin: 0 auto;
  }

  .login-image-container {
    width: 70%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
    }

    position: relative;
  }
  .login-image-container: after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 20%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    // background: #fff;
    opacity: 0.5;
    background-image: linear-gradient(
      to left,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 1) 70%
    );
    // background: linear-gradient(90deg, transparent, #fff 10%);
  }

  p {
    margin: 30% 0 0.75em 0;
    letter-spacing: 0.1rem;
    font-size: 1.5rem;
    font-weight: 200;
    text-transform: uppercase;
  }
`;

const onCompleted = (data: any) => {
  userVar(data.loginWithGoogle);

  Cookies.set('signedin', 'true');

  Router.push('/dashboard/explore');
};

const Login: NextPage = () => {
  const user = useReactiveVar(userVar);

  const LOGIN_WITH_GOOGLE = gql`
    mutation loginWithGoogle($jwt: String!) {
      loginWithGoogle(jwt: $jwt) {
        id
        firstname
        lastname
        email
        image
        phone
        permanentAddress
      }
    }
  `;

  const [loginWithGoogle, { error }] = useMutation(LOGIN_WITH_GOOGLE, {
    onCompleted,
  });

  if (error) {
    console.error(error);
  }

  const handleCredentialResponse = (credential: any) => {
    // eslint-disable-next-line unicorn/no-document-cookie

    loginWithGoogle({
      variables: {
        jwt: credential,
      },
    });
    // console.log('type', credential);

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
        document.querySelector('#buttonDiv'),
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

  if (Cookies.get('signedin') && user?.email) {
    Router.push('/dashboard/explore');
  }

  return (
    <StyledDiv>
      {/* <h1>Handy Services</h1> */}
      <div className="login-content-container">
        <p>Login / Sign up</p>
        <div id="buttonDiv"></div>
      </div>
      <div className="login-image-container">
        <img src={h2.src} alt="" />
      </div>
    </StyledDiv>
  );
};

export default Login;
