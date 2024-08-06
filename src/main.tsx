import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { Toaster } from './components/ui/sonner.tsx';
import { createBrowserRouter, RouterProvider, Outlet, Link } from 'react-router-dom';
import TodoListApp from './components/screen-components/todo-app/todo-app.tsx';
import ChessApp from './components/screen-components/chess-app/chess-app.tsx';
import SumApp from './components/screen-components/sum-app/sum-app.tsx';
import Header from './components/header.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/todoapp',
    element: (
      <div className="pt-12">
        <Header />
        <Outlet />
        <Toaster />
      </div>
    ),
    children: [
      {
        path: '',
        element: (
          <div className='py-20 flex flex-col items-center justify-center'>
            <div className="flex flex-col">
              <Link to={'/todoapp/chess'}>
                <button>Chess</button>
              </Link>
              <Link to={'/todoapp/todo'}>
                <button>Todo</button>
              </Link>
              <Link to={'/todoapp/2048'}>
                <button>2048</button>
              </Link>
            </div>
          </div>
        ),
      },
      {
        path: 'todo',
        element: <TodoListApp />,
      },
      {
        path: 'chess',
        element: <ChessApp />,
      },
      {
        path: '2048',
        element: <SumApp />,
      },
    ],
  },
  {
    path: 'about',
    element: <div>About</div>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
