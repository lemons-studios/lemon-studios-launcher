"use client";
import { readBinaryFile, BaseDirectory } from "@tauri-apps/api/fs";
import { appWindow } from "@tauri-apps/api/window";
import React from "react";

appWindow.setDecorations(true);

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	async componentDidMount() {}
	render() {
		return <main></main>;
	}
}
