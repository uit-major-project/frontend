/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable sonarjs/cognitive-complexity */
import type { NextPage } from 'next';

import styled from '@emotion/styled';
import Cookies from 'js-cookie';
import Router from 'next/router';
// import { useReactiveVar } from '@apollo/client';

// import { userVar } from 'src/apollo/reactiveVars';
import React from 'react';
// import EmptyDisplay from 'src/components/EmptyDisplay';

// import { RiTodoLine } from 'react-icons/ri';
import { gql, useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { userVar, taskCategoryVar, tasksVar } from 'src/apollo/reactiveVars';

import { useForm } from 'react-hook-form';
import { DatePicker, TimePicker, notification, Rate, Avatar } from 'antd';
import { StyledLoader } from '../../components/Loader';
import { AiOutlineUser } from 'react-icons/ai';
// import { Task } from 'src/utils/types';

// import { TaskSize } from 'src/utils/types';

// import { TaskCategory } from 'src/components/BookTask';

const StyledDiv = styled.div`
  padding: 3rem;

  .task-details-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    .step-heading {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }

    .form-container {
      width: 90%;
      max-width: 500px;

      form {
        input,
        textarea {
          width: 100%;
          outline: none;
          border: 1px solid #ccc;
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
      }
    }
  }

  .tasker-cards-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // margin-top: 1rem;

    .tasker-card {
      width: 100%;
      max-width: 700px;
      padding: 1rem;
      border-radius: 5px;
      background: #fff;
      box-shadow: 0px 0px 5px #ccc;
      margin-bottom: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .tasker-card-top {
        padding: 1rem;
        width: 100%;
        display: flex;
        justify-content: center;
        margin-bottom: 1rem;

        // .tasker-image {
        //   width: 30%;
        //   height: 100%;
        //   border-radius: 5px;
        //   background-size: cover;
        //   background-position: center;
        //   background-repeat: no-repeat;
        // }

        .tasker-image {
          width: 20%;
          max-width: 5em;
          // width: 10rem;
          // height: 100%;
          height: 5em;
          border-radius: 5px;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;

          span {
            width: 100%;
            height: 100%;
            svg {
              width: 100%;
              height: 100%;
            }
          }
        }
        .tasker-details {
          padding: 0 1.5rem;
          width: 80%;
          height: 100%;
          display: flex;
          flex-direction: column;
          // align-items: center;
          justify-content: center;

          .tasker-lead {
            font-size: 1.25em;
            font-weight: bold;
            margin-bottom: 1rem;
            display: flex;
            justify-content: space-between;
          }
        }
      }
      .tasker-card-bottom {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-bottom: 1rem;

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
      }
    }
  }
  .time-selector {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;

    h1 {
      font-weight: 200;
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    .ant-picker-inputs {
      .ant-picker {
        width: 15em;
        max-width: 500px;
        padding: 0.5rem;
        margin: 0.25rem;
      }
    }
  }

  .action-buttons {
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    button {
      text-transform: uppercase;
      padding: 0.5em 1em;
      width: 10em;
      border: none;
      border-radius: 0.25em;
      margin-top: 3em !important;
      color: ${(props) => props.theme.colors.text};
      border: 0.1em solid ${(props) => props.theme.colors.primary};

      &: hover {
        background: ${(props) => props.theme.colors.primary};
      }
    }
  }
`;

const openNotification = () => {
  notification.open({
    message: 'Task created successfully',
    description:
      'The task has been created successfully, the tasker will get back to you in a while',
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
};

interface TaskDetails {
  pincode?: string;
  address?: string;
  description?: string;
  category?: string;
  tasksize?: 'Small' | 'Medium' | 'Large';
  taskerInContact?: string;
  dueDate?: string;
}

const TaskDescription = ({
  taskDetails,
  taskCategory,
  setTaskDetails,
  next,
}: {
  taskDetails: TaskDetails;
  taskCategory: string;
  setTaskDetails: (taskDetails: TaskDetails) => void;
  next(): void;
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const onSubmit = (values: any) => {
    console.log('values', values);
    setTaskDetails({ ...taskDetails, ...values });
    next();
  };
  return (
    <div className="task-details-container">
      <h2 className="step-heading">Task Description</h2>
      <div className="form-container">
        <p className="task-category">{taskCategory.toUpperCase()}</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <input
            type="text"
            {...register('pincode', {
              required: 'Required',
              pattern: {
                value: /^[1-9]\d{5}$/,
                message: 'invalid pincode',
              },
            })}
            value={taskDetails.pincode}
            placeholder="pincode"
            minLength={6}
            maxLength={6}
          />
          <br />
          {errors.pincode && errors.pincode.message}
          <br /> */}

          {/* <input
            type="text"
            {...register('address', {
              required: 'Required',
              // pattern: {
              //   value: /^[\w%+.-]+@[\d.a-z-]+\.[a-z]{2,}$/i,
              //   message: 'invalid email address',
              // },
            })}
            value={taskDetails.address}
            placeholder="address"
          />
          <br />
          {errors.address && errors.address.message} */}

          {/* <br /> */}
          <select
            {...register('address', {
              required: 'Required',
              validate: (value) =>
                value !== 'Select zone' || 'Please select your zone',
            })}
            defaultValue={taskDetails.address}
          >
            <option value={'Select zone'}>Select zone</option>
            <option value={'Karond'}>Karond</option>
            <option value={'MPNagar'}>M. P. Nagar</option>
            <option value={'Gandhinagar'}>Gandhi Nagar</option>
            <option value={'NewMarket'}>New Market</option>
          </select>
          <br />
          {errors.address && errors.address.message}

          <br />
          <textarea
            {...register('description', {
              required: 'Required',
              // validate: (value) => value !== 'admin' || 'Nice try!',
            })}
            placeholder="Task Description..."
            value={taskDetails.description}
          />
          <br />
          {errors.description && errors.description.message}

          <br />
          <select
            {...register('tasksize', {
              required: 'Required',
              validate: (value) =>
                value !== 'Select task size' || 'Please select task size',
            })}
            // value={taskDetails.tasksize}
            defaultValue={taskDetails.tasksize}
          >
            <option value={'Select task size'}>Select task size</option>
            <option value={'small'}>Small</option>
            <option value={'medium'}>Medium</option>
            <option value={'large'}>Large</option>
          </select>
          <br />
          {errors.tasksize && errors.tasksize.message}

          <br />
          <button type="submit">Continue</button>
        </form>
      </div>
    </div>
  );
};

const TaskerSelection = ({
  statedTaskers,
  taskCategory,
  next,
  taskDetails,
  setTaskDetails,
}: {
  statedTaskers: any;
  taskCategory: string;
  next: () => void;
  taskDetails: TaskDetails;
  setTaskDetails: (taskDetails: TaskDetails) => void;
}) => {
  return (
    <div className="tasker-cards-container">
      <h2>Tasker Selection</h2>
      <p>Available taskers : {statedTaskers.length}</p>
      {statedTaskers.map((tasker: any) => (
        <div className="tasker-card" key={tasker.id}>
          <div className="tasker-card-top">
            <div className="tasker-image">
              {/* <img src={tasker.image} alt="tasker" /> */}
              {tasker.image && tasker.image !== '' ? (
                <img src={tasker.image} alt="tasker" />
              ) : (
                <Avatar size={'large'} icon={<AiOutlineUser />} />
              )}
            </div>
            <div className="tasker-details">
              <div className="tasker-lead">
                <div>
                  {tasker.firstname} {tasker.lastname}
                </div>
                <div>Rs.{tasker.pricePerHourInRs ?? 100}/hr</div>
              </div>
              {/* {tasker.ratingCount ? (
                <p>
                  {tasker.ratingCount === 1
                    ? '1 rating'
                    : `${tasker.ratingCount} ratings`}
                </p>
              ) : (
                <p>No ratings</p>
              )} */}
              {tasker.ratingCount !== 0 ? (
                <div>
                  <Rate defaultValue={tasker.rating} />
                  <p>
                    {tasker.ratingCount === 1
                      ? '1 rating'
                      : `${tasker.ratingCount} ratings`}
                  </p>
                </div>
              ) : (
                <div>No ratings</div>
              )}
              <p className="tasker-experience">
                {tasker.experience > 0
                  ? `Experience of over ${tasker.experience} years`
                  : ''}
              </p>
              <p>Address: {tasker.permanentAddress}</p>
              {/* {tasker.tasks ? (
                <p>
                  {tasker.tasks.length === 1
                    ? `1 ${taskCategory} review`
                    : `${tasker.tasks.length} ${taskCategory} tasks`}
                </p>
              ) : (
                <p>No {taskCategory} tasks</p>
              )} */}
            </div>
          </div>
          <div className="tasker-card-bottom">
            {/* <p className="tasker-experience">
              {tasker.experience ??
                'I have over 4 years of experience for this. I do not currently take order that take more then 5hrs at the moment. 2 hrs min and travel expense may be added depending on distance. I look forward to working with you soon.'}
            </p> */}
            <button
              onClick={() => {
                setTaskDetails({
                  ...taskDetails,
                  taskerInContact: tasker.email,
                });
                next();
              }}
            >
              Select and Continue
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const TimeSelector = ({
  // next,
  taskDate,
  setTaskDate,
  taskTime,
  setTaskTime,
}: {
  // next: () => void;
  taskDate: any;
  setTaskDate: (taskDate: any) => void;
  taskTime: any;
  setTaskTime: (taskTime: any) => void;
}) => {
  return (
    <div>
      <div className="time-selector">
        <h1>When do you want the task to be completed?</h1>
        <div className="ant-picker-inputs">
          <DatePicker defaultValue={taskDate} onChange={setTaskDate} />
          <TimePicker defaultValue={taskTime} onChange={setTaskTime} />
        </div>
      </div>
      <div>
        {/* <button
          onClick={() => {
            setTaskDetails({
              ...taskDetails,
              dueDate: new Date().toISOString(),
            });
            // next();
          }}
          className="task-confirmation-button"
        >
          Confirm
        </button> */}
      </div>
    </div>
  );
};

const Create: NextPage = () => {
  const user = useReactiveVar(userVar);
  // const tasks = useReactiveVar(tasksVar);
  const [currentStep, setCurrentStep] = React.useState(1);
  // console.log(user);

  const taskCategory = useReactiveVar(taskCategoryVar);

  const [taskDetails, setTaskDetails] = React.useState<TaskDetails>({
    address: 'Select zone',
    pincode: '',
  });

  const [statedTaskers, setStatedTaskers] = React.useState([]);

  const [taskDate, setTaskDate] = React.useState<any>();

  const [taskTime, setTaskTime] = React.useState<any>();

  const GET_TASKERS = gql`
    query taskers {
      taskers {
        id
        firstname
        lastname
        email
        image
        pincode
        phone
        permanentAddress
        isVerified
        hasPaidOneTimeFee
        pricePerHourInRs
        experience
        isActive
        category
        area
        rating
        ratingCount
      }
    }
  `;

  const { data: taskers, error, loading } = useQuery(GET_TASKERS);

  if (error) {
    console.error('error fetching tasks user', error);
  }

  if (loading) {
    console.log('fetching taskers...');
  }

  if ((!Cookies.get('signedin') || !user) && !loading) {
    typeof window !== 'undefined' && Router.push('/login');
  }

  React.useEffect(() => {
    console.log('taskers', taskers?.taskers);
    if (taskers && taskers.taskers) {
      setStatedTaskers(taskers.taskers);
    }
  }, [taskers]);

  // React.useEffect(() => {
  //   console.log(statedTaskers);
  //   const taskersForArea = statedTaskers.filter(
  //     (tasker: any) => tasker.area === taskDetails.address
  //   );
  //   console.log('taskersForArea', taskersForArea);
  //   setStatedTaskers(taskersForArea);
  // }, [taskDetails.address]);

  console.log('taskDetails', taskDetails);

  // const CREATE_POST = gql`
  //   mutation CreatePost($retroId: ID!, $columnId: ID!, $postContent: String!) {
  //     createPost(
  //       retroId: $retroId
  //       columnId: $columnId
  //       postContent: $postContent
  //     )
  //   }
  // `;

  const CREATE_TASK = gql`
    mutation createTask(
      $description: String!
      $dueDate: String
      $location: String!
      $pincode: String!
      $userEmail: String!
      $taskerInContactEmail: String!
      $size: TaskSize!
      $category: TaskCategory!
    ) {
      createTask(
        description: $description
        dueDate: $dueDate
        location: $location
        pincode: $pincode
        userEmail: $userEmail
        taskerInContactEmail: $taskerInContactEmail
        size: $size
        category: $category
      ) {
        id
        createdAt
        updatedAt
        description
        dueDate
        location
        pincode
        size
        status
        category
      }
    }
  `;

  const onTaskCreationCompleted = (data: any) => {
    console.log('task created successfully', data);
    // tasksVar([...tasks ]);

    // Cookies.set('signedin', 'true');

    Router.push('/dashboard/active');
    openNotification;
  };

  const [
    createNewTask,
    { error: taskError, loading: taskLoading, data: taskData },
  ] = useMutation(CREATE_TASK, {
    onCompleted: onTaskCreationCompleted,
  });

  console.log({ taskError, taskLoading, taskData });

  if (error) {
    console.error('TASKER LOGIN ERROR', error);
  }

  const handleFormSubmit = () => {
    // eslint-disable-next-line unicorn/no-document-cookie

    console.log('form submit handler');

    const concatenatedDate = `${taskDate!.format(
      'YYYY-MM-DD'
    )}T${taskTime!.format('HH:mm:ss')}`;

    const parsedDate = Date.parse(concatenatedDate);

    const dateInISO = new Date(parsedDate).toISOString();

    console.log('dateInISO', dateInISO, parsedDate);
    console.log('taskCategory', taskCategory);
    createNewTask({
      variables: {
        description: taskDetails.description,
        dueDate: dateInISO,
        location: taskDetails.address,
        pincode: taskDetails.pincode,
        userEmail: user?.email,
        taskerInContactEmail: taskDetails.taskerInContact,
        size: taskDetails.tasksize,
        category: taskCategory,
      },
    });
    // console.log('type 2', credential);

    // api call to check if user exits
    // if yes then login and start a session

    // if no then create a new user then login and start a session
  };

  // const TimeSelction = <div>Time Selection</div>;

  const Confirmation = <div>Confirmation</div>;

  let currentComponent: React.ReactElement = <></>;

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  if (!taskCategory) {
    typeof window !== 'undefined' && Router.push('/dashboard/explore');
    return <></>;
  }

  const taskersForArea = statedTaskers.filter(
    (tasker: any) =>
      tasker.area === taskDetails.address && tasker.category === taskCategory
  );

  console.log(taskersForArea);
  console.log('**************');
  console.log(statedTaskers);

  switch (currentStep) {
    case 1: {
      currentComponent = (
        <TaskDescription
          taskDetails={taskDetails}
          taskCategory={taskCategory}
          setTaskDetails={setTaskDetails}
          next={next}
        />
      );

      break;
    }
    case 2: {
      currentComponent = (
        <TaskerSelection
          statedTaskers={taskersForArea}
          taskCategory={taskCategory}
          taskDetails={taskDetails}
          setTaskDetails={setTaskDetails}
          next={next}
        />
      );

      break;
    }
    case 3: {
      currentComponent = (
        <TimeSelector
          taskDate={taskDate}
          taskTime={taskTime}
          setTaskDate={setTaskDate}
          setTaskTime={setTaskTime}
        />
      );

      break;
    }
    case 4: {
      currentComponent = Confirmation;

      break;
    }
    // No default
    default:
  }

  const steps = [1, 1, 1, 1];

  // const bookingAction = {
  //   href: '/dashboard/explore',
  //   name: 'Book now',
  // };

  console.log('taskDate', taskDate, taskDate?.format('YYYY-MM-DD'));
  console.log('taskTime', taskTime, taskTime?.format('HH:mm:ss'));

  return (
    <StyledDiv>
      {loading || taskLoading ? (
        <StyledLoader />
      ) : (
        <div>
          {currentComponent}
          <div className="action-buttons">
            {currentStep < steps.length &&
              currentStep !== 1 &&
              currentStep !== 2 &&
              currentStep !== 3 && (
                <button className="next-btn" onClick={() => next()}>
                  Next
                </button>
              )}
            {currentStep === steps.length - 1 && (
              <button
                // type="primary"
                onClick={() => {
                  console.log('creating task...');
                  handleFormSubmit();
                  // Router.push('/dashboard/active');
                }}
                className="confirm-btn"
              >
                Confirm
              </button>
            )}
            {currentStep > 1 && (
              <button
                className="prev-btn"
                style={{ margin: '0 8px' }}
                onClick={() => prev()}
              >
                Previous
              </button>
            )}
          </div>
        </div>
      )}
      <></>
    </StyledDiv>
  );
};

export default Create;
