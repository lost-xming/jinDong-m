import React, { Component } from "react";
import Header from "@/components/header/index";
import Footer from "@/components/footer/index";
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
					href: "/newsInfo/5",
				},
				{
					title: "Europe Street beat",
					desc: "www.instagram.com",
					src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
					href: "/newsInfo/5",
				},
				{
					title: "Europe Street beat",
					desc: "www.instagram.com",
					src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
					href: "/newsInfo/5",
				},
				{
					title: "Europe Street beat",
					desc: "www.instagram.com",
					src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
					href: "/newsInfo/5",
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
				className="info-box"
				id="handelDocID"
				style={{ maxHeight: "calc(100vh)", overflowY: "auto" }}
			>
				<Header />
				<div className="info-bg">
					<Image
						width={"100vw"}
						height={"15vh"}
						src={require("../../assets/info-banner.jpg").default}
					/>
					<h3>公司概况</h3>
				</div>
				<div className="info-content">
					<div className="info-content-bg">
						<div className="info-conten-card">
							<div className="info-card-text">
								<h1>公司简介</h1>
								<p>
									2019年中国广东锦东电器研发团队发明了一种新型食物垃圾处理器，锦东2008年成立厨余垃圾处理器研发团队借鉴直升飞机传动原理，1927年美国约翰.汉默斯发明了世界上第一台锤击式垃圾处理器，很快的在西方国家得到流行与使用。但是由于东西方饮食文化的差异，导致此产品在中国水土不服，其在运行过程中由于工作原理原因，锤头极易被绕死，锤击噪音大，易卡机，容易烧损电机。
								</p>
								<p>
									由于颗粒大堵塞下水道，另外很多壳类、大骨头、长纤维蔬菜等垃圾极难处理。
									基于以上问题锦东电器研发团队颠覆美国发明原理构造，利用离心剪切原理，采用齿轮箱带动双刀盘正反向剪切垃圾。从而克服了锤击式的各种大大小小的毛病，处理速度快，颗粒小，基本涵盖所有的食物垃圾。此发明已经得到国家的发明专利认证。
								</p>
								<p>
									创新研发双向离心剪切原理，攻克食物垃圾处理器颗粒0.2mm、噪音60分贝、等多方面的技术难关，产品性能远超各进口品牌，励志成为国内最顶尖的厨余垃圾处理品牌。
								</p>
								<p>
									我们在中国的生产基地位于东莞，配备有全套的制造与检测设备，我们坚持"品质第一，用户至上"的理念，建立了一支强有力的的科研开发队伍，并与国内多家研究所建立密切的技术合作关系，开发高质量的产品和提供高品质的服务。我们遵循"精益求精，永无止境"的质量精神，不断提高改进产品质量,通过了CQC、CE欧盟等认证。
								</p>
							</div>
							<Space className="info-card-list" size={23}>
								{cardArr.map((item, index) => {
									return (
										<Card
											key={`card-${index}`}
											className="info-card-list-item"
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
