import {Component} from "react";
import {Student} from "./Student";

class UserStatus extends Component<any, any> {
    render() {
        const isLogin = this.props;

        const fromStorage: string = sessionStorage.getItem("student")!;
        const userInfo: Student = JSON.parse(fromStorage);

        return (
            <>
                {
                    isLogin ? (
                        <div>
                            <div>{userInfo.name}</div>
                            <div>{userInfo.major}</div>
                        </div>
                    ) : null
                }
            </>
        );
    }
}

export default UserStatus
