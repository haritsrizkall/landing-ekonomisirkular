import { useEffect, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query";
import contactAPI from "../../../api/contact";
import { questionAPI } from "../../../api/question";
import questionGroupAPI from "../../../api/question_group";
import questionSetsAPI from "../../../api/question_set";
import socialMediaAPI from "../../../api/social_media";


const SocialMediaAdd = ({isVisible, setIsVisible}) => {
    const queryClient = useQueryClient();
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [imgUrl, setImgUrl] = useState([]);

    const mutation = useMutation(socialMediaAPI.addSocialMedia, {
        onSuccess: () => {
            console.log("Success");
            queryClient.invalidateQueries('socialmedias');
        },
        onError: () => {
            console.log("Error");
        }
    })
    const handleClose = () => {
        setIsVisible(false)
        setName("");
        setUrl("");
        setImgUrl([])
        mutation.reset();
    }
    const handleSubmit = () => {
        const form = new FormData()
        form.append("name", name)
        form.append("url", url)
        form.append("image", imgUrl)
        mutation.mutate(form)
    }
    return (
        <div className={isVisible ? "flex flex-col justify-center items-center w-screen h-screen z-30 fixed top-0 right-0": "hidden"}>
            <div onClick={handleClose} className="bg-transparent w-screen h-screen fixed"></div>
            <div className="bg-white py-5 w-100 rounded flex flex-col justify-center text-center drop-shadow-lg px-2">
                <div>
                    <h1 className="text-xl font-semibold mb-5   ">Add Social Media</h1>
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
                        <p className="font-medium">Name</p>
                    </div>
                    <div className="basis-4/5 mr-5">
                        <input type="text" className="py-2 pl-3 bg-slate-100 outline-none w-full" value={name} onChange={(e) => {
                            setName(e.target.value)
                        }}/>
                    </div>
                </div>
                <div className="flex w-full my-1">
                    <div className="mr-0 basis-1/5 text-left">
                        <p className="font-medium">Url</p>
                    </div>
                    <div className="basis-4/5 mr-5">
                        <input type="text" className="py-2 pl-3 bg-slate-100 outline-none w-full" value={url} onChange={(e) => {
                            setUrl(e.target.value)
                        }}/>
                    </div>
                </div>
                <div className="flex w-full my-1">
                    <div className="mr-0 basis-1/5 text-left">
                        <p className="font-medium">Icon</p>
                    </div>
                    <div className="basis-4/5 mr-5">
                        <input type="file" className="file-input py-2 pl-3 bg-slate-100 outline-none w-full" multiple accept="image/*" 
                        onChange={(e) => {
                            setImgUrl(e.target.files[0])
                        }}/>
                        <p>
                        (Kosongkan jika tidak ingin edit Icon)</p>
                    </div>
                </div>
                <div>
                    <button className="bg-slate-300 px-10 py-1 rounded mt-4 mr-2 text-white" onClick={handleClose}>Close</button>
                    <button className="bg-blue-500 px-10 py-1 rounded mt-4 ml-2 text-white" onClick={handleSubmit}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default SocialMediaAdd