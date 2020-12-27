import asyncComponent from "../components/asyncComponent";
import Home from "../app/home/index";
const Product = asyncComponent(() => {
	return import("../app/product/index");
});
const Introduction = asyncComponent(() => {
	return import("../app/introduction/index");
});
const Info = asyncComponent(() => {
	return import("../app/info/index");
});

const News = asyncComponent(() => {
	return import("../app/news/index");
});

const NewsInfo = asyncComponent(() => {
	return import("../app/news/detail");
});

const routes = [
	{
		path: "/",
		name: "home",
		title: "首页",
		component: Home,
		exact: true,
	},
	{
		path: "/product",
		name: "product",
		title: "产品中心",
		component: Product,
	},
	{
		path: "/introduction",
		name: "introduction",
		title: "了解锦东",
		component: Introduction,
	},
	{
		path: "/info",
		name: "info",
		title: "公司简介",
		component: Info,
	},
	{
		path: "/news",
		name: "news",
		title: "新闻中心",
		component: News,
	},
	{
		path: "/newsInfo/:id",
		name: "newsInfo",
		notRender: true,
		component: NewsInfo,
	},
];

export default routes;
