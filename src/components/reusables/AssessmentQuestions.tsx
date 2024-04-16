import { Checkbox, List, ListItem, ListItemPrefix, Radio } from "@material-tailwind/react"
import { Question } from "../../types"

interface IQuestion {
    question: Question,
    index: number
}
export const AssessmentQuestions = ({ question, index }: IQuestion) => {
    return (
        <div>
            <div key={index}>
                <p className="flex gap-2">
                    <span>{index + 1}.</span>
                    <span>{question.question}</span>
                </p>
                <List className="flex flex-row items-center gap-2 mt-4 space-y-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    {
                        question.options && question.options.length > 0 && (
                            question.options.map((option, index) => {
                                return (
                                    <ListItem key={index} className="p-0" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>

                                        {question.type === 'multiple'
                                        ?
                                            <label htmlFor="horizontal-list-react"
                                                className="flex w-full cursor-pointer items-center px-3 py-2">
                                                    <ListItemPrefix placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                        <Checkbox
                                                            id="horizontal-list-react"
                                                            ripple={false}
                                                            containerProps={{
                                                            className: "-ml-5",
                                                            }}
                                                            className="hover:before:opacity-0"
                                                            label={option.content} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined}
                                                        />
                                                    </ListItemPrefix>
                                            </label>
                                        :
                                            <label htmlFor="horizontal-list-react"
                                                className="flex w-full cursor-pointer items-center px-3 py-2">
                                                <ListItemPrefix className="mr-3" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                    <Radio
                                                        name="horizontal-radio"
                                                        id="horizontal-radio-react"
                                                        label={option.content}
                                                        ripple={false}
                                                        className="hover:before:opacity-0"
                                                        containerProps={{
                                                        className: "p-0",
                                                        }}
                                                        onPointerEnterCapture={undefined}
                                                        onPointerLeaveCapture={undefined}
                                                        crossOrigin={undefined}
                                                    />
                                                </ListItemPrefix>
                                        </label>
                                        }
                                    </ListItem>
                                )
                            })
                        )
                    }
                </List>
            </div>
        </div>
    )
}