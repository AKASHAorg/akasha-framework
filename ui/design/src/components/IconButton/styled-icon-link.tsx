import { Anchor } from 'grommet';
import styled, { css } from 'styled-components';

interface IStyledIconLinkProps {
  iconPosition?: 'start' | 'end';
  size?: string;
}

const StyledIconLink = styled(Anchor)<IStyledIconLinkProps>`
  border-radius: ${props => props.theme.shapes.largeBorderRadius};
  border: none;
  padding: 0 0.8em;
  color: ${props => props.theme.colors.secondaryText};
  font-weight: 400;
  &:hover {
    text-decoration: none;
    color: ${props => props.theme.colors.accent};
    svg {
      & * {
        stroke: ${props => props.theme.colors.accent};
      }
    }
  }
  svg {
    height: 100%;
    stroke: ${props => props.theme.colors.lightGrey};
    ${props => {
      if (props.size) {
        return css`
          width: ${props.theme.spacing.components.iconButton.fontSize[props.size]};
        `;
      }
      return css`
        width: ${props.theme.spacing.components.iconButton.fontSize.small};
      `;
    }}
    & * {
      stroke: ${props => props.theme.colors.secondaryText};
    }
  }
`;

export default StyledIconLink;
