// import type { NextPage } from 'next';

import styled from '@emotion/styled';

// import { useReactiveVar } from '@apollo/client';
// import { taskerVar, userVar } from 'src/apollo/reactiveVars';

import { Descriptions, Avatar, Menu, Divider, MenuProps } from 'antd';
// import Cookies from 'js-cookie';
// import Router from 'next/router';
import React from 'react';

import isEqual from 'lodash.isequal';

import { useForm } from 'react-hook-form';
import { User } from 'src/utils/types';

const StyledDiv = styled.div`
  // background: #efefef;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1em;
  margin: 0 auto;
  width: 90%;
  max-width: 120em;
  color: ${(props) => props.theme.colors.primary};

  .container {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
  }

  .container-account-section {
    display: flex;
    align-items: center;
    width: 100%;
    .task-details-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;

      .step-heading {
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 1rem;
      }

      .form-container {
        width: 100%;
        max-width: 500px;

        .profile-image {
          display: flex;
          justify-content: center;
          img {
            border-radius: 50%;
            margin: 1rem;
          }
        }

        form {
          input,
          textarea {
            width: 100%;
            outline: none;
            border: 1px solid #ccc;
            margin-bottom: 1rem;
            color: #333;
            padding: 0.5em 1em;
          }

          select {
            width: 100%;
            outline: none;
            border: 1px solid #ccc;

            option {
              background-color: #f5f5f5;
            }
          }

          button {
            width: 100%;
            background: ${(props) => props.theme.colors.primary};
            border: none;
            outline: none;
            cursor: pointer;
            padding: 1rem;
            font-size: 1.2rem;
            font-weight: bold;
            color: #fff;
            border-radius: 5px;
          }

          button:disabled,
          button[disabled] {
            border: 1px solid #999999;
            background-color: #cccccc;
            color: #666666;
          }
        }
      }
    }
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

const UserAccount = ({ user }: { user: User }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  // const [userDetails, setUserDetails] = React.useState(user);

  // const [hasDetailsChanges, setHasDetailsChanged] = React.useState(false);

  // console.log('userDetails', userDetails);

  // const checkUserDetailsEquality = () => {
  //   // console.log('isEqual', isEqual(userDetails, user));
  //   // return isEqual(userDetails, user);
  // };

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const onSubmit = (values: any) => {
    console.log('values', values);
    // setUserDetails({ ...userDetails, ...values });
  };

  // console.log(user);
  return (
    <StyledDiv>
      <div className="container">
        {/* <h2>Your Account</h2> */}

        <div className="container-account-section">
          <div className="task-details-container">
            {/* <h2 className="step-heading">Task Description</h2> */}
            <div className="form-container">
              {/* <p className="task-category">{taskCategory.toUpperCase()}</p> */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="profile-image">
                  <img src={user.image} alt="" />
                </div>

                <input
                  type="text"
                  {...register('firstname', {
                    required: 'Required',
                    // pattern: {
                    //   value: /^[\w%+.-]+@[\d.a-z-]+\.[a-z]{2,}$/i,
                    //   message: 'invalid email address',
                    // },
                  })}
                  value={user.firstname}
                  placeholder="firstname"
                />
                <br />
                {errors.firstname && errors.firstname.message}

                <input
                  type="text"
                  {...register('lastname', {
                    required: 'Required',
                    // pattern: {
                    //   value: /^[\w%+.-]+@[\d.a-z-]+\.[a-z]{2,}$/i,
                    //   message: 'invalid email address',
                    // },
                  })}
                  value={user.lastname}
                  placeholder="lastname"
                />
                <br />
                {errors.lastname && errors.lastname.message}

                <input
                  type="email"
                  {...register('email', {
                    required: 'Required',
                    // validate: (value) => value !== 'admin' || 'Nice try!',
                  })}
                  placeholder="Email..."
                  value={user.email}
                />
                <br />
                {errors.email && errors.email.message}

                <input
                  type="text"
                  {...register('phone', {
                    required: 'Required',
                    // pattern: {
                    //   value: /^[\w%+.-]+@[\d.a-z-]+\.[a-z]{2,}$/i,
                    //   message: 'invalid email address',
                    // },
                  })}
                  value={user.phone}
                  placeholder="Your phone number..."
                />
                <br />
                {errors.phone && errors.phone.message}

                <textarea
                  {...register('address', {
                    required: 'Required',
                    // pattern: {
                    //   value: /^[\w%+.-]+@[\d.a-z-]+\.[a-z]{2,}$/i,
                    //   message: 'invalid email address',
                    // },
                  })}
                  value={user.permanentAddress}
                  placeholder="Address..."
                />
                <br />
                {errors.lastname && errors.lastname.message}

                <br />
                <button type="submit" disabled={false}>
                  Update Details
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </StyledDiv>
  );
};

export default UserAccount;
