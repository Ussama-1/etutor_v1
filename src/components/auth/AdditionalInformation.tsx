import React, { useState } from 'react';
import FormContainer from '@/components/auth/FormContainer';

interface AdditionalInformationProps {
  onConfirm: (additionalInfo: string) => void;
  title: string;
  description: string;
}

const AdditionalInformation = ({
  onConfirm,
  title,
  description,
}: AdditionalInformationProps) => {
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [error, setError] = useState(false);

  const handleConfirm = () => {
    if (!additionalInfo.trim()) {
      setError(true);
      return;
    }
    onConfirm(additionalInfo);
  };

  const handleInputChange = (value: string) => {
    setAdditionalInfo(value);
    if (error && value.trim()) {
      setError(false);
    }
  };

  return (
    <FormContainer title={title} maxWidth='max-w-4xl' titleAlignment='left'>
      <div className='space-y-8'>
        {/* Description */}
        <div>
          <p className='text-[#685AAD] text-lg leading-relaxed'>
            {description}
          </p>
        </div>

        {/* Textarea */}
        <div className='relative'>
          <textarea
            value={additionalInfo}
            onChange={e => handleInputChange(e.target.value)}
            placeholder='Type here'
            rows={5}
            className={`w-full px-6 py-6 rounded-3xl text-lg placeholder-[#685AAD] transition-all duration-300 bg-[#FFFFFF] text-[#534988] focus:outline-none resize-none ${
              error
                ? 'border-2 border-red-500'
                : 'border-2 border-[#BBBBBB] focus:border-[#9184F0]'
            }`}
          />
          {error && (
            <p className='text-red-600 text-sm mt-2 ml-2'>
              Please provide additional information to help us serve you better.
            </p>
          )}
        </div>

        {/* Confirm Button */}
        <div className='flex justify-center mt-12 pt-4'>
          <button
            onClick={handleConfirm}
            className='bg-[#8358F7] text-white px-16 py-4 rounded-full text-lg font-semibold hover:bg-[#6B46C1] transition-all duration-300 shadow-lg hover:shadow-xl'
          >
            Confirm
          </button>
        </div>
      </div>
    </FormContainer>
  );
};

export default AdditionalInformation;
