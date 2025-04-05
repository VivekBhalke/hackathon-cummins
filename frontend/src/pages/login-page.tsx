import { SignIn } from "@clerk/clerk-react";

export const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignIn />
    </div>
  );
};
