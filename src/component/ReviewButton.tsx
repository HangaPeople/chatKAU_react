import '../style/ReviewButton.css'
import {QuestionAnswerPair, ReviewAnswerDto} from "../domain/review-button/ReviewAnswer";

const ReviewButton = (questionAnswerPair: QuestionAnswerPair) => {
    const goodButtonClicked = () => {
        const dto: ReviewAnswerDto = {
            "question": questionAnswerPair.question,
            "answer": questionAnswerPair.answer,
            "review": true
        };
        // 질문 어떻게 들고 올 건지 고민 필요
        // 만든 dto 서버로 보내야 함
    }

    const badButtonClicked = () => {
        const dto: ReviewAnswerDto = {
            "question": questionAnswerPair.question,
            "answer": questionAnswerPair.answer,
            "review": false
        };
        // 질문 어떻게 들고 올 건지 고민 필요
        // 만든 dto 서버로 보내야 함
    }

    return (
        <>
            <div className='review-button'>
                <button onClick={goodButtonClicked}>좋아요</button>
                <button onClick={badButtonClicked}>싫어요</button>
            </div>
        </>
    );
}

export default ReviewButton;
