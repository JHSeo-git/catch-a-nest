import React from 'react';
import * as svg from '@/assets/icons';
import Google from '@/assets/icons/google.svg';
import Write from '@/assets/icons/write.svg';
import Fix from '@/assets/icons/fix.svg';
import ArrowLeft from '@/assets/icons/arrow-left.svg';
import ArrowRight from '@/assets/icons/arrow-right.svg';

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

const AppIcon = ({ name, ...props }: AppIconProps) => {
  switch (name) {
    case 'google':
      return <Google {...props} />;
    case 'write':
      return <Write {...props} />;
    case 'fix':
      return <Fix {...props} />;
    case 'arrowLeft':
      return <ArrowLeft {...props} />;
    case 'arrowRight':
      return <ArrowRight {...props} />;
    default:
      return null;
  }
};

export default AppIcon;
