import '../style/ReviewButton.css'
import {QuestionAnswerPair, ReviewAnswerDto} from "./ReviewAnswer";
import {registerSavedAnswer} from "../api/SaveAnswerApi";

const ReviewButton = (questionAnswerPair: QuestionAnswerPair) => {
    const goodButtonClicked = () => {
        const dto: ReviewAnswerDto = {
            "question": questionAnswerPair.question,
            "answer": questionAnswerPair.answer,
            "review": true
        };

        const resp = registerSavedAnswer(dto).catch((e) => console.log(e)).then();
        console.log(resp);
    }

    const badButtonClicked = () => {
        const dto: ReviewAnswerDto = {
            "question": questionAnswerPair.question,
            "answer": questionAnswerPair.answer,
            "review": false
        };

        const resp = registerSavedAnswer(dto).catch((e) => console.log(e)).then();
        console.log(resp);
    }

    return (
        <>
            <div className='review-button'>
                <div className='statement'>답변이 도움이 되었나요?</div>
                <button className='button-good-style' onClick={goodButtonClicked}></button>
                <button className='button-bad-style' onClick={badButtonClicked}></button>
            </div>
        </>
    );
}

export default ReviewButton;
