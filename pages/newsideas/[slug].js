import axios from "axios"
import moment from "moment/moment"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useQuery } from "react-query"
import { async } from "regenerator-runtime"
import postAPI from "../../api/post"
import Footer from "../../components/footer"
import NavbarLanding from "../../components/navbar/navbar-landing"
import { constant } from "../../constant"


const NewIdea = ({post, related, research, ideas}) => {
    useEffect(() => {
      const contentP = document.querySelectorAll(".content p")
      contentP.forEach((p) => {
        p.classList.add("text-md")
      })
      const contentH1 = document.querySelectorAll(".content h1")
      contentH1.forEach((h1) => {
        h1.classList.add("text-3xl")
      })
      const contentH2 = document.querySelectorAll(".content h2")
      contentH2.forEach((h2) => {
        h2.classList.add("text-2xl")
      })
      const contentOl = document.querySelectorAll(".content ol")
      contentOl.forEach((ol) => {
        ol.classList.add("ml-5")
        ol.classList.add("list-decimal")
      })
      
    }, [post])
    return (
        <>
        <Head>
            <title>Ekonomisirkular ID | {post.title}</title>
            <meta name="description" content={post.short_description} />
            <meta name="title" content={post.title} />
            <meta name="robots" content="index, follow" />
        </Head>
        <div className='bg-white w-screen box-border overflow-x-hidden'>
            <NavbarLanding/>
            <div className="bg-header-news h-20 bg-cover">
                <div className="flex flex-col h-full justify-center content-center">
                </div>
            </div>
            <div className="flex flex-col md:flex-row mt-16 mx-2 md:mx-36 mb-36">
                <div className=" md:basis-2/3 mr-0 md:mr-10">
                    <div>
                        <h1 className="font-rubik text-3xl font-medium text-primary">{post.title}</h1>
                        <div className="flex mt-2">
                            <p>{moment(post.createdAt).format("DD MMM YYYY")}</p>
                            <p className="mx-2">-</p>
                            <p>ekonomisirkular.id</p>
                        </div>
                    </div>
                    <div className="mt-5">
                        <div>
                            <Image
                                loader={() => `${constant.backendURL}/${post.image}`}
                                src={`${constant.backendURL}/${post.image}`}
                                width="1364px"
                                height="862px"
                                className="rounded"
                                alt={post.title}
                            />
                        </div>
                        <div className="mt-12">
                            <div  className="content" dangerouslySetInnerHTML={{__html: post.content}}/>
                        </div>
                    </div>
                </div>
                <div className="basis-1/3 md:ml-10 mt-10 md:mt-0">
                    <div>
                        <div className="border-b-2 pb-5 mt-20 md:mt-0">
                            <h2 className="text-primary font-rubik text-xl font-medium">Another news</h2>
                        </div>
                        <div>
                            {
                                related && related.map((item, index) => {
                                    return (
                                        <div className="flex border-b-2 py-5 px-2" key={index.toString()}>
                                            <div className="basis-2/3">
                                            <Link href={`/newsideas/${item.slug}`}>
                                                <h3 className="my-auto font-bold cursor-pointer text-primary font-rubik">{item.title}</h3>
                                            </Link>
                                            </div>
                                            <div className="basis-1/3">
                                            <Image 
                                                src={`${constant.backendURL}/${item.image}`}
                                                loader={() => `${constant.backendURL}/${item.image}`}
                                                width="400px"
                                                height="400px"
                                                className="rounded"
                                                alt="related news"
                                            />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="mt-10">
                        <div className="border-b-2 pb-5 mt-20 md:mt-0">
                            <h2 className="text-primary font-rubik text-xl font-medium">Research</h2>
                        </div>
                        <div>
                            {
                                research && research.map((item, index) => {
                                    return (
                                        <div className="flex border-b-2 py-5 px-2" key={index.toString()}>
                                            <div className="basis-2/3">
                                            <Link href={`/newsideas/${item.slug}`}>
                                                <h3 className="my-auto font-bold cursor-pointer text-primary font-rubik">{item.title}</h3>
                                            </Link>
                                            </div>
                                            <div className="basis-1/3">
                                            <Image 
                                                src={`${constant.backendURL}/${item.image}`}
                                                loader={() => `${constant.backendURL}/${item.image}`}
                                                width="400px"
                                                height="400px"
                                                className="rounded"
                                                alt="related research"
                                            />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="mt-10">
                        <div className="border-b-2 pb-5 mt-20 md:mt-0">
                            <h2 className="text-primary font-rubik text-xl font-medium">Ideas</h2>
                        </div>
                        <div>
                            {
                                ideas && ideas.map((item, index) => {
                                    return (
                                        <div className="flex border-b-2 py-5 px-2" key={index.toString()}>
                                            <div className="basis-2/3">
                                            <Link href={`/newsideas/${item.slug}`}>
                                                <h3 className="my-auto font-bold cursor-pointer text-primary font-rubik">{item.title}</h3>
                                            </Link>
                                            </div>
                                            <div className="basis-1/3">
                                            <Image 
                                                src={`${constant.backendURL}/${item.image}`}
                                                loader={() => `${constant.backendURL}/${item.image}`}
                                                width="400px"
                                                height="400px"
                                                className="rounded"
                                                alt="related ideas"
                                            />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
        </>
    )
}

export async function getServerSideProps(ctx) {
    const slug = ctx.params.slug
    try {
        const res = await postAPI.getPostBySlug(slug)
        const related = await postAPI.getPosts([1], 1, 6)
        const research = await postAPI.getPosts([3], 1, 6)
        const ideas = await postAPI.getPosts([2], 1, 6)
        return {
            props: {
                post: res,
                related: related.data,
                research: research.data,
                ideas: ideas.data
            }
        }  
    } catch (error) {
        return {
            notFound: true
        }
    }
}

export default NewIdea