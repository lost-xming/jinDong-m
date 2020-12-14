import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import "lib-flexible";

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);

reportWebVitals();
