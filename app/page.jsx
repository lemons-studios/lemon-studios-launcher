"use client";
import { BaseDirectory, exists, readDir } from "@tauri-apps/api/fs";
import React from "react";
import { Settings20Regular } from "@fluentui/react-icons";
// import axios from "axios";

function getReadableFileSizeString(fileSizeInBytes) {
	var i = -1;
	var byteUnits = [" kB", " MB", " GB", " TB", "PB", "EB", "ZB", "YB"];
	do {
		fileSizeInBytes /= 1024;
		i++;
	} while (fileSizeInBytes > 1024);

	return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
}

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			downloadProgess: 50,
			totalBytes: 0,
			downloadedBytes: 0,
			downloadSpeed: 0,
			installStatus: "Downloading...",
			currentVersion: null,
			latestVersion: null,
			latestRelease: {},
			checkUpdate: async () => {
				const installed = await exists("mission-monkey", { dir: BaseDirectory.LocalData });
				if (installed) {
					const entries = await readDir("mission-monkey", { dir: BaseDirectory.LocalData, recursive: false });
					console.log(entries);
				}

				const res = await (await fetch("https://api.github.com/repos/lemons-studios/Mission-Monkey/releases/latest")).json();
				console.log(res);
				this.setState({ latestRelease: res });
				this.setState({ latestVersion: res.name });
			},
			install: async () => {
				console.log(this.state.latestRelease.assets[0].browser_download_url);
				// await axios.get(this.state.latestRelease.assets[0].browser_download_url, {
				// 	responseType: "blob",
				// 	onDownloadProgress: async ({ loaded, total, progress, rate }) => {
				// 		this.setState({ downloadedBytes: loaded });
				// 		this.setState({ totalBytes: total });
				// 		this.setState({ downloadProgess: Math.round(progress * 100) });
				// 		this.setState({ downloadSpeed: rate });
				// 	}
				// });
			}
		};
	}
	async componentDidMount() {
		const { appWindow } = require("@tauri-apps/api/window");
		appWindow.setDecorations(true);
		document.addEventListener("contextmenu", (e) => e.preventDefault());
		this.state.checkUpdate();
	}
	render() {
		return (
			<main className="p-8 text-sm h-screen w-screen">
				<div className="bg-[#fff4] dark:bg-[#fff1] rounded-md border border-[#22222218] p-3">
					<p className="text-lg font-medium">Installation</p>
					<div className="flex justify-between">
						<div>
							<p>Latest version: {this.state.latestVersion || "Unknown"}</p>
							<p>Installed: {this.state.currentVersion || "Unknown"}</p>
						</div>
						<div>
							<button
								className="p-2 rounded-md text-[#fff] dark:text-[#000] bg-accent-light dark:bg-accent-dark hover:bg-accent-light-hover hover:dark:bg-accent-dark-hover active:bg-accent-light-active active:dark:bg-accent-dark-active"
								onClick={() => {
									this.state.install();
								}}
							>
								{this.state.currentVersion ? "Check for updates" : "Install"}
							</button>
						</div>
					</div>

					<div>
						<div
							style={{
								display: this.state.downloadProgess > -1 ? "block" : "none"
							}}
							className="w-full h-1 mt-3 rounded-full bg-[#8883] overflow-hidden"
						>
							<div
								style={{
									width: this.state.downloadProgess > -1 ? `${this.state.downloadProgess}%` : "0%"
								}}
								className="h-full bg-accent-light dark:bg-accent-dark rounded-full"
							></div>
						</div>
						<div className="flex justify-between text-xs mt-1">
							<p>{this.state.installStatus}</p>
							<p>
								{this.state.downloadProgess}% ({getReadableFileSizeString(this.state.downloadedBytes)}/{getReadableFileSizeString(this.state.totalBytes)},{" "}
								{getReadableFileSizeString(this.state.downloadSpeed)}/s)
							</p>
						</div>
					</div>
				</div>

				<div className="absolute bottom-6 left-6 flex gap-2">
					<button className="p-2 rounded-md bg-[#fff4] dark:bg-[#fff1] active:opacity-75 border border-[#22222218]">
						<Settings20Regular />
					</button>
				</div>

				<div className="absolute bottom-6 right-6 flex gap-2">
					<button className="p-2 rounded-md bg-[#fff4] dark:bg-[#fff1] active:opacity-75 border border-[#22222218]">Quit launcher</button>
					<button className="p-2 rounded-md text-[#fff] dark:text-[#000] bg-accent-light dark:bg-accent-dark hover:bg-accent-light-hover hover:dark:bg-accent-dark-hover active:bg-accent-light-active active:dark:bg-accent-dark-active">
						Launch game
					</button>
				</div>
			</main>
		);
	}
}
