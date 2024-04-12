import React from "react";
import { NavLink } from "react-router-dom";
import {
	Card,
	Typography,
	List,
	ListItem,
	ListItemPrefix,
} from "@material-tailwind/react";

import {
	UserCircleIcon,
	InboxIcon,
	PowerIcon,
} from "@heroicons/react/24/solid";


interface openSidebar {
    handleLogout: () => void;
}
export const AppSidebar = ({ handleLogout }: openSidebar) => {
	// const logoutUser = () => {
	// 	handleLogout();
	// }
	return (
		<nav id="sidebar">
			<Card className="h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5"  placeholder={undefined}>
				<div className="mb-2 flex items-center gap-4 p-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-8 h-8">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
						/>
					</svg>

					<Typography variant="h5" color="blue-gray"  placeholder={undefined}>
						Egzpense
					</Typography>
				</div>
				<List  placeholder={undefined}>
					<NavLink to="/dashboard" className="flex flex-row ml-3 mb-2">
						<ListItemPrefix  placeholder={undefined}>
							<InboxIcon className="h-5 w-5" />
						</ListItemPrefix>
						Dashboard
					</NavLink>
					<NavLink to="/expenses" className="flex flex-row ml-3 mb-2 my-2">
						<ListItemPrefix  placeholder={undefined}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-5 h-5">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
								/>
							</svg>
						</ListItemPrefix>
						Questions
					</NavLink>
					<ListItem  placeholder={undefined}>
						<ListItemPrefix  placeholder={undefined}>
							<UserCircleIcon className="h-5 w-5" />
						</ListItemPrefix>
						Assessments
					</ListItem>
                    <ListItem onClick={handleLogout}  placeholder={undefined}>
						<ListItemPrefix  placeholder={undefined}>
							<PowerIcon className="h-5 w-5" />
						</ListItemPrefix>
						Log Out
					</ListItem>
				</List>
			</Card>

            <Card className="w-full h-full absolute z-40  transform -translate-x-full" id="mobile-nav"  placeholder={undefined}>
				<div className="mb-2 flex items-center gap-4 p-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-8 h-8">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
						/>
					</svg>

					<Typography variant="h5" color="blue-gray"  placeholder={undefined}>
						Egzpense
					</Typography>
				</div>
				<List  placeholder={undefined}>
					<ListItem  placeholder={undefined}>
						<ListItemPrefix  placeholder={undefined}>
							<InboxIcon className="h-5 w-5" />
						</ListItemPrefix>
						Dashboard
					</ListItem>
					<ListItem  placeholder={undefined}>
						<ListItemPrefix  placeholder={undefined}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-5 h-5">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
								/>
							</svg>
						</ListItemPrefix>
						Questions
					</ListItem>
					<ListItem  placeholder={undefined}>
						<ListItemPrefix  placeholder={undefined}>
							<UserCircleIcon className="h-5 w-5" />
						</ListItemPrefix>
						Assessments
					</ListItem>
					<ListItem onClick={handleLogout}  placeholder={undefined}>
						<ListItemPrefix  placeholder={undefined}>
							<PowerIcon className="h-5 w-5" />
						</ListItemPrefix>
						Log Out
					</ListItem>
				</List>
			</Card>
		</nav>
	);
};