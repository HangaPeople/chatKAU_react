import "../style/MajorSelect.css"
import React, {useEffect, useState} from "react";

const MajorSelect = () => {
    const [defaultMajor, setDefaultMajor] = useState("")
    useEffect(() => {
        const majorFromStorage = sessionStorage.getItem("major");
        if (majorFromStorage) {
            setDefaultMajor(majorFromStorage);
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedMajor = e.target.value;
        sessionStorage.setItem("major", selectedMajor);
        setDefaultMajor(selectedMajor);
    }
    return (
        <select
            className='major-select'
            onChange={handleChange}
        >
            <option disabled selected>
                {defaultMajor ? defaultMajor : "학과를 선택해주세요."}
            </option>
            <option value="항공우주 및 기계공학부">항공우주 및 기계공학부</option>
            <option value="항공우주공학과">항공우주공학과</option>
            <option value="기계공학과">기계공학과</option>
            <option value="항공전자정보공학부">항공전자정보공학부</option>
            <option value="컴퓨터공학과">컴퓨터공학과</option>
            <option value="전기전자공학과">전기전자공학과</option>
            <option value="신소재공학과">신소재공학과</option>
            <option value="자유전공학부">자유전공학부</option>
            <option value="소프트웨어학과">소프트웨어학과</option>
            <option value="스마트드론공학과">스마트드론공학과</option>
            <option value="AI자율주행시스템공학과">AI자율주행시스템공학과</option>
            <option value="항공교통물류학부">항공교통물류학부</option>
            <option value="항공경영학과">항공경영학과</option>
            <option value="경영학과">경영학과</option>
            <option value="항공운항학과">항공운항학과</option>
            <option value="국제교류학부">국제교류학부</option>
        </select>
    );
}

export default MajorSelect
