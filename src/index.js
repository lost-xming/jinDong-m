import React from "react";
import ReactDOM from "react-dom";
import { ConfigProvider, message } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import "./index.less";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import "lib-flexible";
import { Provider } from "react-redux";
// 引入创建好的store实例
import store from "@/store/index.js";
message.config({
	top: "45%",
	duration: 3,
	maxCount: 1,
});

ReactDOM.render(
	<ConfigProvider locale={zhCN}>
		<Provider store={store}>
			<App />
		</Provider>
	</ConfigProvider>,
	document.getElementById("root")
);

reportWebVitals();
