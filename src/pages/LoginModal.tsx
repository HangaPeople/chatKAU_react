import {Component} from "react";
import {Student, StudentInfoRequest} from "../atom/Student";
import {getLoginInfo} from "../api/LoginApi";
import "../style/LoginModal.css"

class LoginModal extends Component<any, any> {
    state: StudentInfoRequest = {
        "studentNumber" : "",
        "password": ""
    };

    loginHandler = (e: { target: { name: string; value: string; }; }) => {
        console.log("hello");
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    loginClickHandler = async () => {
        const {studentNumber, password} = this.state;
        getLoginInfo<Student>({
            "studentNumber": studentNumber,
            "password": password
        } as StudentInfoRequest).then(res => {
            if(res !== null) {
                localStorage.setItem("isLogin", "true");
                localStorage.setItem("student", JSON.stringify(res));
            }
        })
    }

    render() {
        const { isOpen, close } = this.props;

        // @ts-ignore
        return (
            <>
                {
                    isOpen ? (
                        <div className="modal">
                            <div>
                                <div className="loginModal">
                                    <span className="close" onClick={close}>&times;</span>
                                    <div className="modalContents">
                                        <input
                                            name="studentNumber"
                                            className="loginId"
                                            type="text"
                                            placeholder="학번"
                                            onChange={this.loginHandler}
                                        />
                                        <input
                                            name="password"
                                            className="loginPw"
                                            type="password"
                                            placeholder="비밀번호"
                                            onChange={this.loginHandler}
                                        />
                                        <button className="loginBtn" onClick={this.loginClickHandler}>
                                            로그인
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null
                }
            </>
        );
    }
}

export default LoginModal;
