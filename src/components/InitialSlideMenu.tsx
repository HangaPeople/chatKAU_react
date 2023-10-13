import {CommonQuestion} from "./Chat";
import Icon from "./icon";
import "../style/slideMenu.css";
// import "../style/icon.css"

interface SlideMenuProps {
    questions: CommonQuestion[];
}

function SlideMenu({questions}: SlideMenuProps) {
    return (
        <div className={"slide-menu"}>
            {/*<div className={"menu-content"}>*/}
            {/*    <ul className={"menu_list"}>*/}
            {/*        <div id={"menu_list_id"} className={"menu_list_class"}>*/}
            {/*            {questions.map((question, index) => {*/}
            {/*                return <Icon key={index} questionInfo={question}/>*/}
            {/*            })}*/}
            {/*        </div>*/}
            {/*    </ul>*/}
            {/*</div>*/}
        </div>
    );
}

export default SlideMenu;