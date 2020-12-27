import Axios from "axios";
import _forEach from "lodash.foreach";
import _isEmpty from "lodash.isempty";
import CONFIOG from "@/config/config";
import { message } from "antd";
let requestingCount = 0;
class AXIOS {
	constructor() {
		this.axios = Axios.create();
		this.initInterceptors();
		// 存放令牌
		this.sources = [];
		this.CancelToken = Axios.CancelToken;
	}
	static METHOD = {
		GET: "GET",
		POST: "POST",
	};
	/**
	 * 获取当前所处环境。
	 * 通过配置node环境变量来获取
	 * 暂定
	 * 开发环境： development
	 * 线上环境： production
	 * @return string
	 */
	getEnv = () => {
		return process.env.CURRENT_ENV || "production";
	};
	/**
	 * @param {依照环境生成域名} type  string
	 */
	genDomainForEnv = (type) => {
		const env = this.getEnv();
		const typeJson = {
			default: `${CONFIOG[env].apiUrl}${CONFIOG[env].apiUrlFilter}`,
			auth: `${CONFIOG[env].authUrl}${CONFIOG[env].authUrlFilter}`,
			im: `${CONFIOG[env].imUrl}`,
		};
		return typeJson[type];
	};

	GET = (url, data, opt) => {
		const option = {
			urlType: "default",
			key: null,
			isShowPermissionPage: false,
			handleError: false,
			mask: false,
			...opt,
		};
		return new Promise((resolve, reject) => {
			const newUrl =
				url.indexOf("http:") > -1
					? url
					: `${this.genDomainForEnv(option.urlType)}${url}`;
			return this.HTTP(
				AXIOS.METHOD.GET,
				newUrl,
				data,
				"json",
				option.key,
				option.mask,
				option.withCredentials
			).then(
				(res) => {
					resolve(res);
				},
				(error) => {
					reject(error);
					message.error(error.reason);
				}
			);
		});
	};

	POST = (url, data, opt) => {
		const option = {
			urlType: "default",
			key: null,
			type: "json",
			mask: false,
			...opt,
		};
		return new Promise((resolve, reject) => {
			const newUrl =
				url.indexOf("http:") > -1
					? url
					: `${this.genDomainForEnv(option.urlType)}${url}`;
			return this.HTTP(
				AXIOS.METHOD.POST,
				newUrl,
				data,
				option.type,
				option.key,
				option.isShowPermissionPage,
				option.handleError,
				option.mask,
				option.withCredentials
			).then(
				(res) => {
					resolve(res);
				},
				(error) => {
					reject(error);
					message.error(error.reason);
				}
			);
		});
	};

	HTTP = (method, url, data, type = "json", ...others) => {
		if (!url) return null;
		const { key, mask, withCredentials } = others;
		const send = this.axios.request;
		const config = this.getHttpConfig(
			this.genCancelConf(key),
			withCredentials,
			method,
			url,
			data,
			type
		);
		return new Promise((resolve, reject) => {
			send({ ...config, mask })
				.then((resp) => {
					const respData = resp.data || resp.result; // 响应结果
					// 删除已经完成的请求key
					this.delCancelHandler(config.key);
					// 返回 message
					const resMsg = respData.message || respData.msg;
					// 返回 code
					const { code } = respData;
					let msg = ""; // 默认错误提示
					switch (code) {
						case "0":
						case 0:
							resolve(respData);
							break;
						default:
							switch (code) {
								case -1:
									msg = "账号未登录";
									// 清除 storage
									localStorage.setItem("userInfo", JSON.stringify({}));
									window.location.href = "/login";
									break;
							}
							reject({
								error: -100,
								code: respData.code,
								reason: resMsg || msg,
								data: respData.data,
							});
					}
				})
				.catch((err) => {
					reject({
						error: -1,
						reason: `网络异常或服务器错误: [${err.message}]`,
					});
				});
		});
	};

	/**
	 * 取消掉请求
	 */
	CANCEL = (key, msg = "用户手动取消") => {
		const source = this.findSource(key);

		if (source) {
			source.cancel(msg);
			this.delCancelHandler(key);
		}
	};
	/**
	 * @param {新窗口打开短链接} url
	 * @param {传递 Object 参数} data
	 */
	OPENDATAURL = (url, data) => {
		let sendURL = `${this.genDomainForEnv("default")}${url}`;
		const dealData = {};
		_forEach(data, (val, key) => {
			if (!(typeof val === "undefined" || val === "")) {
				dealData[key] = val;
			}
		});
		const queryData = `?data=${JSON.stringify(dealData)}`;
		sendURL += queryData;
		window.open(encodeURI(sendURL));
	};
	/**
	 * @param {新窗口打开短链接} url
	 * @param {用&连接 Object 参数} data
	 */
	OPENURLGET = (url, data) => {
		let sendURL = `${this.genDomainForEnv("default")}${url}`;
		sendURL += this.genQuery(data);
		window.open(sendURL);
	};

