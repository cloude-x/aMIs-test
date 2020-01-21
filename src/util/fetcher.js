import axios from 'axios';
import { Toast } from 'antd-mobile';

/* aMis 请求接口函数自定义
param 接口传参，请求参数
param = {
    url,
    method,
    data,
    config
}
formatFunc 格式化数据函数，根据不同数据的要求传入不同的格式化函数
curd类型必须要返回items/rows
*/

export default ({
    url,
    method,
    data,
    config
} = {}, formatFunc = null) => {
    config = config || {};
    config.headers = config.headers || {};
    config.withCredentials = true;

    let renderType = data?.renderType || '';
    /* 如果是分页数据，对分页数据做处理 */
    if (data?.data?.offset && data?.data?.limit) {
        const offset = Number(data?.page || 1) - 1;
        const limit = Number(data?.perPage) || data?.data?.limit;
        data.data.offset = offset * limit;
        data.data.limit = limit;
    }

    /* 搜索接口做参数筛选，传固定参数filterCondition（筛选条件，如员工姓名-name），filterValue（筛选值，如：徐晃） */
    if (data?.filterCondition && data?.filterValue) {
        data.data.domain = [[data.filterCondition, "ilike", data.filterValue]];
        delete data.filterCondition;
        delete data.filterValue;
    }

    /*
    if (process.env.NODE_ENV === "production") {
        "context": {
            "lang": "zh_CN",
            "tz": "Asia/Shanghai",
            "uid": 1,
            "params": {
                "action": "7a1d1ea5-46c6-41d9-8588-faf064bb5692",
                "page": 0,
                "limit": 20,
                "view_type": "list",
                "model": "hr.employee",
                "_push_me": false,
            },
            "form_view_ref": "hr_base.view_employee_form",
            "tree_view_ref": "hr_base.view_employee_tree",
            "search_view_ref": "hr_base.view_employee_filter",
            "readonly_bypass": ["inner_working_age", "social_working_age", "employee_number", "current_tax_month"],
            "search_default_employee_active": 1,
            "all_employee": 1,
            "_search_order_by": "employee_number",
            "bin_size": true
        }
    }*/

    console.log(900000009, {url: url, method: method, data: data, config: config})
    if (method !== 'post' && method !== 'put' && method !== 'patch') {
        const findParam = url.indexOf('?');
        if (findParam !== -1) {
            data = url.substring(findParam + 1).split("&").map(p => {return {[p.split("=")[0]]: p.split("=")[1]}})
        }

        if (data) {
            config.params = data;
        }

        renderType = data?.renderType || '';
    } else if (data && data instanceof FormData) {
        // config.headers = config.headers || {};
        // config.headers['Content-Type'] = 'multipart/form-data';
    } else if (data
        && typeof data !== 'string'
        && !(data instanceof Blob)
        && !(data instanceof ArrayBuffer)
    ) {
        /* 对编辑接口的数组项进行反序列化。 aMis fetcher 参数的数组项为对象时不会进行序列化，而为非数组项时会序列化 */
        if (data?.data?.args && typeof data.data.args[0] === 'string') {
            data.data.args[0] = JSON.parse(data?.data?.args[0])
        }
        data = JSON.stringify(data);
        config.headers['Content-Type'] = 'application/json';
    }
    console.log(999999999, {url: url, method: method, data: data, config: config})
    return axios[method](url, data, config)
    .then(res => {
        console.log('------', res)
        let payload = {
            status: res?.status === 200 ? 0 : res?.status,
            msg: res?.statusText,
            data: res?.data?.data || {},
        };

        /* 确定数据返回类型，指定接口data传值 */
        /* 增删改查 */
        if (renderType && renderType === 'crud') {
            const data = res?.data?.data;
            const records = data?.records;
            
            payload.data = {
                items: records || [],
                count: records?.length || 0,
                total: data?.length || 0,
            }
        }
        
        const result = {
            ...res,
            data: payload
        }
        console.log(78787878, result)
        console.log(91111119, payload.data)

        return {
            ...res,
            data: payload
        }
    })
    .catch(err => {
        Toast.info(`${err}`, 3);
    });
}