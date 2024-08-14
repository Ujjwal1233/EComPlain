import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton1 } from "../components/CustomButton1";
import { BigHeading } from "./../components/BigHeading";
import { LabelledInput } from "./../components/LabelledInput";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const Signup = () => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState();
  const [role, setRole] = useState();

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/user/signup`,
        postInputs
      );
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      if (role === "admin") navigate("/admin");
      else navigate("/complains");
    } catch (e) {
      console.log(e);
      alert("somthing went wrong");
    }
  }

  return (
    <div className="flex justify-center h-screen bg-green-100">
      <div className="border-2 w-1/4 rounded-lg p-4 my-auto shadow-md bg-white">
        <div>
          <BigHeading label={"SignUp"} />
        </div>
        <div className="border-2 border-black"></div>
        <div className="mb-5">
          <LabelledInput
            label={"First Name"}
            placeholder={"First Name"}
            onChange={(e) => {
              setPostInputs({
                ...postInputs,
                firstName: e.target.value,
              });
            }}
          />
          <LabelledInput
            label={"Last Name"}
            placeholder={"Last Name"}
            onChange={(e) => {
              setPostInputs({
                ...postInputs,
                lastName: e.target.value,
              });
            }}
          />
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
          <div className="mb-5">
            <label className="block mb-2 font-bold">Role:</label>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="admin"
                name="role"
                value="admin"
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    role: e.target.value,
                  });
                  setRole(e.target.value);
                }}
              />
              <label htmlFor="admin">Admin</label>
            </div>
            <div>
              <input
                type="radio"
                id="normal"
                name="role"
                value="normal"
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    role: e.target.value,
                  });
                  setRole(e.target.value);
                }}
              />
              <label htmlFor="normal">Normal</label>
            </div>
          </div>
        </div>
        <CustomButton1
          label={"Signup"}
          colour={"red"}
          clickHandler={sendRequest}
        />
      </div>
    </div>
  );
};
