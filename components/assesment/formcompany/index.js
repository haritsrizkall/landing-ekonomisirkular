
const FormCompany = ({handleChange, value, helper}) => {
    return (
        <div className="w-10/12 sm:w-1/2 m-auto mt-10">
                    <div className="text-center">
                        <h2 className="font-rubik text-2xl font-medium mb-5">Isi Data Perusahaan</h2>
                    </div>
                    <div className="flex flex-col mb-5">
                        <label className="mb-3 font-rubik font-medium text-lg">Nama Perusahaan</label>
                        <input onChange={handleChange} className="pl-3 py-3 text-md outline-none rounded bg-gray-100" type="text" name="name" value={value.name}/>
                    </div>
                    <div className="flex flex-col mb-5">
                        <label className="mb-3 font-rubik font-medium text-lg">Umur Perusahaan</label>
                        <input onChange={handleChange} className={value.age == 0 ? "pl-3 py-3 text-md outline-none rounded bg-gray-100 border-2 border-red-500" : "pl-3 py-3 text-md outline-none rounded bg-gray-100"} type="number" name="age" value={value.age}/>
                        {
                            value.age == 0 && <p className="text-red-500 mt-1">Required</p> 
                        }
                    </div>
                    <div className="flex flex-col mb-5">
                        <label className="mb-3 font-rubik font-medium text-lg">Jenis Perusahaan</label>
                        <input onChange={handleChange} className={value.company_type == "" ? "pl-3 py-3 text-md outline-none rounded bg-gray-100 border-2 border-red-500" : "pl-3 py-3 text-md outline-none rounded bg-gray-100"} type="text" name="company_type" value={value.company_type}/>
                        {
                            value.company_type == "" && <p className="text-red-500 mt-1">Required</p> 
                        }
                    </div>
                    <div className="flex flex-col mb-5">
                        <label className="mb-3 font-rubik font-medium text-lg">Jenis Industri</label>
                        <input onChange={handleChange} className={value.industry_type == "" ? "pl-3 py-3 text-md outline-none rounded bg-gray-100 border-2 border-red-500" : "pl-3 py-3 text-md outline-none rounded bg-gray-100"}
                        type="text" name="industry_type" value={value.industry_type}/>
                        {
                            value.industry_type == "" && <p className="text-red-500 mt-1">Required</p> 
                        }
                    </div>
                    <div className="flex flex-col mb-5">
                        <label className="mb-3 font-rubik font-medium text-lg">Jumlah Karyawan</label>
                        <input onChange={handleChange} className={value.number_employee == 0 ? "pl-3 py-3 text-md outline-none rounded bg-gray-100 border-2 border-red-500" : "pl-3 py-3 text-md outline-none rounded bg-gray-100"} type="number" name="number_employee" value={value.number_employee}/>
                        {
                            value.number_employee == 0 && <p className="text-red-500 mt-1">Required</p> 
                        }
                    </div>
                    <div className="flex flex-col mb-5">
                        <label className="mb-3 font-rubik font-medium text-lg">Omset per bulan</label>
                        <input onChange={handleChange} className={value.revenue_monthly == 0 ? "pl-3 py-3 text-md outline-none rounded bg-gray-100 border-2 border-red-500" : "pl-3 py-3 text-md outline-none rounded bg-gray-100"} type="number" name="revenue_monthly" value={value.revenue_monthly}/>
                        {
                            value.revenue_monthly == 0 && <p className="text-red-500 mt-1">Required</p> 
                        }
                    </div>
                    <div className="flex flex-col mb-5">
                        <label className="mb-3 font-rubik font-medium text-lg">Jabatan Pengisi Assessment</label>
                        <input onChange={handleChange} className={value.position == "" ? "pl-3 py-3 text-md outline-none rounded bg-gray-100 border-2 border-red-500" : "pl-3 py-3 text-md outline-none rounded bg-gray-100"} type="text" name="position" value={value.position}/>
                        {
                            value.position == "" && <p className="text-red-500 mt-1">Required</p> 
                        }
                    </div>
                    <div className="flex flex-col mb-5">
                        <label className="mb-3 font-rubik font-medium text-lg">Pendidikan Pengisi Assessment</label>
                        <input onChange={handleChange} className={value.education == "" ? "pl-3 py-3 text-md outline-none rounded bg-gray-100 border-2 border-red-500" : "pl-3 py-3 text-md outline-none rounded bg-gray-100"} type="text" name="education" value={value.education}/>
                        {
                            value.education == "" && <p className="text-red-500 mt-1">Required</p> 
                        }
                    </div>
                    <div className="flex flex-col mb-5">
                        <label className="mb-3 font-rubik font-medium text-lg">Email</label>
                        <input onChange={handleChange} className={value.email == "" ? "pl-3 py-3 text-md outline-none rounded bg-gray-100 border-2 border-red-500" : "pl-3 py-3 text-md outline-none rounded bg-gray-100"} type="email" name="email" value={value.email}/>
                        {
                            value.email == "" && <p className="text-red-500 mt-1">Required</p> 
                        }
                    </div>
                    <div className="flex flex-col mb-5">
                        <label className="mb-3 font-rubik font-medium text-lg">No. HP/WA</label>
                        <input onChange={handleChange} className={value.no_hp == "" ? "pl-3 py-3 text-md outline-none rounded bg-gray-100 border-2 border-red-500" : "pl-3 py-3 text-md outline-none rounded bg-gray-100"} type="text" name="no_hp" value={value.no_hp}/>
                        {
                            value.no_hp == "" && <p className="text-red-500 mt-1">Required</p> 
                        }
                    </div>
                </div>
    )
}

export default FormCompany