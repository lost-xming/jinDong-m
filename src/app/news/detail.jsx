import React, { Component } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { connect } from "react-redux";
import Proptypes from "prop-types";
import { Image, BackTop } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import "./index.less";
class NewsDetail extends Component {
	static propTypes = {
		getDetailData: Proptypes.func,
	};
	static defaultProps = {
		getDetailData: () => {},
	};
	constructor(props) {
		super(props);
		this.state = {
			data: {},
		};
	}
	componentDidMount() {
		this.initData();
	}
	initData = async () => {
		const { location = {}, getDetailData } = this.props;
		const { params = {} } = location;
		const { id } = params;
		const data = await getDetailData({ id });
		this.setState({ data });
	};
	onCardAction = (item) => {
		window.open(item.href);
	};
	render() {
		const { data } = this.state;
		const { info, miaoshu, name, url, timer } = data;
		const newInfo = (info && info.split("<br  />")) || [];
		return (
			<div
				className="news-box"
				id="handelDocID"
				style={{ maxHeight: "calc(100vh)", overflowY: "auto" }}
			>
				<Header />
				<div className="news-bg">
					<Image
						width={"100vw"}
						height={"15vh"}
						src={require("../../assets/info-banner.jpg").default}
					/>
					<div className="news-h3">
						<h3>{name}</h3>
						<div className="news-timer">{timer}</div>
					</div>
				</div>
				<div className="news-content">
					<div className="news-content-bg">
						<div className="news-conten-card">
							<div className="news-desc">{miaoshu}</div>
							{newInfo.map((item, index) => {
								return (
									<p className="news-item-p" key={`newsinfo-=${index}`}>
										{item}
									</p>
								);
							})}
						</div>
					</div>
				</div>
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
		getDetailData: dispatch.newsStore.getDetailData,
	};
};
const mapState = (state) => {
	return {};
};
export default connect(mapState, mapDispatch)(NewsDetail);
