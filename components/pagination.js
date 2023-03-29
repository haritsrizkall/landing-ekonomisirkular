

const Pagination = ({totalPages, page, handlePageChange}) => {
    return (
        <>
            {/* <div className="flex justify-center mt-5">
                <div className="mx-5">
                    <a className="font-rubik text-primary font-medium cursor-pointer underline">1</a>
                </div>
                <div className="mx-5">
                    <a className="font-rubik text-primary font-medium cursor-pointer">2</a>
                </div>
                <div className="mx-5">
                    <a className="font-rubik text-primary font-medium cursor-pointer">3</a>
                </div>
                <div className="mx-5">
                    <a className="font-rubik text-primary font-medium cursor-pointer">4</a>
                </div>
                <div className="mx-5">
                    <a className="font-rubik text-primary font-medium cursor-pointer">5</a>
                </div>
                <div className="mx-5">
                    <a className="font-rubik text-primary font-medium cursor-pointer">6</a>
                </div>
            </div> */}
            <div className="flex justify-center mt-5">
                {
                    [...Array(totalPages)].map((val, idx) => (
                        <div className="mx-5" key={idx}>
                            <a 
                            onClick={() => handlePageChange(idx + 1)}
                            className={`font-rubik text-primary font-medium cursor-pointer ${(idx + 1) == page && 'underline'}`}>{idx + 1}</a>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Pagination