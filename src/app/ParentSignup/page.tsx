'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { sendGAEvent } from '@next/third-parties/google';
import { signIn } from 'next-auth/react';
import Layout from '@/components/auth/Layout';
import { useToast } from '@/hooks/use-toast';
import GradeSelection from '@/components/auth/GradeSelection';
import LevelSelection from '@/components/auth/LevelSelection';
import SubjectSelection from '@/components/auth/SubjectSelection';
import PersonalDetailsForm from '@/components/auth/PersonalDetailsForm';
import AdditionalInformation from '@/components/auth/AdditionalInformation';
import ShowAvailability from '@/components/auth/ShowAvailability';
import SignUpForm from '@/components/auth/SignUpForm';
import ParentInformation from '@/components/auth/ParentInformation';
import axios from 'axios';

export interface ParentDetails {
  firstName: string;
  lastName: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  country: string;
  stateCity: string;
  streetName: string;
  zipCode: string;
}

export interface ChildDetails {
  firstName: string;
  lastName: string;
  age: string;
  country: string;
  stateCity: string;
  institution: string;
  streetName: string;
  zipCode: string;
}

const Page = () => {
  const { toast } = useToast();

  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [QuestionNo, setQuestionNo] = useState(1);
  const [isGradeConfirmed, setIsGradeConfirmed] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [personalDetailsIsConfirmed, setPersonalDetailsIsConfirmed] =
    useState<ParentDetails>({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      country: '',
      stateCity: '',
      streetName: '',
      zipCode: '',
      phoneNumber: '',
    });
  const [additionalInformation, setAdditionalInformation] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeZone, setSelectedTimeZone] = useState(
    'Berlin, GMT +02:200'
  );
  const [childDetailsIsConfirmed, setChildDetailsIsConfirmed] =
    useState<ChildDetails>({
      firstName: '',
      lastName: '',
      age: '',
      country: '',
      stateCity: '',
      institution: '',
      streetName: '',
      zipCode: '',
    });
  const [error, seterror] = useState('');
  const [loading, setLoading] = useState<Boolean>(false);
  const router = useRouter();

  const formData = {
    email: personalDetailsIsConfirmed.email,
    password: personalDetailsIsConfirmed.password,
    parent: {
      firstName: personalDetailsIsConfirmed.firstName,
      lastName: personalDetailsIsConfirmed.lastName,
      age: childDetailsIsConfirmed.age,
      institution: childDetailsIsConfirmed.institution,
      phoneNumber: personalDetailsIsConfirmed.phoneNumber,
      levelOfStudy: selectedLevel,
      grade: selectedGrade,
      subjectChildNeeds: selectedSubjects,
      additionalInformation: additionalInformation,
      availability: selectedTimeZone + ' ' + selectedDate,
      childInformation: {
        firstName: childDetailsIsConfirmed.firstName,
        lastName: childDetailsIsConfirmed.lastName,
        age: childDetailsIsConfirmed.age,
        country: childDetailsIsConfirmed.country,
        city: childDetailsIsConfirmed.stateCity,
        institution: childDetailsIsConfirmed.institution,
        streetName: childDetailsIsConfirmed.streetName,
        zipCode: childDetailsIsConfirmed.zipCode,
      },
      parentPersonalInformation: {
        country: personalDetailsIsConfirmed.country,
        city: personalDetailsIsConfirmed.stateCity,
        streetName: personalDetailsIsConfirmed.streetName,
        zipCode: personalDetailsIsConfirmed.zipCode,
      },
    },
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

  const handleChildDetailsConfirmation = (data: ChildDetails) => {
    setChildDetailsIsConfirmed({
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

  const handleParentDetailsConfirmation = (data: any) => {
    setPersonalDetailsIsConfirmed({
      ...personalDetailsIsConfirmed,
      country: data.country,
      stateCity: data.stateCity,
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

  const signUpFormSubmitHandler = async () => {
    setLoading(true);

    try {
      const referId = localStorage.getItem('referIdPerson');
      // const response = await axios.post("/api/auth/signup/parent", formData);
      const response = await axios.post('/api/auth/signup/parent', {
        ...formData,
        referId: referId || null, // Include the referId in the request data
      });
      // Redirect to confirmation page on successful signup
      router.push('/ParentSignup/Confirmation');
      sendGAEvent('event', 'parentSignup', { value: 'success' });
      localStorage.removeItem('referIdPerson');
    } catch (error: any) {
      // setLoading('Continue');
      let errorMessage =
        'An unexpected error occurred. Please try again later.';

      if (error.response) {
        setLoading(false);
        // Handle errors from the server
        if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else {
          errorMessage =
            'Error: ' +
            error.response.status +
            ' - ' +
            error.response.statusText;
        }
      } else if (error.request) {
        // Handle network errors (request was made but no response received)
        errorMessage = 'Network error. Please check your internet connection.';
      } else {
        setLoading(false);
        // Handle other errors
        errorMessage = 'Error: ' + error.message;
      }

      // Set the error message to state
      seterror(errorMessage);
    } finally {
      setLoading(false);
    }
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
            title='What is your Child’s Grade?'
          />
        );
      case 'elementary':
        return (
          <GradeSelection
            grade='elementary'
            handleGradeClick={handleGradeClick}
            selectedGrade={selectedGrade}
            gradeConfirmationHandler={() => setIsGradeConfirmed(true)}
            title='What is your Child’s Grade?'
          />
        );
      case 'high':
        return (
          <GradeSelection
            grade='high'
            handleGradeClick={handleGradeClick}
            selectedGrade={selectedGrade}
            gradeConfirmationHandler={() => setIsGradeConfirmed(true)}
            title='What is your Child’s Grade?'
          />
        );
      case 'college':
        return (
          <GradeSelection
            grade='college'
            handleGradeClick={handleGradeClick}
            selectedGrade={selectedGrade}
            gradeConfirmationHandler={() => setIsGradeConfirmed(true)}
            title='What is your Child’s Grade?'
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
            title='What subjects does your child need help with?'
          />
        );
      case 2:
        return (
          <PersonalDetailsForm
            onConfirm={handleChildDetailsConfirmation}
            title='Child’s Personal Information'
          />
        );
      case 3:
        return (
          <AdditionalInformation
            onConfirm={handleAdditionalInformationConfirmation}
            title='Additional Information'
            description='Please share anything you think your child’s eTutor should know to support them better. This could include learning preferences, challenges, a 504 plan, or helpful teaching strategies. Your notes will help us personalize their learning experience.'
          />
        );
      case 4:
        return (
          <ShowAvailability
            onConfirm={handleAvailabilityConfirmation}
            title='When is your child available?'
          />
        );
      case 5:
        return (
          <ParentInformation
            onConfirm={handleParentDetailsConfirmation}
            title="Parent's Personal Information"
          />
        );
      case 6:
        return (
          <SignUpForm
            handleGoogleSignIn={handleGoogleSignIn}
            signUpFormSubmitHandler={signUpFormSubmitHandler}
            personalDetailsIsConfirmed={personalDetailsIsConfirmed}
            setPersonalDetailsIsConfirmed={setPersonalDetailsIsConfirmed}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      {!selectedLevel && (
        <LevelSelection
          handleOptionChange={handleOptionChange}
          confirmGrade={confirmGrade}
          formType='parent'
          title='What grade level is your child in?'
        />
      )}
      {selectedLevel && !isGradeConfirmed && renderClassLevelOptions()}
      {isGradeConfirmed && renderQuestionNo()}
    </Layout>
  );
};

export default Page;
