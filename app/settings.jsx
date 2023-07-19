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
				<Checkbox color={this.state.darkTheme ? this.state.accentColors.accentLight2 : this.state.accentColors.accentDark1} />
			</>
		);
	}
}
