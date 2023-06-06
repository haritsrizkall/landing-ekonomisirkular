import moment from "moment"
import Image from "next/image"
import Link from "next/link"
import { constant } from "../../../constant"

const NewsIdeas = ({newsIdeas}) => {
    return (
        <div className="mb-10">
            <div className="mx-5 md:w-3/4 md:m-auto">
                <h1 className="text-2xl font-medium font-rubik text-primary mt-10 mb-6 md:mb-0">News & Ideas</h1>
                <div className="main flex flex-col-reverse md:flex-row">
                    <div className="basis-full md:basis-1/3 mt-5">
                        <div className="mb-5">
                            <Link href={`newsideas/${newsIdeas ? newsIdeas.slug : 1}`}>
                                <h2 className="text-2xl md:text-3xl font-medium font-rubik cursor-pointer">{newsIdeas ? newsIdeas.title : 'Let’s switch to circular economy'}</h2>
                            </Link>
                            <p className="text-sm text-gray-500">{
                                moment(newsIdeas.createdAt).format("DD MMM YYYY")
                            }</p>
                        </div>
                        <p className="font-rubik">{newsIdeas ? newsIdeas.short_description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu blandit sit diam dui integer viverra feugiat. Consectetur tellus quisque nunc, leo tempor, ipsum faucibus. Id nisl vestibulum, malesuada ultrices tellus dui, tortor vestibulum. Justo, viverra lectus et urna. Feugiat risus, est facilisis eget ornare morbi ut luctus fusce. Pellentesque ornare mauris eu commodo cursus et tincidunt tellus varius. Amet pharetra aliquam nec eu fringilla malesuada ac. Nec ac convallis ac commodo commodo sed. Amet pellentesque a, nec aliquam.'}</p>
                        <Link
                            href={`newsideas/${newsIdeas ? newsIdeas.slug : 1}`}
                        >
                            <a className="font-rubik text-primary">Read more...</a>
                        </Link>
                    </div>
                    <div className="basis-full md:basis-2/3 md:ml-20">
                        <Image 
                            loader={() => newsIdeas ? `${constant.backendURL}/${newsIdeas.image}` : '/img/news1-min.png'}
                            src="/img/news1-min.png" 
                            width={704} 
                            height={475} 
                            alt="newsideas"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewsIdeas