"use client";
import { BaseDirectory, exists, readDir, removeFile, removeDir, createDir, renameFile, writeTextFile, readTextFile } from "@tauri-apps/api/fs";
import { Command } from "@tauri-apps/api/shell";
import { metadata } from "tauri-plugin-fs-extra-api";

import React from "react";
import { Settings20Regular } from "@fluentui/react-icons";
import { current } from "tailwindcss/colors";

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

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
			downloadProgess: -1,
			totalBytes: 0,
			downloadedBytes: 0,
			installStatus: "Downloading...",
			currentVersion: null,
			latestVersion: null,
			latestRelease: {},
			checkUpdate: async () => {
				const installed = await exists("mission-monkey\\game", { dir: BaseDirectory.LocalData });
				if (installed && (await exists("mission-monkey\\game\\version.txt", { dir: BaseDirectory.LocalData }))) {
					const version = await readTextFile("mission-monkey\\game\\version.txt", { dir: BaseDirectory.LocalData });
					this.setState({ currentVersion: version });
				} else {
					this.setState({ currentVersion: null });
				}

				const res = await (await fetch("https://api.github.com/repos/lemons-studios/Mission-Monkey/releases/latest")).json();
				console.log(res);
				this.setState({ latestRelease: res });
				this.setState({ latestVersion: res.name });
			},
			install: async () => {
				this.setState({ installStatus: "Preparing..." });
				this.setState({ downloadProgess: 101 });
				const { tempdir } = require("@tauri-apps/api/os");
				const tempdirPath = await tempdir();
				await removeFile("missionmonkey.zip", { dir: BaseDirectory.Temp }).catch(() => {});

				this.setState({ totalBytes: this.state.latestRelease.assets[0].size });
				var getFileSizeInter = setInterval(async () => {
					var info = await metadata(tempdirPath + "missionmonkey.zip").catch(() => {});
					if (info) {
						this.setState({ installStatus: "Downloading..." });
						this.setState({ downloadedBytes: info.size });
						this.setState({ downloadProgess: Math.round((info.size / this.state.latestRelease.assets[0].size) * 100) });
					}
				}, 250);
				await new Command("curl", ["-L", this.state.latestRelease.assets[0].browser_download_url, "-o", "missionmonkey.zip"], {
					cwd: tempdirPath
				}).execute();
				clearInterval(getFileSizeInter);
				this.setState({ downloadedBytes: this.state.latestRelease.assets[0].size });
				this.setState({ downloadProgess: 101 });
				this.setState({ installStatus: "Installing..." });

				// UNZIP
				this.setState({ downloadProgess: 101 });
				this.setState({ installStatus: "Installing..." });
				const { localDataDir } = require("@tauri-apps/api/path");
				const localDataDirPath = await localDataDir();
				await removeDir("mission-monkey", { dir: BaseDirectory.LocalData, recursive: true }).catch(() => {});
				await createDir("mission-monkey", { dir: BaseDirectory.LocalData }).catch(() => {});
				console.log(`${tempdirPath}missionmonkey.zip`);
				await new Command("tar", ["-xvmf", `${tempdirPath}missionmonkey.zip`.replace("\\", "\\\\")], { cwd: localDataDirPath + "mission-monkey" }).execute();
				await sleep(1000); // So that the old command can finish before the new one is started

				// WRITE VERSION FILE
				const gameDirFolders = await readDir("mission-monkey", { dir: BaseDirectory.LocalData });
				await renameFile("mission-monkey\\" + gameDirFolders[0].name, "mission-monkey\\game", { dir: BaseDirectory.LocalData });
				await writeTextFile("mission-monkey\\game\\version.txt", this.state.latestVersion, { dir: BaseDirectory.LocalData });
				this.setState({ currentVersion: this.state.latestVersion });
				this.setState({ downloadProgess: -1 });
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
									this.state.currentVersion && this.state.currentVersion == this.state.latestVersion ? this.state.checkUpdate() : this.state.install();
								}}
							>
								{this.state.currentVersion && this.state.currentVersion == this.state.latestVersion ? "Check for updates" : this.state.currentVersion ? "Install update" : "Install"}
							</button>
						</div>
					</div>

					<div
						style={{
							display: this.state.downloadProgess > -1 ? "block" : "none"
						}}
					>
						<div className="relative w-full h-1 mt-3 rounded-full bg-[#8883] overflow-hidden">
							<div
								style={{
									width: this.state.downloadProgess > -1 ? `${this.state.downloadProgess}%` : "0%"
								}}
								className={(this.state.downloadProgess > 100 ? "indeterminate-pb " : "") + "absolute h-full bg-accent-light dark:bg-accent-dark rounded-full transition-all"}
							></div>
						</div>
						<div className="flex justify-between text-xs mt-1">
							<p>{this.state.installStatus}</p>
							<p
								style={{
									display: this.state.downloadProgess < 101 ? "" : "none"
								}}
							>
								{this.state.downloadProgess}% ({getReadableFileSizeString(this.state.downloadedBytes)}/{getReadableFileSizeString(this.state.totalBytes)})
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
