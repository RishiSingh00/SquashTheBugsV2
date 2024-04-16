import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Error404Page() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the root path after 5 seconds
    const timeout = setTimeout(() => {
      navigate('/');
    }, 5000);

    // Cleanup function to clear the timeout when component unmounts
    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-full">
      <h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
    </div>
  );
}
