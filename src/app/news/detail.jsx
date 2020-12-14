import React, { Component } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Image, BackTop } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import "./index.less";
export default class Info extends Component {
	static propTypes = {};
	static defaultProps = {};
	constructor(props) {
		super(props);
		this.state = {
			name: "Europe Street beat",
			desc:
				"这里是文章简介这里是文章简介这里是文章简介这里是文章简介这里是文章简介这里是文章简这里是文章简介这里是文章简介这里是文章简介介这里是文章简介",
			timer: "2020年11月30日",
			content: [
				"这里是文章详情@Home平台，该平台包含一个创新的，支持IoT的智能家居产品生态系统，以及一系列补充性消费品和增值业务。该平台为进入消费者家庭提供了一个有吸引力的切入点，使消费者能够以直观和类人的方式与广泛的物联网产品进行智能交互，从而使日常生活更加便利，高效和愉快，同时使我们能够发展家庭用户群并捕获家庭环境中各种其他由场景驱动的消费事件",
				"这里是文章详情@Home平台，该平台包含一个创新的，支持IoT的智能家居产品生态系统，以及一系列补充性消费品和增值业务。该平台为进入消费者家庭提供了一个有吸引力的切入点，使消费者能够以直观和类人的方式与广泛的物联网产品进行智能交互，从而使日常生活更加便利，高效和愉快，同时使我们能够发展家庭用户群并捕获家庭环境中各种其他由场景驱动的消费事件",
				"这里是文章详情@Home平台，该平台包含一个创新的，支持IoT的智能家居产品生态系统，以及一系列补充性消费品和增值业务。该平台为进入消费者家庭提供了一个有吸引力的切入点，使消费者能够以直观和类人的方式与广泛的物联网产品进行智能交互，从而使日常生活更加便利，高效和愉快，同时使我们能够发展家庭用户群并捕获家庭环境中各种其他由场景驱动的消费事件",
			],
		};
	}
	componentDidMount() {
		this.initData();
	}
	initData = () => {
		const { location = {} } = this.props;
		const { params = {} } = location;
		const { id } = params;
	};
	onCardAction = (item) => {
		window.open(item.href);
	};
	render() {
		const { name, desc, timer, content } = this.state;
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
							<div className="news-desc">{desc}</div>
							{content.map((item, index) => {
								return <p className="news-item-p">{item}</p>;
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
