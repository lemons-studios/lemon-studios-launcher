"use client";
import {
	Home16Regular,
	Navigation16Regular,
	Settings16Regular,
} from "@fluentui/react-icons";
import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
	const [expanded, setExpanded] = useState(true);

	return (
		<div
			className={
				(expanded ? "w-56 " : "w-16 ") +
				"flex flex-col justify-stretch bg-[#050505] h-screen z-50"
			}
			style={{
				transition: "width .1s",
			}}
		>
			<div className="flex flex-col gap-1 p-3 grow">
				{/* Menu */}
				<button
					className="flex flex-row justify-center items-center hover:bg-[#fff1] p-3 rounded-md w-10 h-10"
					onClick={() => setExpanded(!expanded)}
				>
					<Navigation16Regular />
				</button>

				{/* Home */}
				<Link
					href={"/"}
					className={
						(expanded ? "w-full " : "w-10 ") +
						"flex flex-row items-center gap-2 hover:bg-[#fff1] p-3 rounded-md h-10 overflow-hidden"
					}
				>
					<Home16Regular />
					{expanded && (
						<p className="mt-1 text-clip [text-wrap:nowrap]">Home</p>
					)}
				</Link>

				{/* Mission Monkey */}
				<Link
					href={"/mission-monkey"}
					className={
						(expanded ? "w-full " : "w-10 ") +
						"flex flex-row items-center gap-2 hover:bg-[#fff1] p-3 rounded-md h-10 overflow-hidden"
					}
				>
					<img src="/mission-monkey.png" width={16} height={16} />
					{expanded && (
						<p className="mt-1 text-clip [text-wrap:nowrap]">Mission: Monkey</p>
					)}
				</Link>

				{/* Settings */}
				<Link
					href={"/settings"}
					className={
						(expanded ? "w-full " : "w-10 ") +
						"flex flex-row items-center gap-2 hover:bg-[#fff1] p-3 rounded-md h-10 overflow-hidden"
					}
				>
					<Settings16Regular />
					{expanded && (
						<p className="mt-1 text-clip [text-wrap:nowrap]">Settings</p>
					)}
				</Link>
			</div>

			{expanded && (
				<>
					<div className="border-[#222] mx-2 border-t"></div>

					{/* Version number */}
					<div className="flex justify-start items-center p-4 h-16 [text-wrap:nowrap]">
						Launcher v1.0.0
					</div>
				</>
			)}
		</div>
	);
}
