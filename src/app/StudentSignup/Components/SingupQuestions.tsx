'use client';
import React, { useEffect, useState } from 'react';
import SingupHeading from './SingupHeading';
import QuestionBtn from './QuestionBtn';
import ConfirmBtn from './ConfirmBtn';
import Image from 'next/image';
import dropdown from '../../../../public/assets/icons/downarrow.svg';
import uparrow from '../../../../public/assets/icons/uparrow.svg';
import google from '../../../../public/assets/icons/googleicon.svg';
import line from '../../../../public/assets/icons/line.svg';
import countryicon from '../../../../public/assets/icons/countryicon.svg';
import { useNavigate } from 'react-router-dom';
import Link from 'next/link';
import calendaricon from '../../../../public/calendaricongray.svg';
import Page from '../page';
import InputHeading from '@/app/ETutorSignup/components/InputHeading';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  X,
} from 'lucide-react';
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

const timezones = [
  { label: 'Baker Island, GMT -12:00', value: 'Baker Island, GMT -12:00' },
  { label: 'American Samoa, GMT -11:00', value: 'American Samoa, GMT -11:00' },
  { label: 'Hawaii, GMT -10:00', value: 'Hawaii, GMT -10:00' },
  { label: 'Alaska, GMT -09:00', value: 'Alaska, GMT -09:00' },
  {
    label: 'Pacific Time (US & Canada), GMT -08:00',
    value: 'Pacific Time (US & Canada), GMT -08:00',
  },
  {
    label: 'Mountain Time (US & Canada), GMT -07:00',
    value: 'Mountain Time (US & Canada), GMT -07:00',
  },
  {
    label: 'Central Time (US & Canada), GMT -06:00',
    value: 'Central Time (US & Canada), GMT -06:00',
  },
  {
    label: 'Eastern Time (US & Canada), GMT -05:00',
    value: 'Eastern Time (US & Canada), GMT -05:00',
  },
  { label: 'Caracas, GMT -04:00', value: 'Caracas, GMT -04:00' },
  { label: 'Buenos Aires, GMT -03:00', value: 'Buenos Aires, GMT -03:00' },
  { label: 'South Georgia, GMT -02:00', value: 'South Georgia, GMT -02:00' },
  { label: 'Cape Verde, GMT -01:00', value: 'Cape Verde, GMT -01:00' },
  { label: 'London, GMT ±00:00', value: 'London, GMT ±00:00' },
  { label: 'Berlin, GMT +01:00', value: 'Berlin, GMT +01:00' },
  { label: 'Cairo, GMT +02:00', value: 'Cairo, GMT +02:00' },
  { label: 'Moscow, GMT +03:00', value: 'Moscow, GMT +03:00' },
  { label: 'Dubai, GMT +04:00', value: 'Dubai, GMT +04:00' },
  { label: 'Islamabad, GMT +05:00', value: 'Islamabad, GMT +05:00' },
  {
    label: 'India Standard Time, GMT +05:30',
    value: 'India Standard Time, GMT +05:30',
  },
  { label: 'Nepal, GMT +05:45', value: 'Nepal, GMT +05:45' },
  { label: 'Dhaka, GMT +06:00', value: 'Dhaka, GMT +06:00' },
  { label: 'Myanmar, GMT +06:30', value: 'Myanmar, GMT +06:30' },
  { label: 'Bangkok, GMT +07:00', value: 'Bangkok, GMT +07:00' },
  { label: 'Beijing, GMT +08:00', value: 'Beijing, GMT +08:00' },
  {
    label: 'Australia Central Time, GMT +08:45',
    value: 'Australia Central Time, GMT +08:45',
  },
  { label: 'Tokyo, GMT +09:00', value: 'Tokyo, GMT +09:00' },
  {
    label: 'Australia Central Time, GMT +09:30',
    value: 'Australia Central Time, GMT +09:30',
  },
  { label: 'Sydney, GMT +10:00', value: 'Sydney, GMT +10:00' },
  {
    label: 'Lord Howe Island, GMT +10:30',
    value: 'Lord Howe Island, GMT +10:30',
  },
  {
    label: 'Solomon Islands, GMT +11:00',
    value: 'Solomon Islands, GMT +11:00',
  },
  { label: 'Norfolk Island, GMT +11:30', value: 'Norfolk Island, GMT +11:30' },
  { label: 'Auckland, GMT +12:00', value: 'Auckland, GMT +12:00' },
  {
    label: 'Chatham Islands, GMT +12:45',
    value: 'Chatham Islands, GMT +12:45',
  },
  { label: "Nuku'alofa, GMT +13:00", value: "Nuku'alofa, GMT +13:00" },
  { label: 'Kiritimati, GMT +14:00', value: 'Kiritimati, GMT +14:00' },
];

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

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [nameDropdonw, setNameDropdonw] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [text, setText] = useState('');
  const [isOpenCountry, setIsOpenCountry] = useState(false);
  const [selectedTimeZone, setSelectedTimeZone] = useState(
    'Berlin, GMT +02:200'
  );
  const [countryInfo, setCountryInfo] = useState('Berlin, GMT +02:200');
  const [country, setcountry] = useState('');
  const [selectedcity, setselectedcity] = useState('');
  const [streetname, setstreetname] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [institue, setInstitue] = useState('');
  const [Age, setAge] = useState('');
  const [date, setdate] = useState('');
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [countrycode, setcountrycode] = useState('');
  const [error, seterror] = useState('');
  const [loading, setLoading] = useState('Continue');
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isOpentime, setIsOpentime] = useState(false);
  const [selectedTime, setSelectedTime] = useState('Berlin, GMT +02:00');
  const [selectedCountryForPhone, setselectedCountryForPhone] = useState(
    countryCodes[0]
  );
  const [completephonenumber, setCompletephonenumber] = useState('');
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const formData = {
    grade: selectedGrade,
    levelOfStudy: selectedLevel,
    firstName: firstname,
    lastName: lastname,
    phoneNumber: completephonenumber,

    personalInformation: {
      country: selectedCountry,
      city: selectedcity,
      streetName: streetname,
      zipcode: zipcode,
      institution: institue,
      age: Age,
    },

    subjects: selectedSubjects,
    additionalInformation: text,
    availability: selectedTimeZone + date,
  };

  useEffect(() => {
    setCompletephonenumber(`(${selectedCountryForPhone.code}) ${phoneNumber}`);
  }, [phoneNumber, phone, selectedCountryForPhone]);

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
    setLoading('Please Wait...');

    seterror('');
    try {
      const referId = localStorage.getItem('referIdPerson');

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
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
    } catch (error: any) {
      setLoading('Continue');
      if (error.message) {
        setLoading('Continue');
        seterror(error.message);
        // Handle errors from the server
        console.error('Signup error:', error.message);
      } else {
        setLoading('Continue');
        // Handle network or other errors
        console.error('Error during signup:', error.message);
      }
    } finally {
      setLoading('Continue');
    }
  };

  const timeZones = [
    'Newyork, GMT +01:00',
    'Paris, GMT +02:00',
    'Berlin, GMT +02:00',
    'Berlin, GMT +02:00',
    'London, GMT +01:00',
    'Moscow, GMT +03:00',
  ];

  const countryCode = [
    {
      id: 1,
      code: '49',
      img: countryicon,
    },
    {
      id: 2,
      code: '265',
      img: countryicon,
    },
    {
      id: 3,
      code: '112',
      img: countryicon,
    },
    {
      id: 4,
      code: '212',
      img: countryicon,
    },
  ];

  const handleTimeSelect = (time: any) => {
    // handleBookingInputChange("time", time);
    setSelectedTimeZone(time);
    setSelectedTime(time);
    setIsOpentime(false);
  };

  // date picker-----------------------------------
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const generateDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add previous month's days
    const prevMonthDays = firstDay;
    for (let i = prevMonthDays - 1; i >= 0; i--) {
      days.push({
        day: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          -i
        ).getDate(),
        isCurrentMonth: false,
      });
    }

    // Add current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, isCurrentMonth: true });
    }

    // Add next month's days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
      });
    }

    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    setdate(date);
    setIsOpen(false);
  };

  // -------------------------------------------

  const toggleCountry = () => {
    setIsOpenCountry(!isOpenCountry);
  };
  const handleSelect = (timezone: any) => {
    setSelectedTimeZone(timezone);
    setIsOpenCountry(false);
  };
  const handleCountry = (country: any) => {
    setCountryInfo(country);
    setIsOpenCountry(false);
  };
  const clearText = () => {
    setText('');
  };

  const handleCountrySelect = (country: any) => {
    setcountrycode(country.code); // Update country code
    setPhone(`+${country.code}`); // Set phone to include selected country code
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
          <div className='  rounded-3xl bg-questionbg py-14 px-16 w-full lg:p-8 mb:w-full mb:p-6'>
            <div>
              <SingupHeading heading='Additional Information' />
            </div>
            <p className='text-darkBlue text-2xl mb:text-xs mt-4'>
              Please provide any important information about yourself that you
              feel your eTutor should know. This could include learning
              preferences, any disabilities, a 504 plan or specific teaching
              strategies that work best for you. Your notes will help us tailor
              your learning experience to better meet your needs.
            </p>
            <div className='relative my-24 mb:my-5'>
              <textarea
                className='bg-purpleBtn placeholder-[#9085C4]  text-darkBlue font-bold  w-full rounded-2xl p-4 border-gray-500 border focus:border-blue-500 focus:outline-none mb:text-xs'
                value={text}
                onChange={e => setText(e.target.value)}
                rows={11}
                placeholder='Type here'
              ></textarea>
              {text != '' && (
                <button
                  onClick={clearText}
                  className='absolute top-2 right-10 bg-black-500 text-black rounded p-1'
                  title='Clear text'
                >
                  &times;
                </button>
              )}
            </div>
            <div className='w-9/12 m-auto'>
              <ConfirmBtn
                onClick={() => {
                  if (!text) {
                    toast({
                      title: 'Missing Fields!',
                      description: 'Kindly provide additional information.',
                      variant: 'default',
                    });
                  } else {
                    setQuestionNo(QuestionNo + 1);
                  }
                }}
                btnName='Confirm'
              />
            </div>
          </div>
        );
      // when you are available
      case 4:
        return (
          <div className=' rounded-3xl mx-auto bg-questionbg px-8 py-10 w-2/6 lg:w-1/2  lg:p-8 mb:w-full mb:p-6'>
            <SingupHeading heading='When are you available?' />

            <div className='w-full  mx-auto relative '>
              <div className='w-full  mx-auto relative'>
                {/* Input field */}
                <div
                  className='w-full bg-[#DBCAFF] text-[#a394d6] text-sm custom-lg:text-xl custom-2xl:text-2xl pl-10 pr-8 py-2 sm:py-3 rounded-full cursor-pointer flex justify-between items-center'
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <span className='text-purple-400'>
                    {selectedDate
                      ? // @ts-ignore
                        selectedDate.toLocaleDateString()
                      : 'Select a date'}
                  </span>
                  <Image
                    loading='lazy'
                    src={calendaricon}
                    alt=''
                    className='w-6 h-6'
                  />
                </div>

                {/* Calendar dropdown */}
                {isOpen && (
                  <div className='bg-[#e2d5fd] text-[#a394d6] z-50 rounded-3xl p-4 shadow-lg absolute top-[72px] w-full  px-4 sm:px-10 py-4 sm:py-9'>
                    {/* Header */}
                    <div className='flex items-center justify-between mb-11  '>
                      <button
                        onClick={handlePrevMonth}
                        className='text-purple-600'
                      >
                        <ChevronLeft className='w-8 h-8 font-bold' />
                      </button>
                      <h2 className='text-[#685AAD] font-medium text-sm sm:text-xl custom-2xl:text-3xl'>
                        {months[currentDate.getMonth()]}{' '}
                        {currentDate.getFullYear()}
                      </h2>
                      <button
                        onClick={handleNextMonth}
                        className='text-purple-600'
                      >
                        <ChevronRight className='w-8 h-8 font-bold ' />
                      </button>
                    </div>

                    {/* Days of week */}
                    <div className='grid grid-cols-7 gap-1 mb-2 '>
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                        <div
                          key={index}
                          className='text-center text-[#76639b] text-sm sm:text-lg custom-2xl:text-2xl font-medium'
                        >
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Calendar grid */}
                    <div className='grid grid-cols-7 gap-1'>
                      {generateDays().map((day, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            if (day.isCurrentMonth) {
                              handleDateChange(
                                new Date(
                                  currentDate.getFullYear(),
                                  currentDate.getMonth(),
                                  day.day
                                )
                              );
                            }
                          }}
                          className={`
                  p-2 text-center rounded-full text-sm sm:text-lg custom-2xl:text-2xl font-medium
                  ${day.isCurrentMonth ? 'text-[#685aad] ' : 'text-[#d3c6ef]'}
                  ${
                    // @ts-ignore
                    selectedDate &&
                    selectedDate.getDate() === day.day &&
                    selectedDate.getMonth() === currentDate.getMonth() &&
                    selectedDate.getFullYear() === currentDate.getFullYear()
                      ? ''
                      : ''
                  }
                `}
                        >
                          {day.day}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className='w-full  mx-auto mt-3 custom-xl:mt-6 relative  '>
              <div className='w-full  relative'>
                {/* Input field */}
                <div
                  className='relative  w-full bg-[#DBCAFF] text-[#a394d6] text-sm custom-lg:text-xl custom-2xl:text-2xl pl-10 pr-3 py-2 sm:py-2 sm:pr-3 sm:pl-6 rounded-full cursor-pointer flex justify-between items-center'
                  onClick={() => setIsOpentime(!isOpentime)}
                >
                  <span className='text-[#a394d6] truncate'>Start time</span>

                  <div className=' h-full w-fit sm:w-full  sm:max-w-[219px] bg-[#685AAD] rounded-full text-xs sm:text-base custom-xl:text-xl flex items-center justify-start px-4 text-white p-1.5 truncate'>
                    <span className='px-2 truncate'>{selectedTime}</span>

                    {isOpentime && (
                      <div
                        onMouseLeave={() => setIsOpentime(false)}
                        className='bg-[#685AAD] text-white rounded-3xl p-2 shadow-lg absolute  top-10 sm:top-14 w-full   max-w-[219px]  right-0'
                      >
                        <div
                          id='style-2'
                          className='max-h-[11.7rem] overflow-y-auto scrollbar-none  px-2 sm:px-4'
                        >
                          {timezones.map((timezone, index) => (
                            <button
                              key={index}
                              onClick={() => handleTimeSelect(timezone.value)}
                              className={`
                                    block w-full text-left sm:px-1 py-2  truncate last:border-b-0 border-b border-white text-xs sm:text-sm 
                                    ${selectedTime === timezone.value ? '' : ''}
                                  `}
                            >
                              {timezone.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Time options dropdown */}
              </div>
            </div>

            <div className='pt-3 '>
              <ConfirmBtn
                onClick={() => {
                  if (!selectedTime || !selectedDate) {
                    toast({
                      title: 'Missing Fields!',
                      description: 'Kindly provide your availablity',
                      variant: 'default',
                    });
                  } else {
                    setQuestionNo(QuestionNo + 1);
                  }
                }}
                btnName='Confirm'
              />
            </div>
          </div>
        );
      // signup form
      case 5:
        return (
          <div className='rounded-3xl md:rounded-[4rem] bg-questionbg px-5 sm:px-11 py-6 sm:py-9 max-w-[537px]  w-full custom-2xl:mr-[72px] -mt-4 '>
            <h1 className='text-4xl custom-xl:text-7xl font-extrabold text-darkBlue   lg:py-3  mb:py-2 py-0'>
              Sign Up
            </h1>
            <p className='text-lightpurple text-3xl mt-1 custom-2xl:mt-3.5'>
              As a Student
            </p>
            <div
              onClick={handleGoogleSignIn}
              className='flex items-center justify-center  p-3.5 text-2xl gap-3 text-darkBlue cursor-pointer rounded-full bg-transparent border-darkBlue border mt-5 custom-2xl:mt-11 mb:py-2 mb:text-sm'
            >
              <Image loading='lazy' src={google} alt='google' />
              Continue with Google
            </div>
            <div className='flex items-center justify-center w-full gap-3 py-5 px-3'>
              <div className='w-full'>
                {' '}
                <Image loading='lazy' alt='' src={line} />
              </div>
              <span className='text-darkBlue'>or</span>
              <div className='w-full'>
                <Image loading='lazy' alt='' src={line} />
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className='flex w-full flex-col sm:flex-row gap-5 mb:gap-3 mt-0.5'>
                <div className='rounded-full bg-purpleBtn px-6 py-[17px] flex items-center w-full '>
                  <input
                    type='text'
                    className='placeholder-darkBlue w-full bg-transparent outline-none mb:text-xs text-xl text-darkBlue'
                    placeholder='First Name'
                    value={firstname}
                    onChange={e => {
                      setfirstname(e.target.value);
                    }}
                  />
                </div>
                <div className='rounded-full bg-purpleBtn px-6 py-[17px] flex items-center w-full '>
                  <input
                    type='text'
                    className='placeholder-darkBlue w-full bg-transparent outline-none mb:text-xs text-xl text-darkBlue'
                    placeholder='Last Name'
                    value={lastname}
                    onChange={e => {
                      setlastname(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className='rounded-full bg-purpleBtn px-6 py-[17px] flex items-center w-full mt-3 sm:mt-5'>
                <input
                  type='email'
                  className='placeholder-darkBlue w-full bg-transparent outline-none mb:text-xs text-xl text-darkBlue'
                  placeholder='Email'
                  value={email}
                  onChange={e => {
                    setemail(e.target.value);
                  }}
                />
              </div>

              <div className='rounded-full bg-purpleBtn px-6 py-[17px] flex items-center w-full mt-3 sm:mt-5'>
                <input
                  type='password'
                  className='placeholder-darkBlue w-full bg-transparent outline-none mb:text-xs text-xl text-darkBlue'
                  placeholder='Password'
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value);
                  }}
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
                      value={phoneNumber}
                      onChange={e => setPhoneNumber(e.target.value)}
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

              <div></div>

              {error && <p className='text-red-600 mt-2'>{error}</p>}

              <div>
                <button
                  type='submit'
                  className='bg-customBlue text-2xl text-white rounded-full w-full py-[15.5px] font-bold  px-5 mt-14 border-darkBlue border cursor-pointer text-center lg:text-xl  mb:text-sm  mb:mt-7 '
                >
                  {loading}
                </button>
              </div>
            </form>
            <p className='text-darkBlue text-xs custom-xl:text-base mt-5'>
              By clicking “Continue with Google / Email“ you agree to our
              User{' '}
            </p>
            <span className='text-btnbg underline text-xs custom-xl:text-base'>
              Terms of Service and Privacy Policy
            </span>
          </div>
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
      <style jsx>{`
        #style-2::-webkit-scrollbar-track {
          border-radius: 10px;
          background-color: #c9bbef;
        }

        #style-2::-webkit-scrollbar {
          width: 5px;
          background-color: transparent;
        }

        #style-2::-webkit-scrollbar-thumb {
          border-radius: 10px;

          background-color: #8f81c7;
        }
      `}</style>
    </>
  );
};

export default SingupQuestions;
