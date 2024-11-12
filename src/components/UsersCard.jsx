import Link from "next/link";

const UsersCard = ({ id, name, email, photoSrc, createdAt }) => {
  const date = new Date(Number(createdAt)); // Convert to number

  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  return (
    <div class="border-sky-1 border-[1px] flex flex-row items-center justify-center bg-[#FFFBFB] rounded-lg shadow-xl w-[400px]">
      <div class="flex w-full flex-col p-3 gap-3">
        <div class="flex items-center justify-center">
          <img
            src={photoSrc}
            alt={name}
            className="w-[100px] h-[100px] object-cover rounded-full"
          />
        </div>
        <div class="w-full space-y-4 flex flex-col justify-center items-center">
          <div class="flex flex-col justify-center">
            <h1 class="text-center md:text-left text-2xl font-bold text-gray-900">
              {name}
            </h1>
          </div>

          <ul class="space-x-4 flex flex-row justify-center w-full mb-4">
            <li class="text-sm text-gray-800">
              <strong class="text-gray-900">Email : </strong> {email}
            </li>
            <li class="text-sm text-gray-800">
              <strong class="text-gray-900">Created At : </strong>{" "}
              {formattedDate}
            </li>
          </ul>
          <button class="transition-colors bg-sky-1 p-2 rounded-sm w-full text-white text-hover shadow-md">
            <Link
              target="_"
              href={
                "https://dashboard.clerk.com/apps/app_2nz7CPaY7sHj0N4wLuIg9mnQuL4/instances/ins_2nz7CUJF9KuwoAcbsQqVtvcipY0/users/" +
                id
              }
            >
              See More Details
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersCard;
