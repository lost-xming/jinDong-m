const CONFIG = {
	development: {
		targetUrl: "http://sever.jddianqi.cn",
		apiUrl: "http://sever.jddianqi.cn",
		apiUrlFilter: "/adminApi",
		proxyFilter: "/adminApi",
		imUrl: "https://jd-buc-img.oss-cn-shenzhen.aliyuncs.com",
		autoOpenBrowser: true,
	},
	prodDev: {
		apiUrl: "http://sever.jddianqi.cn",
		apiUrlFilter: "/adminApi",
		imUrl: "https://jd-buc-img.oss-cn-shenzhen.aliyuncs.com",
	},
	test: {
		apiUrl: "http://sever.jddianqi.cn",
		apiUrlFilter: "/adminApi",
		imUrl: "https:///pt-test.bthome.com/appApi/apis",
	},
	production: {
		apiUrl: "http://sever.jddianqi.cn",
		apiUrlFilter: "/adminApi",
		imUrl: "https:///pt-test.bthome.com/appApi/apis",
	},
};
export default CONFIG;
