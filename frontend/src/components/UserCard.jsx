export const UserCard = ({ firstName, lastName, email, role }) => {
  return (
    <div className="bg-white rounded-md shadow-md p-4 mb-4">
      <div className="mb-4 flex">
        <div className="font-semibold px-1">Name:</div>
        <div className="px-1">{firstName}</div>
        <div className="px-1">{lastName}</div>
      </div>
      <div className="mb-4 flex">
        <div className="font-semibold px-1">Email:</div>
        <div className="px-1">{email}</div>
      </div>
      <div className="flex">
        <div className="font-semibold px-1">Role:</div>
        <div className="px-1">{role}</div>
      </div>
    </div>
  );
};
