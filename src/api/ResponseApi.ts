export const getGPTResponse = async (body:{
    type:string;
    messages:[{role:string,content:string}]
}) => {
    //http://ec2-13-209-97-116.ap-northeast-2.compute.amazonaws.com:8080/langchain
    const result = await fetch('http://ec2-13-209-97-116.ap-northeast-2.compute.amazonaws.com:8080/langchain', {
        method: 'POST', // HTTP 요청 메서드 설정
        headers: {
            'Content-Type': 'application/json' // 요청 바디의 데이터 타입 설정
        },
        body:JSON.stringify(body),
    }).then(res =>{
        if(!res.ok){
            throw new Error('에러')
        }
        return res.json()
    })

    return JSON.stringify(result);
}



