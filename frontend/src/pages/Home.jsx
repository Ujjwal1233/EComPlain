import { Link, useNavigate } from "react-router-dom";
import { CustomButton1 } from "../components/CustomButton1";

export const Home = () => {
  const navigate = useNavigate();

  const goToSignup = () => {
    navigate("/signup");
  };
  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center lg:px-20 py-10 h-screen">
      <div className="w-full lg:w-1/2 lg:pr-10">
        <div className="text-center lg:text-left mb-6">
          <h1 className="text-3xl font-bold">Welcome to ComplainBox</h1>
        </div>
        <div className="mb-6">
          <p className="text-center lg:text-left">
            Feel free to share your thoughts with us. Whether it's a suggestion
            for improvement, a problem you've encountered, or just a general
            comment, we're here to listen. Our team is committed to addressing
            your concerns promptly and finding solutions to ensure your
            satisfaction.
          </p>
        </div>
        <div className="mb-6">
          <p className="text-center lg:text-left">
            Your feedback matters to us, and we appreciate your contribution to
            making our services better for everyone. Thank you for choosing to
            voice your opinions through our Complaint Box.
          </p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex justify-center items-center lg:items-start">
        <div className="mb-6 lg:ml-6 w-1/2 border px-4 pb-10 rounded-sm shadow-lg">
          <div className="font-medium text-center pt-2 pb-5 text-xl">
            Get Started
          </div>
          <CustomButton1
            label={"Signup"}
            colour={"red"}
            clickHandler={goToSignup}
          />
          <CustomButton1
            label={"Login"}
            colour={"blue"}
            clickHandler={goToLogin}
          />
        </div>
      </div>
    </div>
  );
};
