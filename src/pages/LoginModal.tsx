import {Component} from "react";
import {Student, StudentInfoRequest} from "../component/Student";
import {getLoginInfo} from "../api/LoginApi";
import "../style/LoginModal.css"

class LoginModal extends Component<any, any> {
    state: StudentInfoRequest = {
        "studentNumber" : "",
        "password": ""
    };

    loginHandler = (e: { target: { name: string; value: string; }; }) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    loginClickHandler = async () => {
        const {studentNumber, password} = this.state;
        getLoginInfo<Student>({
            "studentNumber": studentNumber,
            "password": password
        } as StudentInfoRequest).then(res => {
            if(res !== undefined) {
                sessionStorage.setItem("student", JSON.stringify(res));

                this.props.handleLogin(true);
                this.props.close();
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
                                    <button className="close-button" onClick={close}>&times;</button>
                                    <div className="login-modal-header">
                                        <img className="logo" src={`${process.env.PUBLIC_URL}/wordmark.png`} alt={"로고"}/>
                                    </div>
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
