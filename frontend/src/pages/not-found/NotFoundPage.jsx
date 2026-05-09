import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const NotFoundPage = () => {
  return (
    <section className="section min-h-screen flex items-center justify-center">
      <div className="container flex flex-col items-center justify-center text-center gap-(--space-xl)">
        <div className="flex flex-col items-center gap-(--space-md)">
          <span className="text-[8rem] font-bold leading-none text-primary">
            404
          </span>
          <h1 className="heading-primary text-dark">Page Not Found</h1>
          <p className="body-text text-text-secondary max-w-md">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <Link to="/" className="btn-primary flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </section>
  );
};

export default NotFoundPage;
