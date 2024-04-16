
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
	Button,
	Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader
} from "@material-tailwind/react";
import assessmentService from "../../services/assessmentService.http";
import { Assessment } from "../../types";

interface OpenEditForm {
	open: boolean;
	handleOpen: () => void;
    assessment: Assessment
}

export const DeleteAssessmentForm = ({ open, handleOpen, assessment }: OpenEditForm) => {
    const [isLoading, setIsLoading] = useState<string>("idle");
    const [assessmentData, setAssessmentData] = useState<Assessment>({
        ...assessment
    });

    useEffect(() => {
        if(open && assessment) {
            setAssessmentData(assessment)
        } // Update assessmentData whenever data prop changes
    }, [open, assessment]);

    const handleDeleteAssessment = async () => {
        try {
            console.log(assessmentData)
			setIsLoading("loading");
            const response = await assessmentService.deleteAssessment(assessmentData.id);
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
					err.response?.status === 400
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
            className="bg-white shadow-none overflow-auto"
            placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
        >
            <DialogHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Delete Assessment?</DialogHeader>
            <DialogBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                Are you sure you want to delete this assessment?
            </DialogBody>
            <DialogFooter placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <Button
                    variant="text"
                    color="red"
                    onClick={handleOpen}
                    className="mr-1" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                >
                    <span>Cancel</span>
                </Button>
                <Button disabled={isLoading == "loading"} variant="gradient" color="green" onClick={handleDeleteAssessment} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <span>{isLoading === "loading" ? "Deleting..." : "Confirm"}</span>
                </Button>
            </DialogFooter>
        </Dialog>
    )
}