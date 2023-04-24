// import type { NextPage } from 'next';

import styled from '@emotion/styled';
import Router from 'next/router';
// import { useReactiveVar } from '@apollo/client';

import React from 'react';
import EmptyDisplay from 'src/components/EmptyDisplay';

// import { RiTodoLine } from 'react-icons/ri';
import { gql, useQuery, useReactiveVar } from '@apollo/client';
import { userVar } from 'src/apollo/reactiveVars';
// import { tasks } from 'data/tasks';
import { MdOutlineTaskAlt, MdSort } from 'react-icons/md';

import { useTable, useSortBy, Row } from 'react-table';

import { format } from 'date-fns';
import { Tag } from 'antd';
import Link from 'next/link';
import { StyledLoader } from '../Loader';
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';

export const getFormattedTimeFromUnix = (timestamp: string) =>
  `${format(new Date(Number(timestamp)), 'MMM d, yyyy')}`;

const StyledDiv = styled.div`
  padding: 1em 3rem;

  h2 {
    margin: 0.25em 0 1em 0;
    font-size: 2rem;
    font-weight: 500;
    // text-align: center;
  }

  .table-container {
    height: calc(100vh - 15em);
    overflow: auto;
  }

  table {
    width: 100%;
    border-spacing: 0;
    // border: 1px solid black;

    .table-body {
      z-index: 0;
      max-height: 100%;
      // overflow-y: auto;
    }

    tr {
      // display: flex;
      background: #fafafa;
      cursor: pointer;
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    tr: hover {
      background-color: #f4f4f4;
    }

    th,
    td {
      margin: 0;
      padding: 0.5em 1.5em;
      // border-bottom: 1px solid black;
      // border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
      :first-child {
        padding: 0.5em 0.5em;
      }
    }

    th {
      text-align: left;
      // display: flex;

      background: #eee;

      position: sticky;
      top: 0px;
      margin: 0 0 0 0;
      overflow: hidden;
      z-index: 1;

      svg {
        width: 1em;
        height: auto;
      }
    }
  }
`;

const getStatusTagColor = (status: string) => {
  switch (status) {
    case 'open':
      return 'blue';
    case 'in-progress':
      return 'cyan';
    case 'done':
      return 'green';
    case 'cancelled':
      return 'red';
    default:
      return 'blue';
  }
};

