import React, { Component } from 'react';
// import axios from 'axios';
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
    componentDidMount() {
        console.log(this.props)
    //     axios.get('https://api.binstd.com/news/get?channel=头条&start=0&num=10&appkey=ac7c59d349609c6c')
    //     .then(res => {
    //         console.log('------', res)
    //     })
    //     .catch(err => {
    //         console.log('+++++++', err)
    //     })
    //     axios({
    //         method:'post',
    //         url:'https://api.binstd.com/news/get',
    //         data: {
    //             channel: "头条",
    //             start: 0,
    //             num: 10,
    //             appkey: 'ac7c59d349609c6c',
    //         },
    //         responseType:'json',
    //       })
    //         .then(function(response) {
    //             console.log(1111, response)
    //       })
    //       .catch(e => {
    //           console.log(22222, e)
    //       })
    }

    /* 获取页面ID */
    get pageId () {
        return String(this.props.match.params.id)
    }

    render() {
        return(
            <div>
                <p>home pageId:{this.pageId}</p>
                {
                    renderAmis(MAP[this.pageId])
                }
            </div>
        )
    }
}