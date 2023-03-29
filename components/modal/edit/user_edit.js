import { useEffect, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query";
import { userAPI } from "../../../api/user";


const UserEdit = ({isVisible, setIsVisible, user}) => {
    const queryClient = useQueryClient();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("ADMIN");
    const mutation = useMutation(userAPI.update, {
        onSuccess: () => {
            console.log("Success");
            queryClient.invalidateQueries('users');
        },
        onError: () => {
            console.log("Error");
        }
    })
    useEffect(() => {
        setEmail(user.email);
        setRole(user.role);
    }, [user])
    
    const handleClose = () => {
        setIsVisible(false)
        mutation.reset();
    }
    return (
        <div className={isVisible ? "flex flex-col justify-center items-center w-screen h-screen z-30 fixed top-0 right-0": "hidden"}>
            <div onClick={handleClose} className="bg-transparent w-screen h-screen fixed"></div>
            <div className="bg-white py-5 w-100 rounded flex flex-col justify-center text-center drop-shadow-lg px-2">
                <div>
                    <h1 className="text-xl font-semibold mb-5   ">Edit User</h1>
                </div>
                {
                    mutation.isError && (
                        <div onCLick={() =>{
                            mutation.reset();
                        }} className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative cursor-pointer" role="alert">
                            <span className="block sm:inline">{mutation.error.response.data.message}</span>
                        </div>
                    )
                }
                {
                    mutation.isSuccess && (
                        <div onClick={() => {
                            mutation.reset();
                        }}className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative cursor-pointer" role="alert">
                            <span className="block sm:inline">Success</span>
                        </div>
                    )
                }
                <div className="flex w-full my-1">
                    <div className="mr-0 basis-1/5 text-left">
                        <p className="font-medium">Email</p>
                    </div>
                    <div className="basis-4/5 mr-5">
                        <input type="text" className="py-2 pl-3 bg-slate-100 outline-none w-full" value={email} onChange={(e) => {
                            setEmail(e.target.value)
                        }}/>
                    </div>
                </div>
                <div className="flex w-full my-1">
                    <div className="mr-0 basis-1/5 text-left">
                        <p className="font-medium">Password</p>
                    </div>
                    <div className="basis-4/5 mr-5">
                        <input type="password" className="py-2 pl-3 bg-slate-100 outline-none w-full" value={password} onChange={(e) => {
                            setPassword(e.target.value)
                        }} placeholder="Kosongkan jika tidak ingin mengganti password"/>
                    </div>
                </div>
                <div className="flex w-full my-1">
                    <div className="mr-0 basis-1/5 text-left">
                        <p className="font-medium">Question Group</p>
                    </div>
                    <div className="basis-4/5 mr-5">
                        <select className="py-2 pl-3 bg-slate-100 outline-none w-full" onChange={(e) => setRole(e.target.value)} value={role}>
                            <option value="ADMIN">ADMIN</option>
                            <option value="USER">USER</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button className="bg-slate-300 px-10 py-1 rounded mt-4 mr-2 text-white" onClick={handleClose}>Close</button>
                    <button className="bg-blue-500 px-10 py-1 rounded mt-4 ml-2 text-white" onClick={() => {
                        console.log("SUBMIT");
                        mutation.mutate({
                            user_id: user.user_id,
                            email: email,
                            password: password,
                            role: role
                        })
                    }}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default UserEdit