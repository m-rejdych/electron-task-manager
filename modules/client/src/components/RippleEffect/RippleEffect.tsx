import React, { useState } from 'react';

import classes from './styles.module';

const RippleEffect: React.FC = ({ children }) => {
  const [hasClass, setHasClass] = useState(false);

  const handleClick = (e: React.MouseEvent, ...args: unknown[]): void => {
    (children as React.ReactElement).props.onClick?.(e, ...args);
    setHasClass(true);
    setTimeout(() => {
      setHasClass(false);
    }, 500);
  };

  return React.cloneElement(children as React.ReactElement, {
    className: `${hasClass ? classes.ripple : ''}${
      ` ${(children as React.ReactElement).props.className}` || ''
    }`,
    onClick: handleClick,
  });
};

export default RippleEffect;
