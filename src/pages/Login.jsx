import React, { useEffect, useState } from "react";
import "../login.css";
import AnimatedDescriptions from "../ui/AnimatedDescriptions";
import LoginForm from "../ui/LoginForm";

export default function Login() {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      className="h-full md:h-svh bg-contain bg-neutral-200 dark:bg-neutral-700 items-center justify-center"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(0, 47, 167, 0.8), rgba(0, 36, 134, 0.8), rgba(0, 27, 100, 0.8), rgba(0, 16, 62, 0.8)), url('/pos2.jpg')",
        backgroundSize: "cover",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="container mx-auto h-full p-10 items-center justify-center fadeInAnimation">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full lg:w-9/12 items-center">
            <div className="block rounded-lg bg-blue-50 shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap">
                {/* <!-- Left column container--> */}
                <div className="px-4 md:px-0 w-full lg:w-6/12 items-center justify-center">
                  <div className="md:mx-6 md:p-12">
                    {/* <!--Logo--> */}
                    <div className="text-center">
                      <img
                        className="mx-auto w-48"
                        src="SmartPOS.png"
                        alt="logo"
                      />
                      <h4 className="mb-12 mt-2 pb-1 text-xl font-poppins font-semibold">
                        The Smart Point Of Sale System
                      </h4>
                    </div>
                    <LoginForm />
                  </div>
                </div>

                {/* <!-- Right column container with background and description--> */}
                {isLargeScreen && (
                  <div
                    className="flex bg-contain items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                    style={{
                      backgroundImage: "url('/pos1.png')",
                      backgroundSize: "cover",
                      backgroundBlendMode: "overlay",
                    }}
                  >
                    <AnimatedDescriptions />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
