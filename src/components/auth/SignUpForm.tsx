import React, { useState } from 'react';
import FormContainer from '@/components/auth/FormContainer';
import Image from 'next/image';
import Google from '../../../public/assets/icons/googleicon.svg';
import Germany from '../../../public/Flag_of_Germany.svg.webp';
import UnitedKingdom from '../../../public/Flag_of_the_United_Kingdom_(1-2).svg.webp';
import UnitedStates from '../../../public/america.png';
import France from '../../../public/Flag-France.webp';
import Italy from '../../../public/images.png';
import Ireland from '../../../public/Irish_Flag__86476.jpg';
import Canada from '../../../public/Flag-Canada.webp';
import Malta from '../../../public/Flag-Malta.webp';
import Belize from '../../../public/Belize.jpg';
import Belgium from '../../../public/Belgium.webp';
import Switzerland from '../../../public/Switzerland.png';
import Luxembourg from '../../../public/Luxembourg.jpeg';
import Monaco from '../../../public/Monaco.png';
import Haiti from '../../../public/Haiti.png';
import Austria from '../../../public/Flag_of_Austria.png';
import Liechtenstein from '../../../public/liechtenstein.webp';
import Jamaica from '../../../public/Flag_of_Jamaica.png';
import Barbados from '../../../public/Flag_of_Barbados.svg';
import SaintLucia from '../../../public/Saint Lucia.png';
import BurkinaFaso from '../../../public/Flag-of-Burkina-Faso.webp';
import IvoryCoas from '../../../public/ivory-coast.webp';
import { ChevronDown } from 'lucide-react';

export interface StudentDetails {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: string;
  country: string;
  stateCity: string;
  institution: string;
  streetName: string;
  zipCode: string;
  phoneNumber: string;
}

interface SignUpFormProps {
  handleGoogleSignIn: () => void;
  signUpFormSubmitHandler: () => void;
  personalDetailsIsConfirmed: any;
  setPersonalDetailsIsConfirmed: any;
}

interface CountryCode {
  code: string;
  flag: string;
  name: string;
  id?: string;
}

const countryCodes: CountryCode[] = [
  { code: '+49', flag: Germany, name: 'Germany' },
  { code: '+44', flag: UnitedKingdom, name: 'United Kingdom' },
  { code: '+1', flag: UnitedStates, name: 'United States' },
  { code: '+33', flag: France, name: 'France' },
  { code: '+39', flag: Italy, name: 'Italy' },
  { code: '+353', flag: Ireland, name: 'Ireland' },
  { code: '+1', flag: Canada, name: 'Canada' },
  { code: '+356', flag: Malta, name: 'Malta' },
  { code: '+501', flag: Belize, name: 'Belize' },
  { code: '+32', flag: Belgium, name: 'Belgium' },
  { code: '+41', flag: Switzerland, name: 'Switzerland' },
  { code: '+352', flag: Luxembourg, name: 'Luxembourg' },
  { code: '+377', flag: Monaco, name: 'Monaco' },
  { code: '+509', flag: Haiti, name: 'Haiti' },
  { code: '+43', flag: Austria, name: 'Austria' },
  { code: '+423', flag: Liechtenstein, name: 'Liechtenstein' },
  { code: '+1 876', flag: Jamaica, name: 'Jamaica' },
  { code: '+1 246', flag: Barbados, name: 'Barbados' },
  { code: '+1 758', flag: SaintLucia, name: 'Saint Lucia' },
  { code: '+226', flag: BurkinaFaso, name: 'Burkina Faso' },
  { code: '+225', flag: IvoryCoas, name: 'Ivory Coast' },
];

