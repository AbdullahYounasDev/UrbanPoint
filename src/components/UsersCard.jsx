/** @format */

const UsersCard = ({ name, email, createdAt }) => {
  const formattedDate = new Date(createdAt).toDateString();
  return (
    <div class="border-sky-1 border-[1px] flex flex-row items-center justify-center bg-[#FFFBFB] rounded-lg shadow-xl w-[300px]">
      <div class="flex w-full flex-col p-3 gap-3 justify-center items-center">
        <div className="px-3 py-1 font-bold h-[70px] w-[70px] rounded-[50px] flex gap-1 justify-center items-center bg-sky-1">
          <h1 className="text-white font-bold text-[35px]">
            {name.slice(0, 1).toUpperCase()}
          </h1>
        </div>
        <div class="w-full space-y-4 flex flex-col justify-center items-center">
          <div class="flex flex-col justify-center">
            <h1 class="text-center md:text-left text-2xl font-bold text-gray-900">
              {name}
            </h1>
          </div>

          <ul class="gap-2 justify-center items-center flex flex-col  w-full mb-4">
            <li class="text-sm text-gray-800">
              <strong class="text-gray-900">Email : </strong> {email}
            </li>
            <li class="text-sm text-gray-800">
              <strong class="text-gray-900">Created At : </strong>{" "}
              {formattedDate}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UsersCard;
