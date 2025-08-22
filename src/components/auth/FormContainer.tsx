import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  title: string;
  maxWidth?: string;
  titleAlignment?: 'left' | 'center';
}

const FormContainer = ({
  children,
  title,
  maxWidth,
  titleAlignment = 'center',
}: LayoutProps) => {
  const containerMaxWidth = maxWidth || 'max-w-3xl';
  const alignmentClass =
    titleAlignment === 'left' ? 'text-left' : 'text-center';

  return (
    <div
      className={`bg-[#EDE8FA] rounded-3xl p-8 m-1 sm:p-12 w-full ${containerMaxWidth} mx-auto shadow-lg`}
    >
      <h1
        className={`text-[#534988] font-bold ${alignmentClass} mb-2`}
        style={{ fontSize: '40px' }}
      >
        {title}
      </h1>
      {children}
    </div>
  );
};

export default FormContainer;
