import { useEffect, useState } from "react";

const ScoreDetailModal = ({ isVisible, setIsVisible, score }) => {
    // const [type, setType] = useState("");
    const handleClose = () => {
        setIsVisible(false);
    }
    // useEffect(() => {
    //     if (score && score.participant.type !== undefined) {
    //         setType(score.participant.type);
    //     }
    // }, [score])
    
    if (score === undefined) {
        return null;
    }
    
    const hiddenData = [
        'individu_id',
        'participant_id',
        'createdAt',
        'updatedAt',
    ]
        
    return (
        <div className={isVisible ? "flex flex-col justify-center items-center w-screen h-screen z-30 fixed top-0 right-0": "hidden"}>
            <div onClick={handleClose} className="bg-transparent w-screen h-screen fixed"></div>
            <div className="bg-white py-5 w-100 rounded flex flex-col justify-center text-center drop-shadow-lg px-2">
                <div>
                    <h1 className="text-xl font-semibold mb-5">Detail Score</h1>
                </div>
                <div>
                    <div>
                        <h1 className="text-lg font-semibold mb-2 text-left">Biodata</h1>
                    </div>
                    <div className="flex w-full my-1">
                        <div className="mr-0 basis-2/4 text-left">
                            <p className="font-medium">Name</p>
                        </div>
                        <div>
                            <p>{score.participant.name}</p>
                        </div>
                    </div>
                    <div className="flex w-full my-1">
                        <div className="mr-0 basis-2/4 text-left">
                            <p className="font-medium">Type</p>
                        </div>
                        <div>
                            <p>{score.participant.type}</p>
                        </div>
                    </div>
                    {
                        score != undefined && Object.entries(score.participant.type == "INDIVIDU" ? score.participant.individu : score.participant.company).map(([key, value]) => {
                            if (hiddenData.includes(key)) {
                                return null;
                            }else {
                                return (
                                    <div key={key.toString()} className="flex w-full my-1">
                                    <div className="mr-0 basis-2/4 text-left">
                                        <p className="font-medium">{key.split('_').join(" ")}</p>
                                    </div>
                                    <div>
                                        <p>{value}</p>
                                    </div>
                                </div>
                                )
                            }
                        })
                    }
                    {/* <div className="flex w-full my-1">
                        <div className="mr-0 basis-2/4 text-left">
                            <p className="font-medium">Occupation</p>
                        </div>
                        <div>
                            <p>{score.participant.name}</p>
                        </div>
                    </div>
                    <div className="flex w-full my-1">
                        <div className="mr-0 basis-2/4 text-left">
                            <p className="font-medium">Income Monthly</p>
                        </div>
                        <div>
                            <p>{score.participant.name}</p>
                        </div>
                    </div>
                    <div className="flex w-full my-1">
                        <div className="mr-0 basis-2/4 text-left">
                            <p className="font-medium">Expense Monthly</p>
                        </div>
                        <div>
                            <p>{score.participant.name}</p>
                        </div>
                    </div>
                    <div className="flex w-full my-1">
                        <div className="mr-0 basis-2/4 text-left">
                            <p className="font-medium">Email</p>
                        </div>
                        <div>
                            <p>{score.participant.name}</p>
                        </div>
                    </div>
                    <div className="flex w-full my-1">
                        <div className="mr-0 basis-2/4 text-left">
                            <p className="font-medium">No HP</p>
                        </div>
                        <div>
                            <p>{score.participant.name}</p>
                        </div>
                    </div>
                    <div className="flex w-full my-1">
                        <div className="mr-0 basis-2/4 text-left">
                            <p className="font-medium">Income Monthly</p>
                        </div>
                        <div>
                            <p>{score.participant.name}</p>
                        </div>
                    </div>
                    <div className="flex w-full my-1">
                        <div className="mr-0 basis-2/4 text-left">
                            <p className="font-medium">Income Monthly</p>
                        </div>
                        <div>
                            <p>{score.participant.name}</p>
                        </div>
                    </div> */}
                </div>
                <div className="mt-5">
                    <div>
                        <h1 className="text-lg font-semibold mb-2 text-left">Score</h1>
                    </div>
                    <div className="flex w-full my-1">
                        <div className="mr-0 basis-2/4 text-left">
                            <p className="font-medium">Grade</p>
                        </div>
                        <div>
                            <p>{Math.round(score.grade)}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    <div>
                        <h1 className="text-lg font-semibold mb-2 text-left">Group Score</h1>
                    </div>
                    {
                        score.group_scores.map((groupScore, index) => {
                            return (
                                <div key={index.toString()} className="flex w-full my-1">
                                    <div className="mr-0 basis-2/4 text-left">
                                        <p className="font-medium">{groupScore.question_group.name} </p>
                                    </div>
                                    <div>
                                        <p>{Math.round(groupScore.grade)}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    <button className="bg-slate-300 px-10 py-1 rounded mt-4 text-white" onClick={handleClose}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default ScoreDetailModal