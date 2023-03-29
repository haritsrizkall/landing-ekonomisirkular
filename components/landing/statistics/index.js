import { useQuery } from "react-query";
import scoreAPI from "../../../api/score";
import { intToString } from "../../../utils/helper";

const Statistics = ({StatisticsContent}) => {
    const { isError, isLoading, data: stats, status, error } = useQuery("score", scoreAPI.getStats);
    return (
        <div className="grid grid-cols-2 md:grid-cols-5  w-11/12 md:w-3/4 m-auto gap-2 md:gap-10">
            <div className="drop-shadow-xl border border-gray-200 bg-white h-40 md:h-44 rounded px-2 text-center justify-center content-center">
                <div className="flex flex-col h-full">
                    <div className="my-auto">
                        <div className="h-10 mb-0 md:mb-2">
                            <h1 className="font-rubik text-md md:text-md font-medium text-primary">{StatisticsContent ?  StatisticsContent[0].content : 'Visitor'}</h1> 
                        </div>
                        <div className="">
                            <p className="font-rubik font-medium text-primary text-3xl md:text-5xl mx-auto">{
                                stats ? intToString(stats.visitor) : 55
                            }</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="drop-shadow-xl border border-gray-200 bg-white h-40 md:h-44 rounded px-2 text-center justify-center content-center">
                <div className="flex flex-col h-full">
                    <div className="my-auto">
                        <div className="h-10 mb-0 md:mb-2">
                            <h1 className="font-rubik text-md md:text-md font-medium text-primary">{StatisticsContent ?  StatisticsContent[1].content : 'Individu'}</h1>
                        </div>
                        <div className="">
                            <p className="font-rubik font-medium text-primary text-3xl md:text-5xl mx-auto">{
                                stats ? intToString(stats.taken_individu) : 55
                            }</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="drop-shadow-xl border border-gray-200 bg-white h-40 md:h-44 rounded px-2 text-center justify-center content-center">
                <div className="flex flex-col h-full">
                    <div className="my-auto">
                        <div className="h-10 mb-0 md:mb-2">
                            <h1 className="font-rubik text-md md:text-md font-medium text-primary">{StatisticsContent ?  StatisticsContent[4].content : 'Average Individu Score'}</h1>
                        </div>
                        <div className="">
                            <p className="font-rubik font-medium text-primary text-3xl md:text-5xl mx-auto">{`
                        ${stats ? Math.round(stats.average_individu) : 90}%
                        `}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="drop-shadow-xl border border-gray-200 bg-white h-40 md:h-44 rounded px-2 text-center justify-center content-center">
                <div className="flex flex-col h-full">
                    <div className="my-auto">
                        <div className="h-10 mb-0 md:mb-2">
                            <h1 className="font-rubik text-md md:text-md font-medium text-primary">{StatisticsContent ?  StatisticsContent[2].content : 'Company'}</h1>
                        </div>
                        <div className="">
                            <p className="font-rubik font-medium text-primary text-3xl md:text-5xl mx-auto">{
                                stats ? intToString(stats.taken_company) : 55
                            }</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="drop-shadow-xl border border-gray-200 bg-white h-40 md:h-44 rounded px-2 text-center justify-center content-center">
                <div className="flex flex-col h-full">
                    <div className="my-auto">
                        <div className="h-10 mb-0 md:mb-2">
                            <h1 className="font-rubik text-md md:text-md font-medium text-primary">{StatisticsContent ?  StatisticsContent[3].content : 'Average Company Score'}</h1>
                        </div>
                        <div className="">
                            <p className="font-rubik font-medium text-primary text-3xl md:text-5xl mx-auto">{`
                        ${stats ? Math.round(stats.average_company) : 90}%
                        `}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Statistics