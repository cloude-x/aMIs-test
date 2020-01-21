$(function() {
    var dataList = {}; //接口数据源
    var fillingJSONArray = []; //填充表格
    var flag = 'increase'; //判断是增员还是减员
    var inputDateStart = $('#input-date-start'); //开始时间选择器
    var inputDateEnd = $('#input-date-end'); //结束时间选择器
    var inputDateSocialStart = $('#input_date_social_start'); //社保起缴月选择器
    var inputDateSocialEnd = $('#input_date_social_end'); //社保停缴月选择器
    var inputDateProvidentStart = $('#input_date_provident_start'); //社保起缴月选择器
    var inputDateProvidentEnd = $('#input_date_provident_end'); //社保停缴月选择器
    var selectSocialSecurityState = $('#social_security_state');
    var selectEmploymentForm = $('#employment_form');
    var inputJobId = $('#job_id');
    var selectEmployeeChildGroup = $('#employee_child_group');
    var btnQuery = $('#btn-query'); //查询按钮
    var btnExport = $('#btn-export'); //导出按钮
    var tabIncrease = $('#social-security-increase'); //社保增员TAB页
    var tabDecrease = $('#social-security-decrease'); //社保减员TAB页
    var tabChange = $('#social-security-change'); //社保变动页
    var textLimtNum = $('.div-content-limit-value'); //分页数目
    var btnPrevious = $('.btn-previous'); //分页 前一页
    var btnNext = $('.btn-next'); //分页 后一页
    var tableList = $('#table-list'); //table
    var limit = 80; //分页条数
    var offset = 0; //分页偏移量
    var totalDecrease = 0;
    var totalIncrease = 0;
    var totalChange = 0;
    var lang = window.parent.openerp.session == undefined ? 'en-US' : window.parent.openerp.session.user_context == undefined ?
        'en-US' : window.parent.openerp.session.user_context.lang == undefined ? 'en-US' : window.parent.openerp.session.user_context.lang;
    var MUSE = window.parent.MUSE,
        Ajax = MUSE.Ajax; //odoo MUSE Ajax 请求网络数据

    jQuery.i18n.properties({
        name: 'strings', //资源文件名称
        path: '/social_security/static/src/i18n/', //资源文件路径
        mode: 'both', //用Map的方式使用资源文件中的值
        language: lang.toLowerCase().indexOf('zh') >= 0 ? 'zh' : 'en',
        callback: function() { //加载成功后设置显示内容
            $("[data-locale]").each(function() {
                $(this).text($.i18n.prop($(this).data("locale")));
            });
        }
    });

    //时间选择器初始值
    inputDateStart.val(getFormatDate());
    inputDateEnd.val(getFormatDate());

    //动态设置table长宽
    $('.wrapper').css({ 'width': pageWidth, 'height': pageHeight });

    //社保增减变筛选字段下拉数据
    getSearchFieldsValue();
    //调取接口
    getData();

    /**
     * 开始时间选择器
     */
    $('.datePicker-start').datepicker({
        language: lang.toLowerCase().indexOf('zh') >= 0 ? 'zh-CN' : 'en-US',
        autoclose: true,
        format: "yyyy-mm-dd"
    }).on('changeDate', function(ev) {
        if (ev.date) {
            $('.datePicker-end').datepicker('setStartDate', new Date(ev.date.valueOf()))
        }
    });

    /**
     * 结束时间选择器
     */
    $('.datePicker-end').datepicker({
        language: lang.toLowerCase().indexOf('zh') >= 0 ? 'zh-CN' : 'en-US',
        autoclose: true,
        format: "yyyy-mm-dd"
    }).on('changeDate', function(ev) {
        if (ev.date) {
            $('.datePicker-start').datepicker('setEndDate', new Date(ev.date.valueOf()))
        }
    });

    /**
     * 社保起缴月选择器
     */
    $('.datePicker_social_start').datepicker({
        language: lang.toLowerCase().indexOf('zh') >= 0 ? 'zh-CN' : 'en-US',
        autoclose: true,
        format: "yyyy-mm",
        minViewMode: 1
    });

    /**
     * 社保停缴月选择器
     */
    $('.datePicker_social_end').datepicker({
        language: lang.toLowerCase().indexOf('zh') >= 0 ? 'zh-CN' : 'en-US',
        autoclose: true,
        format: "yyyy-mm",
        minViewMode: 1
    });

    /**
     * 公积金起缴月选择器
     */
    $('.datePicker_provident_start').datepicker({
        language: lang.toLowerCase().indexOf('zh') >= 0 ? 'zh-CN' : 'en-US',
        autoclose: true,
        format: "yyyy-mm",
        minViewMode: 1
    });

    /**
     * 公积金停缴月选择器
     */
    $('.datePicker_provident_end').datepicker({
        language: lang.toLowerCase().indexOf('zh') >= 0 ? 'zh-CN' : 'en-US',
        autoclose: true,
        format: "yyyy-mm",
        minViewMode: 1
    });

    /**
     * 情况空输入框是取消条件限制
     */
    inputDateStart.on('input', function() {
        if (inputDateStart.val() == "" || inputDateStart.val() == null) {
            $('.datePicker-end').datepicker('setStartDate', null)
        }
    });

    //同上
    inputDateEnd.on('input', function() {
        if (inputDateEnd.val() == "" || inputDateEnd.val() == null) {
            $('.datePicker-start').datepicker('setEndDate', null)
        }
    });

    btnPrevious.click(function() {
        offset -= limit;
        if (offset < 0) {
            offset = 0;
            return;
        }
        getData();
    });

    btnNext.click(function() {
        offset += limit;
        if (offset >= fillingJSONArray.totalCount && fillingJSONArray.totalCount != 0) {
            offset -= limit;
            return;
        }
        getData();
    });

    tabIncrease.click(function() {
        flag = 'increase';
        tabIncrease.attr('class', 'div-content-tab-button selected');
        tabDecrease.attr('class', 'div-content-tab-button unselected');
        tabChange.attr('class', 'div-content-tab-button unselected');
        if (totalIncrease < offset) {
            offset = 0;
            getData();
        } else {
            renderTable();
        }
    });

    tabDecrease.click(function() {
        flag = 'decrease';
        tabDecrease.attr('class', 'div-content-tab-button selected');
        tabIncrease.attr('class', 'div-content-tab-button unselected');
        tabChange.attr('class', 'div-content-tab-button unselected');
        if (totalDecrease < offset) {
            offset = 0;
            getData();
        } else {
            renderTable();
        }
    });

    tabChange.click(function() {
        flag = 'change';
        tabDecrease.attr('class', 'div-content-tab-button unselected');
        tabIncrease.attr('class', 'div-content-tab-button unselected');
        tabChange.attr('class', 'div-content-tab-button selected');
        if (totalChange < offset) {
            offset = 0;
            getData();
        } else {
            renderTable();
        }
    });

    btnQuery.click(function() {
        offset = 0;
        getData();
    });

    btnExport.click(function() {
        exportData();
    });

    //返回当前页面高度
    function pageHeight() {
        return window.innerHeight - 176;
    }

    //返回当前页面宽度
    function pageWidth() {
        return window.innerWidth;
    }

    /**
     * 导出接口
     */
    function exportData() {
        if (inputDateStart.val() == "" || inputDateStart.val() == null || inputDateStart.val() == undefined) {
            $.tips(jQuery.i18n.prop('Please_select_the_start_date'))
            return;
        }
        var newOpenWindow = window.parent.open('about:blank');
        window.parent.openerp.web.blockUI();
        var dd = {
            jsonrpc: '2.0',
            method: 'call',
            params: {
                model: 'variation.field',
                method: 'get_data',
                args: [],
                kwargs: {
                    context: {
                        lang: "zh_CN",
                        tz: "Asia/Shanghai",
                        uid: 1
                    },
                    start_date: inputDateStart.val(),
                    end_date: inputDateEnd.val(),
                    limit: limit,
                    offset: offset,
                    request_type: "export"
                }

            },
            id: (new Date).getTime()
        }
        if(inputDateSocialStart.val()){
            dd.params.kwargs.social_security_start_month = inputDateSocialStart.val();
        }
        if(inputDateSocialEnd.val()){
            dd.params.kwargs.social_security_end_month = inputDateSocialEnd.val();
        }
        if(inputDateProvidentStart.val()){
            dd.params.kwargs.housing_fund_start_month = inputDateProvidentStart.val();
        }
        if(inputDateProvidentEnd.val()){
            dd.params.kwargs.housing_fund_end_month = inputDateProvidentEnd.val();
        }
        if(selectSocialSecurityState.find("option:selected").val()){
            dd.params.kwargs.social_security_state = selectSocialSecurityState.find("option:selected").val();
        }
        if(selectEmploymentForm.find("option:selected").val()){
            dd.params.kwargs.employment_form = selectEmploymentForm.find("option:selected").val();
        }
        if(selectEmployeeChildGroup.find("option:selected").val()){
            dd.params.kwargs.employee_child_group = selectEmployeeChildGroup.find("option:selected").val();
        }
        if(inputJobId.val()){
            dd.params.kwargs.job_name_fuzzy= inputJobId.val();
        }
        Ajax.request('/web/dataset/call_kw/variation.field/get_data', {
            params: dd,
            callback: function(result) {
                window.parent.openerp.web.unblockUI();
                if (result.result != "" && result.result != null && result.result != undefined && newOpenWindow != null && newOpenWindow != undefined) {
                    try{
                        newOpenWindow.location = result.result;
                    }catch(error){
                    }
                    
                }
            },
            json: true,
            crypt: true
        });
    }

    /**
     * 社保增减变筛选字段下拉数据
     */
    function getSearchFieldsValue() {
        window.parent.openerp.web.blockUI();
        Ajax.request('/web/dataset/call_kw/variation.field/get_search_fields_value', {
            params: {
                jsonrpc: '2.0',
                method: 'call',
                params: {
                    model: 'variation.field',
                    method: 'get_search_fields_value',
                    args: [],
                    kwargs: {
                        context: {
                            lang: "zh_CN",
                            tz: "Asia/Shanghai",
                            uid: 1
                        },
                    }
                },
                id: (new Date).getTime()
            },
            callback: function(result) {
                if (window != undefined && window.parent != null && window.parent != undefined) {
                    window.parent.openerp.web.unblockUI();
                } 
                if(result.result){
                    console.log(result.result);
                    var d1 = result.result.social_security_state;
                    var d2 = result.result.employment_form;
                    var d3 = result.result.employee_child_group;
                    if( d1 && d1.length > 0){
                        var html = '<option value=""></option>';
                        $.each(d1,function(index,value){
                            html += '<option value="'+ d1[index][0] + '">' + d1[index][1]+'</option>'
                       });
                       selectSocialSecurityState.append(html);
                    }
                    if( d2 && d2.length > 0){
                        var html = '<option value=""></option>';
                        $.each(d2,function(index,value){
                            html += '<option value="'+ d2[index][0] + '">' + d2[index][1]+'</option>'
                       });
                       selectEmploymentForm.append(html);
                    }
                    if( d3 && d3.length > 0){
                        var html = '<option value=""></option>';
                        $.each(d3,function(index,value){
                            html += '<option value="'+ d3[index][0] + '">' + d3[index][1]+'</option>'
                       });
                       selectEmployeeChildGroup.append(html);
                    }
                }
            },
            json: true,
            crypt: true
        });
    }  

    /**
     * 请求街口
     */
    function getData() {
        if (inputDateStart.val() == "" || inputDateStart.val() == null || inputDateStart.val() == undefined) {
            $.tips(jQuery.i18n.prop('Please_select_the_start_date'))
            return;
        }
        window.parent.openerp.web.blockUI();
        var dd = {
            jsonrpc: '2.0',
            method: 'call',
            params: {
                model: 'variation.field',
                method: 'get_data',
                args: [],
                kwargs: {
                    context: {
                        lang: "zh_CN",
                        tz: "Asia/Shanghai",
                        uid: 1
                    },
                    start_date: inputDateStart.val(),
                    end_date: inputDateEnd.val(),
                    limit: limit,
                    offset: offset
                }

            },
            id: (new Date).getTime()
        }
        if(inputDateSocialStart.val()){
            dd.params.kwargs.social_security_start_month = inputDateSocialStart.val();
        }
        if(inputDateSocialEnd.val()){
            dd.params.kwargs.social_security_end_month = inputDateSocialEnd.val();
        }
        if(inputDateProvidentStart.val()){
            dd.params.kwargs.housing_fund_start_month = inputDateProvidentStart.val();
        }
        if(inputDateProvidentEnd.val()){
            dd.params.kwargs.housing_fund_end_month = inputDateProvidentEnd.val();
        }
        if(selectSocialSecurityState.find("option:selected").val()){
            dd.params.kwargs.social_security_state = selectSocialSecurityState.find("option:selected").val();
        }
        if(selectEmploymentForm.find("option:selected").val()){
            dd.params.kwargs.employment_form = selectEmploymentForm.find("option:selected").val();
        }
        if(selectEmployeeChildGroup.find("option:selected").val()){
            dd.params.kwargs.employee_child_group = selectEmployeeChildGroup.find("option:selected").val();
        }
        if(inputJobId.val()){
            dd.params.kwargs.job_name_fuzzy= inputJobId.val();
        }
        console.log(dd);
        Ajax.request('/web/dataset/call_kw/variation.field/get_data', {
            params: dd,
            callback: function(result) {
                if (window != undefined && window.parent != null && window.parent != undefined) {
                    window.parent.openerp.web.unblockUI();
                    if (result.result == null || result.result == undefined) {
                        return;
                    }
                    dataList = result.result;
                    renderTable();
                }
            },
            json: true,
            crypt: true
        });
    }

    /**
     * 渲染table
     */
    function renderTable() {
        if (dataList.decreaseList == undefined && dataList.increaseList == undefined && dataList.increaseList == undefined) {
            return;
        }
        totalDecrease = dataList.decreaseList.totalCount;
        totalIncrease = dataList.increaseList.totalCount;
        totalChange = dataList.changeList.totalCount;
        if (flag == 'increase') {
            fillingJSONArray = dataList.increaseList;
        } else if (flag == 'decrease') {
            fillingJSONArray = dataList.decreaseList;
        } else if (flag == 'change') {
            fillingJSONArray = dataList.changeList;
        }
        $('.wrapper').html();
        $('.floatThead-container').remove();
        var dom = '<table class="table demo1 table-bordered table-striped" id="table-list">';
        if (flag == 'change') {
            dom += '<thead class="table-header-columns"><tr>';
            $(fillingJSONArray.header).each(function(i, item) {
                if (item.isChange) {
                    dom += '<th colspan="2">' + item.name + '</th>';
                } else {
                    dom += '<th rowspan="2">' + item.name + '</th>';
                }

            });
            dom += '</tr><tr>';
            $(fillingJSONArray.header).each(function(i, item) {
                if (item.isChange) {
                    dom += '<th>' + $.i18n.prop('Original_Value') + '</th>';
                    dom += '<th>' + $.i18n.prop('New_Value') + '</th>';
                }
            });
            dom += '</thead><tbody class="table-tbody">';
            $(fillingJSONArray.row).each(function(index, row) {
                dom += '<tr>';
                $(row).each(function(i, item) {
                    dom += '<td>' + item + '</td>';
                });
                dom += '</tr>';
            });
            dom += '</tbody>';
        } else {
            dom += '<thead class="table-header-columns"><tr>';
            $(fillingJSONArray.header).each(function(i, item) {
                dom += '<th>' + item + '</th>';
            });
            dom += '</tr></thead><tbody class="table-tbody">';
            $(fillingJSONArray.row).each(function(index, row) {
                dom += '<tr>';
                $(row).each(function(i, item) {
                    dom += '<td>' + item + '</td>';
                });
                dom += '</tr>';
            });
            dom += '</tbody>';
        }
        dom += '</table>';
        $(".wrapper").html(dom);
        $('#table-list').floatThead({
            scrollContainer: function($table) {
                // return $table.parent();
                return $table.closest('.wrapper');
            },
            support: { //workaround
                perfectScrollbar: true //workaround
            }
        })
        if (fillingJSONArray.totalCount > limit) {
            textLimtNum.text('(' + (offset + 1) + '-' + (offset + fillingJSONArray.row.length) + ') ' + jQuery.i18n.prop("of") + " " + fillingJSONArray.totalCount);
            $('.div-content-limit-group').css('visibility', 'visible');
        } else {
            textLimtNum.text('(' + (fillingJSONArray.totalCount == 0 ? '0' : (offset + 1)) + '-' + fillingJSONArray.totalCount + ') ' + jQuery.i18n.prop("of") + " " + fillingJSONArray.totalCount);
            $('.div-content-limit-group').css('visibility', 'hidden');
        }
    }

    /**
     * yyyy-MM-dd
     */
    function getFormatDate() {
        var nowDate = new Date();
        var year = nowDate.getFullYear();
        var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
        var date = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
        // var hour = nowDate.getHours()< 10 ? "0" + nowDate.getHours() : nowDate.getHours();  
        // var minute = nowDate.getMinutes()< 10 ? "0" + nowDate.getMinutes() : nowDate.getMinutes();  
        // var second = nowDate.getSeconds()< 10 ? "0" + nowDate.getSeconds() : nowDate.getSeconds();  
        return year + "-" + month + "-" + date;
    }

});