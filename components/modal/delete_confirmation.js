

const DeleteConfirmationModal = ({isVisible, handleClose, handleDelete}) => {
    return (
        <div className={isVisible ? "flex flex-col justify-center items-center w-screen h-screen z-30 fixed top-0 right-0": "hidden"}>
            <div onClick={handleClose} className="bg-transparent w-screen h-screen fixed"></div>
            <div className="bg-white py-5 w-96 rounded flex flex-col justify-center text-center drop-shadow-lg px-2">
                <img alt="error" src="/img/error.png" className="h-28 w-28 mx-auto"/>
                <div>
                    <h1 className="text-xl font-semibold mb-5">Are you sure?</h1>
                    <p>
                        Do you really want to delete these records? This process cannot be undone.
                    </p>
                </div>
                <div>
                    <button className="bg-slate-300 px-10 py-1 rounded mt-4 mr-2 text-white" onClick={handleClose}>Close</button>
                    <button className="bg-red-500 px-10 py-1 rounded mt-4 ml-2 text-white" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteConfirmationModal