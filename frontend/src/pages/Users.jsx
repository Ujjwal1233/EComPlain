import { useEffect, useState } from "react";
import { BACKEND_URL } from "./../config";
import { UserCard } from "../components/UserCard";
import axios from "axios";

export const Users = () => {
  const [users, setUsers] = useState([]);
  async function fetchUsers() {
    const response = await axios.get(`${BACKEND_URL}/user/bulk`);
    setUsers(response.data.users);
  }
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto mt-10 px-4">
      <div className="text-center font-medium text-3xl">All users:</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <UserCard
            key={user._id}
            firstName={user.firstName}
            lastName={user.lastName}
            email={user.username}
            role={user.role}
          />
        ))}
      </div>
    </div>
  );
};
