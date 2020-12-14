import React, { Component } from "react";
import "./App.less";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import router from "./../router/index";
export default class App extends Component {
	static propTypes = {};
	static defaultProps = {};
	render() {
		return (
			<div className="App">
				<Router>
					{router.map((routItem, index) => {
						return (
							<Route
								key={`router-${index}`}
								exact={routItem.exact}
								path={routItem.path}
								name={routItem.name}
								component={routItem.component}
							/>
						);
					})}
				</Router>
			</div>
		);
	}
}
