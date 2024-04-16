import { useEffect, useState } from "react"
import { Assessment as AssessmentInterface } from "../../types"
import axios from "axios";
import { toast, Flip } from "react-toastify";
import assessmentService from "../../services/assessmentService";
import { useParams } from "react-router-dom";
import { Card, CardBody } from "@material-tailwind/react";
// import { AssessmentQuestions } from "../../components/reusables/AssessmentQuestions";
import { AdminAssessmentQuestion } from "../../components/reusables/AdminAssessmentQuestion";

export const Assessment = () => {
    const [assessment, setAssessment] = useState<AssessmentInterface>(Object);
    const [isLoading, setIsLoading] = useState<string>("idle");
    const { assessmentId } = useParams();
    useEffect(() => {
        getAssessment()
    }, [])

    const getAssessment = async () => {
        try {
            setIsLoading("loading");
            const { data: { data } } = await assessmentService.getAssessment(assessmentId)
            setAssessment(data);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 422) {
                    console.log("422 ",err.response?.data, err.response?.data?.message);
                    toast.error(err.response?.data?.message, {
                        position: "top-right",
                        transition: Flip,
                    });
                }
            }
        } finally { setIsLoading("idle") }
    }
    if(isLoading === "loading") {
        return <p className="flex items-center justify-center"> Fetching assessment please wait...</p>;
    } else {
        return (
            <div className="px-4 lg:px-6">
                <Card className="h-full w-full overflow-scroll mt-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <CardBody className="p-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        <p className="font-semibold text-gray-700 text-2xl capitalize">{ assessment.title }</p>
                        <p className="mt-4 font-bold">Instructions</p>
                        <span className="text-base mt-4">{ assessment.instructions }</span>

                        <div className="flex items-center justify-between mt-4">
                            <div> Date: <span className="font-semibold">{ assessment.date }</span></div>
                            <div> Duration: <span className="font-semibold">{ assessment.duration } hours</span></div>
                            <div> Score: <span className="font-semibold">{ assessment.expected_score } marks</span></div>
                        </div>

                        <div className="mt-4">
                            <h1 className="font-semibold text-gray-700 text-2xl capitalize">Questions</h1>

                            <div className="mt-4">
                                {
                                    assessment.questions && assessment.questions.length > 0 && (
                                        assessment.questions.map((question, index) => {
                                            return (
                                                <AdminAssessmentQuestion question={question} index={index} key={index} />
                                            )
                                        })
                                    )
                                }
                            </div>
                        </div>
                    </CardBody>

                </Card>
            </div>

        )
    }

}