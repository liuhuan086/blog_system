module.exports = app => {
    const {router, controller} = app
    const adminAuth = app.middleware.adminAuth();
    router.get('/admin/index', controller.admin.main.index)
    router.post('/admin/checkLogin', controller.admin.main.checkLogin)
    // 路由守卫，中间件卸载方法之前
    router.get('/admin/getTypeInfo', adminAuth, controller.admin.main.getTypeInfo)
    router.post('/admin/addArticle', adminAuth, controller.admin.main.addArticle)
    router.post('/admin/updateArticle', adminAuth, controller.admin.main.updateArticle)
}