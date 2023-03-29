

const Loader = ({isVisible}) => {
    return (
        <div className={isVisible ? "flex flex-col justify-center items-center w-screen h-screen bg-white/50 z-100 fixed": "hidden"}>
            <div className="animate-spin rounded-full h-28 w-28 border-t-4 border-b-4 border-primary"></div>
            <p className="font-rubik text-xl mt-5 font-medium">
                Loading...
            </p>
        </div>
    )
}

export default Loader