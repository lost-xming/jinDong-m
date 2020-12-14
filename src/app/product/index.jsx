import React, { Component } from "react";
import Header from "@/components/header/index";
import Footer from "@/components/footer/index";
import { Image, BackTop } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import VideoCom from "@/components/video/index";
import "./index.less";
export default class Product extends Component {
	static propTypes = {};
	static defaultProps = {};
	constructor(props) {
		super(props);
		this.state = {
			dataArr: [
				{
					url: "https://jd-buc-img.oss-cn-shenzhen.aliyuncs.com/product1.mp4",
					isVideo: true,
					position: {
						// 上
						flexDirection: "column",
						paddingTop: "20px",
					},
					textArr: [
						{
							text: "描述文字第一行",
							textStyle: {
								fontSize: "20px",
							},
						},
						{
							text: "描述文字第二行",
							textStyle: {
								fontSize: "10px",
							},
						},
					],
				},
				{
					url: require("./../../assets/product1.jpg").default,
					position: {
						// 下
						flexDirection: "column-reverse",
						paddingBottom: "20px",
					},
					textArr: [
						{
							text: "描述文字第一行",
							textStyle: {
								fontSize: "20px",
							},
						},
						{
							text: "描述文字第二行",
							textStyle: {
								fontSize: "10px",
							},
						},
					],
				},
				{
					url: "https://jd-buc-img.oss-cn-shenzhen.aliyuncs.com/product2.mp4",
					isVideo: true,
					position: {
						// 上
						flexDirection: "column",
						paddingTop: "20px",
					},
					textArr: [
						{
							text: "描述文字第一行",
							textStyle: {
								fontSize: "20px",
							},
						},
						{
							text: "描述文字第二行",
							textStyle: {
								fontSize: "10px",
							},
						},
					],
				},
				{
					url: require("./../../assets/product2.jpg").default,
					position: {
						// 上
						// flexDirection: "column",
						// paddingTop: '30px',
						// 右
						// justifyContent: "flex-end",
						// paddingRight: "30px",
						// 下
						// flexDirection: "column-reverse",
						// paddingBottom: "40px",
						// 左
						paddingLeft: "20px",
					},
					textArr: [
						{
							text: "描述文字第一行",
							textStyle: {
								fontSize: "20px",
							},
						},
						{
							text: "描述文字第二行",
							textStyle: {
								fontSize: "10px",
							},
						},
					],
				},
				{
					url: require("./../../assets/product3.jpg").default,
					position: {
						// 右
						justifyContent: "flex-end",
						paddingRight: "20px",
					},
					textArr: [
						{
							text: "描述文字第一行",
							textStyle: {
								fontSize: "20px",
							},
						},
						{
							text: "描述文字第二行",
							textStyle: {
								fontSize: "10px",
							},
						},
					],
				},
			],
		};
	}
	componentDidMount() {}
	componentWillUnmount() {}
	_renderItem = (itemNode, item, index) => {
		return (
			<div key={`item-${index}`} className="product-option">
				{itemNode}
				<div className="product-text" style={item.position}>
					<div>
						{item.textArr &&
							item.textArr.map((value, ind) => {
								return (
									<div
										className="product-text-value"
										key={`value-${ind}`}
										style={value.textStyle}
									>
										{value.text}
									</div>
								);
							})}
					</div>
				</div>
			</div>
		);
	};
	render() {
		const { dataArr } = this.state;
		return (
			<div
				className="product-box"
				id="handelDocID"
				style={{ maxHeight: "calc(100vh)", overflowY: "auto" }}
			>
				<Header />
				{dataArr.map((item, index) => {
					if (item.isVideo) {
						return this._renderItem(
							<div className="product-video-style">
								<VideoCom url={item.url} />
							</div>,
							item,
							index
						);
					} else {
						return this._renderItem(
							<Image width={"100vw"} src={item.url} />,
							item,
							index
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
