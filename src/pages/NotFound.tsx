import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Helmet>
        <title>Page Not Found — Wreative Showcase</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="px-4 text-center">
        <h1 className="mb-4 text-6xl font-bold text-foreground/20">404</h1>
        <h2 className="mb-4 text-2xl font-bold text-foreground">Page Not Found</h2>
        <p className="mb-8 text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg bg-foreground px-6 py-3 font-medium text-background transition-opacity hover:opacity-90"
        >
          &larr; Back to Showcase
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
