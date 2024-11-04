import Image from "next/image";

const DashBoardCards = ({ title, numbers, type }) => {
  return (
    <div className=" bg-white rounded-lg shadow-2xl border flex justify-center items-center flex-col gap-3 w-[200px] h-[150px] ">
      <div>
        <h3 className="text-[16px] text-center">{title}</h3>
        <h5 className="text-xl font-semibold">{type}</h5>
      </div>
      <h4 className="text-3xl font-bold text-sky-1">{numbers}</h4>
    </div>
  );
};

export default DashBoardCards;
