import { useEffect, useState } from "react";
import Hero from "../components/landing-page/Hero";
import LoadingScreen from "../components/loading-screen";
import { Navbar } from "@/components/landing-page/Navbar";
import { Tips } from "@/components/landing-page/Tips";
import { Features } from "@/components/landing-page/Features";
import { Footer } from "@/components/landing-page/Footer";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    const syncUser = async () => {
      const token = await getToken();
      if (!token || !user) return;

      const response = await axios.post("http://localhost:3000/api/v1/users/register", 
        {
          clerkId: user.id,
          email: user.emailAddresses[0].emailAddress,
          name: user.fullName,
        } , {
          headers: {
            "Content-Type": "application/json",
             Authorization: `Bearer ${token}`,
          }
        });

    };

    syncUser();
  }, [user]);
  // Handle loading screen completion
  const handleLoadingFinish = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen onFinish={handleLoadingFinish} />
      ) : (
        <LandingPageContent />
      )}
    </>
  );
};

export default HomePage;

function LandingPageContent() {
  return (
    <>
      <Navbar />
      <Hero />
      <Tips />
      <Features />
      <Footer />
    </>
  );
}
