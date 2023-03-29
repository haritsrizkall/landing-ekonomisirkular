import { useState } from "react";
import { useAsyncDebounce } from "react-table";


const GlobalFilter = ({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) => {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
      setGlobalFilter(value || undefined);
    }, 300);
    
    return (
        <div className="my-5">
            <input
                className="py-2 pl-3 bg-slate-100 outline-none"
                value={value || ""}
                onChange={(e) => {
                    setValue(e.target.value)
                    onChange(e.target.value)
                }}
                placeholder={`${count} records...`}
            />
        </div>
    )
}

export default GlobalFilter