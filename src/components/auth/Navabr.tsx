import Image from 'next/image';
import Logo from '../../../public/assets/signup/signuplogo.svg';

const Navabr = () => {
  return (
    <div className='px-20 pt-5 sm:pt-10 custom-2xl:pt-20 mb:p-5 transition-all flex justify-between items-center'>
      <Image
        loading='lazy'
        src={Logo}
        alt='Logo'
        className='cursor-pointer w-16 sm:w-24 custom-lg:w-32'
      />
      <div className='flex items-center gap-4'>
        <button className='text-[#534988] font-medium text-lg hover:text-[#9184F0] transition-colors duration-300'>
          SIGN IN
        </button>
        <button className='bg-[#9184F0] text-white px-6 py-2 rounded-full font-medium text-lg hover:bg-[#534988] transition-colors duration-300'>
          SIGN UP
        </button>
      </div>
    </div>
  );
};

export default Navabr;
