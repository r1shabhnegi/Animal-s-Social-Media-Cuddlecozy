import { bottomBarConstants } from '@/constants';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

const Bottom = () => {
  const { pathname } = useLocation();

  return (
    <nav className='fixed bg-[#0f172a] bottom-0 z-50 md:hidden w-full'>
      <ul className='flex w-full justify-between px-2'>
        {bottomBarConstants.map((link) => {
          const isActive = pathname === link.route;
          return (
            <li key={link.label}>
              <Link
                to={link.route}
                className={` ${
                  isActive && 'bg-cyan-950'
                } rounded-lg flex flex-col items-center p-2`}>
                <img
                  src={link.imgURL}
                  alt={link.label}
                  className={`${isActive && 'sepia'} sm:w-5 sm:h-5`}
                />
                <p
                  className={`${
                    isActive && 'font-bold '
                  } text-[0.7rem] sm:text-[0.8rem]`}>
                  {link.label}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export default Bottom;
