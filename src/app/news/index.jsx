import React, { Component } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Image, BackTop, Card, Space } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import "./index.less";
const { Meta } = Card;
export default class Info extends Component {
	static propTypes = {};
	static defaultProps = {};
	constructor(props) {
		super(props);
		this.state = {
			cardArr: [
				{
					title: "Europe Street beat",
					desc: "www.instagram.com",
					src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
					href: "/newsInfo/1",
				},
				{
					title: "Europe Street beat",
					desc: "www.instagram.com",
					src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
					href: "/newsInfo/2",
				},
				{
					title: "Europe Street beat",
					desc: "www.instagram.com",
					src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
					href: "/newsInfo/3",
				},
				{
					title: "Europe Street beat",
					desc: "www.instagram.com",
					src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
					href: "/newsInfo/4",
				},
				{
					title: "Europe Street beat",
					desc: "www.instagram.com",
					src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
					href: "/newsInfo/5",
				},
			],
		};
	}
	componentDidMount() {}
	componentWillUnmount() {}
	onCardAction = (item) => {
		window.open(item.href);
	};
	render() {
		const { cardArr } = this.state;
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
								{cardArr.map((item, index) => {
									return (
										<Card
											key={`card-${index}`}
											className="news-card-list-item"
											hoverable
											style={{ width: 240 }}
											onClick={() => this.onCardAction(item)}
											cover={<img alt="card" src={item.src} />}
										>
											<Meta title={item.title} description={item.desc} />
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
