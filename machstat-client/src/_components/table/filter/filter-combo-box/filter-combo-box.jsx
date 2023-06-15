export default function FilterComboBox ({ name, value, setValue, items, className }) {
    let _items = items.filter((item, index) => items.indexOf(item) === index);
    return (
        <select
            name={name}
            value={value}
            onChange={(e) => setValue(prev => ({ ...prev, [e.target.name]: e.target.value }))}
            className={`rounded py-0 text-left text-sm font-semibold border border-b1 px-1 border-gray-300 text-pink-700 h-7 focus:outline-pink-300 focus:outline-offset-0 ${className}`}
        >
            {
                Array.isArray(_items) && _items.map((item, i) => <option value={item} key={i}>{item}</option>)
            }
        </select>
    )
}