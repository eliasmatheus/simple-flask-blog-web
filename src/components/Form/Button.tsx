import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button(props: ButtonProps) {
  const sky =
    'bg-sky-500 text-white hover:bg-sky-600 focus:ring-sky-300 dark:focus:ring-sky-700';

  return (
    <button
      {...props}
      className={`
        flex-auto 
        shadow 
        rounded-md
        text-sm
        border-y
        border-transparent
        py-2 px-3
        font-semibold
        focus:outline-none focus:ring-2 focus:ring-offset-2 
        ${props.color === 'sky' ? sky : ''}
      `}
    ></button>
  );
}
