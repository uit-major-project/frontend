import { gql, useQuery, useReactiveVar } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import { taskCategoryVar, userVar } from 'src/apollo/reactiveVars';
import { Task, TaskType } from 'src/utils/types';
import styled from '@emotion/styled';
import { getFormattedTimeFromUnix } from '../dashboard/active';

import { FiInfo } from 'react-icons/fi';
import { Tooltip, Col, Row } from 'antd';
import { TaskerCard } from 'src/components/TaskerCard';

const StyledDiv = styled.div`
  padding: 1em 3rem;

  .task-details {
    h2 {
      margin: 0.25em 0 1em 0;
      font-size: 2rem;
      font-weight: 500;
      // text-align: center;
    }

    Row {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    display: flex;
    flex-direction: column;

    .field-name {
      font-size: 1.15rem;
      font-weight: 600;
      text-transform: uppercase;
      margin: 0 0 1.5em 0;
    }
    .field-details {
      font-size: 1.25rem;
      // margin-bottom: 0.5rem;
    }

    .action-buttons {
      display: flex;
      // justify-content: space-between;
      margin-top: 1rem;

      button {
        margin: 0 2.5rem 0 0;
        // width: 100%;
        padding: 0.75rem 1.5rem;
        // height: 3rem;
        border-radius: 5px;
        border: 1px solid #ccc;
        background: #fff;
        font-size: 1.25rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        &:hover {
          background: #f5f5f5;
        }
      }
    }
  }
`;

const Task = () => {
  const router = useRouter();
  const { taskid } = router.query;

  const user = useReactiveVar(userVar);

  const taskCategory = useReactiveVar(taskCategoryVar);

  // const GET_TASKS = gql`
  //   query getCurrentUser {
  //     getCurrentUser {
  //       id
  //       firstname
  //       lastname
  //       email
  //       image
  //       tasks {
  //         id
  //         createdAt
  //         updatedAt

  //         description
  //         dueDate
  //         location
  //         pincode

  //         taskerInContact {
  //           firstname
  //           lastname
  //           email
  //           image
  //           phone
  //           experience
  //         }

  //         size
  //         status
  //       }
  //     }
  //   }
  // `;

  // const { data, error, loading } = useQuery(GET_TASKS);

  // // if (error) {
  // //   console.error('error fetching tasks user', error);
  // // }

  // if (loading) {
  //   console.log('fetching current user...');
  // }

  // React.useEffect(() => {
  //   console.log('user', data?.getCurrentUser);
  //   if (data && data.getCurrentUser) {
  //     userVar(data.getCurrentUser);
  //   }
  // }, [data]);

  const currentTask: any = user?.tasks?.find(
    (task: Task) => task.id === taskid
  );

  console.log('currentTask', currentTask);

  return (
    <StyledDiv>
      {currentTask && currentTask.id ? (
        <div className="task-details">
          <h2>Task Details</h2>
          <Row>
            <Col span={8} className="field-name">
              ID
            </Col>
            <Col className="field-details">{currentTask.id}</Col>
          </Row>
          <Row>
            <Col span={8} className="field-name">
              Due Date
            </Col>
            <Col className="field-details">
              {getFormattedTimeFromUnix(currentTask.dueDate as string)}
            </Col>
          </Row>
          <Row>
            <Col span={8} className="field-name">
              Location
            </Col>
            <Col className="field-details">{currentTask.location}</Col>
          </Row>
          <Row>
            <Col span={8} className="field-name">
              Pin-code
            </Col>
            <Col className="field-details">{currentTask.pincode}</Col>
          </Row>
          <Row>
            <Col span={8} className="field-name">
              Size
            </Col>
            <Col className="field-details">{currentTask.size}</Col>
            <Tooltip title="This is the approximate time to complete the task. Small(1 hr) Medium(3 hrs) Large(5 hrs)">
              <div>
                &nbsp;&nbsp;
                <FiInfo style={{ marginTop: '0.25em' }} />
              </div>
            </Tooltip>
          </Row>
          <Row>
            <Col span={8} className="field-name">
              Description
            </Col>
            <Col className="field-details">{currentTask.description}</Col>
          </Row>
          <Row>
            <Col span={8} className="field-name">
              Tasker
            </Col>
            <Col className="field-details">
              {/* {currentTask.taskerInContact.firstname}{' '}
              {currentTask.taskerInContact.lastname} */}
            </Col>
          </Row>
          <TaskerCard
            tasker={currentTask.taskerInContact}
            taskCategory={taskCategory}
          />

          <div className="action-buttons">
            <button>Mark as Completed</button>

            <button>Mark as Payed</button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </StyledDiv>
  );
};

export default Task;
