import React, { Component } from "react";
import { Button, Image, Modal } from "antd";
import { withRouter } from "react-router";
import { WechatOutlined } from "@ant-design/icons";
import "./index.less";
class Footer extends Component {
	static propTypes = {};
	static defaultProps = {};
	constructor(props) {
		super(props);
		this.state = {
			list: [
				{
					title: "全屋互联网家电",
					itemArr: [
						{
							title: "互联网空调",
							href: "1111",
						},
						{
							title: "互联网空调",
							href: "2222",
						},
						{
							title: "互联网空调",
							href: "3333",
						},
					],
				},
				{
					title: "全屋互联网家电",
					itemArr: [
						{
							title: "互联网空调",
							href: "1111",
						},
						{
							title: "互联网空调",
							href: "2222",
						},
						{
							title: "互联网空调",
							href: "3333",
						},
					],
				},
				{
					title: "全屋互联网家电",
					itemArr: [
						{
							title: "互联网空调",
							href: "1111",
						},
						{
							title: "互联网空调",
							href: "2222",
						},
						{
							title: "互联网空调",
							href: "3333",
						},
					],
				},
				{
					title: "全屋互联网家电",
					itemArr: [
						{
							title: "互联网空调",
							href: "1111",
						},
						{
							title: "互联网空调",
							href: "2222",
						},
						{
							title: "互联网空调",
							href: "3333",
						},
					],
				},
			],
			modalVisible: false,
		};
	}
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
								{item.itemArr &&
									item.itemArr.map((value, ind) => {
										return (
											<div key={`value-${ind}`}>
												<Button
													type="link"
													size="small"
													onClick={() => {
														this.props.history.push(value.href);
													}}
													className="footer-flex-item-list"
												>
													{value.title}
												</Button>
											</div>
										);
									})}
							</div>
						);
					})}
				</div>
				<div key="item-kefu" className="footer-flex-kefu">
					<h3>客服电话 : 0769-22225669</h3>
					<h3>消费维权热线 : 0769-22225669</h3>
					<h3>举报邮箱 : jindong2020@126.com</h3>
					<h3>公司地址 : 广东省东莞市松山湖中科创新广场E座804</h3>
					<h3 onClick={this.onWeiChat}>
						扫码进入锦东商城 <WechatOutlined className="footer-wchat" />
					</h3>
					<div></div>
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

export default withRouter(Footer);
