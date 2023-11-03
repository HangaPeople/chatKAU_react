import axios, {AxiosResponse} from "axios";
import {StudentInfoRequest} from "../atom/Student";

const path = "http://ec2-13-209-97-116.ap-northeast-2.compute.amazonaws.com:8080/user/login";

// @ts-ignore
export const getLoginInfo = async<Student> (request: StudentInfoRequest): Promise<Student | null> => {
    try {
        const { status, data }: AxiosResponse<Student> = await axios.post(path, request);

        return status < 300 ? data : null
    } catch(err) {
        console.log(err)
    }
};