import { useEffect, useState } from "react"
import { useQuery } from "react-query";
import exploreApi from "../../../api/explore"
import Image from "next/image"
import { constant } from "../../../constant";

const Explore = ({ExploreContent, ImageContent}) => {
    const [content, setContent] = useState([
        {
            landing_id: 4,
            key: "Explore Description",
            position: "explore",
            content: "In our current economy, we take materials from the Earth, make products from them, and eventually throw them away as waste – the process is linear. In a circular economy, by contrast, we stop waste being produced in the first place.",
        },
    ])
    const [imageContent, setImageContent] = useState(null)
    const { isError, isLoading, data: explores, status, error } = useQuery("explores", exploreApi.getExplores, {
        staleTime: Infinity,
        cacheTime: Infinity,
    });
    const [openItems, setopenItems] = useState([])
    const exploreData = [
        {
            "title": "What is a circular economy?",
            "content": "In our current economy, we take materials from the Earth, make products from them, and eventually throw them away as waste – the process is linear. In a circular economy, by contrast, we stop waste being produced in the first place. In our current economy, we take materials from the Earth, make products from them, and eventually throw them away as waste – the process is linear. In a circular economy, by contrast, we stop waste being produced in the first place."
        },
        {
            "title": "Why we adopt a circular economy?",
            "content": "In our current economy, we take materials from the Earth, make products from them, and eventually throw them away as waste – the process is linear. In a circular economy, by contrast, we stop waste being produced in the first place. In our current economy, we take materials from the Earth, make products from them, and eventually throw them away as waste – the process is linear. In a circular economy, by contrast, we stop waste being produced in the first place."
        },
        {
            "title": "Who can contribute to circular economy?",
            "content": "In our current economy, we take materials from the Earth, make products from them, and eventually throw them away as waste – the process is linear. In a circular economy, by contrast, we stop waste being produced in the first place. In our current economy, we take materials from the Earth, make products from them, and eventually throw them away as waste – the process is linear. In a circular economy, by contrast, we stop waste being produced in the first place."
        },
        {
            "title": "Where to start the practice of circular economy?",
            "content": "In our current economy, we take materials from the Earth, make products from them, and eventually throw them away as waste – the process is linear. In a circular economy, by contrast, we stop waste being produced in the first place. In our current economy, we take materials from the Earth, make products from them, and eventually throw them away as waste – the process is linear. In a circular economy, by contrast, we stop waste being produced in the first place."
        },
        {
            "title": "When to adopt a circular economy?",
            "content": "In our current economy, we take materials from the Earth, make products from them, and eventually throw them away as waste – the process is linear. In a circular economy, by contrast, we stop waste being produced in the first place. In our current economy, we take materials from the Earth, make products from them, and eventually throw them away as waste – the process is linear. In a circular economy, by contrast, we stop waste being produced in the first place."
        },
        {
            "title": "How to adopt a circular economy?",
            "content": "In our current economy, we take materials from the Earth, make products from them, and eventually throw them away as waste – the process is linear. In a circular economy, by contrast, we stop waste being produced in the first place. In our current economy, we take materials from the Earth, make products from them, and eventually throw them away as waste – the process is linear. In a circular economy, by contrast, we stop waste being produced in the first place."
        },
    ]
    
    useEffect(() => {
        if (ExploreContent != null) {
            setContent(ExploreContent)
        }
    }, [ExploreContent])
    useEffect(() => {
        if (ImageContent != null) {
            setImageContent(ImageContent)
        }
    }, [ImageContent])

    const handleExpand = (index) => {
        if (openItems.includes(index)) {
            setopenItems(openItems.filter(item => item !== index))
        }else {
            setopenItems([...openItems, index])
        }
    }

    return (
        <div className="bg-secondary -mt-20 pb-20" id="explore" style={{scrollBehavior:'smooth'}}>
            <div className="pt-32 m-auto">
                <h1 className="text-2xl font-medium font-rubik text-primary mb-10 ml-7 md:ml-48">Explore</h1>
                <div className="flex mt-10">
                    <div className="basis-1/3 mr-20 flex-row hidden sm:block">
                        <div className="ml-2 md:ml-48">
                            <p>{content[0].content}</p>
                        </div>
                        <div className="mt-10">
                            <div className="relative right-10">
                                {
                                    ImageContent == null ? (
                                        <Image src="/img/explore-min.png" className="relative right-10" 
                                        width={401} height={322}
                                        alt="explore" />
                                    ) : (
                                        <Image 
                                        loader={() => `${constant.backendURL}/${ImageContent[0].image}`}
                                        src={`${constant.backendURL}/${ImageContent[0].image}`}className="relative right-10" 
                                        width={401} height={322}
                                        alt="explore" />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="flex basis-full md:basis-2/3">
                        <ul className=" w-full sm:w-4/5 mx-7 sm:mx-7">
                            {(explores && !isError) && explores.map((item, index) => {
                                return(
                                    <div key={index.toString()} className={`${index}-item`}>
                                        <div className="border-b-2 border-black py-7 flex justify-between flex">
                                            <div>
                                                <h3 className="font-rubik font-medium text-lg">{item.title}</h3>
                                            </div>
                                            <div className="min-w-20">
                                                <a className="cursor-pointer m-auto" onClick={() => handleExpand(index)}>
                                                    <img alt="minus or plus" src={openItems.includes(index) ? "/img/minus.png" : "/img/plus.png"} className="w-7"/>
                                                </a>
                                            </div>
                                        </div>
                                        <div className={`mt-5 ${!openItems.includes(index) ? 'hidden': 'block'}`}>
                                            <p className="font-rubik">{item.content}</p>
                                        </div>
                                    </div>
                                )
                            })}
                            
                            {(isError || isLoading) && exploreData.map((item, index) => {
                                return(
                                    <div key={index.toString()} className={`${index}-item`}>
                                        <div className="border-b-2 border-black py-7 flex justify-between flex">
                                            <div className="basis-11/12">
                                                <h3 className="font-rubik font-medium text-lg">{item.title}</h3>
                                            </div>
                                            <div className="basis-1/12">
                                                <a className="cursor-pointer " onClick={() => handleExpand(index)}>
                                                    <img alt="minus or plus" src={openItems.includes(index) ? "/img/minus.png" : "/img/plus.png"} className="w-7"/>
                                                </a>
                                            </div>
                                        </div>
                                        <div className={`mt-5 ${!openItems.includes(index) ? 'hidden': 'block'}`}>
                                            <p className="font-rubik">{item.content}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Explore