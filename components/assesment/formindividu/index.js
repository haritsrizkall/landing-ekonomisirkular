
const FormIndividu = ({handleChange, value, helper}) => {
    return (
        <div className="w-10/12 sm:w-1/2 m-auto mt-10">
                    <div className="text-center">
                        <h2 className="font-rubik text-2xl font-medium mb-5">Isi Data Diri</h2>
                    </div>
                    <div className="flex flex-col mb-5">
                        <label className="mb-3 font-rubik font-medium text-lg">Nama</label>
                        <input onChange={handleChange} className="pl-3 py-3 text-md outline-none rounded bg-gray-100" type="text" name="name"
                        value={value.name}
                        />
                    </div>
                    <div className="flex flex-col mb-5">
                        <label className="mb-3 font-rubik font-medium text-lg">Umur</label>
                        <input onChange={handleChange} className={value.age == 0 ? "pl-3 py-3 text-md outline-none rounded bg-gray-100 border-2 border-red-500" : "pl-3 py-3 text-md outline-none rounded bg-gray-100"} type="number" name="age"
                        value={value.age}
                        />
                        {
                            value.age == 0 && <p className="text-red-500 mt-1">Required</p> 
                        }
                    </div>
                    <div className="flex flex-col mb-5">
                        <label className="mb-3 font-rubik font-medium text-lg">Pekerjaan</label>
                        <input onChange={handleChange} className={value.occupation === "" ? "pl-3 py-3 text-md outline-none rounded bg-gray-100 border-2 border-red-500" : "pl-3 py-3 text-md outline-none rounded bg-gray-100"} type="text" name="occupation"
                        value={value.occupation}
                        />
                        {
                            value.occupation === "" && <p className="text-red-500 mt-1">Required</p> 
                        }
                    </div>
                    <div className="flex flex-col mb-5">
                        <label className="mb-3 font-rubik font-medium text-lg">Pendapatan per bulan</label>
                        <input onChange={handleChange} className={value.income_monthly == 0 ? "pl-3 py-3 text-md outline-none rounded bg-gray-100 border-2 border-red-500" : "pl-3 py-3 text-md outline-none rounded bg-gray-100"} type="number" name="income_monthly"
                        value={value.income_monthly}
                        />
                        {
                            value.income_monthly == 0 && <p className="text-red-500 mt-1">Required</p> 
                        }
                    </div>
                    <div className="flex flex-col mb-5">
                        <label className="mb-3 font-rubik font-medium text-lg">Pengeluaran per bulan</label>
                        <input onChange={handleChange} className={value.expense_monthly == 0 ? "pl-3 py-3 text-md outline-none rounded bg-gray-100 border-2 border-red-500" : "pl-3 py-3 text-md outline-none rounded bg-gray-100"} type="number" name="expense_monthly"
                        value={value.expense_monthly}
                        />
                        {
                            value.expense_monthly === 0 && <p className="text-red-500 mt-1">Required</p> 
                        }
                    </div>
                    <div className="flex flex-col mb-5">
                        <label className="mb-3 font-rubik font-medium text-lg">Email</label>
                        <input onChange={handleChange} className={value.email === "" ? "pl-3 py-3 text-md outline-none rounded bg-gray-100 border-2 border-red-500" : "pl-3 py-3 text-md outline-none rounded bg-gray-100"} type="email" name="email"
                        value={value.email}
                        />
                        {
                            value.email === "" && <p className="text-red-500 mt-1">Required</p> 
                        }
                    </div>
                    <div className="flex flex-col mb-5">
                        <label className="mb-3 font-rubik font-medium text-lg">No. HP/WA</label>
                        <input onChange={handleChange} className={value.no_hp === "" ? "pl-3 py-3 text-md outline-none rounded bg-gray-100 border-2 border-red-500" : "pl-3 py-3 text-md outline-none rounded bg-gray-100"} type="text" name="no_hp"
                        value={value.no_hp}
                        />
                        {
                            value.no_hp === "" && <p className="text-red-500 mt-1">Required</p> 
                        }
                    </div>
            {/* Temporary Solution */}
            <hr  className={helper ? "hidden": "hidden"}/>
        </div>
                
    )
}

export default FormIndividu