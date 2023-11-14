import axios, {AxiosResponse} from "axios";
import {ReviewAnswerDto} from "../component/ReviewAnswer";

const path = "http://ec2-13-209-97-116.ap-northeast-2.compute.amazonaws.com:8080/response/isGood"

// @ts-ignore
export const registerSavedAnswer = async (req: ReviewAnswerDto): Promise<string | null> => {
    try {
        const { status }: AxiosResponse<string> = await axios.post(path, req);

        return status < 300 ? "Success!" : "Failed!";
    } catch(err) {
        console.log(err)
    }
}