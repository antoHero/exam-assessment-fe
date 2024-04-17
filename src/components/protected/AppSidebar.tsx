
import { NavLink } from "react-router-dom";
import {
	Card,
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
			<Card className="h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
				<div className="mb-2 flex items-center gap-4 p-4">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
						<path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
					</svg>
				</div>
				<List  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
					<NavLink to="/dashboard" className="flex flex-row ml-3 mb-2">
						<ListItemPrefix  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
							<InboxIcon className="h-5 w-5" />
						</ListItemPrefix>
						Dashboard
					</NavLink>
                    <ListItem onClick={handleLogout} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
						<ListItemPrefix  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
							<PowerIcon className="h-5 w-5" />
						</ListItemPrefix>
						Log Out
					</ListItem>
				</List>
			</Card>

            <Card className="w-full h-full absolute z-40  transform -translate-x-full" id="mobile-nav" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
				<div className="mb-2 flex items-center gap-4 p-4">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
						<path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
					</svg>
				</div>
				<List  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
					<ListItem  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
						<ListItemPrefix  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
							<InboxIcon className="h-5 w-5" />
						</ListItemPrefix>
						Dashboard
					</ListItem>
					<ListItem onClick={handleLogout} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
						<ListItemPrefix  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
							<PowerIcon className="h-5 w-5" />
						</ListItemPrefix>
						Log Out
					</ListItem>
				</List>
			</Card>
		</nav>
	);
};