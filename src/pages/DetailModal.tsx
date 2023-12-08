import {useEffect} from "react";
import "../style/DetailModal.css"
import {DetailModalProps} from "../component/Chat";
import React from "react";

const DetailModal = (detailModalProps: DetailModalProps) => {
    const {isOpen, close, content, hyperLink} = detailModalProps;

    const lines = content.split("\n");

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
                    <div className='modal-wrapper' onClick={close}>
                        <div className='detail-modal'>
                            <div className='detail-modal-header'>
                                <img className="logo-img" src={`${process.env.PUBLIC_URL}/wordmark.png`} alt={"로고"}/>
                                <button className='close' onClick={close}>&times;</button>
                            </div>
                            <div className='detail-modal-body'>
                                {
                                    lines.map((line, index) => (
                                        <React.Fragment key={index}>
                                            {line}
                                            {index !== lines.length - 1 && <br />}
                                        </React.Fragment>
                                    ))
                                }
                            </div>
                            <div className='detail-modal-tail'>
                                자세한 내용은&nbsp;
                                <a href={hyperLink} target="_blank">여기</a>
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
