import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
const DashBoardCards = ({ title, numbers, type }) => {
  return (
    <div className=" bg-white rounded-lg shadow-2xl border-sky-1 border-[1px] flex justify-center items-center flex-col gap-3 w-[250px] h-[170px] ">
      {type == "All Times" ? (
        <FontAwesomeIcon
          icon={faUser}
          className="w-[40px] text-[30px] text-sky-1"
        />
      ) : (
        ""
      )}
      <div className="flex items-center justify-center flex-col">
        <h3 className="text-[16px] text-center font-semibold">{title}</h3>
        <h5 className="text-xl font-bold">{type}</h5>
      </div>
      <h4 className="text-3xl font-bold text-sky-1">{numbers}</h4>
    </div>
  );
};

export default DashBoardCards;
