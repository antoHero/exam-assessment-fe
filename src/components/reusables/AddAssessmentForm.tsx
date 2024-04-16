
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
	// Select,
	// Option,
	Textarea,
    IconButton,
    DialogBody

} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import assessmentService from "../../services/assessmentService";

interface OpenForm {
	open: boolean;
	handleOpen: () => void;
}

export const AddAssessmentForm = ({ open, handleOpen }: OpenForm) => {
    const {
		register,
		handleSubmit,
		formState: { errors },
		clearErrors,
	} = useForm();

    const [title, setTitle] = useState<string>("");
    const [instructions, setInstructions] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [duration, setDuration] = useState<string>("");
    const [expected_score, setExpectedScore] = useState<string>("");
    const [isLoading, setIsLoading] = useState<string>("idle");

    const handleTitleChange = (e: any) => {
        setTitle(e.target.value);
        clearErrors("title");
    }

    const handleInstructionsChange = (e: any) => {
        setInstructions(e.target.value);
        clearErrors("instructions");
    }

    const handleDateChange = (e: any) => {
        setDate(e.target.value);
        clearErrors("date");
    }

    const handleDurationChange = (e: any) => {
        setDuration(e.target.value);
        clearErrors("duration");
    }

    const handleExpectedScoreChange = (e: any) => {
        setExpectedScore(e.target.value);
        clearErrors("expected_score");
    }

    const handleAddAssessment = async () => {
        try {
			setIsLoading("loading");
			const payload = {
				title,
				instructions,
				date,
				duration,
                expected_score,
			};
            const response = await assessmentService.createAssessment(payload);
            if(response.status === 201) {
                const { data: { message } } = response;
                handleOpen()
                setTitle("");
                setInstructions("");
                setDate("");
                setDuration("");
                setExpectedScore("");
				toast.success(response?.data?.messag, {
					hideProgressBar: true,
				});
                toast.success(message, {
                    hideProgressBar: true,
                });
                window.location.reload();
            }
		} catch (err) {
			if (axios.isAxiosError(err)) {
				if (
					err.response?.status === 422 ||
					err.response?.status === 401 ||
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
            placeholder={undefined}
        >
            <DialogBody className="h-[42rem] overflow-scroll">
                <Card className="mx-auto w-full" placeholder={undefined}>
                    <form onSubmit={handleSubmit(handleAddAssessment)}>
                        <CardBody className="flex flex-col gap-4" placeholder={undefined}>
                            <div className="flex justify-between items-center">
                                <Typography
                                    variant="h4"
                                    color="blue-gray"
                                    placeholder={undefined}
                                >
                                    Add Assessment
                                </Typography>
                                <IconButton variant="outlined" placeholder={undefined}>
                                    <XMarkIcon className="h-6 w-6 cursor-pointer" onClick={handleOpen} />
                                </IconButton>

                            </div>

                            <Typography
                                className="mb-3 font-normal"
                                variant="paragraph"
                                color="gray"
                                placeholder={undefined}
                            >
                                Fill all all required fields.
                            </Typography>

                            <Typography
                                className="-mb-2"
                                variant="h6"
                                placeholder={undefined}
                            >
                                Title
                            </Typography>
                            <Input
                                label="Title"
                                size="lg"
                                crossOrigin={undefined}
                                {...register("title", {
                                    required: "An amount is required",
                                })}
                                value={title}
                                onChange={handleTitleChange}
                            />
                            {errors.title && errors.title.type === "required" && (
                                <p className="text-red-700 font-normal text-sm">
                                    Enter an title.
                                </p>
                            )}

                            <Typography
                                className="-mb-2"
                                variant="h6"
                                placeholder={undefined}
                            >
                                Instructions
                            </Typography>
                            <Textarea
                                variant="outlined"
                                label="Instructions"
                                placeholder={undefined}
                                {...register("instructions", {
                                    required: "An instruction is required",
                                })}
                                value={instructions}
                                onChange={handleInstructionsChange}
                            />

                            {errors.instructions && errors.instructions.type === "required" && (
                                <p className="text-red-700 font-normal text-sm">
                                    An instruction is required.
                                </p>
                            )}

                            <Typography
                                className="-mb-2"
                                variant="h6"
                                placeholder={undefined}
                            >
                                Scheduled Date
                            </Typography>
                            <Input
                                variant="outlined"
                                label="Scheduled Date"
                                type="date"
                                placeholder={undefined}
                                {...register("date", {
                                    required: "Scheduled Date is required",
                                })}
                                value={date}
                                onChange={handleDateChange}
                            />

                            {errors.date && errors.date.type === "required" && (
                                <p className="text-red-700 font-normal text-sm">
                                    A Scheduled date is required.
                                </p>
                            )}

                            <Typography
                                className="-mb-2"
                                variant="h6"
                                placeholder={undefined}
                            >
                                Duration in hours
                            </Typography>
                            <Input
                                variant="outlined"
                                label="Duration in hours"
                                type="duration"
                                placeholder={undefined}
                                {...register("duration", {
                                    required: "Duration in hours is required",
                                })}
                                value={duration}
                                onChange={handleDurationChange}
                            />

                            {errors.duration && errors.duration.type === "required" && (
                                <p className="text-red-700 font-normal text-sm">
                                    Assessment duration is required.
                                </p>
                            )}

                            <Typography
                                className="-mb-2"
                                variant="h6"
                                placeholder={undefined}
                            >
                                Expected score
                            </Typography>
                            <Input
                                variant="outlined"
                                label="Expected score"
                                type="expected_score"
                                placeholder={undefined}
                                {...register("duration", {
                                    required: "Expected score is required",
                                })}
                                value={expected_score}
                                onChange={handleExpectedScoreChange}
                            />

                            {errors.duration && errors.duration.type === "required" && (
                                <p className="text-red-700 font-normal text-sm">
                                    Expected scored is required.
                                </p>
                            )}
                        </CardBody>
                        <CardFooter className="pt-0" placeholder={undefined}>
                            <Button
                                variant="gradient"
                                fullWidth
                                placeholder={undefined}
                                type="submit"
                                disabled={isLoading == "loading"}
                            >
                                {isLoading === "loading" ? "Submitting..." : "Add"}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </DialogBody>
        </Dialog>
    )
}