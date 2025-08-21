'use client';
import { ReactNode } from 'react';
import Authbackground from '../../../public/assets/signup/auth-background.png';
import Navabr from './Navabr';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div
      className='min-h-screen bg-cover bg-center bg-no-repeat'
      style={{ backgroundImage: `url(${Authbackground.src})` }}
    >
      <Navabr />

      <div className='flex items-center justify-center min-h-[calc(100vh-120px)] px-4'>
        {children}
      </div>

      <div className='text-center pb-8'>
        <p className='text-[#534988] text-sm'>
          eTutor4me Inc. © Copyright 2025. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Layout;
