import UserIcon from '@/assets/icons/user.png';
import DownIcon from '@/assets/icons/chevron-down.svg';
import { Link } from 'react-router';

const Header = () => {
  return (
    <div className="px-6 py-2 bg-white border-b border-slate-200 inline-flex flex-col justify-start items-center gap-2">
      <div className="self-stretch h-10 inline-flex justify-between items-center">
        <div className="w-[703.50px] flex justify-start items-center gap-3">
          <Link to="/" className="w-28 relative">
            <img src="/logo.png" alt="Trivantage Logo" />
          </Link>
        </div>
        <div className="flex justify-start items-center gap-3">
          <img className="w-7 h-7 rounded-full" src={UserIcon} alt="User Icon" />
          <div className="flex justify-start items-center gap-4">
            <div className="text-center justify-start text-slate-950 text-sm font-normal font-['Inter'] leading-5">
              Call Center Agent
            </div>
          </div>
          <img src={DownIcon} alt="Dropdown Icon" className="inline-block w-3 h-2" />
        </div>
      </div>
    </div>
  );
};

export default Header;
