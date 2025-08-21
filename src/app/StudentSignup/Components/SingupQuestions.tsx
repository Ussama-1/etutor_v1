'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import google from '../../../../public/assets/icons/googleicon.svg';
import { useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import Germany from '../../../../public/Flag_of_Germany.svg.webp';
import UnitedKingdom from '../../../../public/Flag_of_the_United_Kingdom_(1-2).svg.webp';
import UnitedStates from '../../../../public/america.png';
import France from '../../../../public/Flag-France.webp';
import Italy from '../../../../public/images.png';
import Ireland from '../../../../public/Irish_Flag__86476.jpg';
import Canada from '../../../../public/Flag-Canada.webp';
import Malta from '../../../../public/Flag-Malta.webp';
import Belize from '../../../../public/Belize.jpg';
import Belgium from '../../../../public/Belgium.webp';
import Switzerland from '../../../../public/Switzerland.png';
import Luxembourg from '../../../../public/Luxembourg.jpeg';
import Monaco from '../../../../public/Monaco.png';
import Haiti from '../../../../public/Haiti.png';
import Austria from '../../../../public/Flag_of_Austria.png';
import Liechtenstein from '../../../../public/liechtenstein.webp';
import Jamaica from '../../../../public/Flag_of_Jamaica.png';
import Barbados from '../../../../public/Flag_of_Barbados.svg';
import SaintLucia from '../../../../public/Saint Lucia.png';
import BurkinaFaso from '../../../../public/Flag-of-Burkina-Faso.webp';
import IvoryCoas from '../../../../public/ivory-coast.webp';
import { sendGAEvent } from '@next/third-parties/google';
import { useToast } from '@/hooks/use-toast';
import { signIn } from 'next-auth/react';
import FormContainer from '@/components/auth/FormContainer';
import GradeSelection from './GradeSelection';
import LevelSelection from './LevelSelection';
import SubjectSelection from './SubjectSelection';
import PersonalDetailsForm from './PersonalDetailsForm';
import AdditionalInformation from './AdditionalInformation';
import ShowAvailability from './ShowAvailability';

export interface StudentDetails {
  firstName: string;
  lastName: string;
  email?: string;
  password?: string;
  age: string;
  country: string;
  stateCity: string;
  institution: string;
  streetName: string;
  zipCode: string;
  phoneNumber?: string;
}

interface CountryCode {
  code: string;
  flag: string;
  name: string;
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

const SingupQuestions = () => {
  const { toast } = useToast();

  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [QuestionNo, setQuestionNo] = useState(1);
  const [isGradeConfirmed, setIsGradeConfirmed] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [personalDetailsIsConfirmed, setPersonalDetailsIsConfirmed] =
    useState<StudentDetails>({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      age: '',
      country: '',
      stateCity: '',
      institution: '',
      streetName: '',
      zipCode: '',
      phoneNumber: '',
    });
  const [additionalInformation, setAdditionalInformation] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeZone, setSelectedTimeZone] = useState(
    'Berlin, GMT +02:200'
  );
  const [error, seterror] = useState('');
  const [loading, setLoading] = useState<Boolean>(false);
  const [selectedCountryForPhone, setselectedCountryForPhone] = useState(
    countryCodes[0]
  );
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);

  const formData = {
    grade: selectedGrade,
    levelOfStudy: selectedLevel,
    firstName: personalDetailsIsConfirmed.firstName,
    lastName: personalDetailsIsConfirmed.lastName,
    phoneNumber: `(${selectedCountryForPhone.code}) ${personalDetailsIsConfirmed.phoneNumber}`,
    personalInformation: {
      country: personalDetailsIsConfirmed.country,
      city: personalDetailsIsConfirmed.stateCity,
      streetName: personalDetailsIsConfirmed.streetName,
      zipcode: personalDetailsIsConfirmed.zipCode,
      institution: personalDetailsIsConfirmed.institution,
      age: personalDetailsIsConfirmed.age,
    },
    subjects: selectedSubjects,
    additionalInformation: additionalInformation,
    availability: selectedTimeZone + selectedDate,
  };

  const handleOptionChange = (option: string) => {
    setSelectedLevel(option);
  };

  const confirmGrade = () => {
    setIsGradeConfirmed(true);
  };

  const handleGradeClick = (grade: any) => {
    setSelectedGrade(grade);
  };

  const handleSubjectConfirmation = (selectedSubjects: string[]) => {
    setSelectedSubjects(selectedSubjects);
    setQuestionNo(QuestionNo + 1);
  };

  const handlePersonalDetailsConfirmation = (data: StudentDetails) => {
    setPersonalDetailsIsConfirmed({
      firstName: data.firstName,
      lastName: data.lastName,
      age: data.age,
      country: data.country,
      stateCity: data.stateCity,
      institution: data.institution,
      streetName: data.streetName,
      zipCode: data.zipCode,
    });
    setQuestionNo(QuestionNo + 1);
  };

  const handleAdditionalInformationConfirmation = (additionalInfo: string) => {
    setAdditionalInformation(additionalInfo);
    setQuestionNo(QuestionNo + 1);
  };

  const handleAvailabilityConfirmation = (
    selectedDate: Date,
    selectedTimeZone: string
  ) => {
    setSelectedDate(selectedDate);
    setSelectedTimeZone(selectedTimeZone);
    setQuestionNo(QuestionNo + 1);
  };

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

    const emailError = validateEmail(personalDetailsIsConfirmed.email.trim());
    if (emailError) {
      return emailError;
    }

    if (!personalDetailsIsConfirmed.password?.trim()) {
      return 'Password is required';
    }

    const passwordError = validatePassword(
      personalDetailsIsConfirmed.password.trim()
    );
    if (passwordError) {
      return passwordError;
    }

    if (!personalDetailsIsConfirmed.phoneNumber?.trim()) {
      return 'Phone Number is required';
    }

    return null;
  };

  const handleGoogleSignIn = async () => {
    let data = localStorage.getItem('formData');
    if (data) {
      localStorage.removeItem('formData');
    }

    localStorage.setItem('formData', JSON.stringify(formData));

    await signIn('google', {
      callbackUrl: `${window.location.origin}/verifystudent`,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const validationError = validateFormFields();
    if (validationError) {
      seterror(validationError);
      return;
    }

    setLoading(true);

    console.log('Form Data: ', formData);

    try {
      const referId = localStorage.getItem('referIdPerson');

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: personalDetailsIsConfirmed.email,
          password: personalDetailsIsConfirmed.password,
          student: formData,
          referId: referId || null,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        seterror(data.message);
        throw new Error(data.message || 'Signup failed');
      }

      router.push('/StudentSignup/Confirmation');
      sendGAEvent('event', 'studentSignup', { value: 'success' });
      localStorage.removeItem('referIdPerson');
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      if (error.message) {
        setLoading(false);
        seterror(error.message);
        // Handle errors from the server
        console.error('Signup error:', error.message);
      } else {
        setLoading(false);
        // Handle network or other errors
        console.error('Error during signup:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const onSignUpFormChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setPersonalDetailsIsConfirmed({
      ...personalDetailsIsConfirmed,
      [name]: value,
    });
  };

  const renderClassLevelOptions = () => {
    switch (selectedLevel) {
      case 'middle':
        return (
          <GradeSelection
            grade='middle'
            handleGradeClick={handleGradeClick}
            selectedGrade={selectedGrade}
            gradeConfirmationHandler={() => setIsGradeConfirmed(true)}
          />
        );
      case 'elementary':
        return (
          <GradeSelection
            grade='elementary'
            handleGradeClick={handleGradeClick}
            selectedGrade={selectedGrade}
            gradeConfirmationHandler={() => setIsGradeConfirmed(true)}
          />
        );
      case 'high':
        return (
          <GradeSelection
            grade='high'
            handleGradeClick={handleGradeClick}
            selectedGrade={selectedGrade}
            gradeConfirmationHandler={() => setIsGradeConfirmed(true)}
          />
        );
      case 'college':
        return (
          <GradeSelection
            grade='college'
            handleGradeClick={handleGradeClick}
            selectedGrade={selectedGrade}
            gradeConfirmationHandler={() => setIsGradeConfirmed(true)}
          />
        );
      default:
        return null;
    }
  };

  const renderQuestionNo = () => {
    switch (QuestionNo) {
      case 1:
        return (
          <SubjectSelection
            subjectConfirmationHandler={handleSubjectConfirmation}
          />
        );
      case 2:
        return (
          <PersonalDetailsForm onConfirm={handlePersonalDetailsConfirmation} />
        );
      case 3:
        return (
          <AdditionalInformation
            onConfirm={handleAdditionalInformationConfirmation}
          />
        );
      case 4:
        return <ShowAvailability onConfirm={handleAvailabilityConfirmation} />;
      case 5:
        return (
          <FormContainer
            title='Sign Up'
            maxWidth='max-w-2xl'
            titleAlignment='left'
          >
            <p className='text-lightpurple text-1xl mt-1 custom-2xl:mt-3.5'>
              As a Student
            </p>
            <div
              onClick={handleGoogleSignIn}
              className='flex items-center justify-center  p-3.5 text-2xl gap-3 text-darkBlue cursor-pointer rounded-full bg-transparent border-darkBlue border mt-5 custom-2xl:mt-11 mb:py-2 mb:text-sm hover:bg-gray-50 hover:border-gray-400 transition-all duration-300'
            >
              <Image loading='lazy' src={google} alt='google' />
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
                    value={personalDetailsIsConfirmed.firstName}
                    onChange={onSignUpFormChangeHandler}
                  />
                </div>
                <div className='rounded-full bg-purpleBtn px-6 py-[17px] flex items-center w-full '>
                  <input
                    type='text'
                    className='placeholder-darkBlue w-full bg-transparent outline-none mb:text-xs text-xl text-darkBlue'
                    placeholder='Last Name'
                    name='lastName'
                    value={personalDetailsIsConfirmed.lastName}
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
                  value={personalDetailsIsConfirmed.email}
                  onChange={onSignUpFormChangeHandler}
                />
              </div>

              <div className='rounded-full bg-purpleBtn px-6 py-[17px] flex items-center w-full mt-3 sm:mt-5'>
                <input
                  type='password'
                  className='placeholder-darkBlue w-full bg-transparent outline-none mb:text-xs text-xl text-darkBlue'
                  placeholder='Password'
                  name='password'
                  value={personalDetailsIsConfirmed.password}
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
                      value={personalDetailsIsConfirmed.phoneNumber}
                      onChange={onSignUpFormChangeHandler}
                      name='phoneNumber'
                      className=' bg-transparent ml-6 w-full outline-none mb:text-xs text-xl text-darkBlue bg-[#DBCAFF] placeholder-darkBlue font-medium truncate'
                      placeholder='Phone number'
                    />
                  </div>

                  {showDropdown && (
                    <div className='absolute top-full left-0 mt-2 w-44 bg-[#DBCAFF] rounded-3xl shadow-lg py-2  max-h-[12.5rem] px-3 overflow-y-auto scrollbar-none'>
                      {countryCodes.map(country => (
                        <button
                          type='button'
                          key={country.code}
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
    }
  };

  return (
    <>
      {!selectedLevel && (
        <LevelSelection
          handleOptionChange={handleOptionChange}
          confirmGrade={confirmGrade}
        />
      )}
      {selectedLevel && !isGradeConfirmed && renderClassLevelOptions()}
      {isGradeConfirmed && renderQuestionNo()}
    </>
  );
};

export default SingupQuestions;
