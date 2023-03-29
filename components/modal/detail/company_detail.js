
const CompanyDetailModal = ({isVisible, handleClose, data}) => {

    return (
        <div className={isVisible ? "flex flex-col justify-center items-center w-screen h-screen z-30 fixed top-0 right-0": "hidden"}>
            <div onClick={handleClose} className="bg-transparent w-screen h-screen fixed"></div>
            <div className="bg-white py-5 w-100 rounded flex flex-col justify-center text-center drop-shadow-lg px-2">
                <div>
                    <h1 className="text-xl font-semibold mb-5   ">Detail Individu</h1>
                </div>
                <div className="flex w-full my-1">
                    <div className="mr-0 basis-1/3 text-left">
                        <p className="font-medium">Nama</p>
                    </div>
                    <div>
                        <p>{data.name}</p>
                    </div>
                </div>
                <div className="flex w-full my-1">
                    <div className="mr-0 basis-1/3 text-left">
                        <p className="font-medium">Type</p>
                    </div>
                    <div>
                        <p>{data.type}</p>
                    </div>
                </div>
                <div className="flex w-full my-1">
                    <div className="mr-0 basis-1/3 text-left">
                        <p className="font-medium">Umur</p>
                    </div>
                    <div>
                        <p>{data.company.age}</p>
                    </div>
                </div>
                <div className="flex w-full my-1">
                    <div className="mr-0 basis-1/3 text-left">
                        <p className="font-medium">Jenis perusahaan</p>
                    </div>
                    <div>
                        <p>{data.company.company_type}</p>
                    </div>
                </div>
                <div className="flex w-full my-1">
                    <div className="mr-0 basis-1/3 text-left">
                        <p className="font-medium">Jenis Industri</p>
                    </div>
                    <div>
                        <p>{data.company.industry_type}</p>
                    </div>
                </div>
                <div className="flex w-full my-1">
                    <div className="mr-0 basis-1/3 text-left">
                        <p className="font-medium">Jumlah karyawan</p>
                    </div>
                    <div>
                        <p>{data.company.number_employee}</p>
                    </div>
                </div>
                <div className="flex w-full my-1">
                    <div className="mr-0 basis-1/3 text-left">
                        <p className="font-medium">Pemasukan perbulan</p>
                    </div>
                    <div>
                        <p>{data.company.revenue_monthly}</p>
                    </div>
                </div>
                <div className="flex w-full my-1">
                    <div className="mr-0 basis-1/3 text-left">
                        <p className="font-medium">Posisi pengisi</p>
                    </div>
                    <div>
                        <p>{data.company.position}</p>
                    </div>
                </div>
                <div className="flex w-full my-1">
                    <div className="mr-0 basis-1/3 text-left">
                        <p className="font-medium">Pendidikan pengisi</p>
                    </div>
                    <div>
                        <p>{data.company.education}</p>
                    </div>
                </div>
                <div className="flex w-full my-1">
                    <div className="mr-0 basis-1/3 text-left">
                        <p className="font-medium">Email</p>
                    </div>
                    <div>
                        <p>{data.company.email}</p>
                    </div>
                </div>
                <div className="flex w-full my-1">
                    <div className="mr-0 basis-1/3 text-left">
                        <p className="font-medium">No HP</p>
                    </div>
                    <div>
                        <p>{data.company.no_hp}</p>
                    </div>
                </div>
                <div>
                    <button className="bg-red-500 px-10 py-1 rounded mt-4 text-white" onClick={handleClose}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default CompanyDetailModal