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
    }

    componentDidMount() {
        // axios.get('https://apis.juhe.cn/simpleWeather/query?city=%E4%B8%8A%E6%B5%B7&key=10ac1519bdbe166bcd8bbcc7ab85be99')
        // .then(res => {
        //     console.log('------', res)
        // })
        // .catch(err => {
        //     console.log('+++++++', err)
        // })
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
            },
        } = this;

        if (!currentIndex) {
            return <h1>缺少URL参数paramId或者paramId不能为0</h1>;
        }

        return(
            <div>
                <p>home pageId:{currentIndex}</p>
                {
                    Object.keys(MAP).map((item, index) => {
                        return <button key={index} onClick={() => this.handleChangeTmp(item)}>点击更换板式{item}</button>
                    })
                }
                {
                    renderAmis(MAP[currentIndex])
                }
            </div>
        )
    }
}