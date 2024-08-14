export const CustomButton1 = ({ label, colour, clickHandler }) => {
  const colorVariants = {
    blue: "bg-blue-600 hover:bg-blue-700",
    red: "bg-red-600 hover:bg-red-700",
  };

  return (
    <div
      onClick={clickHandler}
      className={`text-white my-2 cursor-pointer rounded-md text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl ${colorVariants[colour]} flex justify-center items-center w-full py-3 transition duration-300 shadow-md border-box`}
    >
      <button>{label}</button>
    </div>
  );
};
