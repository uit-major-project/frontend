import React from 'react';
import type { NextPage } from 'next';

import styled from '@emotion/styled';
import { gql, useMutation } from '@apollo/client';

import { userVar } from 'src/apollo/reactiveVars';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const onCompleted = (data: any) => {
  // document.cookie = 'token=' +
  // console.log('user', data.loginWithGoogle);
  userVar(data.loginWithGoogle);
};

const Login: NextPage = () => {
  const LOGIN_WITH_GOOGLE = gql`
    mutation loginWithGoogle($jwt: String!) {
      loginWithGoogle(jwt: $jwt) {
        id
        firstname
        lastname
        email
        image
        role
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
    document.cookie = 'signedin=true';

    loginWithGoogle({
      variables: {
        jwt: credential,
      },
    });
    console.log('type', typeof credential);

    // api call to check if user exits
    // if yes then login and start a session

    // if no then create a new user then login and start a session
  };

  React.useEffect(() => {
    const initializeGoogleLogin = () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (!window.google) return;

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

  return (
    <StyledDiv>
      <h1>Handy Services</h1>
      <p>Login / Sign up</p>
      <div id="buttonDiv"></div>
    </StyledDiv>
  );
};

export default Login;
