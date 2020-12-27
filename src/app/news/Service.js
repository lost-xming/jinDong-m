import { GET, POST } from "@/axios";
import CommonService from "@/store/CommonService";
import { apiUrl } from "@/config/index";
class Service extends CommonService {
	getListData(params) {
		return GET(`${apiUrl}/news/list`, params);
	}
	getDetailData(params) {
		return GET(`${apiUrl}/news/detail`, params);
	}
}

export default new Service();
