import React from 'react';
import FormContainer from '@/components/auth/FormContainer';

interface LevelSelectionProps {
  handleOptionChange: (selectedLevel: string) => void;
  confirmGrade: () => void;
}

const LevelSelection = ({
  handleOptionChange,
  confirmGrade,
}: LevelSelectionProps) => {
  return (
    <FormContainer title='What is your level of study?'>
      <div className='space-y-4 sm:space-y-6'>
        <button
          onClick={() => handleOptionChange('elementary')}
          className='w-full py-4 px-6 bg-[#DDD3F8] border-2 border-[#9184F0] rounded-full text-[#534988] text-lg sm:text-xl font-medium hover:bg-[#9184F0] hover:text-white transition-all duration-300'
        >
          Elementary Schools
        </button>

        <button
          onClick={() => handleOptionChange('middle')}
          className='w-full py-4 px-6 bg-[#DDD3F8] border-2 border-[#9184F0] rounded-full text-[#534988] text-lg sm:text-xl font-medium hover:bg-[#9184F0] hover:text-white transition-all duration-300'
        >
          Middle school
        </button>

        <button
          onClick={() => handleOptionChange('high')}
          className='w-full py-4 px-6 bg-[#DDD3F8] border-2 border-[#9184F0] rounded-full text-[#534988] text-lg sm:text-xl font-medium hover:bg-[#9184F0] hover:text-white transition-all duration-300'
        >
          High school
        </button>

        <button
          onClick={() => handleOptionChange('college')}
          className='w-full py-4 px-6 bg-[#DDD3F8] border-2 border-[#9184F0] rounded-full text-[#534988] text-lg sm:text-xl font-medium hover:bg-[#9184F0] hover:text-white transition-all duration-300'
        >
          College / Graduate school
        </button>

        <button
          onClick={() => {
            handleOptionChange('adult');
            confirmGrade();
          }}
          className='w-full py-4 px-6 bg-[#DDD3F8] border-2 border-[#9184F0] rounded-full text-[#534988] text-lg sm:text-xl font-medium hover:bg-[#9184F0] hover:text-white transition-all duration-300'
        >
          Adult / professional
        </button>
      </div>
    </FormContainer>
  );
};

export default LevelSelection;
