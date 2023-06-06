import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { questionAPI } from "../../../api/question";
import questionGroupAPI from "../../../api/question_group";
import questionSetsAPI from "../../../api/question_set";

const QuestionGroupEdit = ({isVisible, setIsVisible, questionGroup}) => {
    const queryClient = useQueryClient();
    const { isError, isLoading, data: questionSets, status, refetch } = useQuery("questionSets", questionSetsAPI.getAll);
    const mutation = useMutation(questionGroupAPI.editQuestionGroup, {
        onSuccess: () => {
            queryClient.invalidateQueries('questionGroups');
        },
        onError: () => {
        }
    })
    useEffect(() => {
        if (isVisible) {
            refetch();
        }
    }, [questionGroup.question_set_id])
    useEffect(() => {
        setQuestionSetId(questionGroup.question_set_id);
        setName(questionGroup.name);
        setDescription(questionGroup.description);
    }, [questionGroup])
    const [questionSetId, setQuestionSetId] = useState(questionGroup.question_set_id);
    const [name, setName] = useState(questionGroup.name);
    const [description, setDescription] = useState(questionGroup.description);
    const handleClose = () => {
        setIsVisible(false);
        mutation.reset();
    }

    return (
        <div className={isVisible ? "flex flex-col justify-center items-center w-screen h-screen z-30 fixed top-0 right-0": "hidden"}>
            <div onClick={handleClose} className="bg-transparent w-screen h-screen fixed"></div>
            <div className="bg-white py-5 w-100 rounded flex flex-col justify-center text-center drop-shadow-lg px-2">
                <div>
                    <h1 className="text-xl font-semibold mb-5   ">Edit Question Group</h1>
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
                        <textarea rows={4} type="text" className="py-2 pl-3 bg-slate-100 outline-none w-full" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                </div>
                <div className="flex w-full my-1">
                    <div className="mr-0 basis-1/5 text-left">
                        <p className="font-medium">Description</p>
                    </div>
                    <div className="basis-4/5 mr-5">
                        <textarea rows={4} type="text" className="py-2 pl-3 bg-slate-100 outline-none w-full" value={description} onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                </div>
                <div className="flex w-full my-1">
                    <div className="mr-0 basis-1/5 text-left">
                        <p className="font-medium">Question Set</p>
                    </div>
                    <div className="basis-4/5 mr-5">
                        <select className="py-2 pl-3 bg-slate-100 outline-none w-full"
                        value={questionSetId} onChange={(e) => setQuestionSetId(parseInt(e.target.value))}>
                            {questionSets && questionSets.map((questionSet) => (
                                <option value={questionSet.question_set_id} key={questionSet.question_set_id}>{questionSet.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    <button className="bg-slate-300 px-10 py-1 rounded mt-4 mr-2 text-white" onClick={handleClose}>Close</button>
                    <button className="bg-blue-500 px-10 py-1 rounded mt-4 ml-2 text-white" onClick={() => {
                        mutation.mutate({
                            question_group_id: questionGroup.question_group_id,
                            question_set_id: questionSetId,
                            name: name,
                            description: description
                        })
                    }}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default QuestionGroupEdit;