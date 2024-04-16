/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Flip, toast } from 'react-toastify';
import { Assessment, Profile, User } from "../../types";
import { PageTitle } from "../../components/reusables/PageTitle";
import { AssessmentTable } from "../../components/protected/AssessmentTable";
import { AddAssessmentForm } from "../../components/reusables/AddAssessmentForm";
import { SplashPage } from "../../components/reusables/splash/SplashPage";
import assessmentService from "../../services/assessmentService";
import {
	Button,
} from "@material-tailwind/react";

const getProfile = () => {
    const json = localStorage.getItem('user') ?? '{}';
    return JSON.parse(json) as { profile?: User };
    // replace number type above with whatever is needed
};

const profile = getProfile()

export const Dashboard: React.FC = () => {
    PageTitle('Dashboard');
	const [assessments, setAssessments] = useState<Assessment[]>([])
	const [isLoading, setIsLoading] = useState<string>("idle");
	const [open, setOpen] = useState<boolean>(false);
	const storedProfile = profile?.profile as Profile | undefined;


    const handleOpen = () => setOpen(!open);


	useEffect(() => {
		const getAllAssessments = async () => {
			try {
				const response = await assessmentService.getAssessments();
				setAssessments(response.data.data)
			} catch (error) {
				if (axios.isAxiosError(error)) {
					toast.error(error.response?.data?.message, {
						position: "top-right",
						transition: Flip,
					});
				}
			}
		}
		setIsLoading("loading");
		getAllAssessments()
		setIsLoading("idle");
	}, [])

	if(isLoading === "loading") {
        return <SplashPage />;
    }

	if(storedProfile?.type === "admin") {
		return (
			<div className="px-4 lg:px-6">

				<div className="flex items-center justify-between">
					<div>
						<p>View Assessments!</p>
					</div>
					<div>
						<Button placeholder={undefined} size="sm" onClick={handleOpen} ripple>
							Add New
						</Button>
					</div>
				</div>
				<AssessmentTable assessments={assessments} />
				<AddAssessmentForm open={open} handleOpen={handleOpen} />
			</div>
		);
	}

	// if(user?.profile?.type == "admin") {
	// 	return (
	// 		<div className="px-4 lg:px-6">
	// 			<p>View Assessments!</p>
	// 			<AssessmentTable assessments={assessments} />
	// 		</div>
	// 	);
	// }

};
