import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import scoreAPI from "../../api/score";
import Loader from "../../components/loader";
import NavbarLanding from "../../components/navbar/navbar-landing";

const Participant = () => {
    const router = useRouter(); 
    const { isError, isLoading, data: stats, status, error } = useQuery("score", scoreAPI.getStats);
    const { id } = router.query;
    const [nilai, setNilai] = useState(0);
   
    const [type, setType] = useState("COMPANY");
    const [data, setData] = useState([]);
    const [loadingDownload, setLoadingDownload] = useState(false);



    useEffect(() => {
        if (id) {
            scoreAPI.getScoreByParticipantId(id).then((score) => {
                setNilai(Math.round(score.data.data.grade));
                setType(score.data.data.participant.type);
            })
        }
    }, [id])
    
    const handleDownload = (e) => {
        e.preventDefault();
        setLoadingDownload(true);
        scoreAPI.downloadScoreByParticipantId(id).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'result_score.pdf');
            document.body.appendChild(link);
            link.click();
            setLoadingDownload(false);
        })
    }
    return (
        <div className='bg-white w-screen box-border overflow-x-hidden'>
            <Loader isVisible={isLoading || loadingDownload}/>
            <NavbarLanding/>
            <div className="bg-primary-light h-64 md:h-80 bg-cover text-center">
                <div className="w-3/4 pt-32 m-auto">
                    <h1 className="font-rubik font-regular text-3xl text-white">Nilai Kamu</h1>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center content-center text-center mt-5 sm:-mt-28">
                <div className="flex drop-shadow-lg m-auto md:mx-5 w-96 h-28 sm:h-56 bg-white">
                    <div className="m-auto flex flex-row sm:flex-col text-center">
                        <div className="flex w-36 sm:w-full">
                            <h2 className="font-rubik font-medium text-base sm:text-3xl md:text-5xl m-auto">{nilai}/100 %</h2>
                        </div>
                        <div className="flex my-auto md:mt-5">
                            <p className="font-rubik text-xs md:text-base m-auto">
                            Nilai Assessment Kamu
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center content-center text-center mt-2 md:mt-10 py-0 md:py-6">
                <div className="flex drop-shadow-lg m-auto md:mx-5 my-2 md:my-0 w-96 h-28 sm:h-56 bg-white">
                    <div className="m-auto flex flex-row sm:flex-col text-center">
                        <div className="flex w-36 sm:w-full">
                            <h2 className="font-rubik font-medium text-base sm:text-3xl md:text-5xl m-auto">{stats && Math.round(type === 'COMPANY' ? stats.average_company : stats.average_individu)}/100 %</h2>
                        </div>
                        <div className="flex my-auto md:mt-5">
                            <p className="font-rubik text-xs md:text-base m-auto">
                            Rata-rata Nilai Assessment {type === "COMPANY" ? "Perusahaan" : "Individu"}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex drop-shadow-lg m-auto md:mx-5 my-2 md:my-0 w-96 h-28 sm:h-56 bg-white">
                    <div className="m-auto flex flex-row sm:flex-col text-center">
                        <div className="flex w-36 sm:w-full">
                            <h2 className="font-rubik font-medium text-base sm:text-3xl md:text-5xl m-auto">{stats && (type === 'COMPANY' ? stats.taken_company : stats.taken_individu)}</h2>
                        </div>
                        <div className="flex my-auto md:mt-5">
                            <p className="font-rubik text-xs md:text-base m-auto">
                            Jumlah {type === 'COMPANY' ? 'perusahaan' : 'individu'} yang telah mengikuti assessment
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center pb-5">
                <button onClick={handleDownload} className="bg-primary-light hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-full w-64 m-auto mt-3 mx-2">Download Result</button>
                <Link href='/assesment'>
                    <button className="bg-primary-light hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-full w-64 m-auto mt-3 mx-2">Back to Assessment</button>
                </Link>
            </div>
        </div>
    )
}

export default Participant