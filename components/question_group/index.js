import { useEffect } from "react"

const QuestionGroup = ({data, isVisible, onChange, value, helper, type}) => {
    return (
        <div className={isVisible ? "text-center mt-7": "hidden"}>
            <div className="w-2/3 m-auto mb-10">
                <h2 className="font-rubik text-2xl font-medium mb-5">{data.name}</h2>
            </div>
            <div>
                {data.questions.map((question, index) => (
                    <div className="w-4/5 md:w-3/4 m-auto my-14 border-b-2 pb-6" key={index.toString()}>
                        <p className="font-rubik text-md md:text-lg">{question.question}</p>
                        <input
                            type="range" className="mt-6 form-range appearance-none w-full lg:w-1/2 h-4 p-0 bg-secondary focus:outline-none focus:ring-0 focus:shadow-none rounded-full" id={question.question_id}
                            onChange={onChange}
                            min={type == 'INDIVIDU'? 0 : -1 }
                            max={100}
                            value={value[question.question_id] == null ? null : value[question.question_id]}
                        />
                        <p className="font-rubik text-2xl">{value[question.question_id] != null ? value[question.question_id] + '%' : 'Belum diisi'}</p>
                    </div>
                ))}
            </div>

            {/* Temporary Solution */}
            <hr  className={helper ? "hidden": "hidden"}/>

        </div>
    )
}

export default QuestionGroup