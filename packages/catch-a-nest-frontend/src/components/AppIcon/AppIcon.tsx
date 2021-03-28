import React from 'react';
import * as svg from './svg';

export type AppIconProps = {
  name: IconType;
  className?: string;
  style?: React.CSSProperties;
};

export type IconType = keyof typeof svg;

const AppIcon = ({ name, className, style }: AppIconProps) => {
  return React.createElement(svg[name], {
    className,
    style,
  });
};

export default AppIcon;
