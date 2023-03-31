import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  status?: 'danger' | 'primary';
}

export function GhostButton(props: ButtonProps) {
  if (!props.status) {
    props.status = 'primary';
  }

  console.log('props.status:', props.status);

  const colors = {
    danger: 'sky',
    primary: 'sky',
  };

  const button = `
   bg-sky-500 
   flex-auto 
   shadow 
   text-white 
   rounded-md 
   text-sm 
   border-y 
   border-transparent 
   py-2 
   font-semibold 
   px-3 
   hover:bg-sky-600 
   dark:hover:bg-sky-400 
   focus:outline-none 
   focus:ring-2 
   focus:ring-offset-2 
   focus:ring-sky-300 
   dark:focus:ring-offset-slate-900 
   dark:focus:ring-sky-700`;

  return (
    <button
      {...props}
      className={`
        flex-auto 
        shadow 
        rounded-md 
        font-semibold 
        ring-1 
        ring-slate-900/5 
        leading-5 
        sm:text-sm border 
        border-transparent 
        py-2 
        px-3 
        text-slate-900 dark:text-white
        focus:outline-none 
        hover:bg-${colors[props.status]}-600 
        dark:hover:bg-${colors[props.status]}-400 
        dark:hover:ring-${colors[props.status]}-500 
        dark:hover:text-slate-900
        bg-white dark:bg-slate-700/20 
        dark:ring-slate-200/20 
      `}
    ></button>
  );
}
