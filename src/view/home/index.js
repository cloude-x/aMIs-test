import React, { Component } from 'react';
import axios from 'axios';
import { render as renderAmis } from 'amis';

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

    componentDidMount() {
        // const url = `${window.location.protocol}//${window.location.hostname}:8069/amis/testmsg/get`;
        const url = `${window.location.protocol}//${window.location.hostname}:3001/aMis/test/get`;
        // const url = `${window.location.protocol}//${window.location.hostname}:3001/aMis/test/2/100`;
        console.log('api url', url);

        let axiosResponse = this.state.axiosResponse;
        this.setState({
            axiosResponse: axiosResponse += url
        })
        axios.get(url)
        // axios.get('http://10.21.23.130:8069/amis/testmsg/get')
        .then(res => {
            console.log('------', res)
            let axiosResponse = this.state.axiosResponse;
            this.setState({
                axiosResponse: axiosResponse += `   ----res---, ${JSON.stringify(res)}`,
                aMisData: res.data,
                currentIndex: 0,
            })
        })
        .catch(err => {
            console.log('+++++++', err)
            let axiosResponse = this.state.axiosResponse;
            this.setState({
                axiosResponse: axiosResponse += `   +++error++++, ${JSON.stringify(err)}`,
            })
        })
        // axios({
        //     url: 'https://apis.juhe.cn/simpleWeather/query',
        //     method: 'post',
        //     data: {
        //         city: "上海",
        //         key: '10ac1519bdbe166bcd8bbcc7ab85be99',
        //     },
        //     header: {
        //       'content-type': 'application/json' // 默认值
        //     },
        //     withCredentials: true,
        //   })
        //     .then(function(response) {
        //         console.log(1111, response)
        //   })
        //   .catch(e => {
        //       console.log(22222, e)
        //   })
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
                axiosResponse,
                aMisData,
            },
        } = this;

        // if (!currentIndex) {
        //     return <h1>缺少URL参数paramId或者paramId不能为0</h1>;
        // }

        return(
            <div>
                <p>home pageId:{currentIndex}</p>
                {
                    Object.keys(MAP).map((item, index) => {
                        return <button key={index} onClick={() => this.handleChangeTmp(item)}>点击更换板式{item}</button>
                    })
                }
                {
                    (aMisData && currentIndex === 0)
                    ?
                    renderAmis(aMisData)
                    :
                    renderAmis(MAP[currentIndex])
                }
                <div style={{width: "300px", height: "300px"}}>{axiosResponse}</div>
            </div>
        )
    }
}