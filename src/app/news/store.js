import Service from "./Service";

export default {
	state: {},
	reducers: {
		setStateData(state, data) {
			return { ...state, ...data };
		},
	},
	effects: {
		async getListData(params) {
			const { result = {} } = await Service.getListData(params);
			const { data } = result;
			return data;
		},
		async getDetailData(params) {
			const { result = {} } = await Service.getDetailData(params);
			const { data } = result;
			return data;
		},
	},
};
