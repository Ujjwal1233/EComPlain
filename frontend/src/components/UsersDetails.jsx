import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "./../config";
import { useNavigate } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";

export const UserDetails = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  async function fetchUsers() {
    try {
      const response = await axios.get(`${BACKEND_URL}/user/bulk`);
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const userClickHandler = () => {
    navigate("/users");
  };

  const getAdminCount = () => {
    return users.filter((user) => user.role === "admin").length;
  };

  const getNormalUserCount = () => {
    return users.filter((user) => user.role === "normal").length;
  };

  return (
    <div className="container mx-auto mt-10 p-4 border mb-10 rounded-md shadow-md">
      <div className="text-xl font-bold mb-4">User Details:</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border p-4 rounded-md">
          <div className="font-semibold">Number of Users:</div>
          <div>{users.length}</div>
        </div>
        <div className="border p-4 rounded-md">
          <div className="font-semibold">Number of Admins:</div>
          <div>{getAdminCount()}</div>
        </div>
        <div className="border p-4 rounded-md">
          <div className="font-semibold">Number of Normal Users:</div>
          <div>{getNormalUserCount()}</div>
        </div>
        <div
          onClick={userClickHandler}
          className="border p-4 rounded-md cursor-pointer hover:bg-gray-100"
        >
          <div className="font-semibold flex text-2xl">
            All User List
            <div className="text-xl p-2">
              <GoArrowRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
