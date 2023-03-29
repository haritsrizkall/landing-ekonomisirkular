import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

const NavbarLanding = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isTransparent, setIsTransparent] = useState(true)

    const handleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const changeBackground = () => {
        if (window.scrollY >= 35) {
            setIsTransparent(false)
        } else {
            setIsTransparent(true)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', changeBackground)
    }, [])
    
    
    return (
        <div className={`fixed w-full navbar z-10 ${!isTransparent ? 'bg-white': ''}`}>
            <div className=" py-2 px-1 lg:px-36 flex flex-row">
                <div>
                    {
                        isTransparent ? (
                            <Link href="/">
                                <div className="ml-3">
                                    <Image src='/img/logo.png' width={130} height={64} alt="logo" className="cursor-pointer"/>
                                </div>
                            </Link>
                        ) : (
                            <Link href="/">
                                <Image src='/img/logo-green.png' width={167} height={64} alt="logo" className="cursor-pointer"/>
                            </Link>
                        )
                    }
                </div>
                <div className="grow m-auto hidden md:block">
                    <ul className="flex flex-row-reverse content-center">
                        <li>
                            <Link href="/assesment">
                                <a className={`mx-7 font-rubik font-semibold text-lg bg-white px-3 py-2 px-6 rounded ${isTransparent ? 'text-black' : 'text-primary bg-white border-4 border-primary rounded'}`}>
                                    Assessment
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/research" className={`mx-7 font-rubik font-semibold text-lg text-white m-auto ${isTransparent ? 'text-white' : 'text-primary' }`}>
                                <a className={`mx-7 font-rubik font-semibold text-lg text-white m-auto ${isTransparent ? 'text-white' : 'text-primary' }`}>
                                    Research
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/newsideas" className={`mx-7 font-rubik font-semibold text-lg text-white m-auto ${isTransparent ? 'text-white' : 'text-primary' }`}>
                                <a className={`mx-7 font-rubik font-semibold text-lg text-white m-auto ${isTransparent ? 'text-white' : 'text-primary' }`}>
                                    News & Ideas
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/#explore" className={`mx-7 font-rubik font-semibold text-lg text-white m-auto ${isTransparent ? 'text-white' : 'text-primary' }`}>
                                <a className={`mx-7 font-rubik font-semibold text-lg text-white m-auto ${isTransparent ? 'text-white' : 'text-primary' }`}>
                                    Explore
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/#about" className={`mx-7 font-rubik font-semibold text-lg text-white m-auto ${isTransparent ? 'text-white' : 'text-primary' }`}>
                                <a className={`mx-7 font-rubik font-semibold text-lg text-white m-auto ${isTransparent ? 'text-white' : 'text-primary' }`}>
                                    About
                                </a>                            
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="my-auto ml-auto mr-3 block md:hidden">
                    <button onClick={handleMobileMenu} className="cursor-pointer">
                        <Image src={isTransparent ? "/img/ham-menu.png" : "/img/ham-menu-green.png"} width={36} height={26} alt="menu" />
                    </button>
                </div>
            </div>
            <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden nav-mobile bg-white w-full`}>
                <ul className="mx-5">
                    <li className="py-5">
                        <Link href="/#about">
                            <a className="font-rubik font-medium text-md">
                                About
                            </a>
                        </Link>
                    </li>
                    <li className="py-5">
                        <Link href="/#explore">
                            <a className="font-rubik font-medium text-md">
                                Explore
                            </a>
                        </Link>
                    </li>
                    <li className="py-5">
                        <Link href="/newsideas">
                            <a className="font-rubik font-medium text-md">
                                News & Ideas
                            </a>
                        </Link>
                    </li>
                    <li className="py-5">
                        <Link href="/research">
                            <a className="font-rubik font-medium text-md">
                                Research
                            </a>
                        </Link>
                    </li>
                    <li className="py-5">
                        <Link href="/assesment">
                            <a className="font-rubik font-medium text-md">
                                Assessment
                            </a>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default NavbarLanding