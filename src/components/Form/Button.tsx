import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  outline?: boolean;
  ghost?: boolean;
  status?: 'sky' | 'red';
}

export function Button(props: ButtonProps) {
  let extra = '';

  if (props.status === 'sky' || props.status === 'red') {
    extra = `bg-${props.status}-500 text-white hover:bg-${props.status}-600 focus:ring-${props.status}-500`;

    console.log('Button -> props.outline:', props.outline);
    if (props.outline) {
      console.log('Button -> props.status:', props.status);

      extra = `bg-transparent hover:bg-${props.status}-500 text-${props.status}-700 hover:text-white border border-${props.status}-500 hover:border-transparent`;

      console.log('Button -> color:', extra);
    }
  }

  console.log('Button -> extra:', extra);

  return (
    <button
      {...props}
      className={`
        flex-auto 
        shadow 
        rounded-md
        text-sm
        border-y
        py-2 px-3
        font-semibold
        focus:outline-none focus:ring-2 focus:ring-offset-2 
        border-transparent
        ${extra ?? ''}
      `}
    ></button>
  );
}
