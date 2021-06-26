import React from 'react';
import * as svg from '@/assets/icons';
import Google from '@/assets/icons/google.svg';

export type AppIconProps = {
  name: IconType;
  className?: string;
  style?: React.CSSProperties;
};

export type IconType = keyof typeof svg;

// const AppIcon = ({ name, className, style }: AppIconProps) => {
//   return React.createElement(svg[name], {
//     className,
//     style,
//   });
// };

const AppIcon = ({ name, className, style }: AppIconProps) => {
  switch (name) {
    case 'google':
      return <Google className={className} style={style} />;
    default:
      return null;
  }
};

export default AppIcon;
