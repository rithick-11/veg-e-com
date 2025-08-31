import React from "react";
import { Link } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Container from "../../components/UI/Container";

const NotFound = () => {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <DotLottieReact
          src="https://lottie.host/0ffdd314-edea-424e-8ce5-c42b38da6aa0/NmNkYgvf2M.lottie"
          loop
          autoplay
        />
        <p className="text-xs lg:text-lg text-gray-600 mb-8">
          The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
        >
          Contact the support team 
        </Link>
      </div>
    </Container>
  );
};

export default NotFound;
