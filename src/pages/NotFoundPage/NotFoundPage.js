import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        404 Error: Page Not Found
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Sorry, we couldn't find the page you were looking for.
      </p>
      <Link
        to="/"
        className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full transition-colors duration-300"
      >
        Go back to homepage
      </Link>
    </div>
  );
}

export default NotFoundPage;
