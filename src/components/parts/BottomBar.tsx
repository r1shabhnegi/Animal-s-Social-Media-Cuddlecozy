import { Link, useLocation } from 'react-router-dom';
import { bottomBarLinks } from '@/instance';
const BottomBar = () => {
  const { pathname } = useLocation();

  return (
    <section className='z-50 flex flex-row w-full sticky justify-between bottom-0 rounded-t-[20px] bg-dark-2 px-5 py-4 md:hidden'>
      {bottomBarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <Link
            key={link.label}
            to={link.route}
            className={`${
              isActive && 'bg-primary-500'
            } group flex items-center bg-rd-400 px-2 py-1 gap-1  rounded-xl justify-center transition flex-col`}>
            <img
              src={link.imgURL}
              alt='img'
              className={`group-hover:text-white  ${
                isActive && 'invert brightness-0'
              } group-hover:invert group-hover:brightness-0 w-5 h-5`}
            />
            <p className='text-[11px]'>{link.label}</p>
          </Link>
        );
      })}
    </section>
  );
};
export default BottomBar;
