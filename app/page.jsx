"use client";
import { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { fetchTimeout } from "./components/utils";
import { ArrowClockwise16Regular } from "@fluentui/react-icons";

export default function Home() {
	return (
		<div className="flex flex-col w-full min-h-full fade-in">
			<NewsGrid />
		</div>
	);
}

function NewsGrid() {
	const [reload, triggerReload] = useState(false);
	const [news, setNews] = useState(
		typeof window !== "undefined" && window.cachedLemonNews
			? window.cachedLemonNews
			: []
	);
	const [failed, setFailed] = useState(false);

	useEffect(() => {
		if (window.didRequestLemonNews) return; // prevent request from being sent more than once
		window.didRequestLemonNews = true;
		fetchTimeout("https://cdn.lemon-studios.ca/lemon-launcher-feed/index.json")
			.then((r) => r.json())
			.then((j) => {
				setNews(j);
				window.cachedLemonNews = j;
			})
			.catch(() => {
				setFailed(true);
				window.didRequestLemonNews = false;
				delete window.cachedLemonNews;
			});
	}, [reload]);

	const reloadNews = () => {
		window.didRequestLemonNews = false;
		delete window.cachedLemonNews;
		setFailed(false);
		triggerReload(!reload);
	};

	return (
		<>
			{failed ? (
				<div className="flex flex-col justify-center items-center w-full h-full">
					<h1 className="mb-4 font-normal text-2xl">Failed to fetch news</h1>
					<button
						className="flex justify-center items-center gap-2 bg-[#fff2] hover:bg-[#fff3] px-8 py-3 rounded-lg transition-colors"
						onClick={reloadNews}
					>
						<ArrowClockwise16Regular />
						<p className="-mb-1"> Retry</p>
					</button>
				</div>
			) : (
				<SkeletonTheme
					baseColor="#222"
					highlightColor="#666"
					borderRadius={100}
				>
					<h1 className="mb-4 font-normal text-2xl">Latest news</h1>
					<div className="flex flex-wrap gap-2">
						{(news.length > 0 ? news : Array.from(Array(3), (_e, i) => i)).map(
							(e, i) => (
								<div
									className="border-[#222] hover:bg-[#222] p-4 border rounded-lg w-full md:w-[calc(100%/2-0.5rem)] lg:w-[calc(100%/3-1rem)] h-32 cursor-pointer "
									key={i}
									style={{
										pointerEvents: news.length > 0 ? "all" : "none",
									}}
								>
									<p className="mb-2 text-xl">{e.name || <Skeleton />}</p>
									<p className="text-[#888] text-sm">
										{e.description || <Skeleton count={3} height={12} />}
									</p>
								</div>
							)
						)}
					</div>
				</SkeletonTheme>
			)}
		</>
	);
}
