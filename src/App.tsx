import { Link } from 'react-router-dom';

function App() {
  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <div>Home Screen</div>
        <div className="flex flex-col">
          <Link to={'/chess'}>
            <button>Chess</button>
          </Link>
          <Link to={'/todo'}>
            <button>Todo</button>
          </Link>
          <Link to={'/2048'}>
            <button>2048</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default App;
