import { FaArrowRightToBracket } from 'react-icons/fa6';
import { FaListCheck } from 'react-icons/fa6';
import { FaFloppyDisk } from 'react-icons/fa6';

const Navbar = () => {
  return (
    <nav className=' bg-gray-200 py-6 fixed bottom-0 left-0 flex justify-around items-center w-full'>
      <div className='flex flex-col gap-2 items-center justify-center'>
        <FaListCheck size={30} />
        <span className='text-lg'>Packing</span>
      </div>
      <div className='flex flex-col gap-2 items-center justify-center'>
        <FaFloppyDisk size={30} />
        <span className='text-lg'>Saved Lists</span>
      </div>
      <div className='flex flex-col gap-2 items-center justify-center'>
        <FaArrowRightToBracket size={30} />
        <span className='text-lg'>Login</span>
      </div>
    </nav>
  );
};

export default Navbar;
