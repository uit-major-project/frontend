import styled from '@emotion/styled';
import PulseLoader from 'react-spinners/PulseLoader';

export const StyledLoader = styled(PulseLoader)`
  position: absolute;
  top: 50%;
  left: 50%;
  // margin: auto;
  color: ${(props) => props.theme.colors.primary};
  // background-color: ${(props) => props.theme.colors.primary};
`;
