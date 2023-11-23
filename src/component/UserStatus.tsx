import {useState} from "react";
import {Student} from "./Student";
import "../style/UserStatus.css"
import UserStatusDetail from "./UserStatusDetail";
import Dropdown from "./Dropdown";

const UserStatus = (props: { isLogin: boolean; }) => {
    const [view, setView] = useState(false);

    const fromStorage: string = sessionStorage.getItem("student")!;
    const userInfo: Student = JSON.parse(fromStorage);

    const handleUserDetailButtonClicked = () => {
        setView(!view);
    }

    return (
        <>
            {
                props.isLogin && (
                    <>
                        <button onClick={handleUserDetailButtonClicked}>
                            {view ? 'Close' : 'Open'}
                        </button>
                        <Dropdown visibility={view}>
                            <ul>
                                <li>item 1</li>
                                <li>item 1</li>
                                <li>item 1</li>
                                <li>item 1</li>
                            </ul>
                        </Dropdown>
                    </>
                )
            }
        </>
    );
}

export default UserStatus
