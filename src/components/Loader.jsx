import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Loader() {
  return (
    <div className="loader">
      <FontAwesomeIcon
        icon={faSpinner}
        className="text-[20px] text-sky-1"
        spin
        size="3x"
      />
    </div>
  );
}
