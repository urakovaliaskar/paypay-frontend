import { format } from 'date-fns';

export default {
	filters: {
		dateFormat(date) {
			return date && format(new Date(date), 'dd.MM.yyyy');
		},
	},
};
