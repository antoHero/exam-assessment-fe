
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
    IconButton,
    DialogBody,
    Select,
    Option as FormOption

} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
// import assessmentService from "../../services/assessmentService.http";
import { Option } from "../../types";
import questionServiceHttp from "../../services/questionService.http";

interface OpenEditForm {
	open: boolean;
	handleOpen: () => void;
    option: Option,
    questionType: string
}

export const UpdateOptionDialog = ({ open, handleOpen, option, questionType }: OpenEditForm) => {
    const {
		handleSubmit,
	} = useForm();

    const [isLoading, setIsLoading] = useState<string>("idle");

    const [optionData, setOptionData] = useState<Option>({
        ...option
    });
    const [answerValue, setAnswerValue] = useState<boolean | number | string | undefined>();

    useEffect(() => {
        if(open && option) {
            setOptionData(option)
            setAnswerValue(option.isAnswer)
        } // Update optionData whenever data prop changes
    }, [open, option]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        console.log(name, typeof value);
        setOptionData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleEditOption = async () => {
        try {

			setIsLoading("loading");
            const payload = {
                content: optionData.content,
                isAnswer: answerValue === 'yes' || answerValue === 1 ? true : false,
                question_type: questionType
            }
            console.log("edited option", payload);
            const { status, data: { message } } = await questionServiceHttp.updateOptionForQuestion(optionData.id, payload);
            if (status === 200) {
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
                    <form onSubmit={handleSubmit(handleEditOption)}>
                        <CardBody className="flex flex-col gap-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            <div className="flex justify-between items-center">
                                <Typography
                                    variant="h4"
                                    color="blue-gray"
                                    placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                                >
                                    Update Option
                                </Typography>
                                <IconButton variant="outlined" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                    <XMarkIcon className="h-6 w-6 cursor-pointer" onClick={handleOpen} />
                                </IconButton>

                            </div>

                            <Typography
                                className="-mb-2"
                                variant="h6"
                                placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                            >
                                Title
                            </Typography>
                            <Input
                                onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} label="Title"
                                size="lg"
                                crossOrigin={undefined}
                                name="content"
                                value={optionData.content || ''}
                                onChange={handleChange}
                            />

                            <Select
                                value={answerValue === 1 ? 'yes' : 'no'}
                                onChange={(val) => setAnswerValue(val)}
                                label="Mark as correct answer" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                            >
                                <FormOption value="yes">Yes</FormOption>
                                <FormOption value="no">No</FormOption>
                            </Select>

                        </CardBody>
                        <CardFooter className="pt-0" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            <Button
                                variant="gradient"
                                fullWidth
                                placeholder={undefined}
                                type="submit"
                                disabled={isLoading == "loading"} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                            >
                                {isLoading === "loading" ? "Updating..." : "Update Option"}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </DialogBody>
        </Dialog>
    )
}