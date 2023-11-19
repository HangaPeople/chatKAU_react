import '../style/ReviewButton.css'
import {QuestionAnswerPair, ReviewAnswerDto} from "./ReviewAnswer";
import {registerSavedAnswer} from "../api/SaveAnswerApi";
import {useState} from "react";

const ReviewButton = (questionAnswerPair: QuestionAnswerPair) => {
    const [isReviewed, setIsReviewed] = useState<boolean>(false);

    const goodButtonClicked = () => {
        const dto: ReviewAnswerDto = {
            "question": questionAnswerPair.question,
            "answer": questionAnswerPair.answer,
            "review": true
        };

        const resp = registerSavedAnswer(dto).catch((e) => console.log(e)).then();
        setIsReviewed(true);
    }

    const badButtonClicked = () => {
        const dto: ReviewAnswerDto = {
            "question": questionAnswerPair.question,
            "answer": questionAnswerPair.answer,
            "review": false
        };

        const resp = registerSavedAnswer(dto).catch((e) => console.log(e)).then();
        setIsReviewed(true);
    }

    return (
        <>
            {
                !isReviewed ? (
                    <div className='review-button'>
                        <div className='statement'>답변이 도움이 되었나요?</div>
                        <button className='button-good-style' onClick={goodButtonClicked}></button>
                        <button className='button-bad-style' onClick={badButtonClicked}></button>
                    </div>
                ) : null
            }
            {
                isReviewed ? (
                    <div className='review-button'>
                        <div className='statement'>피드백 감사합니다!</div>
                    </div>
                ) : null
            }
        </>
    );
}

export default ReviewButton;
