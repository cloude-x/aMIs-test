import React, { Component } from 'react';
import axios from 'axios';
import { render as renderAmis } from 'amis';

import fetcher from '@util/fetcher';

import crud from './mock/crud.json';
import page from './mock/page.json';
import composing from './mock/composing.json';
import './amis.css'
import './amis-default.css'

const MAP = {
    "1": crud,
    "2": page,
    "3": composing,
}

export default class Home extends Component {
    state = {
        currentIndex: this.paramId || 0,
        axiosResponse: '',
        aMisData: null,
    }

    /* 接口验证字段 */
    identication = {
        "info": {
            "systemModel": "PC",
            "systemVersion": "9.1"
        },
        "language": "zh_CN",
        "linkid": "f83ad7bbcbf145a3902c90bbd6751949",
        "session_id": "239416e0c17bcf3ebc3e329eea915060094bd7bb",
        "version": "2.4.0",
        "app_channel": "wx",
        "type": "session"
    }

    async componentDidMount() {
        /* 获取aMis josn配置数据 */
        // await this.getAMisData();

        /* 获取odoo员工列表 */
        // this.getEmployeeList();
    }

    /* 获取页面ID */
    get pageId () {
        return 1
        // return String(this.props.match.params.id)
    }

    get paramId () {
        const param = window.location.href.match(/paramId=(\d*)/);
        const paramId = param ? param[1] : 0;
        return Number(paramId);
    }

    /* 获取aMis josn配置数据 */
    async getAMisData() {
        const url = `/amis/testmsg/get`;
        // const url = `${window.location.protocol}//${window.location.hostname}:3001/aMis/test/get`;
        // const url = `${window.location.protocol}//${window.location.hostname}:3001/aMis/test/2/100`;
        console.log('api url', url);

        let axiosResponse = this.state.axiosResponse;
        await axios.get(url)
        .then(res => {
            console.log('------', res)
            this.setState({
                axiosResponse: `${axiosResponse}${url}   ----res---, ${JSON.stringify(res)}`,
                aMisData: res.data,
                currentIndex: 0,
            })
        })
        .catch(err => {
            console.log('+++++++', err)
            this.setState({
                axiosResponse: `${axiosResponse}${url}   +++error++++, ${JSON.stringify(err)}`,
            })
        })
    }

    /* 获取odoo员工列表 */
    getEmployeeList() {
        axios({
            method: 'post',
            url: '/web/dataset/search_read',
            data: {
                "identication": this.identication,
                "jsonrpc": "2.0",
                "method": "call",
                "data": {
                    "model": "hr.employee",
                    "fields": [
                    "employee_number",
                    "name",
                    "department_id",
                    "job_id",
                    "parent_id",
                    "dep_manager",
                    "employee_child_group",
                    "work_phone",
                    "hiredate",
                    "employee_now_rank",
                    "employee_type_rep",
                    "work_activity",
                    "id_type",
                    "identification_id",
                    "birthday",
                    "gender",
                    "age",
                    "country_id",
                    "cost_center",
                    "employee_group_rep",
                    "legal_entity",
                    "location_id",
                    "work_email",
                    "registered_permanent_residence",
                    "home_address",
                    "qywx_account",
                    "departure_time",
                    "probation_date",
                    "payroll_group_employee_ids",
                    "bank_account",
                    "is_probation",
                    "contract_id",
                    "x_belongteam",
                    "date_end",
                    "date_start",
                    "x_renyuanleixing",
                    "employment_form",
                    "parttime_employee_category",
                    "positive_time",
                    "highest_education",
                    "x_department_iddepartment_id_2",
                    "x_department_iddepartment_id_3",
                    "x_department_id_4",
                    "x_department_id_3",
                    "overtime_conf_id",
                    "attendance_area_id",
                    "holiday_package_id",
                    "qywx_syn_state",
                    "company_id"
                    ],
                    "domain": [],
                    "offset": 0,
                    "limit": 20,
                    "sort": ""
                },
                "id": 385038514
            }
        })
        .then(res => {
            console.log(' getEmployeeList (((((((())))))) ', res)
        })
        .catch(err => {
            console.log(' getEmployeeList ))))))))))))))) ', err)
        })
    }

