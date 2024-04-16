
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
	// Select,
	// Option,
	Textarea,
    IconButton,
    DialogBody

} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import assessmentService from "../../services/assessmentService";
import { Assessment } from "../../types";

interface OpenEditForm {
	open: boolean;
	handleOpen: () => void;
    assessment: Assessment
}

export const EditAssessmentForm = ({ open, handleOpen, assessment }: OpenEditForm) => {
    const {
		register,
		handleSubmit,
		formState: { errors },
		clearErrors,
	} = useForm();

    const [isLoading, setIsLoading] = useState<string>("idle");
    const [assessmentData, setAssessmentData] = useState<Assessment>({
        ...assessment
    });

    useEffect(() => {
        if(open && assessment) {
            setAssessmentData(assessment)
        } // Update assessmentData whenever data prop changes
    }, [open, assessment]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setAssessmentData((prev) => ({
            ...prev,
            [name]: value
        }));
        clearErrors(name);
    }

    const handleEditAssessment = async () => {
        try {
            console.log(assessmentData)
			setIsLoading("loading");
            const response = await assessmentService.updateAssessment(assessmentData, assessmentData.id);
            if(response.status === 200) {
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
            placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <DialogBody className="h-[42rem] overflow-scroll" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <Card className="mx-auto w-full" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <form onSubmit={handleSubmit(handleEditAssessment)}>
                        <CardBody className="flex flex-col gap-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            <div className="flex justify-between items-center">
                                <Typography
                                    variant="h4"
                                    color="blue-gray"
                                    placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                                >
                                    Edit Assessment
                                </Typography>
                                <IconButton variant="outlined" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                    <XMarkIcon className="h-6 w-6 cursor-pointer" onClick={handleOpen} />
                                </IconButton>

                            </div>

                            <Typography
                                className="-mb-2"
                                variant="h6"
                                placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                            >
                                Title { assessmentData.title }
                            </Typography>
                            <Input
                                onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} label="Title"
                                size="lg"
                                crossOrigin={undefined}
                                {...register("title", {
                                    required: "An title assessment is required",
                                })}
                                value={assessmentData.title || ''}
                                onChange={handleChange}                            />
                            {errors.title && errors.title.type === "required" && (
                                <p className="text-red-700 font-normal text-sm">
                                    Enter an title.
                                </p>
                            )}

                            <Typography
                                className="-mb-2"
                                variant="h6"
                                placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                            >
                                Instructions
                            </Typography>
                            <Textarea
                                onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} variant="outlined"
                                label="Instructions"
                                placeholder={undefined}
                                {...register("instructions", {
                                    required: "An instruction is required",
                                })}
                                value={assessmentData.instructions || ''}
                                onChange={handleChange}                            />

                            {errors.instructions && errors.instructions.type === "required" && (
                                <p className="text-red-700 font-normal text-sm">
                                    An instruction is required.
                                </p>
                            )}

                            <Typography
                                className="-mb-2"
                                variant="h6"
                                placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                            >
                                Scheduled Date
                            </Typography>
                            <Input
                                onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} variant="outlined"
                                label="Scheduled Date"
                                type="date"
                                placeholder={undefined}
                                {...register("date", {
                                    required: "Scheduled Date is required",
                                })}
                                value={assessmentData.date || ''}
                                onChange={handleChange}                            />

                            {errors.date && errors.date.type === "required" && (
                                <p className="text-red-700 font-normal text-sm">
                                    A Scheduled date is required.
                                </p>
                            )}

                            <Typography
                                className="-mb-2"
                                variant="h6"
                                placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                            >
                                Duration in hours
                            </Typography>
                            <Input
                                onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} variant="outlined"
                                label="Duration in hours"
                                type="text"
                                placeholder={undefined}
                                {...register("duration", {
                                    required: "Duration in hours is required",
                                })}
                                value={assessmentData.duration || ''}
                                onChange={handleChange}                            />

                            {errors.duration && errors.duration.type === "required" && (
                                <p className="text-red-700 font-normal text-sm">
                                    Assessment duration is required.
                                </p>
                            )}

                            <Typography
                                className="-mb-2"
                                variant="h6"
                                placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                            >
                                Expected score
                            </Typography>
                            <Input
                                onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} variant="outlined"
                                label="Expected score"
                                type="text"
                                placeholder={undefined}
                                {...register("expected_score", {
                                    required: "Expected score is required",
                                })}
                                value={assessmentData.expected_score || 0}
                                onChange={handleChange}                            />

                            {errors.duration && errors.duration.type === "required" && (
                                <p className="text-red-700 font-normal text-sm">
                                    Expected scored is required.
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
                                {isLoading === "loading" ? "Updating..." : "Update Assessment"}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </DialogBody>
        </Dialog>
    )
}