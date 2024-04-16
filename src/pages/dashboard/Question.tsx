
import { useEffect, useState } from "react"
import axios from "axios";
import { toast, Flip } from "react-toastify";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Question as IQuestion } from "../../types"
import questionServiceHttp from "../../services/questionService.http";
import { Button, Card, Input } from "@material-tailwind/react";

export const Question = () => {
    const [question, setQuestion] = useState<IQuestion>(Object);
    const [isLoading, setIsLoading] = useState<string>("idle");
    const { questionId } = useParams();

    const {
		register,
		handleSubmit,
		formState: { errors },
		clearErrors,
	} = useForm();

    useEffect(() => {
        const getQuestion = async () => {
            try {
                setIsLoading("loading");
                const response = await questionServiceHttp.getQuestion(questionId)
                const data: IQuestion = response.data.data
                setQuestion({ ...question, question: data.question });
                console.log("data returned", data)
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
                <Card className="h-full w-full overflow-scroll mt-4">
                    <div className="p-4">
                        <p className="text-2xl text-gray-700">View Question</p>
                        {question.question}
                        <form onSubmit={handleSubmit(handleEditQuestion)} className="mt-4">
                            <Input
                                onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} label="Question"
                                size="lg"
                                crossOrigin={undefined}
                                {...register("title")}
                                value={question.question}
                                onChange={handleChange}
                            />

                            {errors.question && errors.question.type === "required" && (
                                <p className="text-red-700 font-normal text-sm">
                                    This field cannot be empty
                                </p>
                            )}

                            <div className="flex items-start justify-start gap-4">
                                <div>
                                    <Input
                                        size="lg"
                                        crossOrigin={undefined}
                                        {...register("title")}
                                        value={question.type || ""}
                                        onChange={handleChange}
                                        className="mt-4"
                                    />

                                    {errors.question && errors.question.type === "required" && (
                                        <p className="text-red-700 font-normal text-sm">
                                            This field cannot be empty
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <Input
                                        size="lg"
                                        crossOrigin={undefined}
                                        {...register("title")}
                                        value={question.marks || 0}
                                        onChange={handleChange}
                                        className="mt-4"
                                    />

                                    {errors.question && errors.question.type === "required" && (
                                        <p className="text-red-700 font-normal text-sm">
                                            This field cannot be empty
                                        </p>
                                    )}
                                </div>
                                <Button type="submit" className="mt-4">Update</Button>
                            </div>

                        </form>

                    </div>
                </Card>

            </div>
        )
    }

}