const SignUpForm = ({
  handleGoogleSignIn,
  signUpFormSubmitHandler,
  personalDetailsIsConfirmed,
  setPersonalDetailsIsConfirmed,
}: SignUpFormProps) => {
  const [error, seterror] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCountryForPhone, setselectedCountryForPhone] = useState(
    countryCodes[0]
  );

  const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return null;
  };

  const validatePassword = (password: string): string | null => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/\d/.test(password)) {
      return 'Password must contain at least one number';
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return 'Password must contain at least one special character';
    }
    return null;
  };

  const validateFormFields = (): string | null => {
    if (!personalDetailsIsConfirmed.firstName?.trim()) {
      return 'First Name is required';
    }
    if (!personalDetailsIsConfirmed.lastName?.trim()) {
      return 'Last Name is required';
    }
    if (!personalDetailsIsConfirmed.email?.trim()) {
      return 'Email is required';
    }

    const emailError = validateEmail(personalDetailsIsConfirmed.email?.trim());
    if (emailError) {
      return emailError;
    }

    if (!personalDetailsIsConfirmed.password?.trim()) {
      return 'Password is required';
    }

    const passwordError = validatePassword(
      personalDetailsIsConfirmed.password?.trim()
    );
    if (passwordError) {
      return passwordError;
    }

    if (!personalDetailsIsConfirmed.phoneNumber?.trim()) {
      return 'Phone Number is required';
    }

    return null;
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const validationError = validateFormFields();
    if (validationError) {
      seterror(validationError);
      return;
    }

    signUpFormSubmitHandler();
  };

  const onSignUpFormChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'phoneNumber') {
      setPersonalDetailsIsConfirmed({
        ...personalDetailsIsConfirmed,
        [name]: `(${selectedCountryForPhone.code}) ${value}`,
      });
    } else {
      setPersonalDetailsIsConfirmed({
        ...personalDetailsIsConfirmed,
        [name]: value,
      });
    }

    // Clear error when user starts typing
    if (error) {
      seterror('');
    }
  };

  return (
    <FormContainer title='Sign Up' maxWidth='max-w-2xl' titleAlignment='left'>
      <p className='text-lightpurple text-1xl mt-1 custom-2xl:mt-3.5'>
        As a Student
      </p>
      <div
        onClick={handleGoogleSignIn}
        className='flex items-center justify-center  p-3.5 text-2xl gap-3 text-darkBlue cursor-pointer rounded-full bg-transparent border-darkBlue border mt-5 custom-2xl:mt-11 mb:py-2 mb:text-sm hover:bg-gray-50 hover:border-gray-400 transition-all duration-300'
      >
        <Image loading='lazy' src={Google} alt='google' />
        Continue with Google
      </div>
      <div className='flex items-center justify-center w-full gap-3 py-5 px-3'>
        <div className='flex-1 h-px bg-gray-300'></div>
        <span className='text-darkBlue px-2'>or</span>
        <div className='flex-1 h-px bg-gray-300'></div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className='flex w-full flex-col sm:flex-row gap-5 mb:gap-3 mt-0.5'>
          <div className='rounded-full bg-purpleBtn px-6 py-[17px] flex items-center w-full '>
            <input
              type='text'
              className='placeholder-darkBlue w-full bg-transparent outline-none mb:text-xs text-xl text-darkBlue'
              placeholder='First Name'
              name='firstName'
              value={personalDetailsIsConfirmed.firstName || ''}
              onChange={onSignUpFormChangeHandler}
            />
          </div>
          <div className='rounded-full bg-purpleBtn px-6 py-[17px] flex items-center w-full '>
            <input
              type='text'
              className='placeholder-darkBlue w-full bg-transparent outline-none mb:text-xs text-xl text-darkBlue'
              placeholder='Last Name'
              name='lastName'
              value={personalDetailsIsConfirmed.lastName || ''}
              onChange={onSignUpFormChangeHandler}
            />
          </div>
        </div>

        <div className='rounded-full bg-purpleBtn px-6 py-[17px] flex items-center w-full mt-3 sm:mt-5'>
          <input
            type='email'
            className='placeholder-darkBlue w-full bg-transparent outline-none mb:text-xs text-xl text-darkBlue'
            placeholder='Email'
            name='email'
            value={personalDetailsIsConfirmed.email || ''}
            onChange={onSignUpFormChangeHandler}
          />
        </div>

        <div className='rounded-full bg-purpleBtn px-6 py-[17px] flex items-center w-full mt-3 sm:mt-5'>
          <input
            type='password'
            className='placeholder-darkBlue w-full bg-transparent outline-none mb:text-xs text-xl text-darkBlue'
            placeholder='Password'
            name='password'
            value={personalDetailsIsConfirmed.password || ''}
            onChange={onSignUpFormChangeHandler}
          />
        </div>

        <div className=' text-darkBlue bg-[#DBCAFF] rounded-full mt-3 sm:mt-5'>
          <div className='relative'>
            <div className='rounded-full bg-purpleBtn px-6 py-2.5 custom-lg:py-[17px] flex items-center w-full'>
              <button
                type='button'
                onClick={() => setShowDropdown(!showDropdown)}
                className='flex items-center   custom-2xl:pr-3 min-w-fit'
              >
                <div className='flex items-center gap-2 custom-2xl:gap-4  '>
                  <span className=''>
                    <Image
                      loading='lazy'
                      src={selectedCountryForPhone.flag}
                      alt=''
                      className='w-4 sm:w-8 h-4 sm:h-8 rounded-full'
                    />
                  </span>
                  <span className='text-[#685AAD] text-lg custom-2xl:text-xl'>
                    {selectedCountryForPhone.code}
                  </span>
                </div>

                <ChevronDown
                  className={` ${showDropdown && 'transform rotate-180'}  ml-5 w-3 custom-lg:w-5 h-3 custom-lg:h-5 text-[#685aad5e] font-bold`}
                />
              </button>
              <input
                type='tel'
                value={personalDetailsIsConfirmed.phoneNumber || ''}
                onChange={onSignUpFormChangeHandler}
                name='phoneNumber'
                className=' bg-transparent ml-6 w-full outline-none mb:text-xs text-xl text-darkBlue bg-[#DBCAFF] placeholder-darkBlue font-medium truncate'
                placeholder='Phone number'
              />
            </div>

            {showDropdown && (
              <div className='absolute top-full left-0 mt-2 w-44 bg-[#DBCAFF] rounded-3xl shadow-lg py-2  max-h-[12.5rem] px-3 overflow-y-auto scrollbar-none'>
                {countryCodes.map((country, index) => (
                  <button
                    type='button'
                    key={`${country.code}-${country.name}-${index}`}
                    onClick={() => {
                      setselectedCountryForPhone(country);
                      setShowDropdown(false);
                    }}
                    className='flex items-center space-x-3 w-full p-3 hover:bg-purple-50 transition-colors border-b border-[#0000004b] last:border-b-0  '
                  >
                    <span className='rounded-full relative  flex items-center justify-center'>
                      <Image
                        loading='lazy'
                        src={country.flag}
                        alt=''
                        className='w-6 h-6 rounded-full'
                      />
                    </span>
                    <span className='text-[#685AAD]'>{country.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className='mt-3 p-3 border border-red-400 text-red-700 rounded-lg'>
            {error}
          </div>
        )}

        <button
          type='submit'
          className='bg-[#8358F7] text-white px-16 py-4 rounded-full text-lg font-semibold hover:bg-[#6B46C1] transition-all duration-300 shadow-lg hover:shadow-xl mt-3 sm:mt-5 w-full'
        >
          Continue
        </button>
      </form>

      <p className='text-darkBlue text-xs custom-xl:text-base mt-2'>
        By clicking “Continue with Google / Email“ you agree to our User
      </p>
      <span className='text-btnbg underline text-xs custom-xl:text-base'>
        Terms of Service and Privacy Policy
      </span>
    </FormContainer>
  );
};

export default SignUpForm;
