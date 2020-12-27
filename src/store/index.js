import { init } from "@rematch/core";
import Common from "./common";
import headerStore from "@/components/header/store";
import footerStore from "@/components/footer/store";
import homeStore from "@/app/home/store";
import productStore from "@/app/product/store";
import introductionStore from "@/app/introduction/store";
import infoStore from "@/app/info/store";
import newsStore from "@/app/news/store";
const store = init({
	models: {
		Common,
		headerStore,
		footerStore,
		homeStore,
		productStore,
		introductionStore,
		infoStore,
		newsStore,
	},
});

export default store;
