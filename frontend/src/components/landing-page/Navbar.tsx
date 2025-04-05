import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ModeToggle } from "../ui/mode-toggle";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-3 border-b border-muted">
      <div className="flex items-center">
        <h2 className="text-2xl font-semibold dark:text-white text-gray-950">
          Green<span className="text-primary">Pulse</span>{" "}
        </h2>
      </div>
      <ul className="flex items-center space-x-4 ">
        <li className="hover:text-primary">
          <Link to={"/#features"}>Features</Link>
        </li>
        <li className="hover:text-primary">
          <Link to={"/#tips"}>Tips</Link>
        </li>
        <li className="hover:text-primary">
          <Link to={"/#contact"}>Contact Us</Link>
        </li>
        <li className="hover:text-primary">
          <Link to={"/quiz"}>Quiz</Link>
        </li>
      </ul>
      <div className="flex items-center gap-2">
        <ModeToggle />
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Button variant={"default"} className="bg-primary" asChild>
            <Link to={"/login"}>Login</Link>
          </Button>
        </SignedOut>
      </div>
    </nav>
  );
};
