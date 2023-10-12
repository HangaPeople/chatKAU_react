import {CommonQuestion} from "./Chat";

interface IconProps {
    questionInfo: CommonQuestion;
}

function Icon({ questionInfo }: IconProps) {

    return (
        <li className={"menu_item"}>
            <div className={"icon"}>
                {questionInfo.logo}
            </div>
            <div className={"icon_text"}>
                {questionInfo.question}
            </div>
        </li>
    )
}

export default Icon;