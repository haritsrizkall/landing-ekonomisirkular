import dynamic from "next/dynamic";
import { useEffect, useState } from "react"
import 'react-quill/dist/quill.snow.css';

const Editor = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading...</p>,
})

const modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { header: '3' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' },
        ],
        ['link', 'image', 'video'],
        ['clean'],
      ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
}

const previewStyle = {
    p : {
        color: 'red'
    }
}
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useMutation, useQuery, useQueryClient } from "react-query";
import postAPI from "../../../../api/post";
import categoryAPI from "../../../../api/category";
import Loader from "../../../../components/loader";

const AddPost = () => {
   const queryClient = useQueryClient();
   const [content, setContent] = useState('')
   const [title, setTitle] = useState('')
   const [image, setImage] = useState([])
   const [category, setCategory] = useState(1)
   const [inputKey, setInputKey] = useState(true)
   const [shortDescription, setShortDescription] = useState('')
   const { isError, isLoading, data: categories, status } = useQuery("categories", categoryAPI.getAll);
   const mutation = useMutation(postAPI.addPost, {
        onSuccess: () => {
            setImage([])
            setContent('')
            setTitle('')
            setCategory(1)
            setShortDescription('')
        }
   })
   const handleSubmit = () => {
        const form = new FormData();
        form.append('title', title);
        form.append('content', content);
        form.append('image', image);
        form.append('category_id', category);
        form.append('short_description', shortDescription);
        setInputKey(!inputKey)
        mutation.mutate(form);
   }
   
    return (
        <>
        <Loader isVisible={mutation.isLoading}/>
        <div className="py-10">
                <div className="w-140 my-5 m-auto">
                    <h1 className="font-rubik text-xl text-primary font-semibold mb-5">Add Post</h1>
                    {
                        mutation.isError && (
                            <div onCLick={() =>{
                                mutation.reset();
                            }} className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative cursor-pointer mb-5" role="alert">
                                <span className="block sm:inline">{mutation.error.response.data.message}</span>
                            </div>
                        )
                    }
                    {
                        mutation.isSuccess && (
                            <div onClick={() => {
                                mutation.reset();
                            }}className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative cursor-pointer mb-5" role="alert">
                                <span className="block sm:inline">Success</span>
                            </div>
                        )
                    }
                    <div className="mr-0 basis-1/5 text-left">
                        <p className="font-medium">Category</p>
                    </div>
                    <div className="basis-4/5 mr-5">
                        <select className="py-2 pl-3 bg-slate-100 outline-none w-full" onChange={(e) => setCategory(e.target.value)} value={category}>
                            {categories && categories.map((category) => (
                                <option key={category.category_id} value={category.category_id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="w-140 my-5 m-auto">
                    <div className="mr-0 basis-1/5 text-left">
                        <p className="font-medium">Title</p>
                    </div>
                    <div className="basis-4/5 mr-5">
                        <input type="text" className="py-2 pl-3 bg-slate-100 outline-none w-full" value={title} onChange={(e) => {
                            setTitle(e.target.value)
                        }}/>
                    </div>
                </div>
                <div className="w-140 my-5 m-auto">
                    <div className="mr-0 basis-1/5 text-left">
                        <p className="font-medium">Image</p>
                    </div>
                    <div className="basis-4/5 mr-5">
                        <input type="file" className="file-input py-2 pl-3 bg-slate-100 outline-none w-full" multiple accept="image/*" 
                        key={inputKey}
                        onChange={(e) => {
                            setImage(e.target.files[0])
                        }}/>
                    </div>
                </div>
                <div className="w-140 my-5 m-auto">
                    <div className="mr-0 basis-1/5 text-left">
                        <p className="font-medium">Short Description</p>
                    </div>
                    <div className="basis-4/5 mr-5">
                        <textarea rows={3} type="text" className="py-2 pl-3 bg-slate-100 outline-none w-full" value={shortDescription} onChange={(e) => {
                            setShortDescription(e.target.value)
                        }}/>
                    </div>
                </div>
            <div className="w-140 m-auto">
                <Editor modules={modules} onChange={setContent} theme="snow" value={content}/>
                <button className="bg-primary py-2 px-6 mt-5 rounded text-white" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
        </>
    )
}

export default AddPost