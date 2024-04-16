import { Spinner } from "@material-tailwind/react";


export const SplashPage = () => {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-800 opacity-50 overflow-hidden">
			<div className="flex flex-col items-center space-y-4">
				<Spinner className="h-16 w-16 text-gray-900/50" />
				<h1 className="text-white text-5xl font-semibold">Egzpense </h1>
			</div>
		</div>
	);
};
