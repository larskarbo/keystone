import React, { Component, PropTypes } from 'react';


class CloudinaryWidgetInput extends Component {
	constructor () {
		super();

		this.clearValue = this.clearValue.bind(this);
		this.clickDomNode = this.clickDomNode.bind(this);
		this.hasValue = this.hasValue.bind(this);
	}
	clearValue () {
		this.target.value = '';
	}
	clickDomNode () {
		// $.cloudinary_upload_widget(
		//     { cloud_name: 'demo', upload_preset: 'a5vxnzbp', 
		//       cropping: false, folder: 'user_photos' },
		//     function(error, result) {
		//       console.log(error, result)
		//     });
	}
	hasValue () {
		return !!this.target.value;
	}
	render () {
		const { style, ...props } = this.props;
		const setRef = (n) => (this.target = n);
		const styles = {
			left: -9999,
			position: 'absolute',
			...style,
		};

		return (
			<input
				{...props}
				style={styles}
				ref={setRef}
				tabIndex="-1"
				type="hidden"
			/>
		);
	}
};

CloudinaryWidgetInput.propTypes = {
	onChange: PropTypes.func.isRequired,
};

module.exports = CloudinaryWidgetInput;
