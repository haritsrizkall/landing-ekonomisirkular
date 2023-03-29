import Head from "next/head";
import Link from "next/link"
import { useQuery } from "react-query"
import ImageAPI from "../../api/image";
import NavbarLanding from "../../components/navbar/navbar-landing"
import { constant } from "../../constant";

const Assesment = () => {
    const { isError, isLoading, data: images, status, error } = useQuery("images", ImageAPI.getPerPage);

    return (
        <>
        <Head>
            <title>Ekonomisirkular ID | Assessment</title>
            <meta name="description" content="Assessment dapat membantu Anda mengevaluasi tingkat penerapan ekonomi sirkular di perusahaan atau organisasi Anda. Dapatkan panduan langkah demi langkah untuk melakukan penilaian dan analisis keberlanjutan, serta informasi tentang standar dan praktik terbaik dalam ekonomi sirkular. Sumber daya ini dapat membantu Anda memperoleh pemahaman yang lebih baik tentang kinerja perusahaan Anda dan memberikan panduan untuk meningkatkan praktik bisnis Anda menuju ekonomi sirkular yang berkelanjutan. Jangan lewatkan kesempatan untuk meningkatkan keberlanjutan bisnis Anda dengan mengunjungi halaman Assessment kami." />
        </Head>
        <div className='bg-white w-screen box-border overflow-x-hidden'>
            <NavbarLanding/>
            <div className="bg-header-news h-72 bg-cover">
                <div className="flex flex-col h-full justify-center content-center">
                    <h1 className="font-rubik font-medium text-white text-4xl md:text-5xl text-center">Assessment</h1>
                </div>
            </div>
            <div className="text-center mt-10 pb-14">
                <h2 className="font-rubik font-semibold text-3xl">Who are you?</h2>
                <div className="flex flex-col md:flex-row justify-center mt-10">
                    <Link href="/assesment/company">
                        <div className="bg-primary-light w-72 md:h-80 mx-auto md:mx-10  cursor-pointer drop-shadow-lg">
                            <div className="mt-5">
                                <div className="h-64">
                                    <img alt="assesment company" src={images ? `${constant.backendURL}/${images.assesment[0].image}` : 'img/company.png'} className="m-auto mb-10"/>
                                </div>
                                <h3 className="font-rubik font-semibold text-xl text-white">Company</h3>
                            </div>
                        </div>
                    </Link>  
                    <Link href="/assesment/individu">
                        <div className="bg-primary-light w-72 h-80 mx-auto md:mx-10 md:mt-0 mt-5 cursor-pointer drop-shadow-lg">
                            <div className="mt-5">
                                <div className="h-64">
                                    <img alt="assesment individu" src={images ? `${constant.backendURL}/${images.assesment[1].image}` : 'img/individu.png'} className="m-auto mb-10"/>
                                </div>
                                <h3 className="font-rubik font-semibold text-xl text-white">Individual</h3>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
        </>
    )
}

export default Assesment