    /* 增加odoo员工 */
    /* 调用之前更改手机号 */
    addEmployee = (workPhone = '13111111111') => {
        axios({
            method: 'post',
            url: '/web/dataset/call_kw/hr.employee/create',
            data: {
                "identication": this.identication,
                "jsonrpc": "2.0",
                "method": "call",
                "data": {
                    "model": "hr.employee",
                    "method": "create",
                    "args": [{
                        "image": false,
                        "image_name": false,
                        "name": "徐晃01",
                        "company_id": 1,
                        "legal_entity": false,
                        "department_id": 3174,
                        "x_department_type": false,
                        "cost_center": 200,
                        "job_id": 5733,
                        "is_leaving_post": false,
                        "parent_id": 2683,
                        "group_parent_id": false,
                        "project_parent_id": false,
                        "line_parent_id": false,
                        "x_hrbp": false,
                        "mentor_id": false,
                        "mobile_phone": false,
                        "x_oldstaffno": false,
                        "is_concurrent_post": false,
                        "org_unit_effective_time": false,
                        "job_effective_time": false,
                        "pinyin": false,
                        "first_name": false,
                        "last_name": false,
                        "work_phone": workPhone,
                        "work_email": false,
                        "personal_mobile": false,
                        "telephone": false,
                        "work_place": false,
                        "cinema": false,
                        "location_id": 9,
                        "office_new": false,
                        "office": false,
                        "function_id": false,
                        "hrbp_id": false,
                        "hiredate": "2020-01-14",
                        "group_hire_date": false,
                        "social_work_start_date": false,
                        "x_annual_leave_start": false,
                        "social_working_age_adjustment": 0,
                        "company_working_age_adjustment": 0,
                        "active": true,
                        "activated": false,
                        "x_original_unit": false,
                        "recruitment_channel": false,
                        "recruitment_source": false,
                        "employee_grade_id": false,
                        "employee_now_rank": false,
                        "employee_type_rep": 1,
                        "x_renyuanleixing": false,
                        "parttime_employee_category": false,
                        "employment_form": false,
                        "employee_group_rep": false,
                        "employee_child_group": false,
                        "category_ids": [],
                        "developing_direction": false,
                        "is_probation": false,
                        "probation_date": false,
                        "departure_time": false,
                        "is_probation_work": false,
                        "probation_days": 0,
                        "probation_state": "untreated",
                        "probation_end_date": false,
                        "country_id": 49,
                        "id_type": 2,
                        "identification_id": "12345762312526",
                        "id_address": false,
                        "id_duedate": false,
                        "id_duestartdate": false,
                        "issued_by": false,
                        "issued_at": false,
                        "home_address": false,
                        "home_zip": false,
                        "residence_permit": false,
                        "native_place": false,
                        "birth_place": false,
                        "registered_permanent_residence": false,
                        "x_baby_gift": false,
                        "x_baby_gift_times": 0,
                        "x_marriage_gift": false,
                        "x_marriage_gift_times": 0,
                        "medical_history": false,
                        "blood_type": false,
                        "permanent_residence": false,
                        "zodiac": false,
                        "interest": false,
                        "reserved_field_1": false,
                        "reserved_field_2": false,
                        "reserved_field_3": false,
                        "reserved_field_4": false,
                        "reserved_field_5": false,
                        "reserved_field_6": false,
                        "reserved_field_7": false,
                        "reserved_field_8": false,
                        "reserved_field_9": false,
                        "reserved_field_10": false,
                        "gender": "male",
                        "nation_id": false,
                        "birthday": "2020-01-13",
                        "personal_email": false,
                        "x_qq": false,
                        "x_weibo": false,
                        "home_phone": false,
                        "archive_address": false,
                        "health_status": false,
                        "marital": false,
                        "children": 0,
                        "x_child_name1": false,
                        "x_child_gender1": false,
                        "x_child_birthday1": false,
                        "x_child_name2": false,
                        "x_child_gender2": false,
                        "x_child_birthday2": false,
                        "political_id": false,
                        "party_time": false,
                        "x_health_condition": false,
                        "height": 0,
                        "weight": 0,
                        "bank_name": false,
                        "bank_account": false,
                        "bank_account_holder": false,
                        "bank_address1": false,
                        "bank_identification_number_type1": false,
                        "bank_identification_number1": false,
                        "bank_tag1": false,
                        "other_information1": false,
                        "bank_name2": false,
                        "bank_account2": false,
                        "bank_account_holder2": false,
                        "bank_address2": false,
                        "bank_identification_number_type2": false,
                        "bank_identification_number2": false,
                        "bank_tag2": false,
                        "other_information2": false,
                        "other_id_information": [],
                        "education_ids": [],
                        "worked_ids": [],
                        "contact_ids": [],
                        "title_ids": [],
                        "train_ids": [],
                        "rewards_and_punishments_ids": [],
                        "conflict_of_interest_company_name1": false,
                        "conflict_of_interest_company_job1": false,
                        "conflict_of_interest_company_stock1": false,
                        "conflict_of_interest_company_name3": false,
                        "conflict_of_interest_company_job3": false,
                        "conflict_of_interest_company_stock3": false,
                        "conflict_of_interest_company_name2": false,
                        "conflict_of_interest_company_job2": false,
                        "conflict_of_interest_company_stock2": false,
                        "external_part_time_company_name1": false,
                        "external_part_time_company_job1": false,
                        "external_part_time_company_time1": false,
                        "external_part_time_company_content1": false,
                        "external_part_time_company_name2": false,
                        "external_part_time_company_job2": false,
                        "external_part_time_company_time2": false,
                        "external_part_time_company_content2": false,
                        "relatives_equity_relationship1": false,
                        "family_owned_company1": false,
                        "relatives_equity_relationship_way1": false,
                        "relatives_equity_relationship_number1": false,
                        "relatives_equity_relationship2": false,
                        "family_owned_company2": false,
                        "relatives_equity_relationship_way2": false,
                        "relatives_equity_relationship_number2": false,
                        "concurrent_post_ids": [],
                        "replace_post_ids": [],
                        "working_hours": false,
                        "work_hours_rule_id": false,
                        "overtime_conf_id": false,
                        "holiday_package_id": false,
                        "attendance_area_id": false,
                        "positive_time": true,
                        "no_clock_in_outside": false,
                        "attendance_card_no": false,
                        "responsible_attendance_points": [],
                        "annual_base_salary": 0,
                        "sum_salary_adjustment": 0,
                        "probation_salary": 0,
                        "annual_bonus_base": 0,
                        "x_annual_bonus_base_aft_tax": 0,
                        "merit_pay_rate": 0,
                        "daily_salary": 0,
                        "x_interpolate_bonus": 0,
                        "faxinggongshi_can_change": true,
                        "recruitment_offer_note": false,
                        "payroll_archive_ids": [],
                        "payroll_group_employee_ids": [],
                        "register_type": false,
                        "domicile_place": false,
                        "annual_bouns_taxation": false,
                        "pay_tax_city": false,
                        "x_tax_academic_education": 0,
                        "x_tax_caring_elderly": 0,
                        "x_tax_children_education": 0,
                        "x_tax_housing_loan_interest": 0,
                        "x_tax_housing_rental": 0,
                        "x_clearcumtax": false,
                        "x_tax_month": false,
                        "social_security_company_id": false,
                        "taxpayer_type": false,
                        "pay_tax_id_type": false,
                        "pay_tax_id_number": false,
                        "tax_registry_code": false,
                        "social_security_account": false,
                        "social_security_province": false,
                        "social_security_city": false,
                        "social_security_town": false,
                        "social_security_id": false,
                        "social_security_base": 0,
                        "social_security_base_company": 0,
                        "social_security_start_month": false,
                        "social_security_end_month": false,
                        "social_security_state": false,
                        "housing_fund_account": false,
                        "housing_fund_province": false,
                        "housing_fund_city": false,
                        "housing_fund_town": false,
                        "housing_fund_id": false,
                        "housing_fund_base": 0,
                        "housing_fund_base_company": 0,
                        "housing_fund_start_month": false,
                        "housing_fund_end_month": false,
                        "social_security_special_deduction_id": [],
                        "withhold_agent": false,
                        "sffjm": false,
                        "is_foreign": false,
                        "tax_related_causes": "employed",
                        "first_entry_time": false,
                        "is_disabled": false,
                        "disability_certificate_no": false,
                        "is_martyrs": false,
                        "martyrs_certificate_no": false,
                        "is_solitary": false,
                        "pre_departure_time": false,
                        "cost_center_ids": [[4, 23702, false]],
                        "disability_type": false,
                        "disability_grade": false,
                        "is_inductrial": false,
                        "disability_info": false,
                        "labor_union": false,
                        "labor_union_job": false,
                        "qywx_account": false,
                        "qywx_islink": false,
                        "qywx_issyn": true,
                        "qywx_syn_state": "nosyn",
                        "relation_ids": [],
                        "relation_type_ids": [],
                        "virtual_department_ids": []
                    }],
                    "kwargs": {}
                },
                "id": 979327148
            }
        })
        .then(res => {
            console.log(' addEmployee (((((((())))))) ', res)
        })
        .catch(err => {
            console.log(' addEmployee ))))))))))))))) ', err)
        })
    }

