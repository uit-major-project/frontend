import styled from '@emotion/styled';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

interface Props {
  title: string;
}

const BookTask = ({ title }: Props) => {
  return (
    <StyledDiv>
      <h1>{title}</h1>
      <div className="search-bar">
        <input type="text" placeholder="Select a task" />
      </div>
    </StyledDiv>
  );
};

export default BookTask;