	/**
	 * 初始化全局拦截器
	 */
	initInterceptors = () => {
		this.axios.interceptors.request.use(
			(request) => {
				if (requestingCount <= 0) {
					requestingCount = 0;
					if (request.mask) {
						// loading.show();
					}
				}
				requestingCount += 1;
				return request;
			},
			// eslint-disable-next-line arrow-parens
			(error) => {
				// loading.hide();
				message.error(error);
			}
		);
		this.axios.interceptors.response.use(
			(response) => {
				if (requestingCount > 0) {
					requestingCount -= 1;
				}
				if (requestingCount === 0) {
					// loading.hide();
				}
				return response;
			},
			(error) => {
				// loading.hide();
				try {
					return Promise.reject(error.response.data);
				} catch (e) {
					// 处理超时
					if (
						error.code === "ECONNABORTED" &&
						error.message.indexOf("timeout") >= 0
					) {
						// 覆盖超时信息
						error.message = "请求超时，请刷新页面";
					}
					// 处理取消请求等错误
					return Promise.reject(error);
				}
			}
		);
	};
	/**
	 * @param {获取http请求配置} specificConf
	 */
	getHttpConfig = (
		specificConf,
		withCredentials = true,
		method,
		url,
		data,
		type
	) => {
		let sendURL = url;
		const config = Object.assign(
			{},
			{
				url: sendURL,
				withCredentials,
				method,
			},
			specificConf
		);
		if (method === AXIOS.METHOD.GET) {
			sendURL += this.genQuery(data);
			config.url = sendURL;
		} else {
			let contentType = "";
			let cfgData = data;
			switch (type) {
				case "json":
					contentType = "application/json";
					_forEach(data, (val, key) => {
						if (val === undefined) {
							delete data[key];
						}
					});
					cfgData = JSON.stringify(data || {});
					break;
				case "file":
					contentType = "multipart/form-data";
					cfgData = new FormData();
					_forEach(data, (val, key) => {
						cfgData.append(key, val);
					});
					break;
				case "formData":
					contentType = "application/x-www-form-urlencoded";
					config.transformRequest = [
						(requestData) => {
							let ret = "";
							let index = 0;
							_forEach(requestData, (v, k) => {
								ret += `${index === 0 ? "" : "&"}${encodeURIComponent(
									k
								)}=${encodeURIComponent(v)}`;
								index += 1;
							});
							return ret;
						},
					];
					break;
				default:
					break;
			}
			config.headers = { "Content-Type": contentType };
			config.data = cfgData;
		}
		return config;
	};
	/**
	 * @param {*} queryData
	 */
	genQuery = (queryData) => {
		if (_isEmpty(queryData)) return "";
		let ret = "";
		// 防止接口缓存，加上时间戳
		queryData.timestamp = new Date().getTime();
		_forEach(queryData, (val, key) => {
			if (typeof val !== "undefined") {
				ret += `&${key}=${encodeURIComponent(val)}`;
			}
		});
		return ret.replace(/&/, "?");
	};
	/**
	 * @param {生成cancelToken或者超时设置} key
	 */
	genCancelConf = (key) => {
		const config = {};
		const keyType = typeof key;
		// key为string类型并且重复了，则直接返回空对象
		// key为number类型是设置超时，所以重复了不影响请求
		if (keyType === "string" && !this.checkKey(key)) {
			return config;
		}

		if (keyType === "string" && key) {
			// 处理取消请求
			const token = new this.CancelToken((c) => {
				this.sources.push({
					key,
					cancel: c,
				});
			});
			config.cancelToken = token;
			config.key = key;
		} else if (keyType === "number") {
			// 处理超时
			config.timeout = key;
		}
		return config;
	};
	/**
	 * @param {通过key来找到token} key
	 */
	findSource = (key) => {
		return this.sources.find((s) => {
			return s.key === key;
		});
	};
	/**
	 * @param {检查key是否重复} key
	 */
	checkKey = (key) => {
		return this.findSource(key) === undefined;
	};
	/**
	 * @param {删去已经完成的promise对应的key} key
	 */
	delCancelHandler = (key) => {
		this.sources = this.sources.filter((source) => {
			return source.key !== key;
		});
	};
}

const AXIOSSERVER = new AXIOS();
export const { GET, POST, CANCEL, OPENDATAURL, OPENURLGET } = AXIOSSERVER;
