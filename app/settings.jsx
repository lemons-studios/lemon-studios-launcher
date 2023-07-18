import React from "react";

export class Settings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			settings: props.settings
		};
	}

	render() {
		return (
			<>
				<p className="text-xl font-medium">Installation</p>
			</>
		);
	}
}
