import { useEffect, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query";
import contactAPI from "../../../api/contact";
import sliderApi from "../../../api/slider";
import socialMediaAPI from "../../../api/social_media";


const SliderEdit = ({isVisible, setIsVisible, slider}) => {
    const queryClient = useQueryClient();
    const [image, setImage] = useState([]);

    const mutation = useMutation(sliderApi.update, {
        onSuccess: () => {
            queryClient.invalidateQueries('sliders');
        },
        onError: () => {
        }
    })
    const handleClose = () => {
        setIsVisible(false)
        mutation.reset();
    }
    const handleSubmit = () => {
        const form = new FormData();
        image.length !== 0 && form.append("image", image)
        mutation.mutate({
            id: slider.slider_id,
            form: form
        })
    }
    return (
        <div className={isVisible ? "flex flex-col justify-center items-center w-screen h-screen z-30 fixed top-0 right-0": "hidden"}>
            <div onClick={handleClose} className="bg-transparent w-screen h-screen fixed"></div>
            <div className="bg-white py-5 w-100 rounded flex flex-col justify-center text-center drop-shadow-lg px-2">
                <div>
                    <h1 className="text-xl font-semibold mb-5   ">Edit Slider</h1>
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
                        <p className="font-medium">Image</p>
                    </div>
                    <div className="basis-4/5 mr-5">
                        <input type="file" className="file-input py-2 pl-3 bg-slate-100 outline-none w-full" multiple accept="image/*" 
                        onChange={(e) => {
                            setImage(e.target.files[0])
                        }}/>
                        <p>
                        (Kosongkan jika tidak ingin edit Image)</p>
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

export default SliderEdit