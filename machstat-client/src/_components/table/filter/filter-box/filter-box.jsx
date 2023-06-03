import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FilterBox ({ name, value, setValue, className }) {
    return (
        <div className={`flex items-center ${className}`}>
            <input
                type="text"
                name={name}
                value={value}
                onChange={(e) => setValue(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                className="w-full rounded py-0 text-left text-sm font-semibold border-0 border-b px-1 border-gray-300 text-pink-700 h-7 focus:outline-pink-300 focus:outline-offset-0"
            />
            <FontAwesomeIcon onClick={e => setValue(prev => ({ ...prev, [name]: '' }))} className='-ml-4 text-gray-300 hover:text-gray-500 cursor-pointer' icon={faClose} />
        </div>
    )
}