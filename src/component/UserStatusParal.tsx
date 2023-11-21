import {Component} from "react";
import {Student} from "./Student";

class UserStatusParal extends Component<any, any> {
    render() {
        const isLogin = this.props;

        const fromStorage: string = sessionStorage.getItem("student")!;
        const userInfo: Student = JSON.parse(fromStorage);

        return (
            <>
                {
                    isLogin ? (
                        <div>
                            <div>{userInfo.name}님, 환영합니다!</div>
                        </div>
                    ) : null
                }
            </>
        );
    }
}

export default UserStatusParal
