
import { Card, IconButton, Tooltip, Typography } from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Assessment } from "../../types";
import { useState } from "react";
import { EditAssessmentForm } from "../reusables/EditAssessmentForm";
import { DeleteAssessmentForm } from "../reusables/DeleteAssessmentDialog";
import { Link } from "react-router-dom";

const TABLE_HEAD = [
    "S/No",
    "Title",
    "Date",
    "Duration",
    "Expected Score",
    "Number of Questions",
    "View",
    ""
];

interface ChildComponentProps {
	assessments: Assessment[];
}
export const AssessmentTable: React.FC<ChildComponentProps> = ({ assessments }) => {
    const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
    const [assessment, setAssessment] = useState<Assessment>(Object)

    const handleEditDialogOpen = () => setOpenEditDialog(!open);
    const handleDeleteDialogOpen = () => setOpenDeleteDialog(!open);

    const handleEditAssessment = (data: Assessment) => {
        setAssessment(data);
        setOpenEditDialog(true);
    }

    const handleDeleteAssessment = (data: Assessment) => {
        setAssessment(data);
        setOpenDeleteDialog(true);
    }

    return (
        <>
            <Card className="h-full w-full overflow-scroll mt-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
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
                                        onPointerEnterCapture={undefined}
                                        onPointerLeaveCapture={undefined}
                                    >
                                    {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {assessments.map((assessment, index) => {
                            const isLast = index === assessments.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={index}>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                            {index + 1}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                            {assessment.title}
                                        </Typography>
                                    </td>
                                    <td className={`${classes}`}>
                                        <Typography variant="small" color="blue-gray" className="font-normal" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                            {assessment.date}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                            {assessment.duration}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                            {assessment.expected_score}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                            {assessment.questions.length}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Link to={`assessment/${assessment.id}`} className="font-normal" >
                                            View
                                        </Link>
                                    </td>
                                    <td className={`${classes} flex gap-2`}>
                                        <Tooltip content="Edit Assessment">
                                            <IconButton variant="text" onClick={() => handleEditAssessment(assessment)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                <PencilIcon className="h-4 w-4" />
                                            </IconButton>
                                        </Tooltip>
                                        <Typography  variant="small" color="blue-gray" className="font-medium cursor-pointer" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                            <Tooltip content="Delete Assessment">
                                                <IconButton variant="text" onClick={() => handleDeleteAssessment(assessment)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                    <TrashIcon className="h-4 w-4 text-red-500" />
                                                </IconButton>
                                            </Tooltip>
                                        </Typography>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Card>
            <EditAssessmentForm open={openEditDialog} handleOpen={handleEditDialogOpen} assessment={assessment} />
            <DeleteAssessmentForm open={openDeleteDialog} handleOpen={handleDeleteDialogOpen} assessment={assessment} />
        </>
    )
}