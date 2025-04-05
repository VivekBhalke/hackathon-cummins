export const Footer = () => {
  return (
    <footer>
      <div className="container mx-auto py-4 text-center border-t border-muted-foreground">
        <p className="text-gray-600 text-sm">
          © 2025 GreenPulse. All rights reserved.
        </p>
        <div className="mt-2">
          <a href="/privacy" className="text-blue-500 hover:underline">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a href="/terms" className="text-blue-500 hover:underline">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};
