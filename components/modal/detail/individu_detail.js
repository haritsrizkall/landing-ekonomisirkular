
const IndividuDetailModal = ({isVisible, handleClose, data}) => {
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
                        <p>{data.individu.age}</p>
                    </div>
                </div>
                <div className="flex w-full my-1">
                    <div className="mr-0 basis-1/3 text-left">
                        <p className="font-medium">Pekerjaan</p>
                    </div>
                    <div>
                        <p>{data.individu.occupation}</p>
                    </div>
                </div>
                <div className="flex w-full my-1">
                    <div className="mr-0 basis-1/3 text-left">
                        <p className="font-medium">Penghasilan perbulan</p>
                    </div>
                    <div>
                        <p>{data.individu.income_monthly}</p>
                    </div>
                </div>
                <div className="flex w-full my-1">
                    <div className="mr-0 basis-1/3 text-left">
                        <p className="font-medium">Pengeluaran perbulan</p>
                    </div>
                    <div>
                        <p>{data.individu.expense_monthly}</p>
                    </div>
                </div>
                <div className="flex w-full my-1">
                    <div className="mr-0 basis-1/3 text-left">
                        <p className="font-medium">Email</p>
                    </div>
                    <div>
                        <p>{data.individu.email}</p>
                    </div>
                </div>
                <div className="flex w-full my-1">
                    <div className="mr-0 basis-1/3 text-left">
                        <p className="font-medium">No HP</p>
                    </div>
                    <div>
                        <p>{data.individu.no_hp}</p>
                    </div>
                </div>
                <div>
                    <button className="bg-red-500 px-10 py-1 rounded mt-4 text-white" onClick={handleClose}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default IndividuDetailModal