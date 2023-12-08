import {Component} from "react";
import {Student} from "./Student";
import "../style/UserStatus.css"

class UserStatusDetail extends Component<any, any> {
    render() {

        const fromStorage: string = sessionStorage.getItem("student")!;
        const userInfo: Student = JSON.parse(fromStorage);

        return (
            <ul className="dropdown-content">
                <li>
                    <a href="https://nportal.kau.ac.kr/webcrea/KAU_MDI.jsp?v=20231122081902" target="_blank">종합정보시스템</a>
                </li>
                <li>
                    <a href="https://kau.ac.kr" target="_blank">홈페이지</a>
                </li>
            </ul>
        );
    }
}

export default UserStatusDetail
