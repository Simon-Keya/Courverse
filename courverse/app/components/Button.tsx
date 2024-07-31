import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, onClick, type = 'button', variant = 'primary' }) => {
  const baseStyle = 'px-4 py-2 font-semibold rounded-md focus:outline-none';
  const variantStyle = variant === 'primary' ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-500 text-white hover:bg-gray-600';

  return (
    <button type={type} onClick={onClick} className={`${baseStyle} ${variantStyle}`}>
      {children}
    </button>
  );
};

export default Button;
