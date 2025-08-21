'use client';
import React from 'react';
import SingupQuestions from './Components/SingupQuestions';
import Layout from '@/components/auth/Layout';

const Page = ({ QuestionNo }: any) => {
  return (
    <Layout>
      <SingupQuestions />
    </Layout>
  );
};

export default Page;
