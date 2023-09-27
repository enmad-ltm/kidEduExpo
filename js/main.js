$(document).ready(function() {

    let evtMode = 'offline';

    if (evtMode == 'offline') {
        var printDom = $('.card__item');
        var printDom2 = $('.card__body__line');
        var printHtml = `<div class="btn-wrap">
                        <button id="showPrize" class="join-btn">경품확인하기</button>
                    </div>`;
        var printHtml2 = `<div class="btn-wrap">
                    <button id="memberCheck" class="join-btn">직원확인하기</button>
                </div>`;
        printDom.before(printHtml);
        printDom2.before(printHtml2);
    } else if(evtMode == 'online') {
        console.log('online');
    }
    


    // 댓글버튼
    $("#replySend").click(function() {
        var inputData = $("#replyInput").val();
        console.log("inputData:",inputData);

        var now = new Date();
        var nowYear = now.getFullYear();
        var nowMonth = now.getMonth()+1;
        var nowDay = now.getDate();
        var nowTime = now.getHours()+':'+now.getMinutes();

        var nowDate = nowYear+'-'+(("00"+nowMonth.toString()).slice(-2))+'-'+(("00"+nowDay.toString()).slice(-2))+' '+nowTime;

        const targetDom = $('.reply-wrap');
        var newReply = '';
        newReply = `<div class="reply">
                    <div class="reply__arrow"></div>
                    <h3 class="reply__header">이강인</h3>
                    <div class="reply__body">
                        <p>`+inputData+`</p>
                    </div>
                </div>
                <div class="reply-date">
                    <p>`+nowDate+`</p>
                </div>`;
        console.log('newReply:',newReply);
        targetDom.append(newReply);
        $("#replyInput").val('');

        $.ajax({
            type: "POST", // 또는 "GET"으로 변경할 수 있음
            url: "https://kideduexpo-test.epopkon.com/api/admin/create",
            contentType: "application/json; charset=utf-8",
            dataType: "json",	
            xhrFields: { 
                withCredentials: true // 클라이언트와 서버가 통신할때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
            },
            data:  JSON.stringify ({
                    "celebration": inputData,
                    "delYn": "string",
                    "description": "string",
                    "eventCode": "string",
                    "insDate": "2023-09-13T02:31:47.837Z",
                    "periodEnd": "2023-09-13T02:31:47.837Z",
                    "periodStart": "2023-09-13T02:31:47.837Z",
                    "privacyNotice": "string",
                    "subsidiryNotice": "string",
                    "uptDate": "2023-09-13T02:31:47.837Z"
                    }),
            success: function(response) {
                // var msg = response.msg;
                // alert(msg);
                
                var now = new Date();
                var nowYear = now.getFullYear();
                var nowMonth = now.getMonth()+1;
                var nowDay = now.getDate();
                var nowTime = now.getHours()+':'+now.getMinutes();

                var nowDate = nowYear+'-'+(("00"+nowMonth.toString()).slice(-2))+'-'+(("00"+nowDay.toString()).slice(-2))+' '+nowTime;

                const targetDom = $('.reply-wrap');
                var newReply = '';
                newReply = `<div class="reply">
                            <div class="reply__arrow"></div>
                            <h3 class="reply__header">이강인</h3>
                            <div class="reply__body">
                                <p>`+inputData+`</p>
                            </div>
                        </div>
                        <div class="reply-date">
                            <p>`+nowDate+`</p>
                        </div>`;
                console.log('newReply:',newReply);
                targetDom.append(newReply);
                $("#replyInput").val('');

                // $('.reply__header') => session 정보 추가 필요
                // api 전송 추가 필요
                
            },
            error: function(request, status, error) {
                console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
        });
    });

    // 경품확인
    $('#showPrize').on('click', function(){
        window.location = 'gift.html';
    });



    // 직원확인    
    
    
});