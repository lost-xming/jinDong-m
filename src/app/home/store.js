import Service from "./Service";

export default {
	state: {},
	reducers: {
		setStateData(state, data) {
			return { ...state, ...data };
		},
	},
	effects: {
		async getData(params) {
			const { result = {} } = await Service.getData(params);
			const { data } = result;
			return data;
		},
	},
};
