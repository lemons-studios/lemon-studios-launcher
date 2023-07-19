"use client";
import { BaseDirectory, exists, readDir, removeFile, removeDir, createDir, renameFile, writeTextFile, readTextFile, readBinaryFile, writeBinaryFile } from "@tauri-apps/api/fs";
import { Command, open } from "@tauri-apps/api/shell";
import { exit } from "@tauri-apps/api/process";
import { metadata } from "tauri-plugin-fs-extra-api";

import React from "react";
import { ArrowLeft16Regular, ArrowLeft20Regular, Settings20Regular } from "@fluentui/react-icons";

import { Settings } from "./settings.jsx";

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
			screen: "home",
			darkTheme: false,
			accentColors: {
				loaded: false,
				accent: "rgb(0,120,212)",
				accentDark1: "rgb(0,103,192)",
				accentDark2: "rgb(0,62,146)",
				accentDark3: "rgb(0,62,146)",
				accentLight1: "rgb(0,145,248)",
				accentLight2: "rgb(76,194,255)",
				accentLight3: "rgb(153,235,255)"
			},
			installButtonDisabled: false,
			downloadProgess: -1,
			totalBytes: 0,
			downloadedBytes: 0,
			installStatus: "Downloading...",
			currentVersion: null,
			latestVersion: null,
			latestRelease: {},
			gameExePath: null,
			findGameExe: async () => {
				const gameDirFolders = await readDir("mission-monkey", { dir: BaseDirectory.LocalData });
				if (gameDirFolders.length == 0) return;
				if (await exists(gameDirFolders[0].path + "\\Mission Monkey.exe", { dir: BaseDirectory.LocalData })) {
					this.setState({ gameExePath: gameDirFolders[0].path + "\\Mission Monkey.exe" });
				}
			},
			checkUpdate: () => {
				return new Promise(async (resolve) => {
					await sleep(500);
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
					this.state.findGameExe();

					resolve(true);
				});
			},
			install: () => {
				return new Promise(async (resolve) => {
					// PREPARATIONS
					this.setState({ installStatus: "Preparing..." });
					this.setState({ downloadProgess: 101 });
					const { tempdir } = require("@tauri-apps/api/os");
					const tempdirPath = await tempdir();
					await removeFile("missionmonkey.zip", { dir: BaseDirectory.Temp }).catch(() => {});
					this.setState({ totalBytes: this.state.latestRelease.assets[0].size });

					// DOWNLOAD
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

					// START COPYING FILES
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

					// ADD UNINSTALL EXE
					await new Command("curl", ["-L", "https://github.com/lemons-studios/Mission-Monkey-Installer/raw/main/gameUninstaller/uninstall.EXE", "-o", "uninstall.exe"], {
						cwd: localDataDirPath + "\\mission-monkey\\game"
					}).execute();

					// WRITE REGISTRY KEYS
					this.state.registerGame(localDataDirPath, this.state.totalBytes, this.state.latestVersion);

					// RELOAD EXE PATH
					this.state.findGameExe();

					resolve(true);
				});
			},
			registerGame: async (localappdata, size, version) => {
				await new Command("reg", ["add", "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\MissionMonkey", "/f"]).execute();
				await new Command("reg", [
					"add",
					"HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\MissionMonkey",
					"/v",
					"DisplayName",
					"/t",
					"REG_SZ",
					"/d",
					"Mission: Monkey",
					"/f"
				]).execute();
				await new Command("reg", [
					"add",
					"HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\MissionMonkey",
					"/v",
					"Publisher",
					"/t",
					"REG_SZ",
					"/d",
					"Lemon Studios",
					"/f"
				]).execute();
				await new Command("reg", [
					"add",
					"HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\MissionMonkey",
					"/v",
					"DisplayVersion",
					"/t",
					"REG_SZ",
					"/d",
					version,
					"/f"
				]).execute();
				await new Command("reg", [
					"add",
					"HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\MissionMonkey",
					"/v",
					"DisplayIcon",
					"/t",
					"REG_SZ",
					"/d",
					localappdata + "\\mission-monkey\\game\\Mission Monkey.exe",
					"/f"
				]).execute();
				await new Command("reg", [
					"add",
					"HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\MissionMonkey",
					"/v",
					"UninstallString",
					"/t",
					"REG_SZ",
					"/d",
					localappdata + "\\mission-monkey\\game\\uninstall.exe",
					"/f"
				]).execute();
				await new Command("reg", [
					"add",
					"HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\MissionMonkey",
					"/v",
					"EstimatedSize",
					"/t",
					"REG_DWORD",
					"/d",
					Math.round(size / 1024).toString(),
					"/f"
				]).execute();
				await new Command("reg", ["add", "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\MissionMonkey", "/v", "NoModify", "/t", "REG_DWORD", "/d", "1", "/f"]).execute();
				await new Command("reg", ["add", "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\MissionMonkey", "/v", "NoRepair", "/t", "REG_DWORD", "/d", "1", "/f"]).execute();
			},
			updateAccentColor: async () => {
				const { resolveResource } = require("@tauri-apps/api/path");
				if (!(await exists("WinAccentColor.exe", { dir: BaseDirectory.AppLocalData }))) {
					const resourcePath = await resolveResource("binaries/WinAccentColor.exe");
					const accentExec = await readBinaryFile(resourcePath);
					await writeBinaryFile("WinAccentColor.exe", accentExec, { dir: BaseDirectory.AppLocalData });
				}
				const accent = (await new Command("winaccentcolor").execute()).stdout;
				this.setState({
					accentColors: {
						loaded: true,
						accent: accent.match(/.*accent: (rgb\(\d{1,3}, ?\d{1,3}, ?\d{1,3}\))/i)[1].replaceAll(" ", ""),
						accentDark1: accent.match(/.*accent dark 1: (rgb\(\d{1,3}, ?\d{1,3}, ?\d{1,3}\))/i)[1].replaceAll(" ", ""),
						accentDark2: accent.match(/.*accent dark 2: (rgb\(\d{1,3}, ?\d{1,3}, ?\d{1,3}\))/i)[1].replaceAll(" ", ""),
						accentDark3: accent.match(/.*accent dark 3: (rgb\(\d{1,3}, ?\d{1,3}, ?\d{1,3}\))/i)[1].replaceAll(" ", ""),
						accentLight1: accent.match(/.*accent light 1: (rgb\(\d{1,3}, ?\d{1,3}, ?\d{1,3}\))/i)[1].replaceAll(" ", ""),
						accentLight2: accent.match(/.*accent light 2: (rgb\(\d{1,3}, ?\d{1,3}, ?\d{1,3}\))/i)[1].replaceAll(" ", ""),
						accentLight3: accent.match(/.*accent light 3: (rgb\(\d{1,3}, ?\d{1,3}, ?\d{1,3}\))/i)[1].replaceAll(" ", "")
					}
				});
			}
		};
	}
	async componentDidMount() {
		if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
			this.setState({ darkTheme: true });
		}
		window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
			this.setState({ darkTheme: event.matches ? true : false });
		});

		window.addEventListener("focus", this.state.updateAccentColor);

		this.state.updateAccentColor();

		const { appWindow } = require("@tauri-apps/api/window");
		appWindow.setDecorations(true);
		document.addEventListener("contextmenu", (e) => e.preventDefault());
		this.state.findGameExe();
		this.state.checkUpdate();
	}
	render() {
		return (
			<>
				<main
					id="home"
					className="p-8 text-sm h-screen w-screen flex flex-col gap-2"
					style={{
						display: this.state.accentColors.loaded && this.state.screen == "home" ? "" : "none"
					}}
				>
					<div className="page bg-[#fff4] dark:bg-[#fff1] rounded-md border border-[#22222218] p-3">
						<p className="text-lg font-medium">Game</p>
						<div className="flex justify-between">
							<div>
								<p>Latest version: {this.state.latestVersion || "Unknown"}</p>
								<p>Installed: {this.state.currentVersion || "Unknown"}</p>
							</div>
							<div>
								<button
									disabled={this.state.installButtonDisabled}
									style={{
										backgroundColor: this.state.darkTheme ? this.state.accentColors.accentLight2 : this.state.accentColors.accentDark1
									}}
									className={`p-2 rounded-md text-[#fff] dark:text-[#000] hover:brightness-110 hover:dark:brightness-90 active:brightness-125 active:dark:brightness-75`}
									onClick={async () => {
										this.setState({ installButtonDisabled: true });
										this.state.currentVersion && this.state.currentVersion == this.state.latestVersion ? await this.state.checkUpdate() : await this.state.install();
										this.setState({ installButtonDisabled: false });
									}}
								>
									{this.state.currentVersion && this.state.currentVersion == this.state.latestVersion
										? "Check for updates"
										: this.state.currentVersion
										? "Install update"
										: "Install"}
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
										width: this.state.downloadProgess > -1 ? `${this.state.downloadProgess}%` : "0%",
										backgroundColor: this.state.darkTheme ? this.state.accentColors.accentLight2 : this.state.accentColors.accentDark1
									}}
									className={(this.state.downloadProgess > 100 ? "indeterminate-pb " : "") + "absolute h-full rounded-full transition-all"}
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

					<div className="bg-[#fff4] dark:bg-[#fff1] rounded-md border border-[#22222218] p-3">
						<p className="text-lg font-medium">Patch notes</p>
					</div>

					<div className="absolute bottom-6 left-6 flex gap-2">
						<button
							className="rounded-md bg-[#fff4] dark:bg-[#fff1] active:opacity-75 border border-[#22222218]"
							onClick={() => {
								setTimeout(() => {
									this.setState({ screen: "settings" });
								}, 100);
							}}
						>
							<Settings20Regular
								style={{
									width: "36px",
									height: "36px",
									padding: "8px"
								}}
								className="active:-rotate-180 rotate-180 transition-all duration-700 ease-out"
							/>
						</button>
					</div>

					<div className="absolute bottom-6 right-6 flex gap-2">
						<button
							className="p-2 rounded-md bg-[#fff4] dark:bg-[#fff1] active:opacity-75 border border-[#22222218]"
							onClick={async () => {
								await exit();
							}}
						>
							Quit launcher
						</button>
						<button
							style={{
								backgroundColor: this.state.darkTheme ? this.state.accentColors.accentLight2 : this.state.accentColors.accentDark1
							}}
							className={`p-2 rounded-md text-[#fff] dark:text-[#000] hover:brightness-110 hover:dark:brightness-90 active:brightness-125 active:dark:brightness-75`}
							onClick={() => {
								if (this.state.gameExePath) {
									open(this.state.gameExePath);
								}
							}}
						>
							Launch game
						</button>
					</div>
				</main>

				<main
					id="settings"
					className="p-8 pt-16 text-sm h-screen w-screen flex flex-col gap-2"
					style={{
						display: this.state.accentColors.loaded && this.state.screen == "settings" ? "" : "none"
					}}
				>
					<div className="absolute top-4 left-6 flex gap-3 items-center">
						<button
							className="rounded-md bg-[#8880] dark:bg-[#8880] hover:bg-[#8883] active:bg-[#8882] border border-[#22222218]"
							onClick={() => {
								setTimeout(() => {
									this.setState({ screen: "home" });
								}, 100);
							}}
						>
							<ArrowLeft16Regular
								style={{
									width: "32px",
									height: "32px",
									padding: "8px"
								}}
								className="origin-right active:scale-x-90 transition-all ease-bounce duration-300"
							/>
						</button>
						<p className="text-2xl font-medium">Settings</p>
					</div>
					<Settings />
				</main>
			</>
		);
	}
}
