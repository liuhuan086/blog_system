import React, {useEffect, useState} from "react";
import marked from 'marked'
import '../static/css/AddArticle.css'
import {Row, Col, Input, Select, Button, DatePicker} from "antd";
import axios from 'axios'
import servicePath from "../config/apiUrl";
import {message} from "antd/es";

const {Option} = Select
const {TextArea} = Input


function AddArticle(props) {

    const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle, setArticleTitle] = useState('')   //文章标题
    const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introduce, setIntroduce] = useState()            //简介的markdown内容
    const [introduceHtml, setIntroduceHtml] = useState('等待编辑') //简介的html内容
    const [showDate, setShowDate] = useState()   //发布日期
    // const [updateDate, setUpdateDate] = useState() //修改日志的日期
    const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType, setSelectType] = useState('请选择类型') //选择的文章类别
    const renderer = new marked.Renderer()

    useEffect(() => {
        getTypeInfo()
        let tmpId = props.match.params.id
        if (tmpId) {
            setArticleId(tmpId)
            getArticleById(tmpId)
        } else {

        }
    }, [])

    marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false
    })

    const changeContent = (e) => {
        setArticleContent(e.target.value)
        let html = marked(e.target.value)
        setMarkdownContent(html)
    }

    const changeIntroduce = (e) => {
        setIntroduce(e.target.value)
        let html = marked(e.target.value)
        setIntroduceHtml(html)
    }

    const getTypeInfo = () => {
        axios({
            method: 'get',
            url: servicePath.getTypeInfo,
            header: {'Access-Control-Allow-Origin': '*'},
            withCredentials: true
        }).then(
            res => {
                if (res.data.data === '没有登陆') {
                    localStorage.removeItem('openId')
                    props.history.push('/')
                } else {
                    setTypeInfo(res.data.data)
                }
            }
        )
    }

    const selectTypeHandler = (value) => {
        setSelectType(value)
    }

    const saveArticle = () => {
        if (!selectedType) {
            message.error("必须选择文章类型")
            return false
        } else if (!articleTitle) {
            message.error("文章标题不能为空")
            return false
        } else if (!articleContent) {
            message.error("文章内容不能为空")
            return false
        } else if (!introduce) {
            message.error("文章简介不能为空")
            return false
            // } else if (!showDate) {
            //     message.error("发布日期不能为空")
            //     return false
        }

        // message.success("检验通过")
        let myDate = new Date();
        let dataProps = {}
        // dataProps.type_id = selectedType
        dataProps.type_id = 1
        dataProps.title = articleTitle
        dataProps.article_content = articleContent
        dataProps.introduce = introduce

        // let dateText = showDate.replace('-', '/')

        if (articleId === 0) {
            dataProps.add_time = myDate.toLocaleString().replaceAll('/','-')
            dataProps.view_count = 0;
            axios({
                method: 'post',
                url: servicePath.addArticle,
                header: {'Access-Control-Allow-Origin': '*'},
                data: dataProps,
                withCredentials: true,
            }).then(
                res => {
                    setArticleId(res.data.insertId)
                    if (res.data.isSuccess) {
                        message.success("保存成功")
                    } else {
                        message.error("保存失败")
                    }
                }
            )
        } else {
            // console.log('articleId:' + articleId)
            dataProps.id = articleId
            axios({
                method: 'post',
                url: servicePath.updateArticle,
                header: {'Access-Control-Allow-Origin': '*'},
                data: dataProps,
                withCredentials: true
            }).then(
                res => {
                    if (res.data.isSuccess) {
                        message.success('文章保存成功')
                    } else {
                        message.error('保存失败');
                    }
                }
            )
        }
    }

    const getArticleById = (id) => {
        axios(servicePath.getArticleById + id, {
            withCredentials: true
        }).then(
            res => {
                let articleInfo = res.data.data[0]
                setArticleTitle(articleInfo.title)
                setArticleContent(articleInfo.article_content)
                let html = marked(articleInfo.article_content)
                setMarkdownContent(html)
                setIntroduce(articleInfo.introduce)
                let tmpIntroduce = marked(articleInfo.introduce)
                setIntroduce(tmpIntroduce)
                setShowDate(articleInfo.add_time)
                setSelectType(1)
            }
        )
    }

    return (
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10}>
                        <Col span={16}>
                            <Input
                                value={articleTitle}
                                placeholder="博客标题"
                                onChange={e => {
                                    setArticleTitle(e.target.value)
                                }}
                                size="large"/>
                        </Col>

                        <Col span={4}>
                            &nbsp;
                            <Select defaultValue={selectedType} size="large" onChange={selectTypeHandler}>
                                {/*<Select defaultValue='1' size="large">*/}
                                {/*{*/}
                                {/*    typeInfo.map((item,index)=>{*/}
                                {/*        return (<Option key={index} value={item.id}>{item.typeName}</Option>)*/}
                                {/*    })*/}
                                {/*}*/}
                            </Select>
                        </Col>

                    </Row>

                    <br/><br/>
                    <Row gutter='10'>
                        <Col span={12}>
                            <TextArea
                                className='markdown-content'
                                rows={35}
                                placeholder='文章内容'
                                value={articleContent}
                                onChange={changeContent}
                            />
                        </Col>

                        <Col span={12}>
                            <div
                                className='show-html'
                                dangerouslySetInnerHTML={{__html: markdownContent}}
                            >
                            </div>
                        </Col>
                    </Row>
                </Col>

                <Col span={6}>
                    <Row>
                        <Col span={24}>
                            <Button size="large">暂存文章</Button>&nbsp;
                            <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
                            <br/>
                        </Col>

                        <Col span={24}>
                            <br/>
                            <TextArea
                                rows={4}
                                placeholder='文章简介'
                                value={introduce}
                                onChange={changeIntroduce}
                            />

                            <br/><br/>

                            <div
                                className='introduce-html'
                                dangerouslySetInnerHTML={{__html: introduceHtml}}
                            >
                            </div>
                        </Col>

                        {/*<Col span={12}>*/}
                        {/*    <div className="date-select">*/}
                        {/*        <DatePicker*/}
                        {/*            onChange={(date, dateString) => setShowDate(dateString)}*/}
                        {/*            placeholder="发布日期"*/}
                        {/*            size="large"*/}
                        {/*        />*/}
                        {/*    </div>*/}
                        {/*</Col>*/}
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default AddArticle