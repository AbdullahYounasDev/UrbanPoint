/** @format */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Loader({ color }) {
  return (
    <div className="loader">
      <FontAwesomeIcon
        icon={faSpinner}
        className={`text-[20px] text-${color ? color : "sky-1"}`}
        spin
        size="3x"
      />
    </div>
  );
}
