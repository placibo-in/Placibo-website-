import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h1 className="text-6xl font-extrabold text-blue-600 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Page Not Found</h2>
          <p className="text-lg text-gray-600 mb-6">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 text-base font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;