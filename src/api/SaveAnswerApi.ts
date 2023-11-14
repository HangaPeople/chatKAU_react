import {SavedAnswer} from "../component/SavedAnswer";
import axios, {AxiosResponse} from "axios";

const path = "http://ec2-13-209-97-116.ap-northeast-2.compute.amazonaws.com:8080/response/isGood"

// @ts-ignore
export const registerSavedAnswer = async (req: SavedAnswer): Promise<string | null> => {
    try {
        const { status }: AxiosResponse<string> = await axios.post(path, req);

        return status < 300 ? "Success!" : null;
    } catch(err) {
        console.log(err)
    }
}