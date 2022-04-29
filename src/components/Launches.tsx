import React from 'react';
import { useQuery, gql } from '@apollo/client';

export const Launches = (): JSX.Element => {
  const test = gql`
    query exampleQuery {
      books {
        title
        author
      }
    }
  `;
  const { data, error, loading } = useQuery(test);

  return (
    <div>
      <h2>Books :</h2>
      {loading && <h2 style={{ color: 'blue' }}>Loading...</h2>}
      {error && <h2 style={{ color: 'red' }}>Error...</h2>}
      {data && console.log(data)}
      {data &&
        data.books.map((book: any) => {
          return (
            <h2 key={book.title}>
              Book Name: {book.title} &nbsp; Author: {book.author}
            </h2>
          );
        })}
    </div>
  );
};
