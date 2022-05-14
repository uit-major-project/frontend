/* eslint-disable @next/next/no-html-link-for-pages */
import styled from '@emotion/styled';

import NextLink from 'next/link';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .icon {
    svg {
      width: 5em;
      height: 5em;
    }
  }

  .title {
    margin: 1em;
    font-size: 1.5em;
  }

  .action-link {
    padding: 0.5em 1em;
    background: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.text};
  }
`;

interface Props {
  icon: React.ReactElement;
  title: string;
  description?: string;
  action?: {
    href: string;
    name: string;
  };
}

const EmptyDisplay = ({ icon, title, description, action }: Props) => {
  return (
    <StyledDiv>
      <div className="icon">{icon}</div>
      <h1 className="title">{title}</h1>
      {description && <p className="description">{description}</p>}
      {/* <button className="action-btn">{actionName}</button> */}

      {action && (
        <NextLink href={action.href}>
          <a href={action.href} className="action-link">
            {action.name}
          </a>
        </NextLink>
      )}
    </StyledDiv>
  );
};

export default EmptyDisplay;
