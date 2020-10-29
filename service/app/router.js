'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    require('./router/default')(app)
};


/*
*
* RESTful APP 前后端分离 简单和约束性
*
* 请求方式 get post put delete
*
* */