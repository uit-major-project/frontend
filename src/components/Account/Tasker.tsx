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
import { Tasker } from 'src/utils/types';
import { taskCategories, TaskCategory } from '../BookTask';

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
          color: #333;
          input,
          textarea {
            width: 100%;
            outline: none;
            border: 1px solid #ccc;
            margin-bottom: 1rem;
            padding: 0.5em 1em;
          }

          select {
            width: 100%;
            outline: none;
            border: 1px solid #ccc;
            margin-bottom: 1rem;
            padding: 0.5em 1em;

            option {
              padding: 0.5em 1em;
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

const TaskerAccount = ({ tasker }: { tasker: Tasker }) => {
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
                  <img src={tasker?.image} alt="" />
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
                  value={tasker?.firstname}
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
                  value={tasker?.lastname}
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
                  value={tasker?.email}
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
                  value={tasker?.phone}
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
                  value={tasker?.permanentAddress}
                  placeholder="Address..."
                />
                <br />
                {errors.lastname && errors.lastname.message}

                <select
                  {...register('taskCategory', {
                    required: 'Required',
                    validate: (value) =>
                      value !== 'Select task category' ||
                      'Please select task size',
                  })}
                  defaultValue={tasker?.category}
                >
                  <option value={'Select task size'}>
                    Select task category
                  </option>
                  <option value={'Small'}>Small</option>
                  <option value={'Medium'}>Medium</option>
                  <option value={'Large'}>Large</option>
                  {taskCategories.map((taskCategorie: TaskCategory) => (
                    <option key={taskCategorie.id} value={taskCategorie.title}>
                      {taskCategorie.title}
                    </option>
                  ))}
                </select>
                <br />
                {errors.taskCategory && errors.taskCategory.message}

                <textarea
                  {...register('experience', {
                    required: 'Required',
                    // pattern: {
                    //   value: /^[\w%+.-]+@[\d.a-z-]+\.[a-z]{2,}$/i,
                    //   message: 'invalid email address',
                    // },
                  })}
                  value={tasker?.experience}
                  placeholder="Your work experience..."
                />
                <br />
                {errors.experience && errors.experience.message}

                <input
                  type="number"
                  {...register('hourlyCharge', {
                    required: 'Required',
                    // pattern: {
                    //   value: /^[\w%+.-]+@[\d.a-z-]+\.[a-z]{2,}$/i,
                    //   message: 'invalid email address',
                    // },
                  })}
                  value={tasker?.pricePerHourInRs}
                  placeholder="Hourly Charge (in Rs.)"
                />
                <br />
                {errors.hourlyCharge && errors.hourlyCharge.message}

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

export default TaskerAccount;
