import { List} from "@material-tailwind/react"
import { Question } from "../../types"
import { AdminQuestionOption } from "./AdminQuestionOption";
import { Link } from "react-router-dom";
// import { TrashIcon } from "@heroicons/react/24/solid"

interface IQuestion {
    question: Question,
    index: number
}
export const AdminAssessmentQuestion = ({ question, index }: IQuestion) => {
    return (
        <div>
            <div key={index}>
                <Link to={`/questions/${question.id}`} className="flex gap-2 underline cursor-pointer">
                    <span>{index + 1}.</span>
                    <span>{question.question}</span>
                </Link>
                <List className="grid grid-cols-1 lg:grid-cols-2 items-center gap-2 mt-4 space-y-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    {
                        question.options && question.options.length > 0 && (
                            question.options.map((option, optionIndex) => {
                                return (
                                    <List key={optionIndex} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                        <AdminQuestionOption option={option} />
                                    </List>
                                )
                            })
                        )
                    }
                </List>
            </div>
        </div>
    )
}