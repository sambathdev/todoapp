import { appCategories } from '@/constants/appCategories';
import { Link, NavLink } from 'react-router-dom';

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  return (
    <div className="fixed h-12 top-0 w-full bg-slate-200 z-50">
      <div className="flex justify-between h-full items-center px-4">
        <div>
          <Link to="/todoapp">Home</Link>
        </div>
        <div className="flex gap-2 flex-wrap relative">
          {appCategories.map((cat) => {
            return (
              <div className="group" key={cat.name}>
                <p className='px-2 py-1 cursor-pointer hover:bg-blue-300 bg-slate-100 rounded-md'>{cat.name}</p>
                <div className="group-hover:fixed group-hover:flex hidden left-0 bg-blue-300 w-full p-4 z-50 gap-2">
                  {cat.apps.map((app) => {
                    return (
                      <NavLink
                        key={app.route}
                        to={`/todoapp/${app.route}`}
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Header;