function Table({ columns, data }: any) {
  // Use the useTable Hook to send the state and dispatch actions to
  // your table.
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup: any, index) => (
          <tr
            className="header-row"
            {...headerGroup.getHeaderGroupProps()}
            key={index}
          >
            {headerGroup.headers.map((column: any, columnIndex: number) => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                key={columnIndex}
                className={'column-header'}
              >
                <span style={{ textTransform: 'uppercase' }}>
                  {column.render('Header')}
                </span>
                <span>
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      // <MdSort />
                      <FaSortDown />
                    ) : (
                      // <MdSort direction="up" />
                      <FaSortUp />
                    )
                  ) : (
                    ''
                  )}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="table-body" {...getTableBodyProps()}>
        {rows.slice(0, 10).map((row: any, rowIndex) => {
          prepareRow(row);
          console.log('row', row);
          // if (!row.original || !row.original.id) {
          //   return <></>;
          // }
          return (
            <Link passHref href={`/task/${row.original.id}`} key={rowIndex}>
              <tr {...row.getRowProps()} key={rowIndex}>
                {row.cells.map((cell: any, index: number) => {
                  const cellHeader: any = cell.column.Header;
                  // console.log(
                  //   'cellHeader',
                  //   cellHeader,
                  //   'cell value',
                  //   cell.value
                  // );
                  if (cellHeader === 'Tasker') {
                    return (
                      <td {...cell.getCellProps()} key={index}>
                        <span>
                          {cell.value.firstname} {cell.value.lastname}
                        </span>
                      </td>
                    );
                  }
                  if (
                    cellHeader === 'Due Date' ||
                    cellHeader === 'Created At'
                    // cellHeader.props.children === 'Due Date'
                  ) {
                    return (
                      <td {...cell.getCellProps()} key={index}>
                        {getFormattedTimeFromUnix(cell.value)}
                      </td>
                    );
                  }
                  if (cellHeader === 'Status') {
                    return (
                      <td {...cell.getCellProps()} key={index}>
                        <Tag color={getStatusTagColor(cell.value)}>
                          {cell.value}
                        </Tag>
                      </td>
                    );
                  }
                  return (
                    <td {...cell.getCellProps()} key={index}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            </Link>
          );
        })}
      </tbody>
    </table>
  );
}

const UserDashActive = () => {
  const user = useReactiveVar(userVar);
  // console.log(user);
  if (!user) {
    typeof window !== 'undefined' && Router.push('/login');
  }

  // React.useEffect(() => {
  //   if (!user) {
  //     Router.push('/login');
  //   }
  // }, []);

  const bookingAction = {
    href: '/dashboard/explore',
    name: 'Book now',
  };

  const GET_TASKS = gql`
    query getCurrentUser($jwt: String) {
      getCurrentUser(jwt: $jwt) {
        id
        firstname
        lastname
        email
        image
        phone
        permanentAddress
        tasks {
          id
          createdAt
          updatedAt

          description
          dueDate
          location
          pincode

          taskerInContact {
            firstname
            lastname
            email
            image
            phone
            experience
            pricePerHourInRs
          }

          size
          status

          category
          isPaymentDone
        }
      }
    }
  `;

  // const token =
  //   typeof window !== 'undefined' && typeof localStorage !== 'undefined'
  //     ? localStorage.getItem('handy_services_user_token')
  //     : '';

  // const variables = process.env.NODE_ENV === 'development' ? {
  //   variables: {
  //     jwt: process.env.NEXT_PUBLIC_JWT,
  //   }
  // } : {};

  const { data, error, loading } = useQuery(GET_TASKS, {
    fetchPolicy: 'network-only',
    // ...variables,
  });

  if (error) {
    console.error('error fetching tasks user', error);
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

  const tableColumns = React.useMemo(
    () => [
      // {
      //   Header: '#',
      //   accessor: 'id',
      //   Cell: (row: any, index: number) => index + 1,
      // },
      {
        Header: 'Due Date',
        accessor: 'dueDate',
      },
      // {
      //   Header: 'Created At',
      //   accessor: 'createdAt',
      // },
      {
        Header: 'Category',
        accessor: 'category',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Location',
        accessor: 'location',
      },
      // {
      //   Header: 'Pincode',
      //   accessor: 'pincode',
      // },
      {
        Header: 'Size',
        accessor: 'size',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Tasker',
        accessor: 'taskerInContact',
      },
      // {
      //   Header: 'Is Payment Done',
      //   accessor: 'isPaymentDone',
      // },
      // {
      //   Header: 'Action',
      //   accessor: 'action',
      // },
    ],
    []
  );

  const tableData = React.useMemo(() => {
    if (data && data.getCurrentUser) {
      return data.getCurrentUser.tasks.map((task: any) => {
        return {
          dueDate: task.dueDate,
          description: task.description,
          location: task.location,
          pincode: task.pincode,
          size: task.size,
          status: task.status,
          createdAt: task.createdAt,
          taskerInContact: task.taskerInContact,
          id: task.id,
          isPaymentDone: task.isPaymentDone,
          category: task.category,
        };
      });
    }
  }, [data]);

  console.log('tableData', tableData);

  return (
    <StyledDiv>
      {loading ? (
        <StyledLoader />
      ) : (
        <>
          {data && user?.tasks && user?.tasks.length > 0 ? (
            <div>
              {/* {user.tasks.map((task: any) => (
              <div key={task.id}>
                <p>{task.id}</p>
              </div>
            ))} */}
              <h2>Your tasks</h2>
              <div className="table-container">
                <Table columns={tableColumns} data={tableData} />
              </div>
            </div>
          ) : (
            <EmptyDisplay
              icon={<MdOutlineTaskAlt />}
              title="Have something you want to get done?"
              action={bookingAction}
            />
          )}
        </>
      )}
    </StyledDiv>
  );
};

export default UserDashActive;
