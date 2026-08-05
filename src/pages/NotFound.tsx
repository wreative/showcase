import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Helmet>
        <title>Page Not Found — Wreative Showcase</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-foreground/20 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Page Not Found
        </h2>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-foreground text-background font-medium hover:opacity-90 transition-opacity"
        >
          &larr; Back to Showcase
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
