# service
## 创建数据库
```sql
create database react_blog;
```
## 创建三张表
* article
* type
* blog_content

article表的字段
```
title、type_id、article_content、introduce、add_time、view_count
```
type表的字段
```
title、type、introduce(可以为空)、content
```
blog_content表的字段
```sql
typeName、orderNum
```

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org