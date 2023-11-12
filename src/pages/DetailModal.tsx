import {useEffect} from "react";
import "../style/DetailModal.css"
import {DetailModalProps} from "../atom/Chat";

const DetailModal = (detailModalProps: DetailModalProps) => {
    const {isOpen, close, content, hyperLink} = detailModalProps;

    useEffect(() => {
        if(isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen])

    return (
        <>
            {
                isOpen ? (
                    <div className='modal-wrapper'>
                        <div className='detail-modal'>
                            <div className='detail-modal-header'>
                                <button className='close' onClick={close}>&times;</button>
                            </div>
                            <div className='detail-modal-body'>
                                {content}
                            </div>
                            <div className='detail-modal-tail'>
                                자세한 내용은
                                <a href={hyperLink}>여기</a>
                                를 클릭해주세요
                            </div>
                        </div>
                    </div>
                ) : null
            }
        </>
    );
}


export default DetailModal;
