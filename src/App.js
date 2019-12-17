import React from 'react';
import {
    render as renderAmis
} from 'amis';
import './amis.css'
import './amis-default.css'

function App() {
    return (
        <div>
            <p>通过 amis 渲染页面</p>
            {
                renderAmis(
                    {
                        "$schema": "https://houtai.baidu.com/v2/schemas/page.json#",
                        "type": "page",
                        "title": "增删改查示例",
                        "toolbar": [
                            {
                                "type": "button",
                                "actionType": "dialog",
                                "label": "新增",
                                "icon": "fa fa-plus pull-left",
                                "primary": true,
                                "dialog": {
                                    "title": "新增",
                                    "body": {
                                        "type": "form",
                                        "name": "sample-edit-form",
                                        "api": "",
                                        "controls": [
                                            {
                                                "type": "alert",
                                                "level": "info",
                                                "body": "因为没有配置 api 接口，不能真正的提交哈！"
                                            },
                                            {
                                                "type": "text",
                                                "name": "text",
                                                "label": "文本",
                                                "required": true
                                            },
                                            {
                                                "type": "divider"
                                            },
                                            {
                                                "type": "image",
                                                "name": "image",
                                                "label": "图片",
                                                "required": true
                                            },
                                            {
                                                "type": "divider"
                                            },
                                            {
                                                "type": "date",
                                                "name": "date",
                                                "label": "日期",
                                                "required": true
                                            },
                                            {
                                                "type": "divider"
                                            },
                                            {
                                                "type": "select",
                                                "name": "type",
                                                "label": "选项",
                                                "options": [
                                                    {
                                                        "label": "漂亮",
                                                        "value": "1"
                                                    },
                                                    {
                                                        "label": "开心",
                                                        "value": "2"
                                                    },
                                                    {
                                                        "label": "惊吓",
                                                        "value": "3"
                                                    },
                                                    {
                                                        "label": "紧张",
                                                        "value": "4"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        ],
                        "body": [
                            {
                                "type": "crud",
                                "api": "https://houtai.baidu.com/api/mock2/crud/list",
                                "defaultParams": {
                                    "perPage": 5
                                },
                                "columns": [
                                    {
                                        "name": "id",
                                        "label": "ID",
                                        "type": "text"
                                    },
                                    {
                                        "name": "text",
                                        "label": "文本",
                                        "type": "text"
                                    },
                                    {
                                        "type": "image",
                                        "label": "图片",
                                        "multiple": false,
                                        "name": "image",
                                        "popOver": {
                                            "title": "查看大图",
                                            "body": "<div class=\"w-xxl\"><img class=\"w-full\" src=\"${image}\"/></div>"
                                        }
                                    },
                                    {
                                        "name": "date",
                                        "type": "date",
                                        "label": "日期"
                                    },
                                    {
                                        "name": "type",
                                        "label": "映射",
                                        "type": "mapping",
                                        "map": {
                                            "1": "<span class='label label-info'>漂亮</span>",
                                            "2": "<span class='label label-success'>开心</span>",
                                            "3": "<span class='label label-danger'>惊吓</span>",
                                            "4": "<span class='label label-warning'>紧张</span>",
                                            "*": "其他：${type}"
                                        }
                                    },
                                    {
                                        "type": "container",
                                        "label": "操作",
                                        "body": [
                                            {
                                                "type": "button",
                                                "icon": "fa fa-eye",
                                                "level": "link",
                                                "actionType": "dialog",
                                                "tooltip": "查看",
                                                "dialog": {
                                                    "title": "查看",
                                                    "body": {
                                                        "type": "form",
                                                        "controls": [
                                                            {
                                                                "type": "static",
                                                                "name": "id",
                                                                "label": "ID"
                                                            },
                                                            {
                                                                "type": "divider"
                                                            },
                                                            {
                                                                "type": "static",
                                                                "name": "text",
                                                                "label": "文本"
                                                            },
                                                            {
                                                                "type": "divider"
                                                            },
                                                            {
                                                                "type": "static-image",
                                                                "label": "图片",
                                                                "name": "image",
                                                                "popOver": {
                                                                    "title": "查看大图",
                                                                    "body": "<div class=\"w-xxl\"><img class=\"w-full\" src=\"${image}\"/></div>"
                                                                }
                                                            },
                                                            {
                                                                "type": "divider"
                                                            },
                                                            {
                                                                "name": "date",
                                                                "type": "static-date",
                                                                "label": "日期"
                                                            },
                                                            {
                                                                "type": "divider"
                                                            },
                                                            {
                                                                "name": "type",
                                                                "label": "映射",
                                                                "type": "static-mapping",
                                                                "map": {
                                                                    "1": "<span class='label label-info'>漂亮</span>",
                                                                    "2": "<span class='label label-success'>开心</span>",
                                                                    "3": "<span class='label label-danger'>惊吓</span>",
                                                                    "4": "<span class='label label-warning'>紧张</span>",
                                                                    "*": "其他：${type}"
                                                                }
                                                            }
                                                        ]
                                                    }
                                                }
                                            },
                                            {
                                                "type": "button",
                                                "icon": "fa fa-pencil",
                                                "tooltip": "编辑",
                                                "level": "link",
                                                "actionType": "drawer",
                                                "drawer": {
                                                    "position": "left",
                                                    "size": "lg",
                                                    "title": "编辑",
                                                    "body": {
                                                        "type": "form",
                                                        "name": "sample-edit-form",
                                                        "controls": [
                                                            {
                                                                "type": "alert",
                                                                "level": "info",
                                                                "body": "因为没有配置 api 接口，不能真正的提交哈！"
                                                            },
                                                            {
                                                                "type": "hidden",
                                                                "name": "id"
                                                            },
                                                            {
                                                                "type": "text",
                                                                "name": "text",
                                                                "label": "文本",
                                                                "required": true
                                                            },
                                                            {
                                                                "type": "divider"
                                                            },
                                                            {
                                                                "type": "image",
                                                                "name": "image",
                                                                "multiple": false,
                                                                "label": "图片",
                                                                "required": true
                                                            },
                                                            {
                                                                "type": "divider"
                                                            },
                                                            {
                                                                "type": "date",
                                                                "name": "date",
                                                                "label": "日期",
                                                                "required": true
                                                            },
                                                            {
                                                                "type": "divider"
                                                            },
                                                            {
                                                                "type": "select",
                                                                "name": "type",
                                                                "label": "选项",
                                                                "options": [
                                                                    {
                                                                        "label": "漂亮",
                                                                        "value": "1"
                                                                    },
                                                                    {
                                                                        "label": "开心",
                                                                        "value": "2"
                                                                    },
                                                                    {
                                                                        "label": "惊吓",
                                                                        "value": "3"
                                                                    },
                                                                    {
                                                                        "label": "漂亮",
                                                                        "value": "紧张"
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                }
                                            },
                                            {
                                                "type": "button",
                                                "level": "link",
                                                "icon": "fa fa-times text-danger",
                                                "actionType": "ajax",
                                                "tooltip": "删除",
                                                "confirmText": "您确认要删除? 没有配置 api 确定了也没用，还是不要确定了",
                                                "api": ""
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }        
                )
            }
        </div>
    );
}

export default App;
