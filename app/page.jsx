"use client";
import { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Home() {
	return (
		<div className="flex flex-col w-full h-full slide-in">
			<h1 className="mb-4 font-normal text-2xl">Latest news</h1>
			<NewsGrid />
		</div>
	);
}

function NewsGrid() {
	const [news, setNews] = useState([]);

	useEffect(() => {
		fetch("https://cdn.lemon-studios.ca/lemon-launcher-feed/index.json")
			.then((r) => r.json())
			.then((j) => setNews(j));
	}, []);

	return (
		<SkeletonTheme baseColor="#222" highlightColor="#666" borderRadius={100}>
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
	);
}
