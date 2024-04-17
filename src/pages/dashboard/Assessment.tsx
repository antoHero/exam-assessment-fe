import React, { useEffect, useState } from "react"
import { Assessment as AssessmentInterface, Profile, User } from "../../types"
import axios from "axios";
import { toast, Flip } from "react-toastify";
import assessmentService from "../../services/assessmentService.http";
import { useParams } from "react-router-dom";
import { Button, Card, CardBody } from "@material-tailwind/react";
// import { AssessmentQuestions } from "../../components/reusables/AssessmentQuestions";
import { AdminAssessmentQuestion } from "../../components/reusables/AdminAssessmentQuestion";
import { AssessmentQuestions } from "../../components/reusables/AssessmentQuestions";
import questionServiceHttp from "../../services/questionService.http";



const getProfile = () => {
    const json = localStorage.getItem('user') ?? '{}';
    return JSON.parse(json) as { profile?: User };
};

const profile = getProfile()

export const Assessment = () => {
    const [assessment, setAssessment] = useState<AssessmentInterface>(Object);
    const [result, setResult] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<string>("idle");
    const [isSubmitting, setIsSubmitting] = useState<string>("idle");
    const [selectedOptions, setSelectedOptions] = useState<{ question_id: string; selected_options: string[] }[]>([]);

    const handleOptionChange = (questionId: string, selectedOptionId: string) => {
        setSelectedOptions(prevSelectedOptions => {
            // const question = assessment.questions.find(q => q.id === questionId);
            const existingIndex = prevSelectedOptions.findIndex(option => option.question_id === questionId);

            if (existingIndex !== -1) {
              const updatedOptionIds = prevSelectedOptions[existingIndex].selected_options.includes(selectedOptionId)
                ? prevSelectedOptions[existingIndex].selected_options.filter(id => id !== selectedOptionId)
                : [...prevSelectedOptions[existingIndex].selected_options, selectedOptionId];

              const updatedOptions = [...prevSelectedOptions];
              updatedOptions[existingIndex] = { question_id: questionId , selected_options: updatedOptionIds };
              return updatedOptions;
            } else {
              return [...prevSelectedOptions, { question_id: questionId, selected_options: [selectedOptionId] }];
            }
        });
    };

    const { assessmentId } = useParams();
    const storedProfile = profile?.profile as Profile | undefined;
    useEffect(() => {
        getAssessment()
        getUserAssessmentResult()
    }, [assessmentId])

    const getAssessment = async () => {
        try {
            setIsLoading("loading");
            const { data: { data } } = await assessmentService.getAssessment(assessmentId)
            setAssessment(data);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 422) {
                    toast.error(err.response?.data?.message, {
                        position: "top-right",
                        transition: Flip,
                    });
                }
            }
        } finally { setIsLoading("idle") }
    }

    const getUserAssessmentResult = async () => {
        try {
            setIsLoading("loading");
            const { data: { data } } = await assessmentService.getUesrsAssessmentResult(assessmentId)
            setResult(data);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 500 || err.response?.status === 400) {
                    toast.error(err.response?.data?.message, {
                        position: "top-right",
                        transition: Flip,
                    });
                }
            }
        } finally { setIsLoading("idle") }
    }

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        try {
            setIsSubmitting("submitting")
            for (let i = 0; i < selectedOptions.length; i++) {
                const { question_id, selected_options } = selectedOptions[i];
                const { data: { message } } = await questionServiceHttp.answerQuestion(question_id, {selected_options})
                toast.success(message, {
                    position: "top-right",
                    transition: Flip,
                })
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 422 || err.response?.status === 400 || err.response?.status === 500) {
                    console.log("422 ",err.response?.data, err.response?.data?.message);
                    toast.error(err.response?.data?.message, {
                        position: "top-right",
                        transition: Flip,
                    });
                }
            }
        } finally {
            setIsSubmitting("idle")
        }

    }
    if(isLoading === "loading") {
        return <p className="flex items-center justify-center"> Fetching assessment please wait...</p>;
    } else {
        return (
            <div className="px-4 lg:px-6">
                <Card className="h-full w-full overflow-scroll mt-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <CardBody className="p-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        <div className="flex items-center justify-between">
                        <p className="font-semibold text-gray-700 text-2xl capitalize">{ assessment.title }</p>
                        {storedProfile && storedProfile.type === 'admin' ? '' : <p className="font-semibold text-red-700 text-xl capitalize">
                            { result ? <span>score: { result } / { assessment.expected_score }</span> : 0}

                        </p>
                        }

                        </div>
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
                                <form onSubmit={handleSubmit}>
                                {
                                    assessment.questions && assessment.questions.length > 0 && (
                                        assessment.questions.map((question, index) => {
                                            return (
                                                storedProfile && storedProfile.type === 'admin'
                                                ? <AdminAssessmentQuestion question={question} index={index} key={index} />
                                                : <AssessmentQuestions question={question} index={index} onOptionChange={handleOptionChange} key={index} />
                                            )
                                        })
                                    )
                                }
                                    <Button disabled={isSubmitting === 'submitting'} type="submit" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>{isSubmitting === 'submitting' ? 'Submitting...' : 'Submit'}</Button>
                                </form>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>

        )
    }

}