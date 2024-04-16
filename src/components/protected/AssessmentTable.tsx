
import { Card, Typography } from "@material-tailwind/react";
import { Assessment } from "../../types";
const TABLE_HEAD = [
    "S/No",
    "Title",
    "Date",
    "Duration",
    "Expected Score",
    "Number of Questions",
    ""
];

interface ChildComponentProps {
	assessments: Assessment[];
}
export const AssessmentTable: React.FC<ChildComponentProps> = ({ assessments }) => {
    return (
        <Card className="h-full w-full overflow-scroll mt-4">
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                    placeholder={undefined}
                                >
                                {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {assessments.map(({ title, date, duration, expected_score, questions }, index) => {
                        const isLast = index === assessments.length - 1;
                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                        return (
                            <tr key={index}>
                                <td className={classes}>
                                    <Typography variant="small" color="blue-gray" className="font-normal" placeholder={undefined}>
                                        {index + 1}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography variant="small" color="blue-gray" className="font-normal" placeholder={undefined}>
                                        {title}
                                    </Typography>
                                </td>
                                <td className={`${classes} bg-blue-gray-50/50`}>
                                    <Typography variant="small" color="blue-gray" className="font-normal" placeholder={undefined}>
                                        {date}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography variant="small" color="blue-gray" className="font-normal" placeholder={undefined}>
                                        {duration}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography variant="small" color="blue-gray" className="font-normal" placeholder={undefined}>
                                        {expected_score}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography variant="small" color="blue-gray" className="font-normal" placeholder={undefined}>
                                        {questions.length}
                                    </Typography>
                                </td>
                                <td className={`${classes} bg-blue-gray-50/50`}>
                                    <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium" placeholder={undefined}>
                                        Edit
                                    </Typography>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </Card>
    )
}