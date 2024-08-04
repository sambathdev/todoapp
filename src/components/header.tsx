import { appNames } from '@/constants/appNames';
import { Link, NavLink } from 'react-router-dom';

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  return (
    <div className="fixed h-12 top-0 w-full bg-slate-200">
      <div className="flex justify-between h-full items-center px-4">
        <div>
          <Link to="/">Home</Link>
        </div>
        <div className="flex gap-2 flex-wrap">
          {appNames.map((app) => {
            return (
              <NavLink
                key={app.route}
                to={`/${app.route}`}
                className={({ isActive }) => {
                  return isActive
                    ? 'px-2 py-1 bg-red-200 rounded-md'
                    : 'px-2 py-1 bg-slate-100 rounded-md';
                }}
              >
                {app.name}
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Header;
