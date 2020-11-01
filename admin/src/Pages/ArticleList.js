import React, {useState, useEffect} from "react";
import {List, Row, Col, Modal, message, Button} from "antd";
import axios from 'axios'
import servicePath from "../config/apiUrl";
import '../static/css/ArticleList.css'

const {confirm} = Modal

function ArticleList() {
    const [list, setList] = useState([])

    useEffect(() => {
        getList()
    }, [])

    const getList = () => {
        axios({
            method: 'get',
            url: servicePath.getArticleList,
            header: {'Access-Control-Allow-Origin': '*'},
            withCredentials: true
        }).then(
            res => {
                setList(res.data.list)
            }
        )
    }

    return (
        <div>
            <List
                header={
                    <Row className="list-div">
                        <Col span={4}>
                            <b>标题</b>
                        </Col>
                        <Col span={4}>
                            <b>类别</b>
                        </Col>
                        <Col span={4}>
                            <b>简介</b>
                        </Col>
                        <Col span={4}>
                            <b>发布时间</b>
                        </Col>
                        <Col span={4}>
                            <b>浏览量</b>
                        </Col>
                        <Col span={4}>
                            <b>操作</b>
                        </Col>
                    </Row>

                }
                bordered
                dataSource={list}
                renderItem={item => (
                    <List.Item>
                        <Row className="list-div">
                            <Col span={4}>
                                {item.title}
                            </Col>
                            <Col span={4}>
                                {item.typeName}
                            </Col>
                            <Col span={4}>
                                {item.introduce}
                            </Col>
                            <Col span={4}>
                                {item.add_time}
                            </Col>
                            <Col span={4}>
                                {item.view_count}
                            </Col>
                            <Col span={4}>
                                <Button type="primary">修改</Button>&nbsp;
                                <Button>删除 </Button>
                            </Col>
                        </Row>

                    </List.Item>
                )}
            />

        </div>
    )

}

export default ArticleList