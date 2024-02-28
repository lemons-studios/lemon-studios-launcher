import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { fetchTimeout } from "./utils";
import RenderMarkdown from "./rendermd/rendermd";
import { Dismiss16Regular } from "@fluentui/react-icons";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function PostViewer({ name, url, show, onClose }) {
	const [reload, triggerReload] = useState(false);
	const [markdown, setMarkdown] = useState("");
	const [failed, setFailed] = useState(false);

	useEffect(() => {
		setMarkdown("");
		setFailed(false);
		fetchTimeout(url)
			.then((r) => r.text())
			.then((j) => {
				setMarkdown(j);
			})
			.catch(() => {
				setFailed(true);
			});
	}, [reload, url]);

	const reloadMarkdown = () => {
		triggerReload(!reload);
	};

	return (
		<ReactModal
			style={{
				overlay: {
					background: "#2228",
					backdropFilter: "blur(5px)",
					zIndex: 50,
				},
				content: {
					display: "flex",
					background: "#050505",
					border: "1px solid #222",
					borderRadius: "10px",
					flexDirection: "column",
				},
			}}
			isOpen={show}
			ariaHideApp={false}
			onRequestClose={onClose}
		>
			<div className="flex justify-between items-center">
				<h1 className="text-xl">{name}</h1>
				<button
					className="hover:bg-[#fff3] active:bg-[#fff2] rounded w-8 h-8 transition-colors"
					onClick={onClose}
				>
					<Dismiss16Regular />
				</button>
			</div>
			<div className="border-[#333] my-4 border-t w-full"></div>
			{markdown !== "" ? (
				<RenderMarkdown text={markdown} />
			) : (
				<>
					<SkeletonTheme
						baseColor="#222"
						highlightColor="#666"
						borderRadius={100}
					>
						<Skeleton
							count={Math.random() / 3 + 1 / 3}
							className="mb-4 text-3xl"
						/>
						{Array.from(Array(4), () => Math.random() / 12 + 11 / 12).map(
							(e, i) => (
								<Skeleton count={e} key={i} />
							)
						)}
						<div className="mb-4"></div>
						{Array.from(Array(5), () => Math.random() / 12 + 11 / 12).map(
							(e, i) => (
								<Skeleton count={e} key={i} />
							)
						)}
					</SkeletonTheme>
				</>
			)}
		</ReactModal>
	);
}
