
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
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
	Select,
	Option,
	Textarea,
    IconButton,
    DialogBody,

} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { Question } from "../../types";
import questionServiceHttp from "../../services/questionService.http";

interface OpenEditForm {
	open: boolean;
	handleOpen: () => void;
    question: Question
}

export const EditQuestionForm = ({ open, handleOpen, question }: OpenEditForm) => {
    const {
		handleSubmit,
	} = useForm();

    const [isLoading, setIsLoading] = useState<string>("idle");
    const [typeValue, setTypeValue] = useState<string | undefined>("");
    const [questionValue, setQuestionValue] = useState<string | undefined>("");
    const [markValue, setMarkValue] = useState<number | undefined>(0);
    const [questionData, setQuestionData] = useState<Question>({
        ...question
    });

    useEffect(() => {
        if(open && question) {
            setQuestionData(question)
            setTypeValue(question.type)
            setMarkValue(question.marks)
            setQuestionValue(question.question)
        } // Update assessmentData whenever data prop changes
    }, [open, question]);

    const handleEditQuestion = async () => {
        try {
			setIsLoading("loading");
            const payload = {
                question: questionValue,
                type: typeValue,
                marks: markValue
            }
            const response = await questionServiceHttp.updateQuestion(questionData.id, payload);
            if(response.status === 201) {
                const { data: { message } } = response;
                handleOpen()
				toast.success(message, {
					hideProgressBar: true,
				});
                window.location.reload();
            }
		} catch (err) {
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
            size="md"
            open={open}
            handler={handleOpen}
            className="bg-transparent shadow-none overflow-auto"
            placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <DialogBody className="h-[42rem] overflow-scroll" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <Card className="mx-auto w-full" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <form onSubmit={handleSubmit(handleEditQuestion)}>
                        <CardBody className="flex flex-col gap-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            <div className="flex justify-between items-center">
                                <Typography
                                    variant="h4"
                                    color="blue-gray"
                                    placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                                >
                                    Edit Question
                                </Typography>
                                <IconButton variant="outlined" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                    <XMarkIcon className="h-6 w-6 cursor-pointer" onClick={handleOpen} />
                                </IconButton>

                            </div>

                            <Typography
                                className="-mb-2"
                                variant="h6"
                                placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                            >
                                Question
                            </Typography>
                            <Textarea
                                onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} variant="outlined"
                                label="Question"
                                placeholder={undefined}
                                value={questionValue || ''}
                                onChange={(e) => setQuestionValue(e.target.value)}
                            />


                            <Typography
                                className="-mb-2"
                                variant="h6"
                                placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                            >
                                Marks
                            </Typography>
                            <Input
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}
                                label="Marks"
                                size="lg"
                                crossOrigin={undefined}
                                value={markValue || 0}
                                onChange={(e) => setMarkValue(parseInt(e.target.value) || 0)}
                            />
                            <Typography
                                className="-mb-2"
                                variant="h6"
                                placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                            >
                                Type
                            </Typography>
                            <Select
                                value={typeValue}
                                onChange={(val) => setTypeValue(val)}
                                placeholder={undefined}
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}
                            >
                                <Option value="multiple">Multiple Choice</Option>
                                <Option value="multiple">Single Choice</Option>
                            </Select>
                        </CardBody>
                        <CardFooter className="pt-0" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            <Button
                                variant="gradient"
                                fullWidth
                                placeholder={undefined}
                                type="submit"
                                disabled={isLoading == "loading"} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                            >
                                {isLoading === "loading" ? "Updating..." : "Update Question"}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </DialogBody>
        </Dialog>
    )
}