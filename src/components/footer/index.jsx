import React, { Component } from "react";
import { connect } from "react-redux";
import Proptypes from "prop-types";
import { Button, Image, Modal } from "antd";
import { withRouter } from "react-router";
import { WechatOutlined } from "@ant-design/icons";
import "./index.less";
class Footer extends Component {
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
			modalVisible: false,
		};
	}
	componentDidMount() {
		this.initData();
	}
	initData = async () => {
		const { getData } = this.props;
		const data = await getData();
		this.setState({
			list: data.list,
		});
	};
	onWeiChat = () => {
		this.setState({
			modalVisible: true,
		});
	};
	onCancelModule = () => {
		this.setState({
			modalVisible: false,
		});
	};
	render() {
		const { list, modalVisible } = this.state;
		return (
			<div className="footer">
				<div className="footer-flex">
					{list.map((item, index) => {
						return (
							<div key={`item-${index}`} className="footer-flex-item">
								<h3>{item.title}</h3>
								{item.arr &&
									item.arr.map((value, ind) => {
										return (
											<div key={`value-${ind}`}>
												<Button
													type="link"
													size="small"
													onClick={() => {
														const hasHttp = /http|https/.test(value.url);
														if (hasHttp) {
															window.open(value.url);
														} else {
															this.props.history.push(value.url);
														}
													}}
													className="footer-flex-item-list"
												>
													{value.name}
												</Button>
											</div>
										);
									})}
							</div>
						);
					})}
				</div>
				<div key="item-kefu" className="footer-flex-kefu">
					<h3>客服电话 : 400-9151812</h3>
					<h3>消费维权热线 : 0769-22225669</h3>
					<h3>举报邮箱 : jindong2020@126.com</h3>
					<h3>公司地址 : 广东省东莞市松山湖中科创新广场E座804</h3>
					<h3 onClick={this.onWeiChat}>
						扫码进入锦东商城 <WechatOutlined className="footer-wchat" />
					</h3>
				</div>
				<div className="footer-desc">
					<div>© 2020 jddianqi.cn 广东锦东电器科技有限公司 </div>
					<div>粤ICP备2020118823号 粤公网安备 440300000000号</div>
				</div>
				<Modal
					width={300}
					title={<div style={{ fontSize: 20, padding: 10 }}>微信公众号</div>}
					maskClosable={true}
					visible={modalVisible}
					footer={null}
					closable={false}
					onCancel={this.onCancelModule}
				>
					<Image
						width={"100px"}
						src={`${
							require("./../../assets/gongzhonghao.jpg").default
						}?${Date.now()}`}
					/>
				</Modal>
			</div>
		);
	}
}

const mapDispatch = (dispatch) => {
	return {
		getData: dispatch.footerStore.getData,
	};
};
const mapState = (state) => {
	return {};
};
export default connect(mapState, mapDispatch)(withRouter(Footer));
