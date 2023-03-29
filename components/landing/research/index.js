import moment from "moment"
import Image from "next/image"
import Link from "next/link"
import { constant } from "../../../constant"

const Research = ({research}) => {
    return (
        <div className="my-20">
            <div className="ml-5 md:ml-48 w-1/2 h-2 bg-primary rounded"></div>
            <div className="mx-5 md:w-3/4 md:m-auto">
                <h1 className="text-2xl font-medium font-rubik text-primary mt-10 mb-6 md:mb-0">Research</h1>
                <div className="main flex flex-col-reverse md:flex-row">
                    <div className="basis-full md:basis-1/3 mt-5">
                        <div className="mb-5">
                            <h2 className="text-2xl md:text-3xl font-medium font-rubik">{research ? research.title : 'Let’s switch to circular economy'}</h2>
                            <p className="text-sm text-gray-500">{moment(research.createdAt).format("DD MMM YYYY")}</p>
                        </div>
                        <p className="font-rubik">{research ? research.short_description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu blandit sit diam dui integer viverra feugiat. Consectetur tellus quisque nunc, leo tempor, ipsum faucibus. Id nisl vestibulum, malesuada ultrices tellus dui, tortor vestibulum. Justo, viverra lectus et urna. Feugiat risus, est facilisis eget ornare morbi ut luctus fusce. Pellentesque ornare mauris eu commodo cursus et tincidunt tellus varius. Amet pharetra aliquam nec eu fringilla malesuada ac. Nec ac convallis ac commodo commodo sed. Amet pellentesque a, nec aliquam.'}</p>
                        <Link
                            href={`research/${research ? research.post_id : 1}`}
                        >
                            <a className="font-rubik text-primary">Read more...</a>
                        </Link>
                    </div>
                    <div className="basis-full md:basis-2/3 md:ml-20">
                        <Image 
                            src="/img/news2.png" 
                            loader={() => research ? `${constant.backendURL}/${research.image}` : '/img/news2.png'}
                            width={704} 
                            height={475} 
                            alt="research"/>
                    </div>
                </div>

            </div>
            <div className="mr-5 md:mr-48 mt-14 w-1/2 h-2 bg-primary rounded ml-auto"></div>
        </div>
    )
}

export default Research