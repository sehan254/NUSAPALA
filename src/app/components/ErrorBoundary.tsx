import { useRouteError } from "react-router";

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a1628]">
      <div className="text-center text-white p-6">
        <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong</h1>
        <p className="text-lg mb-4">
          {error instanceof Error
            ? error.message
            : "An unexpected error occurred"}
        </p>
        <a
          href="/"
          className="inline-block mt-4 px-6 py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
}
