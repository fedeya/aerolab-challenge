import type { FC } from 'react';
import clsx from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  outline?: boolean;
};

const Button: FC<ButtonProps> = ({ outline, ...props }) => {
  return (
    <button
      {...props}
      className={clsx(
        'text-lg rounded-2xl font-semibold',
        {
          'text-white bg-gradient-to-r from-brand-primary to-brand-secondary':
            !outline,
          'bg-brand-light': outline
        },
        props.className
      )}
    >
      {outline ? (
        <span className="text-transparent bg-gradient-to-r bg-clip-text from-brand-primary to-brand-secondary">
          {props.children}
        </span>
      ) : (
        props.children
      )}
    </button>
  );
};

export default Button;
