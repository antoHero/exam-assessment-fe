
import { useEffect, useState } from "react"
import axios from "axios";
import { toast, Flip } from "react-toastify";
import { useParams } from "react-router-dom";
import { Question as IQuestion, Option } from "../../types"
import questionServiceHttp from "../../services/questionService.http";
import { Card } from "@material-tailwind/react";
import { UpdateOptionDialog } from "../../components/reusables/UpdateOptionDialog";
import { EditQuestionForm } from "../../components/reusables/EditQuestionForm";


export const Question = () => {
    const [question, setQuestion] = useState<IQuestion>(Object);
    const [questionDialogData, setQuestionDialogData] = useState<IQuestion>(Object);
    const [isLoading, setIsLoading] = useState<string>("idle");
    const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
    const [openEditQuestionDialog, setOpenEditQuestionDialog] = useState<boolean>(false);
    const [option, setOptionData] = useState<Option>(Object);
    const { questionId } = useParams();

    const handleEditDialogOpen = () => setOpenEditDialog(!open);

    const handleEditQuestionDialogOpen = () => setOpenEditQuestionDialog(!open);

    const handleQuestionEditOpen = (data: IQuestion) => {
        setQuestionDialogData(data);
        setOpenEditQuestionDialog(true)
    }

    const handleEditOption = (data: Option) => {
        setOptionData(data)
        setOpenEditDialog(true)
    }

    useEffect(() => {
        const getQuestion = async () => {
            try {
                setIsLoading("loading");
                const response = await questionServiceHttp.getQuestion(questionId)
                const data: IQuestion = response.data.data
                setQuestion({ ...question, question: data.question });
                setQuestion(data);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    if (err.response?.status === 400) {
                        console.log("422 ",err.response?.data, err.response?.data?.message);
                        toast.error(err.response?.data?.message, {
                            position: "top-right",
                            transition: Flip,
                        });
                    }
                }
            } finally { setIsLoading("idle") }
        }
        getQuestion()
    }, [questionId])

    if(isLoading === "loading") {
        return <p className="flex items-center justify-center"> Fetching question please wait...</p>;
    } else  {
        return (
            <div className="px-4 lg:px-6">
                <Card className="h-full w-full overflow-scroll mt-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <div className="p-4">
                        <p className="text-md text-black">Click question to update</p>

                        <h1 className="text-2xl text-black cursor-pointer" onClick={() => handleQuestionEditOpen(question)}>{question.question}</h1>


                    </div>

                    <h1 className="px-4 py-4 font-semibold text-black">Click on an option to modify</h1>
                    <div className="flex flex-col space-y-4 p-4">
                        {
                            question.options && question.options.length > 0 && (
                                question.options.map((option, optionIndex) => {
                                    return (
                                        <div onClick={() => handleEditOption(option)} className="hover:bg-gray-100 hover:p-4 hover:rounded-md cursor-pointer transition ease-in-out duration-500" key={optionIndex}>
                                            <p><span>{optionIndex + 1}</span> {option.content}</p>
                                        </div>
                                    )
                                })
                            )
                        }
                    </div>
                </Card>
                <EditQuestionForm open={openEditQuestionDialog} handleOpen={handleEditQuestionDialogOpen} question={questionDialogData} />
                <UpdateOptionDialog open={openEditDialog} handleOpen={handleEditDialogOpen} option={option} questionType={question.type} />
            </div>
        )
    }

}