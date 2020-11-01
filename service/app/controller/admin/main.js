'use strict'

const Controller = require('egg').Controller


class MainController extends Controller {
    async index() {
        this.ctx.body = 'hi api'
    }

    async checkLogin() {
        let userName = this.ctx.request.body.userName
        let password = this.ctx.request.body.password

        const sql = " SELECT userName FROM admin_user WHERE userName = '" + userName +
            "' AND password = '" + password + "'"

        const res = await this.app.mysql.query(sql)

        if (res.length > 0) {
            let openId = new Date().getTime()
            this.ctx.session.openId = {'openId': openId}
            this.ctx.body = {'data': '登陆成功', 'openId': openId}
        } else {
            this.ctx.body = {'data': '登陆失败'}
        }
    }

    async getTypeInfo() {
        const resType = await this.app.mysql.select('type')
        this.ctx.body = {data: resType}
    }

    async addArticle() {
        let tmpArticle = this.ctx.request.body
        // console.log(tmpArticle)
        const res = await this.app.mysql.insert('article', tmpArticle)
        const insertSuccess = res.affectedRows === 1
        const insertId = res.insertId
        this.ctx.body = {
            isSuccess: insertSuccess,
            insertId: insertId
        }
    }

    async updateArticle() {
        let tmpArticle = this.ctx.request.body
        const res = await this.app.mysql.update('article', tmpArticle)
        const updateSuccess = res.affectedRows === 1
        this.ctx.body = {
            isSuccess: updateSuccess
        }
    }

    async getArticleList() {
        let sql = 'SELECT article.id as id,' +
            'article.title as title,' +
            'article.view_count as view_count,' +
            'article.introduce as introduce,' +
            "FROM_UNIXTIME(article.add_time,'%Y-%m-%d' ) as add_time," +
            'type.typeName as typeName ' +
            'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
            'ORDER BY article.id DESC '
        const resList = await this.app.mysql.query(sql)
        this.ctx.body = {list: resList}
    }

    async delArticle() {
        let id = this.ctx.params.id
        const res = await this.app.mysql.delete('article', {id: id})
        this.ctx.body = {data: res}
    }
}

module.exports = MainController