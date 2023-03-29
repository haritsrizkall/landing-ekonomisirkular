import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import answersAPI from "../../../api/answer"
import questionSetsAPI from "../../../api/question_set"
import FormCompany from "../../../components/assesment/formcompany"
import FormIndividu from "../../../components/assesment/formindividu"
import Footer from "../../../components/footer"
import Loader from "../../../components/loader"
import ErrorModal from "../../../components/modal/error_modal"
import NavbarLanding from "../../../components/navbar/navbar-landing"
import QuestionGroup from "../../../components/question_group"

const Company = ({questionSet}) => {
    const router = useRouter()
    const [indexQuestionGroup, setIndexQuestionGroup] = useState(0)
    const [dataCompany, setDataCompany] = useState({
        name: "",
        age: 0, 
        company_type: "",
        industry_type: "",
        number_employee: 0,
        revenue_monthly: 0,
        position: "",
        education: "",
        email: "",
        no_hp: ""
    })

    const [answer, setAnswer] = useState({})
    const [helper, setHelper] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [questionCountPerGroup, setQuestionCountPerGroup] = useState({})
    const [answerCount, setAnswerCount] = useState(0)
    const [answeredQuestion, setAnsweredQuestion] = useState({})
    const [error, setError] = useState("")

    const handleChangeAnswer = ({target}) => {
        let newAnswer = answer
        if (target.id.includes("radio")){
            newAnswer[target.id.split("-")[1]] = parseInt(target.value)
        }
        newAnswer[target.id] = parseInt(target.value)
        setAnswer(newAnswer)
        setHelper(!helper)
        
        if (answeredQuestion[target.id] == undefined) {
            setAnswerCount(answerCount + 1)
        }

        let newAnsweredQuestion = answeredQuestion
        newAnsweredQuestion[target.id] = newAnsweredQuestion[target.id] == undefined && true
        setAnsweredQuestion(newAnsweredQuestion)
    }

    const handleChangeDataCompany = ({target}) => {
        let newDataCompany = dataCompany
        newDataCompany[target.name] = target.value
        setDataCompany(newDataCompany)
        setHelper(!helper)
    }
    const handleNext = () => {
        if (answerCount < questionCountPerGroup[questionSet.question_groups[indexQuestionGroup].question_group_id]) {
            setIsModalOpen(true)
            setError("Harap menjawab semua pertanyaan")
        }else{
            indexQuestionGroup < questionSet.question_groups.length && setIndexQuestionGroup(indexQuestionGroup + 1)
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
            setAnswerCount(0)
        }
    }
    const handlePrev = () => {
        indexQuestionGroup > 0 && setIndexQuestionGroup(indexQuestionGroup - 1)
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    }
    const handleSubmit = async () => {
        setIsLoading(true)
        const dataPost = {
            company: dataCompany,
            question_set_id: questionSet.question_set_id,
            question_groups: []
        }
        questionSet.question_groups.map((item) => {
            const temp = {
                question_group_id: item.question_group_id,
                answers: []
            }
            item.questions.map((question) => {
                temp.answers.push({
                    question_id: question.question_id,
                    answer: answer[question.question_id]
                })
            })
            dataPost.question_groups.push(temp)
        })
        try {
            const response = await answersAPI.submitCompany(dataPost)
            setTimeout(() => {
                setIsLoading(false)
                router.push(`/participant/${response.data.data.participant_id}`)
            }, 500)
        } catch (error) {
            setTimeout(() => {
                setError(error.response.data.message)
                setIsLoading(false)
                setIsModalOpen(true)
            }, 500)
        }
    }

    useEffect(() => {
      let answerTemp = {}
      questionSet.question_groups.map((item) => {
        questionCountPerGroup[item.question_group_id] = item.questions.length
        item.questions.map((question) => {
            answerTemp[question.question_id] = null
        })
      })
      setAnswer(answerTemp)
    }, [])

    return (
        <>
        <Head>
            <title>Ekonomisirkular ID | Company Assessment</title>
            <meta name="description" content="Ekonomisirkular ID Company Assessment"/>
        </Head>
        <Loader isVisible={isLoading}/>
        <ErrorModal isVisible={isModalOpen} handleClose={() => setIsModalOpen(false)} title="Submit Error" text={error}/>
        <div className='bg-white w-screen box-border overflow-x-hidden'>
            <NavbarLanding/>
            <div className="bg-primary-light h-64 md:h-80 bg-cover text-center">
                <div className="w-3/4 pt-32 m-auto">
                    <h1 className="font-rubik font-regular text-lg text-white">{questionSet.description}</h1>
                </div>
            </div>
            {
                indexQuestionGroup < 1 && (
                    <>
                    <div className="flex flex-col sm:flex-row justify-center content-center text-center mt-0 sm:-mt-28">
                        <div className="flex drop-shadow-lg mx-auto md:mx-5 w-96 h-28 sm:h-56 bg-white my-5 px-2 md:px-10 rounded">
                            <div className="my-auto flex flex-row sm:flex-col justify-center content-center">
                                <div className="flex w-24 sm:w-full">
                                    <h2 className="font-rubik font-medium text-base sm:text-3xl md:text-5xl m-auto">-1 %</h2>
                                </div>
                                <div className="flex">
                                    <p className="font-rubik text-xs md:text-base m-auto">
                                    menunjukkan bahwa item yang ditanyakan tidak relevan dengan perusahaan.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex drop-shadow-lg mx-auto md:mx-5 w-96 h-28 sm:h-56 bg-white my-5 px-2 md:px-10 rounded">
                            <div className="my-auto flex flex-row sm:flex-col justify-center content-center">
                                <div className="flex w-24 sm:w-full">
                                    <h2 className="font-rubik font-medium text-base sm:text-3xl md:text-5xl m-auto">0 %</h2>
                                </div>
                                <div className="flex">
                                    <p className="font-rubik text-xs md:text-base m-auto">
                                    menunjukkan bahwa item yang ditanyakan relevan namun perusahaan tidak menerapkannya sama sekali.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center content-center text-center mt-0">
                        <div className="flex drop-shadow-lg mx-auto md:mx-5 w-96 h-28 sm:h-56 bg-white my-5 px-2 md:px-10 rounded">
                            <div className="my-auto flex flex-row sm:flex-col justify-center content-center">
                                <div className="flex w-36 sm:w-full">
                                    <h2 className="font-rubik font-medium text-base sm:text-lg md:text-4xl m-auto">{"0 < nilai < 100 %"}</h2>
                                </div>
                                <div className="flex">
                                    <p className="font-rubik text-xs md:text-base m-auto">
                                    menunjukkan bahwa item yang ditanyakan relevan dan perusahaan sudah menerapkannya namun masih belum secara penuh
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex drop-shadow-lg mx-auto md:mx-5 w-96 h-28 sm:h-56 bg-white my-5 px-2 md:px-10 rounded">
                            <div className="my-auto flex flex-row sm:flex-col justify-center content-center">
                                <div className="flex w-24 sm:w-full">
                                    <h2 className="font-rubik font-medium text-base sm:text-3xl md:text-5xl m-auto">100 %</h2>
                                </div>
                                <div className="flex">
                                    <p className="font-rubik text-xs md:text-base m-auto">
                                    menunjukkan bahwa item yang ditanyakan relevan dan perusahaan sudah menerapkannya secara penuh. 
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    </>
                )
            }
            {questionSet.question_groups.map((item, index) => {
                return (
                    <div key={item.question_group_id}>
                    <QuestionGroup data={item} isVisible={indexQuestionGroup == index } onChange={handleChangeAnswer} value={answer} helper={helper} type={questionSet.type}/>
                    </div>
                )
            })}
            <div className={indexQuestionGroup > questionSet.question_groups.length - 1 ? "block" : "hidden"}>
                <FormCompany handleChange={handleChangeDataCompany} helper={helper} value={dataCompany}/>
            </div>
            <div className="flex">
                <div onClick={handlePrev} className={indexQuestionGroup == 0 ? "hidden": "bg-primary-light cursor-pointer w-44 sm:w-52 m-auto text-center py-4 rounded-full my-12"}>
                    <p className="font-rubik text-white text-sm md:text-base">Sebelumnya</p>
                </div>
                <div onClick={handleNext} className={indexQuestionGroup == questionSet.question_groups.length ? "hidden": "bg-primary-light cursor-pointer w-44 sm:w-52 m-auto text-center py-4 rounded-full my-12"}>
                    <p className="font-rubik text-white text-sm md:text-base">Berikutnya</p>
                </div>
                <div onClick={handleSubmit} className={indexQuestionGroup != questionSet.question_groups.length ? "hidden": "bg-primary-light cursor-pointer w-44 sm:w-52 m-auto text-center py-4 rounded-full my-12"}>
                    <p className="font-rubik text-white text-sm md:text-base">Submit</p>
                </div>
            </div>
            <Footer/>
        </div>
        </>
    )
}


export async function getStaticProps() {
    const res = await questionSetsAPI.getByID(2, true, true)
    const data = await res.data.data
    return {
        props: {
            questionSet: data
        },
        revalidate: 60
    }
}

export default Company