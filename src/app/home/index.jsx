import React, { Component } from "react";
import { connect } from "react-redux";
import Proptypes from "prop-types";
import Header from "@/components/header/index";
import Footer from "@/components/footer/index";
import ReactPlayer from "react-player";
import { Image, BackTop } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import VideoCom from "@/components/video/index";
import "./index.less";
class Home extends Component {
	static propTypes = {
		getData: Proptypes.func,
	};
	static defaultProps = {
		getData: () => {},
	};
	constructor(props) {
		super(props);
		this.state = {
			list: [],
		};
	}
	componentDidMount() {
		this.initData();
	}
	initData = async () => {
		const { getData } = this.props;
		const { list } = await getData();
		const newArr = [];
		list.map((item) => {
			const newItem = item[item.length - 1];
			if (newItem.url || (newItem.response && newItem.response.data.imageUrl)) {
				newArr.push({
					url: newItem.url || newItem.response.data.imageUrl,
					type: newItem.type || "image",
				});
			}
			return null;
		});
		this.setState({
			list: newArr,
		});
	};
	render() {
		const { list } = this.state;
		return (
			<div
				className="home-box"
				id="handelDocID"
				style={{ maxHeight: "calc(100vh)", overflowY: "auto" }}
			>
				<Header />
				{list.map((item, index) => {
					if (item.type.indexOf("image") > -1) {
						return (
							<div key={`home-${index}`} className="index-option">
								<Image width={"100vw"} src={item.url} />
							</div>
						);
					}
					if (item.type.indexOf("video") > -1) {
						return (
							<div
								key={`home-${index}`}
								className={`index-option ${index !== 0 ? "index-video2" : ""}`}
							>
								<VideoCom url={item.url} />
							</div>
						);
					}
				})}
				<BackTop
					visibilityHeight={300}
					target={() => document.getElementById("handelDocID")}
				>
					<div className="backUp">
						<ArrowUpOutlined className="backUp-icon" />
					</div>
				</BackTop>
				<Footer />
			</div>
		);
	}
}
const mapDispatch = (dispatch) => {
	return {
		getData: dispatch.homeStore.getData,
	};
};
const mapState = (state) => {
	return {};
};
export default connect(mapState, mapDispatch)(Home);
