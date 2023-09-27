$(document).ready(function() {

    $('#findMailBtn').click(function(){
        let userPhone = $('#findMailPhone').val();
        let userName = $('#findMailName').val();

        $.ajax({
            type: "POST",
            url: "https://kideduexpo-test.epopkon.com/api/user/email-find",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            xhrFields: {
                withCredentials: true
            },
            data: JSON.stringify({
                "userPhone": userPhone,
                "userName": userName
            }),
            success: function(response){

                console.log("response:",response);
                mailDefineForm();
                if(response.rUserEmail){
                    printRes(response.rUserEmail);
                    $('.res-guider').removeClass('d-none');
                } else if(response.msg) {
                    printRes(response.msg);
                }
                
            },
            error: function(request, status, error){
                console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                alert('잘못된 요청입니다.');
            }
        });
    });

    $('#findPasswordBtn').click(function(){
        let userPhone = $('#findPasswordPhone').val();
        let userEmail = $('#findPasswordMail').val();
    $.ajax({
        type: "POST",
        url: "https://kideduexpo-test.epopkon.com​/api​/user​/password-find-modify",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        xhrFields: {
            withCredentials: true
        },
        data: JSON.stringify({
            "userEmail": userEmail,
            "userPhone": userPhone
        }),
        success: function(response){
            console.log("data:",data);
            mailDefineForm();

        },
        error: function(response){
            console.log("msg: ", response.msg);
            alert('잘못된 요청입니다.');
            $('#findPasswordPhone').val('');
            $('#findPasswordMail').val('');
        }
    });
    });
});