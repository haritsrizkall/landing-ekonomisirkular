import Link from "next/link";
import { useEffect, useState } from "react";
import { authAPI } from "../../../api/auth";
import { useRouter } from "next/router";
import { isError } from "react-query";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        authAPI.login(email, password)
            .then((res) => {
                setIsLoading(false);
                localStorage.setItem("token", res.token);
                setError("");
                router.push('/dashboard')
            }).catch((err) => {
                setIsLoading(false);
                setError(err.response.data.message);
            })
    }
    return (
        <>
            <div className="min-w-screen min-h-screen">
            <div className="container mx-auto px-4 h-screen">
                <div className="flex content-center items-center justify-center h-full">
                    <div className="w-full lg:w-4/12 px-4">
                        <div style={{backgroundColor:"#F5F0E7"}} className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0">
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-6">
                                {
                                    error && (
                                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                            <span className="block sm:inline">{error}</span>
                                        </div>
                                    )
                                }
                                <form onSubmit={handleLogin}>
                                    <div className="relative w-full mb-3">
                                        <label className="text-secondary block uppercase text-xs font-bold mb-2">
                                            Username
                                        </label>
                                        <input onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        type="text" className="text-black border-0 px-3 py-3 placeholder-blueGray-300 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Email" />
                                    </div>
                                    <div className="relative w-full mb-3">
                                        <label className="text-secondary block uppercase text-xs font-bold mb-2">
                                            Password
                                        </label>
                                        <input 
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        type="password" className="text-black border-0 px-3 py-3 placeholder-blueGray-300 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Password" />
                                    </div>
                                    <div className="text-center mt-6 relative">
                                        <div className={isLoading?"w-full h-full absolute inset-0 opacity-0":"hidden"} />
                                        <button className=
                                        {isLoading?"bg-primary hover:opacity-90 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150 opacity-40"
                                        :"bg-primary hover:opacity-90 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"}
                                        type="submit">
                                            {isLoading?"Loading...":"Masuk"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login