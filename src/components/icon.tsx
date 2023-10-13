import {CommonQuestion} from "./Chat";
import "../style/slideMenu.css";
import "../style/icon.css"
import {getCommonQuestionResposne} from "../api/CommonQuestionSendApi";

interface IconProps {
    questionInfo: CommonQuestion;
}



function Icon({ questionInfo }: IconProps) {
    const iconStyle = {
        backgroundImage: `url(${questionInfo.logo}`
    }

    const handleIconClick = async () => {
        const response = await getCommonQuestionResposne(questionInfo.question);
        console.log(response);
        return response;
    }

    return (
        <li className={"menu_item"}>
            <div id={"menu_item_container"} className={"menu_link"} onClick={handleIconClick}>
                <span className="icon" style={iconStyle}/>
                <div className={"menu_unit"}>
                    <span className="icon_text">
                        {questionInfo.question}
                    </span>
                </div>
            </div>
        </li>
    );
}

export default Icon;