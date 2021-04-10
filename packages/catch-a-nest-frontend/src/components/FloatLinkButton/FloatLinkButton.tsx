import { css } from '@emotion/react';
import palette from '@src/lib/palette';
import zIndex from '@src/lib/styles/zIndex';
import { Link } from 'react-router-dom';
import AppIcon from '../AppIcon';
import { IconType } from '../AppIcon/AppIcon';

type PositionType = 'top' | 'bottom';

export type FloatLinkButtonProps = {
  iconName: IconType;
  to: string;
  color?: string;
  position?: PositionType;
};

const FloatLinkButton = ({
  iconName,
  to,
  color = palette.lightBlue[500],
  position = 'bottom',
}: FloatLinkButtonProps) => {
  return (
    <Link to={to} css={fixedLink(color, position)}>
      <AppIcon name={iconName} />
    </Link>
  );
};

const fixedLink = (color: string, position: PositionType) => css`
  position: fixed;
  right: 2.5rem;
  ${position === 'top' &&
  css`
    bottom: 10rem;
  `}
  ${position === 'bottom' &&
  css`
    bottom: 5rem;
  `}
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  background: ${color};
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    color: white;
    transition: all 0.2s ease-in-out;
  }
  &:hover {
    svg {
      transform: scale3d(1.2, 1.2, 1.2);
    }
  }

  ${zIndex.fixedButton};
`;

export default FloatLinkButton;
