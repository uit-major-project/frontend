import type { NextPage } from 'next';

import styled from '@emotion/styled';
import Cookies from 'js-cookie';
import Router from 'next/router';
// import { useReactiveVar } from '@apollo/client';

// import { userVar } from 'src/apollo/reactiveVars';
import React from 'react';
import EmptyDisplay from 'src/components/EmptyDisplay';

// import { RiTodoLine } from 'react-icons/ri';
import { gql, useQuery, useReactiveVar } from '@apollo/client';
import { userVar } from 'src/apollo/reactiveVars';
// import { tasks } from 'data/tasks';
import { MdOutlineTaskAlt } from 'react-icons/md';

const StyledDiv = styled.div`
  padding: 3rem;
`;

const Active: NextPage = () => {
  const user = useReactiveVar(userVar);
  // console.log(user);
  if (!Cookies.get('signedin') || !user) {
    typeof window !== 'undefined' && Router.push('/login');
  }

  // React.useEffect(() => {
  //   if (!Cookies.get('signedin') && !user) {
  //     Router.push('/login');
  //   }
  // }, []);

  const bookingAction = {
    href: '/dashboard/explore',
    name: 'Book now',
  };

  const GET_TASKS = gql`
    query getCurrentUser {
      getCurrentUser {
        id
        firstname
        lastname
        email
        tasks {
          id
        }
      }
    }
  `;

  const { data, error, loading } = useQuery(GET_TASKS);

  // if (error) {
  //   console.error('error fetching tasks user', error);
  // }

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
    <StyledDiv>
      {user?.tasks && user?.tasks.length > 0 ? (
        <div>
          {user.tasks.map((task: any) => (
            <div key={task.id}>
              <p>{task.id}</p>
            </div>
          ))}
        </div>
      ) : (
        <EmptyDisplay
          icon={<MdOutlineTaskAlt />}
          title="Have something you want to get done?"
          action={bookingAction}
        />
      )}
    </StyledDiv>
  );
};

export default Active;
