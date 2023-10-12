import {CommonQuestion} from "./Chat";
import Icon from "./icon";

function SlideMenu() {
    const questions: CommonQuestion[] = [
        {
            "logo": "학식 메뉴",
            "question": "학식 메뉴"
        },
        {
            "logo": "학사 일정",
            "question": "학식 메뉴"
        },
        {
            "logo": "학식 메뉴",
            "question": "학식 메뉴"
        },
        {
            "logo": "학식 메뉴",
            "question": "학식 메뉴"
        },
        {
            "logo": "학식 메뉴",
            "question": "학식 메뉴"
        },
        {
            "logo": "학식 메뉴",
            "question": "학식 메뉴"
        },
        {
            "logo": "학식 메뉴",
            "question": "학식 메뉴"
        },
    ];

    return (
        <div className={`slide-menu`}>
            <div className={"menu-content"}>
                <ul id={"menu_list_id"} className={"menu_list_class"}>
                    {questions.map((question, index) => (
                        <Icon key={index} questionInfo={question}/>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SlideMenu;