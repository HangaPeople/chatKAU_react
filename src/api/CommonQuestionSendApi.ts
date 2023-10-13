import axios from "axios";

const endpoint: string = 'http://ec2-13-209-97-116.ap-northeast-2.compute.amazonaws.com:8080/api/shortcut/'

export const getCommonQuestionResposne = async (keyword: string) => {
    return axios.get(endpoint + encodeURIComponent(keyword))
        .then(res => {
            console.log(res.data);
            return res.data;
        }).catch((error) => {
            throw new Error();
        });
}
