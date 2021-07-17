import { css } from '@emotion/react';
import palette from '@/lib/styles/palette';
import zIndex from '@/lib/styles/zIndex';
import AppIcon from '../AppIcon';
import { IconType } from '../AppIcon/AppIcon';
import ActiveLink from '../ActiveLink';
import { useUserValue } from '@/lib/recoil/authState';

type PositionType = 'first' | 'second' | 'third';

export type FloatLinkButtonProps = {
  iconName: IconType;
  to: string;
  color?: string;
  position?: PositionType;
  visible?: boolean;
};

const FloatLinkButton = ({
  iconName,
  to,
  color = palette.lightBlue[500],
  position = 'first',
  visible = true,
}: FloatLinkButtonProps) => {
  const user = useUserValue();

  if (!visible) return null;
  if (!user) return null;

  return (
    <ActiveLink to={to} css={fixedLink(color, position)}>
      <AppIcon name={iconName} />
    </ActiveLink>
  );
};

const fixedLink = (color: string, position: PositionType) => css`
  position: fixed;
  right: 2.5rem;
  ${position === 'third' &&
  css`
    bottom: 15rem;
  `}
  ${position === 'second' &&
  css`
    bottom: 10rem;
  `}
  ${position === 'first' &&
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
  transition: all 0.2s ease-in-out;
  svg {
    color: white;
    transition: all 0.2s ease-in-out;
  }
  &:hover {
    opacity: 1;
    svg {
      transform: scale3d(1.2, 1.2, 1.2);
    }
  }

  ${zIndex.fixedButton};
`;

export default FloatLinkButton;
