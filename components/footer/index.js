import Image from "next/image";
import Link from "next/link";
import { useQuery } from "react-query"
import contactAPI from "../../api/contact";
import socialMediaAPI from "../../api/social_media";
import { constant } from "../../constant";

const Footer = () => {
    const { isError, isLoading, data: contacts, status, error } = useQuery("contacts", contactAPI.getAll, {
        staleTime: Infinity,
        cacheTime: Infinity
    });
    const { isError: isErrorSocialMedia, isLoading: isLoadingSocialMedia, data: socialMedias, status: statusSocialMedia, error: errorSocialMedia } = useQuery("socialMedia", socialMediaAPI.getAll, {
        staleTime: Infinity,
        cacheTime: Infinity
    });
    
    return (
        <div className="border-t-2 mt-10 pt-7 flex flex-col">
            <div className="ml-7 md:m-auto w-full md:w-3/4 pt-14 flex flex-col md:flex-row justify-between">
                <div className="mb-10 md:mb-0">
                    <h3 className="mb-4 font-rubik text-xl font-medium text-primary">EKONOMISIRKULAR.ID</h3>
                    <div>
                        <ul>
                            <li>
                                <Link href="/#about">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/#explore">
                                    Explore
                                </Link>
                            </li>
                            <li>
                                <Link href="/newsideas">
                                    News & Ideas
                                </Link>
                            </li>
                            <li>
                                <Link href="/research">
                                    Research
                                </Link>
                            </li>
                            <li>
                                <Link href="/assesment">
                                    Assessment
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mb-10 md:mb-0">
                    <h3 className="mb-4 font-rubik text-xl font-medium text-primary">CONTACT</h3>
                    {
                        contacts ? contacts.map((item, index) => (
                            <p key={index.toString()}>{item.value}</p>
                        )) : (
                            <>
                            <p>+6281224212953</p>
                            <p>rizkalaliamdyharits@gmail.com</p>
                            </>
                        )
                    }
                </div>
                <div className="md:-mt-5 md:ml-0">
                    <img alt="logo green" src="/img/logo-green.png" className="w-40 mb-6"/>
                    <div className="social flex md:justify-center">
                        {
                            socialMedias ? socialMedias.map((item, index) => (
                                // <img className="mx-2 w-7" src={item.url
                                // }/>
                                <div className="mx-2" 
                                key={index.toString()}>
                                    <Image
                                        loader={() => `${constant.backendURL}/socialmedia/${item.img_url}`}
                                        src={`${constant.backendURL}/${item.image}`}
                                        width="30px"
                                        height="30px"
                                        alt="social media"
                                    />
                                </div>
                            )) : (
                                <>
                                <img alt="ekonomisirkular instagram account" className="mx-2 w-7" src="/img/instagram.png"/>
                                <img alt="ekonomisirkular tiktok account" className="mx-2 w-7" src="/img/tiktok.png"/>
                                <img alt="ekonomisirkular whatsapp account" className="mx-2 w-7" src="/img/whatsapp.png"/>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="flex text-center h-20">
                <p className="mt-auto mx-auto">© 2022 ekonomisirkular.id</p>
            </div>
        </div>
    )
}

export default Footer