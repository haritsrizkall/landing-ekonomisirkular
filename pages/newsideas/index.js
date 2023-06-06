import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { async } from "regenerator-runtime"
import postAPI from "../../api/post"
import Footer from "../../components/footer"
import Navbar from "../../components/navbar"
import NavbarLanding from "../../components/navbar/navbar-landing"
import Pagination from "../../components/pagination"
import { constant } from "../../constant"
import { transformContentLength } from "../../utils/helper"

const NewsIdeas = ({posts}) => {
    const router = useRouter()
    const handlePageChange = (page) => {
        router.push(`/news?page=${page}`)
    }

    return (
        <>
        <Head>
            <title>Ekonomisirkular ID | News and Ideas</title>
            <meta name="description" content="temukan beragam informasi terbaru seputar ekonomi sirkular dan ide-ide inovatif untuk mengembangkan bisnis Anda. Dapatkan berita terkini seputar tren industri, praktik terbaik, dan panduan untuk menerapkan prinsip ekonomi sirkular dalam bisnis Anda. Jangan lewatkan kesempatan untuk terus memperbarui pengetahuan dan mempertajam ide-ide bisnis Anda di sini!" />
        </Head>
        <div className='bg-white w-screen box-border overflow-x-hidden'>
            <NavbarLanding/>
            <div className="bg-header-news h-96 bg-cover">
                <div className="flex flex-col h-full justify-center content-center">
                    <h1 className="font-rubik font-medium text-white text-4xl md:text-5xl text-center">News & Ideas</h1>
                </div>
            </div>
            <div className="search-section h-48 bg-secondary text-center flex content-center justify-center">
                <div className="relative">
                
                </div>
            </div>
            <div className="w-140 max-w-full py-10 m-auto">
                <div className="mt-16 mb-10 mx-5">
                    <h2 className="font-rubik font-medium text-2xl">All news & ideas items</h2>
                </div>
                {posts.data && posts.data.map((item) => (
                    <div key={item.post_id.toString()} className="mx-3 md:mx-0">
                        <div className="py-7 border-y-2">
                            <div className="flex mx-5">
                                <div className="basis-1/3 hidden md:block">
                                    <div className="rounded">
                                        <Image className="rounded" 
                                        loader={() => `${constant.backendURL}/${item.image}`}
                                        src={`${constant.backendURL}/${item.image}`} width={250} height={176}/>
                                    </div>
                                </div>
                                <div className="basis-2/3 ml-0 md:ml-5">
                                    <Link href={`/newsideas/${item.slug}`}>
                                        <h3 className="font-rubik text-lg md:text-xl font-medium text-primary cursor-pointer">
                                            {item.title}
                                        </h3>
                                    </Link>
                                    <p className="font-rubik mt-2">
                                    {item.short_description} 
                                    </p>
                                    <Link href={`/newsideas/${item.slug}`}>
                                        <a className="font-rubik text-primary">Read more...</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <Pagination totalPages={posts.pagination.totalPages} page={posts.pagination.page} handlePageChange={handlePageChange} />
            </div>
            <Footer/>
        </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const page = context.query.page || 1
    const sizePerPage = context.query.sizePerPage || 10

    const posts = await postAPI.getPosts([1,2], page, sizePerPage)
    return {
        props: {
            posts
        }
    }
}

export default NewsIdeas