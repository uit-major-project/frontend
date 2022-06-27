/* eslint-disable sonarjs/no-duplicate-string */
// import { useReactiveVar } from '@apollo/client';
import styled from '@emotion/styled';
import { taskTypes } from 'data/categories';
import Router from 'next/router';
// import Select from 'react-select';
import { taskCategoryVar } from 'src/apollo/reactiveVars';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 1.5em;
    font-weight: bold;
    margin: 1em 0 0.75em 0;
    letter-spacing: 0.25rem;
  }
  select {
    // padding: 0.5em;
    width: 100%;
    height: 2.5em;
    font-size: 1.25rem;
    font-weight: 200;
    text-transform: uppercase;
    margin: 0 0 1.5em 0;

    option {
      font-size: 1.25rem;
      font-weight: 200;
      text-transform: uppercase;
    }
  }
`;

interface Props {
  title: string;
}

export interface TaskCategory {
  id: string;
  title: string;
  image: string;
  description: string;
}

export const taskCategories: TaskCategory[] = [
  {
    id: '1',
    title: 'cleaning',
    image: 'https://i.imgur.com/XyqQZ9l.jpg',
    description: 'Clean the house',
  },
  {
    id: '2',
    title: 'cooking',
    image: 'https://i.imgur.com/XyqQZ9l.jpg',
    description: 'Cook the dinner',
  },
  {
    id: '3',
    title: 'shopping',
    image: 'https://i.imgur.com/XyqQZ9l.jpg',
    description: 'Buy the groceries',
  },
  {
    id: '4',
    title: 'gardening',
    image: 'https://i.imgur.com/XyqQZ9l.jpg',
    description: 'Plant the garden',
  },
  {
    id: '5',
    title: 'electrician',
    image: 'https://i.imgur.com/XyqQZ9l.jpg',
    description: 'Fix the lights',
  },
  {
    id: '6',
    title: 'carpenter',
    image: 'https://i.imgur.com/XyqQZ9l.jpg',
    description: 'Fix the walls',
  },
  {
    id: '7',
    title: 'painter',
    image: 'https://i.imgur.com/XyqQZ9l.jpg',
    description: 'Paint the house',
  },
  {
    id: '8',
    title: 'plumber',
    image: 'https://i.imgur.com/XyqQZ9l.jpg',
    description: 'Fix the pipes',
  },
  {
    id: '9',
    title: 'driver',
    image: 'https://i.imgur.com/XyqQZ9l.jpg',
    description: 'Drive the car',
  },
];

// const selectOptions = taskCategories.map((category) => ({
//   value: category.title,
//   label: category.title,
// }));

const handleTaskCategoryChange = (e: any) => {
  if (e.target.value !== 'Select a Category') {
    console.log('selected category', e.target.value);
    taskCategoryVar(e.target.value);
    Router.push('/dashboard/create');
  }
};

const BookTask = ({ title }: Props) => {
  // const taskCategory = useReactiveVar(taskCategoryVar);
  return (
    <StyledDiv>
      <h1>{title}</h1>
      <div className="search-bar">
        {/* <datalist id="task-category-suggestions">
          {taskCategories.map((category) => (
            <option key={category.id} value={category.title} />
          ))}
        </datalist>
        <input
          autoComplete="on"
          list="task-category-suggestions"
          type="text"
          placeholder="Select a task"
        /> */}
        {/* <Select onChange={(val: string) => {  }} options={selectOptions} /> */}
        <select onChange={handleTaskCategoryChange}>
          <option>Select a Category</option>
          {taskTypes.map((category) => (
            <option key={category.id} value={category.id}>
              {category.id}
            </option>
          ))}
        </select>
      </div>
    </StyledDiv>
  );
};

export default BookTask;
