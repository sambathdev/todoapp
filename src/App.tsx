import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/todoapp");
    console.log(5555)
  }, [])
  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <div>Blank Screen For Github to Redirect</div>
      </div>
    </>
  );
}

export default App;
