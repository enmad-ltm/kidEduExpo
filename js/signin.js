
function login () {
            
    let loginForm = $('#generalLoginForm').serializeArray();

    let inputId = loginForm[0].value;
    let inputPw = loginForm[1].value;

    if (inputId === "test" && inputPw === "1234") {
        alert('hello');
        go2page("main");
    } else if (inputId == '' || inputPw =='') {
        alert('계정 정보를 입력해주세요.');
    } /* else {
        alert('계정 정보를 확인해주세요.');
    } */


    $.ajax({
        type: "POST",
        url  : "https://kideduexpo-test.epopkon.com​/api/user/login-self",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data : JSON.stringify({
            "userEmail": inputId,
            "userPassword": inputPw
        }),
        success : function(response){
            console.log(response.message);
            if (response.message ==='success') {
                // 이동
                window.location = './main.html';
            } else {
                alert(response.message);
            }
        },
        error : function(response) {
        console.log(response.message);
            alert("fail");
        }
    });

    return false;
}

function go2signIn() {
    $('.signin__btn').addClass('blur-out');
    setTimeout(function() {
        $('.signin__btn').addClass('d-none');
        $('.signin__input').addClass('blur-in');
        $('.signin__input').removeClass('d-none');
        $('.signin-sns').addClass('blur-in');
        $('.signin-sns').removeClass('d-none');
        $('.signin__account').addClass('blur-in');
        $('.signin__account').removeClass('d-none');
        $('.signup-sns').addClass('d-none');

    }, 150);
}