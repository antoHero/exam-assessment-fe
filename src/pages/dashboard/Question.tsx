
import { useEffect, useState } from "react"
import axios from "axios";
import { toast, Flip } from "react-toastify";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Question as IQuestion, Option } from "../../types"
import questionServiceHttp from "../../services/questionService.http";
import { Button, Card, Input } from "@material-tailwind/react";
import { UpdateOptionDialog } from "../../components/reusables/UpdateOptionDialog";


export const Question = () => {
    const [question, setQuestion] = useState<IQuestion>(Object);
    const [isLoading, setIsLoading] = useState<string>("idle");
    const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
    const [option, setOptionData] = useState<Option>(Object);
    const { questionId } = useParams();

    const {
		register,
		handleSubmit,
		formState: { errors },
		clearErrors,
	} = useForm();

    const handleEditDialogOpen = () => setOpenEditDialog(!open);

    const handleEditOption = (data: Option) => {
        setOptionData(data)
        console.log(data)
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setQuestion((prev) => ({
            ...prev,
            [name]: value
        }));
        clearErrors(name);
    }



    const handleEditQuestion = async () => {
        console.log("utrt",question)
    }

    if(isLoading === "loading") {
        return <p className="flex items-center justify-center"> Fetching question please wait...</p>;
    } else  {
        return (
            <div className="px-4 lg:px-6">
                <Card className="h-full w-full overflow-scroll mt-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <div className="p-4">
                        <p className="text-2xl text-gray-700">View Question</p>
                        {question.question}
                        <form onSubmit={handleSubmit(handleEditQuestion)} className="mt-4">
                            <Input
                                onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} label="Question"
                                size="lg"
                                crossOrigin={undefined}
                                {...register("title")}
                                value={question.question || ''}
                                onChange={handleChange}
                            />

                            {errors.question && errors.question.type === "required" && (
                                <p className="text-red-700 font-normal text-sm">
                                    This field cannot be empty
                                </p>
                            )}

                            <div className="flex items-start justify-start gap-4 mt-4">
                                <div>
                                    <Input
                                        onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} size="lg"
                                        crossOrigin={undefined}
                                        {...register("title")}
                                        value={question.type || ""}
                                        onChange={handleChange}
                                        label="Question Type"                                    />

                                    {errors.question && errors.question.type === "required" && (
                                        <p className="text-red-700 font-normal text-sm">
                                            This field cannot be empty
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <Input
                                        onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} size="lg"
                                        crossOrigin={undefined}
                                        {...register("title")}
                                        value={question.marks || 0}
                                        onChange={handleChange}
                                        label="Marks"                                    />

                                    {errors.question && errors.question.type === "required" && (
                                        <p className="text-red-700 font-normal text-sm">
                                            This field cannot be empty
                                        </p>
                                    )}
                                </div>
                                <Button type="submit" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Update</Button>
                            </div>

                        </form>

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
                <UpdateOptionDialog open={openEditDialog} handleOpen={handleEditDialogOpen} option={option} questionType={question.type} />
            </div>
        )
    }

}