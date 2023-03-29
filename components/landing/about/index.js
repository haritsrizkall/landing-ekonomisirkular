import Link from "next/link"
import { useEffect, useState } from "react"


const About = ({AboutContent}) => {
    const [content, setContent] = useState([
        {
            landing_id: 3,
            key: "Ekonomi Sirkular About",
            position: "about",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id congue tempor risus id. Odio cursus venenatis quisque in elit tellus. At morbi at dictum semper enim dignissim. Vitae, luctus vitae urna, nulla. Iaculis ultricies placerat aliquet purus mauris, pellentesque. Diam vitae et aliquam semper. Morbi neque vel, tempus suspendisse tellus ante cursus commodo. Quis nam aenean et euismod mauris eleifend. Pellentesque nunc id proin quam egestas magna.",
        },
        {
            landing_id: 4,
            key: "About Title",
            position: "about",
            content: "What is ekonomisirkular.id",
        }
    ])
    useEffect(() => {
        if (AboutContent != null) {
            setContent(AboutContent)
        }
    }, [AboutContent])
    return (
        <div className="bg-white w-3/4 m-auto mb-16 z-50" id="about">
            <div className="mx-1 md:mx-16 py-10">
                <h1 className="font-semibold text-2xl md:text-3xl mb-12 text-primary font-rubik">{content[1].content}</h1>
                <p className="text-lg md:text-2xl font-rubik">{content[0].content}</p>
                <div className="flex justify-center mt-10">
                    <Link href='/assesment'>
                        <a className="bg-primary py-3 px-12 text-xl rounded bg-primary text-white font-medium">Take Assessment</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default About