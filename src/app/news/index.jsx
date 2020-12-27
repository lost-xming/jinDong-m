import React, { Component } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { connect } from "react-redux";
import Proptypes from "prop-types";
import { Image, BackTop, Card, Space } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import "./index.less";
const { Meta } = Card;
class Info extends Component {
	static propTypes = {
		getListData: Proptypes.func,
	};
	static defaultProps = {
		getListData: () => {},
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
		const { getListData } = this.props;
		const data = await getListData();
		this.setState({
			list: data,
		});
	};
	onCardAction = (item) => {
		this.props.history.push(`newsInfo/${item.id}`);
	};
	render() {
		const { list } = this.state;
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
						<h3>新闻中心</h3>
					</div>
				</div>
				<div className="news-content">
					<div className="news-content-bg">
						<div className="news-conten-card">
							<Space className="news-card-list" size={23}>
								{list.map((item, index) => {
									return (
										<Card
											key={`card-${index}`}
											className="news-card-list-item"
											hoverable
											style={{ width: 240 }}
											onClick={() => this.onCardAction(item)}
											cover={<img alt="card" src={item.url} />}
										>
											<Meta title={item.name} description={item.miaoshu} />
										</Card>
									);
								})}
							</Space>
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
		getListData: dispatch.newsStore.getListData,
	};
};
const mapState = (state) => {
	return {};
};
export default connect(mapState, mapDispatch)(Info);
