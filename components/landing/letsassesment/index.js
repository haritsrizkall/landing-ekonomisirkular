import Link from "next/link"
import { constant } from "../../../constant"

const LetsAssesment = ({backgroundImage, assesmentText}) => {
    return (
        <div className="bg-letsassesment bg-no-repeat bg-cover bg-center h-80 w-full text-center flex flex-col justify-center" style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundImage: `url(${constant.backendURL}/${backgroundImage.image})`
        }}>
            <div className="">
                <h1 className="text-3xl md:text-4xl font-semibold font-rubik text-white mb-12">{assesmentText ? assesmentText : 'Let’s Take Assessment'}</h1>
                <Link href="/assesment">
                    <a className="py-3 px-12 text-xl md:text-2xl rounded bg-white text-primary font-semibold">Take Assessment</a>
                </Link>
            </div>
        </div>
    )
}

export default LetsAssesment