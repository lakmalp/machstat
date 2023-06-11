export default function Error({ name, messages }) {
    if (messages.hasOwnProperty(name)) {
        return (
            messages[name].map((err, i) => {
                return (
                    <div key={i} className="text-xs font-inter text-red-500 pt-1">{err}</div>
                )
            })
        )
    }
    return (null)
}