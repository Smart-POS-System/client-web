function Card({ title, amount, icon, colour, outerColour }) {
  return (
    <div
      className={`${outerColour} rounded-xl shadow-2 w-3/12 h-auto flex  justify-center border border-blue-200`}
    >
      <div className="flex flex-row items-center justify-between w-full p-4">
        <div className="flex flex-col">
          <h1 className="text-lg font-poppins font-semibold">{amount}</h1>
          <h1 className="text-xs font-poppins font-normal">{title}</h1>
        </div>
        <div
          className={`flex flex-row text-2xl items-center justify-center ${colour} w-14 h-14 rounded-full`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default Card;
