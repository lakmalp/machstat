export default function Header({ columns }) {
    return (
        <div className='w-full flex items-center bg-gray-100 rounded-t-lg h-7'>
            <div className='w-12 flex items-center justify-center'>
            </div>
            <div className="w-full grid grid-cols-12 gap-4 items-center bg-gray-100 rounded-tr-lg">
                {
                    columns.map(column => <div key={column.name} className={`text-${column.textAlign} col-span-${column.colSpan} text-xs font-semibold text-gray-500`}>{column.label}</div>)
                }
            </div>
        </div>
    );
}