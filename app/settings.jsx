import React from "react";
import { Checkbox } from "./components/winui.jsx";

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
				<Checkbox color={this.props.dark ? this.props.colors.accentLight2 : this.props.colors.accentDark1} />
			</>
		);
	}
}
