import ArrayFieldMixin from '../../mixins/superField';
import Field from '../Field';

module.exports = Field.create({
	displayName: 'ItemsField',
	statics: {
		type: 'Items',
	},
	mixins: [ArrayFieldMixin],
});
