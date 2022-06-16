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
      width: 4.5em;
      height: 4.5em;
    }
  }

  .title {
    font-size: 1.5em;
    font-weight: 500;
    margin-top: 16px;
  }

  .action-link {
    margin: 1em;
    font-size: 1.5em;
    text-decoration: none;
    color: ${(props) => props.theme.colors.background};
    background-color: ${(props) => props.theme.colors.primary};
    padding: 0.25em 2em;
    border-radius: 1em;
  }

  .action-link:hover {
    background-color: ${(props) => props.theme.colors.background};
    border: 1px solid ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.primary};
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
