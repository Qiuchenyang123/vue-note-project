import request from "./index";
import {AxiosPromise} from "axios";

interface articleInfo {
    title: string,
    tags: [string],
    content: string,
    contentDesc: string,
    picture: string
}

interface getArticleList {
    title: string,
    tags: [string],
    content: string,
    contentDesc: string,
    picture: string
}

function addArticle(articleInfo: articleInfo): AxiosPromise {
    return request.post('/article/addArticle', articleInfo)
}

function getArticleList(articleSearchKeys: getArticleList): AxiosPromise {
    return request.post('/article/getArticleList', articleSearchKeys)
}

function deleteArticle(articleSearchKeys: getArticleList): AxiosPromise {
    return request.post('/article/getArticleList', articleSearchKeys)
}

export default {
    addArticle,
    getArticleList
}
