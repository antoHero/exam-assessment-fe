
"use client";
import React, { useState, useEffect } from "react";
// import authService from "../../services/auth.service";
import {
	Navbar,
	Drawer,
	Typography,
	Button,
	IconButton,
	Avatar,
	Menu,
	MenuHandler,
	MenuList,
	MenuItem,
	List,
	ListItem,
	ListItemPrefix,
} from "@material-tailwind/react";

import {
	UserCircleIcon,
	ChevronDownIcon,
	Cog6ToothIcon,
	InboxArrowDownIcon,
	LifebuoyIcon,
	PowerIcon,
	InboxIcon
} from "@heroicons/react/24/solid";
// import { Navigate } from "react-router-dom";

// import { ResponsiveSidebar } from "../../pages/dashboard/Responsive";
// profile menu component
const profileMenuItems = [
	{
		label: "My Profile",
		icon: UserCircleIcon,
	},
	{
		label: "Edit Profile",
		icon: Cog6ToothIcon,
	},
	{
		label: "Inbox",
		icon: InboxArrowDownIcon,
	},
	{
		label: "Help",
		icon: LifebuoyIcon,
	},
	{
		label: "Sign Out",
		icon: PowerIcon,
	},
];

function ProfileMenu() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const closeMenu = () => setIsMenuOpen(false);


	return (
		<>
			<Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
				<MenuHandler>
					<Button
                        variant="text"
                        size="md"
                        fullWidth={false}
                        ripple={true}
                        placeholder={undefined}
                        color="blue-gray"
                        className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto">
						<Avatar
							variant="circular"
							size="sm"
							alt="tania andrew"
							className="border border-gray-900 p-0.5"
							src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80" placeholder={undefined}						/>
						<ChevronDownIcon
							strokeWidth={2.5}
							className={`h-3 w-3 transition-transform ${
								isMenuOpen ? "rotate-180" : ""
							}`}
						/>
					</Button>
				</MenuHandler>
				<MenuList className="p-1" placeholder={undefined}>
					{profileMenuItems.map(({ label, icon }, key) => {
						const isLastItem = key === profileMenuItems.length - 1;
						return (
							<MenuItem
								key={label}
								onClick={closeMenu}
								className={`flex items-center gap-2 rounded ${isLastItem
										? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
										: ""}`} placeholder={undefined}>
								{React.createElement(icon, {
									className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
									strokeWidth: 2,
								})}
								<Typography
									as="span"
									variant="small"
									className="font-normal"
									color={isLastItem ? "red" : "inherit"} placeholder={undefined}>
									{label}
								</Typography>
							</MenuItem>
						);
					})}
				</MenuList>
			</Menu>

		</>
	);
}

interface openSidebar {
    handleLogout: () => void;
}

export const AppNavbar = ({ handleLogout }: openSidebar) => {
	const [open, setOpen] = React.useState(false);

    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);

	useEffect(() => {
		window.addEventListener(
			"resize",
			() => window.innerWidth >= 960 && open === false
		);
	}, []);

	return (
		<div className="z-40 overflow-scroll">
			<Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4" placeholder={undefined}>
				<div className="flex items-center justify-between text-blue-gray-900">
					<Typography
						as="a"
						href="#"
						className="mr-4 cursor-pointer py-1.5 font-medium" placeholder={undefined}>
						Quick Assessment
					</Typography>
					<div className="flex items-center gap-4">
						{/* <div className="mr-4 hidden lg:block">{navList}</div> */}
						<div className="flex items-center gap-x-1">
							<ProfileMenu />
						</div>
						<IconButton
							variant="text"
							className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
							ripple={false}
							onClick={openDrawer} placeholder={undefined}>
							{open ? (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									className="h-6 w-6"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							) : (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									fill="none"
									stroke="currentColor"
									strokeWidth={2}>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
							)}
						</IconButton>
					</div>
				</div>

			</Navbar>
			<Drawer open={open} onClose={closeDrawer} className="p-4" placeholder={undefined}>
				<List placeholder={undefined}>
					<ListItem placeholder={undefined}>
						<ListItemPrefix placeholder={undefined}>
							<InboxIcon className="h-5 w-5" />
						</ListItemPrefix>
						Dashboard
					</ListItem>
					<ListItem placeholder={undefined}>
						<ListItemPrefix placeholder={undefined}>
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
						Expenses
					</ListItem>
					<ListItem placeholder={undefined}>
						<ListItemPrefix placeholder={undefined}>
							<UserCircleIcon className="h-5 w-5" />
						</ListItemPrefix>
						Profile
					</ListItem>
					<ListItem placeholder={undefined}>
						<ListItemPrefix placeholder={undefined}>
							<Cog6ToothIcon className="h-5 w-5" />
						</ListItemPrefix>
						Settings
					</ListItem>
					<ListItem onClick={() => handleLogout} placeholder={undefined}>
						<ListItemPrefix placeholder={undefined}>
							<PowerIcon className="h-5 w-5" />
						</ListItemPrefix>
						Log Out
					</ListItem>
				</List>
			</Drawer>
		</div>
	);
};