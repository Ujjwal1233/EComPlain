export const AppBar = ({
  label,
  clickHandler1,
  clickHandler2,
  showDashboard,
}) => {
  return (
    <div className="flex justify-between p-4 bg-black text-white shadow-md mb-4">
      <div className="text-2xl">Complain Box</div>
      <div className="text-xl underline">{label}</div>
      <div className="flex mx-2">
        <div
          onClick={clickHandler1}
          className="bg-white text-black px-2 py-1 rounded-3xl hover:cursor-pointer mx-2"
        >
          Create Complain
        </div>
        {showDashboard && (
          <div
            onClick={clickHandler2}
            className="bg-white text-black px-2 py-1 rounded-3xl hover:cursor-pointer"
          >
            Dashboard
          </div>
        )}
      </div>
    </div>
  );
};