    /* 更改用户信息 */
    /* 测试可以更改姓名和手机号 */
    changeEmployeeInfo = ({name = '', workPhone = ''} = {}) => {
        const param = {};
        if (name !== '') {
            param.name = name;
        }
        if (workPhone !== '') {
            param.work_phone = workPhone;
        }

        axios({
            method: 'post',
            url: '/web/dataset/call_kw/hr.employee/write',
            data: {
                "identication": this.identication,
                "jsonrpc": "2.0",
                "method": "call",
                "data": {
                    "model": "hr.employee",
                    "method": "write",
                    "args": [
                        [42173],
                        param
                    ],
                    "kwargs": {}
                },
                "id": 798428319
            }
        })
        .then(res => {
            console.log(' changeEmployeeInfo (((((((())))))) ', res)
        })
        .catch(err => {
            console.log(' changeEmployeeInfo ))))))))))))))) ', err)
        })
    }

    /* 删除用户 */
    /* 调用接口前传入用户ID */
    removeEmployee = (id = 0) => {
        axios({
            method: 'post',
            url: '/web/dataset/call_kw/hr.employee/unlink',
            data: {
                "identication": this.identication,
                "jsonrpc": "2.0",
                "method": "call",
                "data": {
                    "model": "hr.employee",
                    "method": "unlink",
                    "args": [
                        [id]
                    ],
                    "kwargs": {}
                },
                "id": 468289307
            }
        })
        .then(res => {
            console.log(' removeEmployee (((((((())))))) ', res)
        })
        .catch(err => {
            console.log(' removeEmployee ))))))))))))))) ', err)
        })
    }

