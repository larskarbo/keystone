var React = require('react');

import _ from 'lodash';
import { findDOMNode } from 'react-dom';

var Button = require('elemental').Button;
var FormField = require('elemental').FormField;
var FormInput = require('elemental').FormInput;

var lastId = 0;
var ENTER_KEYCODE = 13;

function newItem (value) {
	lastId = lastId + 1;
	if (typeof value === 'string') {
		var splitted = value.split('§§');
		value = {
			title: splitted[0],
			description: splitted[1],
			price: splitted[2],
		};
	}
	var def = {
		title: '',
		description: '',
		price: 0,
	};
	return {
		key: 'i' + lastId,
		value: Object.assign(def, value),
	};
}

function reduceValues (values) {
	return values.map(i => i.value);
}

module.exports = {
	getInitialState: function () {
		return {
			values: Array.isArray(this.props.value) ? this.props.value.map(newItem) : [],
		};
	},

	componentWillReceiveProps: function (nextProps) {
		if (nextProps.value.join('|') !== reduceValues(this.state.values).join('|')) {
			this.setState({
				values: nextProps.value.map(newItem),
			});
		}
	},

	addItem: function () {
		var newValues = this.state.values.concat(newItem({}));
		this.setState({
			values: newValues,
		}, () => {
			if (!this.state.values.length) return;
			findDOMNode(this.refs['item_' + this.state.values.length]).focus();
		});
		this.valueChanged(reduceValues(newValues));
	},

	removeItem: function (i) {
		var newValues = _.without(this.state.values, i);
		this.setState({
			values: newValues,
		}, function () {
			findDOMNode(this.refs.button).focus();
		});
		this.valueChanged(reduceValues(newValues));
	},

	updateItem: function (i, prop, event) {
		var updatedValues = this.state.values;
		var updateIndex = updatedValues.indexOf(i);
		var newValue = event.value || event.target.value;
		updatedValues[updateIndex].value[prop] = newValue;
		console.log('updatedValues: ', updatedValues);
		this.setState({
			values: updatedValues,
		});
		this.valueChanged(reduceValues(updatedValues));
	},

	valueChanged: function (values) {
		this.props.onChange({
			path: this.props.path,
			value: values,
		});
		console.log('➡4', {
			path: this.props.path,
			value: values,
		});
	},

	renderField: function () {
		return (
			<div>
				{this.state.values.map(this.renderItem)}
				<Button ref="button" onClick={this.addItem}>Add item</Button>
			</div>
		);
	},

	renderItem: function (item, index) {
		const Input = FormInput;
		const value = item.value;
		return (
			<FormField key={item.key}>
                Tittel: <Input className="yotitle" name={'soap' + this.getInputName(this.props.path) + '$' + item.key + '$' + 'title'} value={value.title} onChange={this.updateItem.bind(this, item, 'title')} onKeyDown={this.addItemOnEnter} s />
                Beskrivelse: <Input className="yodescription" name={'soap' + this.getInputName(this.props.path) + '$' + item.key + '$' + 'description'} value={value.description} onChange={this.updateItem.bind(this, item, 'description')} onKeyDown={this.addItemOnEnter} s />
                Pris: <Input className="yoprice" name={'soap' + this.getInputName(this.props.path) + '$' + item.key + '$' + 'price'} value={value.price} onChange={this.updateItem.bind(this, item, 'price')} onKeyDown={this.addItemOnEnter} s />
				<Button type="link-cancel" onClick={this.removeItem.bind(this, item)} className="keystone-relational-button">
					<span className="octicon octicon-x" />
				</Button>
			</FormField>
		);
	},

	renderValue: function () {
		const Input = this.getInputComponent ? this.getInputComponent() : FormInput;
		return (
			<div>
				{this.state.values.map((item, i) => {
					const value = this.formatValue ? this.formatValue(item.value) : item.value;
					return (
						<div key={i} style={i ? { marginTop: '1em' } : null}>
							<Input noedit value={value} />
						</div>
					);
				})}
			</div>
		);
	},

    // Override shouldCollapse to check for array length
	shouldCollapse: function () {
		return this.props.collapse && !this.props.value.length;
	},

	addItemOnEnter: function (event) {
		if (event.keyCode === ENTER_KEYCODE) {
			this.addItem();
			event.preventDefault();
		}
	},
};
