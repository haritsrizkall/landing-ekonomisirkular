
const ErrorModal = ({isVisible, handleClose, title, text}) => {
    return (
        <div className={isVisible ? "flex flex-col justify-center items-center w-screen h-screen bg-white/25 z-30 fixed": "hidden"}>
            <div onClick={handleClose} className="bg-transparent w-screen h-screen fixed"></div>
            <div className="bg-white h-64 w-96 rounded flex flex-col justify-center text-center drop-shadow-lg">
                <img src="/img/error.png" className="h-28 w-28 mx-auto"/>
                <h2 className="font-rubik text-xl font-medium text-red-500">{title}</h2>
                <p>{text}</p>
                <div>
                    <button className="bg-red-500 px-10 py-1 rounded mt-4 text-white" onClick={handleClose}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default ErrorModal