    handleChangeTmp = (index) => {
        this.setState({
            currentIndex: Number(index),
        }, () => {
            const targetUrl = this.replaceParamVal(window.location.href, 'paramId', this.state.currentIndex);
            window.history.pushState(null, null, targetUrl);
        });
    }

    /**
     * @替换URL指定参数
     * @author xhh
     * @date 2020-01-06
     * @param {String} oUrl 原始URL
     * @param {String} paramName  替换的参数
     * @param {String} replaceWith  替换的参数值
     * @returns 
     */
    replaceParamVal (oUrl, paramName, replaceWith) {
        var re = new RegExp('(' + paramName + '=)([^&]*)', 'gi')
        var nUrl = oUrl.replace(re, paramName + '=' + replaceWith)
        return nUrl
    }

    render() {
        const {
            state: {
                currentIndex,
                // axiosResponse,
                aMisData,
            },
        } = this;

        // if (!currentIndex) {
        //     return <h1>缺少URL参数paramId或者paramId不能为0</h1>;
        // }

        return(
            <div>
                {/* <p>home pageId:{currentIndex}</p> */}
                {/* {
                    Object.keys(MAP).map((item, index) => {
                        return <button key={index} onClick={() => this.handleChangeTmp(item)}>点击更换板式{item}</button>
                    })
                } */}
                {/* <button onClick={() => this.addEmployee('13111111117')}>点击新增用户</button>
                <button onClick={() => this.changeEmployeeInfo({name: '徐晃04', workPhone: '13111111123'})}>点击更改用户信息</button>
                <button onClick={() => this.removeEmployee(42179)}>点击删除用户</button> */}

                {
                    (aMisData && currentIndex === 0)
                    ?
                    renderAmis(aMisData)
                    :
                    renderAmis(MAP[currentIndex || 1], {}, {
                        fetcher: fetcher,
                    })
                }
                {/* {
                    axiosResponse &&
                    <div style={{width: "100%", height: "300px"}}>{axiosResponse}</div>
                } */}
            </div>
        )
    }
}