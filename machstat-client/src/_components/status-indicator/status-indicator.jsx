import { useEffect, useRef, useState } from "react";

export default function StatusIndicator({ value, isIconOnly }) {
    const [statusIcon, setStatusIcon] = useState();

    useEffect(() => {
        switch (value) {
            case "Online":
                setStatusIcon("bg-green-400 outline-green-300");
                break;
            case "Offline":
                setStatusIcon("bg-red-400 outline-red-300 animate-ping");
                break;
            case "Suspended":
                setStatusIcon("bg-yellow-400 outline-yellow-300");
                break;

            default:
                setStatusIcon("bg-gray-400 outline-gray-300");
                break;
        }
    }, [value])

    return (
        <div className="flex items-center justify-start w-full">
            <div className={`w-2 h-2 rounded-full  outline-dashed outline-1 outline-offset-2 ` + statusIcon}></div>
            <div className="hidden lg:block text-[8pt] mx-3">{value}</div>
        </div>
    );
}
