import type { NextPage } from 'next';

import styled from '@emotion/styled';
import Cookies from 'js-cookie';
import Router from 'next/router';
// import { useReactiveVar } from '@apollo/client';

// import { userVar } from 'src/apollo/reactiveVars';
import React from 'react';
// import EmptyDisplay from 'src/components/EmptyDisplay';

// import { RiTodoLine } from 'react-icons/ri';
import { gql, useQuery, useReactiveVar } from '@apollo/client';
import { userVar, taskCategoryVar } from 'src/apollo/reactiveVars';

import { useForm } from 'react-hook-form';
import { DatePicker, TimePicker, notification } from 'antd';

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
          background: #ccc;
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
        width: 100%;
        display: flex;
        justify-content: center;
        margin-bottom: 1rem;

        .tasker-image {
          width: 30%;
          height: 100%;
          border-radius: 5px;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        .tasker-details {
          width: 70%;
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
          background: #ccc;
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
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    // justify-content: center;
    margin-top: 1rem;

    h1 {
      font-weight: 200;
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    // antpicker {
    //   width: 10em;
    //   max-width: 500px;
    // }
  }

  .action-buttons {
    button {
      padding: 0.5em 1em;
      width: 10em;
      border: none;
      border-radius: 0.25em;
      margin-top: 1em;
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
  address?: string;
  description?: string;
  category?: string;
  tasksize?: 'Small' | 'Medium' | 'Large';
  taskerInContact?: any;
}

const TaskDescription = ({
  task,
  taskCategory,
  setTask,
  next,
}: {
  task: TaskDetails;
  taskCategory: string;
  setTask: (task: TaskDetails) => void;
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
    setTask({ ...task, ...values });
    next();
  };
  return (
    <div className="task-details-container">
      <h2 className="step-heading">Task Description</h2>
      <div className="form-container">
        <p className="task-category">{taskCategory.toUpperCase()}</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...register('address', {
              required: 'Required',
              // pattern: {
              //   value: /^[\w%+.-]+@[\d.a-z-]+\.[a-z]{2,}$/i,
              //   message: 'invalid email address',
              // },
            })}
            value={task.address}
            placeholder="address"
          />
          <br />
          {errors.address && errors.address.message}

          <br />
          <textarea
            {...register('description', {
              required: 'Required',
              // validate: (value) => value !== 'admin' || 'Nice try!',
            })}
            placeholder="Task Description..."
            value={task.description}
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
            // value={task.tasksize}
            defaultValue={task.tasksize}
          >
            <option value={'Select task size'}>Select task size</option>
            <option value={'Small'}>Small</option>
            <option value={'Medium'}>Medium</option>
            <option value={'Large'}>Large</option>
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
  task,
  setTask,
}: {
  statedTaskers: any;
  taskCategory: string;
  next: () => void;
  task: TaskDetails;
  setTask: (task: TaskDetails) => void;
}) => {
  return (
    <div className="tasker-cards-container">
      <h2>Tasker Selection</h2>
      <p>Available taskers : {statedTaskers.length}</p>
      {statedTaskers.map((tasker: any) => (
        <div className="tasker-card" key={tasker.id}>
          <div className="tasker-card-top">
            <div className="tasker-image">
              <img src={tasker.image} alt="tasker" />
            </div>
            <div className="tasker-details">
              <div className="tasker-lead">
                <div>
                  {tasker.firstname} {tasker.lastname}
                </div>
                <div>Rs.{tasker.price ?? 100}/hr</div>
              </div>
              {tasker.reviews ? (
                <p>
                  {tasker.reviews.length === 1
                    ? '1 review'
                    : `${tasker.reviews.length} reviews`}
                </p>
              ) : (
                <p>No reviews</p>
              )}
              {tasker.tasks ? (
                <p>
                  {tasker.tasks.length === 1
                    ? `1 ${taskCategory} review`
                    : `${tasker.tasks.length} ${taskCategory} tasks`}
                </p>
              ) : (
                <p>No {taskCategory} tasks</p>
              )}
            </div>
          </div>
          <div className="tasker-card-bottom">
            <p className="tasker-experience">
              {tasker.experience ??
                'I have over 4 years of experience mounting portraits, paintings and more. I do not currently mount televisions at the moment. 2 hrs min and travel expense may be added depending on distance. I look forward to working with you soon.'}
            </p>
            <button
              onClick={() => {
                setTask({ ...task, taskerInContact: tasker.id });
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

const TimeSelector = () => {
  return (
    <div className="time-selector">
      <h1>Select meeting time</h1>
      <DatePicker />
      <TimePicker />
    </div>
  );
};

const Create: NextPage = () => {
  const user = useReactiveVar(userVar);
  const [currentStep, setCurrentStep] = React.useState(1);
  // console.log(user);
  if (!Cookies.get('signedin') || !user) {
    typeof window !== 'undefined' && Router.push('/login');
  }

  const taskCategory = useReactiveVar(taskCategoryVar);

  const [task, setTask] = React.useState<TaskDetails>({});

  const [statedTaskers, setStatedTaskers] = React.useState([]);

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
        isActive
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

  React.useEffect(() => {
    console.log('taskers', taskers?.taskers);
    if (taskers && taskers.taskers) {
      setStatedTaskers(taskers.taskers);
    }
  }, [taskers]);

  if (!taskCategory) {
    typeof window !== 'undefined' && Router.push('/dashboard/explore');
    return <></>;
  }

  console.log('task', task);

  // const TimeSelction = <div>Time Selection</div>;

  const Confirmation = <div>Confirmation</div>;

  let currentComponent: React.ReactElement = <></>;

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  switch (currentStep) {
    case 1: {
      currentComponent = (
        <TaskDescription
          task={task}
          taskCategory={taskCategory}
          setTask={setTask}
          next={next}
        />
      );

      break;
    }
    case 2: {
      currentComponent = (
        <TaskerSelection
          statedTaskers={statedTaskers}
          taskCategory={taskCategory}
          task={task}
          setTask={setTask}
          next={next}
        />
      );

      break;
    }
    case 3: {
      currentComponent = <TimeSelector />;

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

  return (
    <StyledDiv>
      <></>
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
            onClick={openNotification}
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
    </StyledDiv>
  );
};

export default Create;
