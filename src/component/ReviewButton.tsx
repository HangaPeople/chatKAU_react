import '../style/ReviewButton.css'
import {QuestionAnswerPair, ReviewAnswerDto} from "../domain/review-button/ReviewAnswer";

const ReviewButton = (questionAnswerPair: QuestionAnswerPair) => {
    const goodButtonClicked = () => {
        const dto: ReviewAnswerDto = {
            "question": questionAnswerPair.question,
            "answer": questionAnswerPair.answer,
            "review": true
        };
        console.log(dto.answer);
        // 질문 어떻게 들고 올 건지 고민 필요
        // 만든 dto 서버로 보내야 함
    }

    const badButtonClicked = () => {
        const dto: ReviewAnswerDto = {
            "question": questionAnswerPair.question,
            "answer": questionAnswerPair.answer,
            "review": false
        };
        console.log(dto.answer);
        // 질문 어떻게 들고 올 건지 고민 필요
        // 만든 dto 서버로 보내야 함
    }

    return (
        <>
            <div className='review-button'>
                <div className='statement'>답변이 도움이 되었나요?</div>
                <button className='button-style' onClick={goodButtonClicked}>좋아요</button>
                <button className='button-style' onClick={badButtonClicked}>싫어요</button>
            </div>
        </>
    );
}

export default ReviewButton;
