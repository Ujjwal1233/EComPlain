import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton1 } from "../components/CustomButton1";
import { BigHeading } from "./../components/BigHeading";
import { LabelledInput } from "./../components/LabelledInput";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const Login = () => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState();

  async function getRoleAndNavigate() {
    try {
      const response = await axios.get(`${BACKEND_URL}/user/getprofile`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const userRole = response.data.user.role;
      if (userRole === "admin") navigate("/admin");
      else navigate("/complains");
    } catch (error) {
      console.log(error);
    }
  }

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/user/signin`,
        postInputs
      );
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      await getRoleAndNavigate();
    } catch (e) {
      console.log(e);
      alert("something went wrong");
    }
  }

  return (
    <div className="flex justify-center h-screen bg-green-100">
      <div className="border-2 w-1/4 rounded-lg p-4 my-auto shadow-md bg-white">
        <div>
          <BigHeading label={"LogIn"} />
        </div>
        <div className="border-2 border-black"></div>
        <div className="mb-5">
          <LabelledInput
            label={"Email"}
            placeholder={"yourgamil@gmail.com"}
            onChange={(e) => {
              setPostInputs({
                ...postInputs,
                username: e.target.value,
              });
            }}
          />
          <LabelledInput
            label={"Password"}
            type={"password"}
            placeholder={"password"}
            onChange={(e) => {
              setPostInputs({
                ...postInputs,
                password: e.target.value,
              });
            }}
          />
        </div>
        <CustomButton1
          label={"Login"}
          colour={"blue"}
          clickHandler={sendRequest}
        />
      </div>
    </div>
  );
};
