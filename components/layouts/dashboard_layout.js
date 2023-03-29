import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Dashboard from "../../pages/dashboard";

const navbarData = [
    {
        name: 'Home',
        path: '/dashboard',
        type: 'link',
        image: 'house-fill'
    },
    {
        name: 'User Management',
        path: '/dashboard/usermanagement',
        type: 'link',
        image: 'people-fill'
    },
    {
        name: 'Participants',
        path: '',
        type: 'dropdown',
        image: 'people',
        subMenu: [
            {
                name: 'Individu',
                path: '/dashboard/participants/individu',
                type: 'link',
                image: 'person'
            },
            {
                name: 'Company',
                path: '/dashboard/participants/company',
                type: 'link',
                image: 'building'
            },
        ],
    },
    {
        name: 'Questions',
        path: '',
        type: 'dropdown',
        image: 'question-circle-fill',
        subMenu: [
            {
                name: 'Question Set',
                path: '/dashboard/questions/questionsets',
                type: 'link',
                image: 'question-square-fill'
            },
            {
                name: 'Question Group',
                path: '/dashboard/questions/questiongroups',
                type: 'link',
                image: 'question-square-fill'
            },
            {
                name: 'Question',
                path: '/dashboard/questions/questions',
                type: 'link',
                image: 'question-square-fill'
            }
        ],
    },
    {
        name: 'Scores',
        path: '',
        type: 'dropdown',
        image: 'clipboard-data',
        subMenu: [
            {
                name: 'Individu',
                path: '/dashboard/scores/individu',
                type: 'link',
                image: 'person'
            },
            {
                name: 'Company',
                path: '/dashboard/scores/company',
                type: 'link',
                image: 'building'
            },
        ],
    },
    {
        name: 'Post',
        path: '',
        type: 'dropdown',
        image: 'file-earmark-text-fill',
        subMenu: [
            {
                name: 'Add Post',
                path: '/dashboard/posts/add',
                type: 'link',
                image: 'file-earmark-plus-fill'
            },
            {
                name: 'Post List',
                path: '/dashboard/posts',
                type: 'link',
                image: 'file-earmark-text-fill'
            }
        ]
    },
    {
        name: 'Explores',
        path: '/dashboard/explores',
        type: 'link',
        image: 'file-earmark-text-fill'
    },
    {
        name: 'Contacts',
        path: '',
        type: 'dropdown',
        image: 'person-lines-fill',
        subMenu: [
            {
                name: 'Contacts',
                path: '/dashboard/contacts/contacts',
                type: 'link',
                image: 'telephone-fill'
            },
            {
                name: 'Social Medias',
                path: '/dashboard/contacts/socialmedia',
                type: 'link',
                image: 'instagram'
            }
        ]
    },
    {
        name: 'Contents',
        path: '',
        type: 'dropdown',
        image: 'file-earmark-text-fill',
        subMenu: [
            {
                name: 'Landing Content',
                path: '/dashboard/contents/landingcontent',
                type: 'link',
                image: 'file-earmark-text-fill'
            },
            {
                name: 'Slider',
                path: '/dashboard/contents/slider',
                type: 'link',
                image: 'image'
            },
        ]
    },
    {
        name: 'Images',
        path: '/dashboard/images',
        type: 'link',
        image: 'image-fill'

    }
]

const DashboardLayout = ({children}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [isLogin, setIsLogin] = useState(false)
    const router = useRouter()
    const dropdown = (index) => {
        document.querySelector(`#submenu-${index}`).classList.toggle("hidden");
        document.querySelector("#arrow").classList.toggle("rotate-180");
    }

    const openSidebar = () => {
        setIsSidebarOpen(true);
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/dashboard/login');
    }

    useEffect(() => {
        if (localStorage.getItem('token') == null) {
            router.push('/dashboard/login');
            setIsLogin(false);
        }else {
            setIsLogin(true);
        }
    }, [])

    if (!isLogin) {
        return null
    }
        
    return (
        <div className="flex min-w-fit">
            <span
                className={`sticky text-white text-4xl top-5 left-4 cursor-pointer ${isSidebarOpen ? 'hidden' : 'block'}`}
                onClick={() => setIsSidebarOpen(true)}
            >
                <i className="bi bi-filter-left px-2 bg-gray-900 rounded-md"></i>
            </span>
            <aside
                className={`sidebar sticky left-0 top-0  lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900 h-screen ${isSidebarOpen ? 'block' : 'hidden'}`}
            >
                <div className="text-gray-100 text-xl">
                  <div className="p-2.5 mt-1 flex items-center">
                    <i className="bi bi-app-indicator px-2 py-1 rounded-md bg-blue-600"></i>
                    <h1 className="font-bold text-gray-200 text-[15px] ml-3">Ekonomisirkular.ID</h1>
                    <i
                      className="bi bi-x cursor-pointer ml-28 lg:hidden"
                      onClick={() => setIsSidebarOpen(false)}
                    ></i>
                  </div>
                  <div className="my-2 bg-gray-600 h-[1px]"></div>
                </div>
                {
                    navbarData.map((item, index) => {
                        if (item.type == 'link') {
                            return (
                                <Link href={item.path} key={index.toString()}>
                                    <div
                                        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
                                    >
                                        <i className={`bi bi-${item.image}`}></i>
                                        <span className="text-[15px] ml-4 text-gray-200 font-bold">{item.name}</span>
                                    </div>
                                </Link>
                            )
                        }else {
                            return (
                                <>
                                    <div
                                        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
                                        onClick={() => dropdown(index)}
                                        key={index.toString()}
                                    >
                                        <i className={`bi bi-${item.image}`}></i>
                                        <div className="flex justify-between w-full items-center">
                                          <span className="text-[15px] ml-4 text-gray-200 font-bold">{item.name}</span>
                                          <span className="text-sm rotate-0" id="arrow">
                                            <i className="bi bi-chevron-down"></i>
                                          </span>
                                        </div>
                                    </div>
                                    <div
                                        className="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold hidden"
                                        id={`submenu-${index}`}
                                    >
                                        {item.subMenu.map((subItem, index) => (
                                             <Link href={subItem.path} key={index.toString()}>
                                             <div
                                                 className="p-2.5 mt-3 flex subI-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
                                             >
                                                 <i className={`bi bi-${subItem.image}`}></i>
                                                 <span className="text-[15px] ml-4 text-gray-200 font-bold">{subItem.name}</span>
                                             </div>
                                         </Link>
                                            // <Link href={subItem.path} key={index.toString()}>
                                            //     <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
                                            //         {subItem.name}
                                            //     </h1>
                                            
                                            // </Link>
                                        ))}
                                    </div>
                                </>
                            )
                        }
                    })
                }
                
                <div className="my-4 bg-gray-600 h-[1px]"></div>
                <div onClick={handleLogout}>
                    <div
                      className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
                    >
                      <i className="bi bi-box-arrow-in-right"></i>
                      <span className="text-[15px] ml-4 text-gray-200 font-bold">Logout</span>
                    </div>
                </div>
            </aside>
            <main className="flex-1">
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout