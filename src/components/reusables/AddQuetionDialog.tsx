
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
	Button,
	Dialog,
	Card,
	CardBody,
	CardFooter,
	Typography,
	Input,
    IconButton,
    DialogBody,
    Textarea

} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
// import assessmentService from "../../services/assessmentService.http";
import { Assessment } from "../../types";
import questionServiceHttp from "../../services/questionService.http";

interface OpenEditForm {
	open: boolean;
	handleOpen: () => void;
    assessment: Assessment,
}

export const AddQuestionDialog = ({ open, handleOpen, assessment }: OpenEditForm) => {
    const {
		register,
		handleSubmit,
		formState: { errors },
		clearErrors,
	} = useForm();

    const [isLoading, setIsLoading] = useState<string>("idle");

    const [questionType, setTypeValue] = useState<string | undefined>();

    const [question, setQuestion] = useState<string>("");

    const [marks, setMarks] = useState<number | string>(0)

    const handleAddQuestion = async () => {
        try {
            console.log("here");
			setIsLoading("loading");
            const payload = {
                question,
                marks,
                type: questionType
            }
            const { status, data: { message } } = await questionServiceHttp.createQuestion(assessment.id, payload);
            if (status === 201 || status === 200) {
                handleOpen()
                toast.success(message, {
                    hideProgressBar: true,
                });
                window.location.reload();
            }
		} catch (err) {
            console.log(err);
			if (axios.isAxiosError(err)) {
				if (
					err.response?.status === 422 ||
					err.response?.status === 400 ||
					err.response?.status === 401
				) {
					toast.error(err?.response?.data?.message, {
						hideProgressBar: true,
					});
				}
			}
		} finally {
			setIsLoading("idle");
		}
    }
    return (
		<Dialog
            size="sm"
            open={open}
            handler={handleOpen}
            className="bg-transparent shadow-none overflow-auto"
            placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <DialogBody className="h-[42rem] overflow-scroll" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <Card className="mx-auto w-full" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <form onSubmit={handleSubmit(handleAddQuestion)}>
                        <CardBody className="flex flex-col gap-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            <div className="flex justify-between items-center">
                                <Typography
                                    variant="h4"
                                    color="blue-gray"
                                    placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                                >
                                    Add Question
                                </Typography>
                                <IconButton variant="outlined" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                    <XMarkIcon className="h-6 w-6 cursor-pointer" onClick={handleOpen} />
                                </IconButton>

                            </div>

                            <Typography
                                className="-mb-2"
                                variant="h6"
                                placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                            >
                                Content
                            </Typography>
                            <Textarea
                                onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} label="Question"
                                size="lg"
                                {...register("question", {
                                    required: "Enter question here",
                                })}
                                value={question}
                                onChange={(e) => {
                                    setQuestion(e.target.value)
                                    clearErrors('question')
                                }}
                            >

                            </Textarea>
                            {errors.question && errors.question.type === "required" && (
                                <p className="text-red-700 font-normal text-sm">
                                    This field cannot be empty.
                                </p>
                            )}
                            <Input
                                value={questionType}
                                {...register("questionType", {
                                    required: "Select type of question",
                                })}
                                onChange={(e) => {
                                    setTypeValue(e.target.value)
                                    clearErrors('questionType')
                                }}
                                name="question_type"
                                label="Question type"
                                crossOrigin={undefined}
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}
                            />

                            {errors.questionType && errors.questionType.type === "required" && (
                                <p className="text-red-700 font-normal text-sm">
                                    Select type of question.
                                </p>
                            )}
                            <Input
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}
                                crossOrigin={undefined}
                                label="Marks"
                                value={marks}
                                {...register("marks", {
                                    required: "Enter marks for this question",
                                })}
                                onChange={(e) => {
                                    setMarks(e.target.value)
                                    clearErrors('marks')
                                }}
                            />
                            {errors.marks && errors.marks.type === "required" && (
                                <p className="text-red-700 font-normal text-sm">
                                    This field cannot be empty.
                                </p>
                            )}
                        </CardBody>
                        <CardFooter className="pt-0" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            <Button
                                variant="gradient"
                                fullWidth
                                placeholder={undefined}
                                type="submit"
                                disabled={isLoading == "loading"} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                            >
                                {isLoading === "loading" ? "Submitting..." : "Add Question"}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </DialogBody>
        </Dialog>
    )
}