import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Loader({ label }) {
    return (
        <div className="w-64 text-center">
            <FontAwesomeIcon icon={faSpinner} className="animate-spin duration-500 text-3xl text-gray-400" />
            {label && <div className="text-center mt-6 text-gray-700 font-inter text-sm animate-pulse">{label}</div>}
        </div>
    )
}