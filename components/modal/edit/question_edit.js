import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { questionAPI } from "../../../api/question";
import questionGroupAPI from "../../../api/question_group";

const QuestionEdit = ({isVisible, setIsVisible, question}) => {
    const queryClient = useQueryClient();
    const { isError, isLoading, error, data: questionGroups, refetch } = useQuery('questionGroup', () => questionGroupAPI.getAll(question.question_group.question_set.type));
    const mutation = useMutation(questionAPI.editQuestion, {
        onSuccess: () => {
            queryClient.invalidateQueries('questions');
        },
        onError: () => {
        }
    })
    useEffect(() => {
        if (isVisible) {
            refetch();
        }
    }, [question.question_group.question_set.type])
    useEffect(() => {
        setQuestionGroup(question.question_group.question_group_id);
        setQuestionText(question.question);
    }, [question])
    const [questionGroup, setQuestionGroup] = useState(question.question_group_id);
    const [questionText, setQuestionText] = useState(question.question);
    const handleClose = () => {
        setIsVisible(false);
        mutation.reset();
    }

    return (
        <div className={isVisible ? "flex flex-col justify-center items-center w-screen h-screen z-30 fixed top-0 right-0": "hidden"}>
            <div onClick={handleClose} className="bg-transparent w-screen h-screen fixed"></div>
            <div className="bg-white py-5 w-100 rounded flex flex-col justify-center text-center drop-shadow-lg px-2">
                <div>
                    <h1 className="text-xl font-semibold mb-5   ">Edit Question</h1>
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
                        <p className="font-medium">Question</p>
                    </div>
                    <div className="basis-4/5 mr-5">
                        <textarea rows={4} type="text" className="py-2 pl-3 bg-slate-100 outline-none w-full" value={questionText} onChange={(e) => setQuestionText(e.target.value)}/>
                    </div>
                </div>
                <div className="flex w-full my-1">
                    <div className="mr-0 basis-1/5 text-left">
                        <p className="font-medium">Question Group</p>
                    </div>
                    <div className="basis-4/5 mr-5">
                        <select className="py-2 pl-3 bg-slate-100 outline-none w-full" onChange={(e) => setQuestionGroup(parseInt(e.target.value))}>
                            {questionGroups && questionGroups.map((questionGroup) => (
                                <option value={questionGroup.question_group_id} key={questionGroup.question_group_id}>{questionGroup.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    <button className="bg-slate-300 px-10 py-1 rounded mt-4 mr-2 text-white" onClick={handleClose}>Close</button>
                    <button className="bg-blue-500 px-10 py-1 rounded mt-4 ml-2 text-white" onClick={() => {
                        mutation.mutate({
                            question_id: question.question_id,
                            question_group_id: questionGroup,
                            question: questionText
                        })
                    }}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default QuestionEdit;