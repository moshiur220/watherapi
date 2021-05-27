import Button from '@material-ui/core/Button';
import React from 'react';

export default class Sbutton extends React.Component {
	render() {
		const theButton = (this.props.isDisabled) ? 
			<Button variant="contained" fullWidth color="primary" disabled>
				<span>{this.props.btnCopy}</span>
			</Button> 
			: 
			<Button variant="contained" color="secondary" fullWidth onClick={this.props.clickHandler}>
				<span>{this.props.btnCopy}</span>
			</Button>	

		return (
			theButton
		);
	}
}