const signupForm = document.querySelector('.signup');
const signupRes = {};

$('.agreement-wrap .accordion').on("click", function(){
    console.log('this:', );
    if ($(this).parent().parent().parent().find('.panel').css('display') === "block") {
        $(this).find('.acc-arrw').html(`&#5171`);
        $(this).parent().parent().parent().find('.panel').toggle("active");
    } else if($(this).parent().parent().parent().find('.panel').css('display') === "none") {
        $(this).find('.acc-arrw').html(`&#5167`);
        $(this).parent().parent().parent().find('.panel').toggle("active");
    }
});

$('#agreeAll').on('click', function(){
    if($('#agreeAll').is(":checked")) {
        $('.agreement input[type=checkbox]').prop('checked', true);
    } else {
        $('.agreement input[type=checkbox]').prop('checked', false);
    }
     
});


$('.agreement .next').on('click', function(){
    signupRes.subsidiarySeqList = '';
    var tmpArr = '';
    const isChk = $('#privacy').prop('checked');
    let compLeng = $('.comp-list input:checked').length;
    let compList = $('.comp-list .comp-list__comp').length;

    $('.actions li.disabled a').on('click',function(){
        console.log('this attr:', $(this).parent().attr('aria-disabled'));
        if($(this).parent().attr('aria-disabled') == 'true'){
            console.log('true!');
        } else {
            console.log('false!');
        }
    });


    if(!isChk){
        alert('개인정보 수집 및 이용에 동의해주세요.');
        return false;
    }
    if(compLeng < 1){
        alert('위탁 동의 계열사를 최소1개 이상 선택해주세요.')
        return false;
    }
    if (compLeng > 1){
        for(var i=0; i < compList; i++){
            if ( $('#comp0'+(i+1)).prop('checked') && (i < 1)){
                tmpArr = $('#comp0'+(i+1)).val();
            } else if ($('#comp0'+(i+1)).prop('checked') && (i > 0)) {
                tmpArr += ','+$('#comp0'+(i+1)).val();
            }
        }

        if (tmpArr[0] == ',') {
            signupRes.subsidiarySeqList = tmpArr.substring(1);
        } else {
            signupRes.subsidiarySeqList = tmpArr;
        }
    } else if (compLeng == 1) {
        signupRes.subsidiarySeqList = $('.comp-list input:checked').val();
    }

    console.log('signupRes.subsidiarySeqList:', signupRes.subsidiarySeqList);

    $('.agreement').addClass('d-none');
    $('.wizard').removeClass('d-none');
    $('.signup__img-wrap').removeClass('d-none');


});

$(document).ready(function(){
if($('#wizard').length > 0){


        
    window.parsley.addValidator('uniqueEmail', {
        validateString: function(val){
            let isDuplicate = mailDupChk();
            return isDuplicate;
        },
        priority : 31,
        messages : {
            ko: '이미 사용중인 이메일입니다.'
        }

    });

    window.parsley.addValidator('uniquePhone', {
        validateString: function(val){
            let isDuplicate2 = phoneDupChk();
            return isDuplicate2;
        },
        priority : 32,
        messages : {
            ko: '이미 사용중인 전화번호입니다.'
        }

    });

    window.parsley.addMessages('ko',{
        defaultMessage: "This value seems to be inavalid",
        type: {
            email: "올바른 이메일 주소를 입력하세요.",
            phone : "숫자만 입력할 수 있습니다."
        },
        required: "이 필드는 필수 항목입니다."
    });

    function mailDupChk (){

        // API 실행 => 사용가능: true, 중복:false
        // ▼ 임시 중복메일 test@enmad.com 

        if($('#email').val() == 'test@enmad.com') {
            return false;
        } else {
            return true;
        }
    }

    function phoneDupChk (){

        // API 실행 => 사용가능: true, 중복:false
        // ▼ 임시 중복번호 12345

        if($('#phoneNum').val() == '12345') {
            return false;
        } else {
            return true;
        }
    }

    window.Parsley.setLocale('ko');

    $('#wizard').steps({
        headerTag: 'h3',
        bodyTag: 'section',
        autoFocus: true,
        transitionEffect: 'slide',
        titleTemplate: '<span class="number">#index#</span><span class="title">#title#</span>',
        labels: {
            next: '다음',
            previous: '이전',
            finish: '완료'
        },
        onStepChanging: function (event, currentIndex, newIndex) {
            if (newIndex < currentIndex) {
                return true;
            } else if (newIndex > currentIndex) {
                const bgEl = $('.signup__img__bg');
                const bus = $('.signup__img__bus');
                switch(currentIndex){
                    case 0:
                        var emailIp = $('#email').parsley();                        
                        var passIp = $('#pass').parsley();
                        var passChkIp = $('#passConfirm').parsley();

                        console.log('emailIp:',emailIp);

                        if(emailIp.isValid() && passIp.isValid() && passChkIp.isValid()) { 
                            bgEl.css({
                                "background" : "url('./img/bg02.png')",
                                "-webkit-animation" : "slide 3s linear infinite"
                            });
                            bus.css("left","22%");
                            signupRes.suEmail = emailIp.getValue();
                            signupRes.suPass = passIp.getValue();
                            return true;
                        } else {
                            emailIp.validate();
                            passChkIp.validate();
                            passIp.validate();
                            return false;
                        }
                        break;


                    case 1:
                        var nameIp = $('#name').parsley();
                        var phoneNumIp = $('#phoneNum').parsley();
                        
                        if(nameIp.isValid() && phoneNumIp.isValid()){
                            bgEl.css({
                                "background" : "url('./img/bg03.png')",
                                "-webkit-animation" : "slide 2.5s linear infinite"
                            });
                            bus.css("left","44%");
                            signupRes.suName = nameIp.getValue();
                            signupRes.suPhoneNum = phoneNumIp.getValue();
                            return true;
                        } else {
                            nameIp.validate();
                            phoneNumIp.validate();
                            return false;
                        }
                    case 2:
                        bgEl.css({
                            "background" : "url('./img/bg04.png')",
                            "-webkit-animation" : "slide 1.8s linear infinite"
                        });
                        bus.css("left","68%");
                        return true;
                }
            }
        },
        onFinished: function (event, currentIndex) {

            if(!selectCheck()) return false;
            setFadeOut();

            for (var i = 9; i > 0; i--) {
                (function (index) {
                    setTimeout(function () {
                        $('.signup__img__bg').css('opacity', index / 10);
                    }, (10 - index) * 20);
                })(i);
            }
            setTimeout(function() {
                $('.signup__img__bg').css('opacity', 0);
            }, 500);

            $('.signup__img__board__dottedline').css('-webkit-animation', 'unset');
            $('.signup__img__school').css("left", "120%");
            $('.signup__img__school').css("opacity", "1");
            $('.signup__img__school, .signup__img__bus').css("transition", "left 1.5s ease");

            $('.signup__img__bus').css("left", "34%");
            $('.signup__img__school').css("left", "50%");
        }
    });
}

});


// case 2

function handleInput(ie) {
    ie.value = ie.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    numMax(ie);
}


// case 4



function showMulti() {
    let childSelVal = document.querySelector('#signupSelect option:checked').value;
    if (childSelVal !== '0') {
        document.querySelector('.multi-select').classList.remove('d-none');
    } else if (childSelVal == '0') {
        document.querySelector('.multi-select').classList.add('d-none');
    }
}

// fin animation

function setFadeOut(){
    const wizardArea = document.getElementById('wizard');
    wizardArea.classList.add('animate__fadeOut');
    setTimeout(function() {
        wizardArea.style.opacity = 0;
    }, 1000);
    setTimeout(function() {
        signupSuc();
    }, 1500);
}

function selectCheck() {
    /*
        - childSelectVal (childSelect의 option 값)이 0이 아닐때
        - case 0 : checked 개수가 1보다 적으면 false::not-enough,   // 공통
        - case 1 : checked 개수가 1이면 true 2이상 false::over      // childSelectVal=1일때
        - case 2 : checked 개수가 1 || 2이면 true 3이상 false::over // childSelectVal=2일때
        - case 3 : 공통만 해당
    */
    const childSelect = signupForm.querySelector('#signupSelect');
    const childSelectVal = childSelect.value;
    const msArr = document.getElementsByName("childLeng");

    let realIpVal = new Array;
    var rst = false;

    if (childSelectVal !==0) {
        var ipValArr = new Array;
        for(i=0; i < msArr.length; i++){
            if(msArr[i].checked == true){
                ipValArr[i] = msArr[i].value;
            }
        }
        realIpVal = ipValArr.filter(Boolean);
    }
    
    switch(childSelectVal){
        case '0':
            rst = true;
            break;
        case '1명':
            if(realIpVal.length == 1){
                rst = true;
                break;
            } else if(realIpVal.length == 0) {
                alert('체크를 하나도 안하셨어요');
                return false;
            } else if(realIpVal.length >= 2 ) {
                alert('선택한 자녀수보다 많이체크했어요');
                return false;
            }
            break;
        case '2명':
            if(realIpVal.length == 1 || realIpVal.length == 2){
                rst = true;
                break;
            } else if(realIpVal.length == 0) {
                alert('체크를 하나도 안하셨어요');
                return false;
            } else if(realIpVal.length >= 3 ) {
                alert('선택한 자녀수보다 많이체크했어요');
                return false;
            }
            break;
        case '3명 이상':
            if(realIpVal.length >= 1){
                rst = true;
                break;
            } else if(realIpVal.length < 1) {
                alert('체크를 하나도 안하셨어요');
                return false;
            }
            break;
   }
   if (rst) {

    signupRes.suSelect = $('#signupSelect').val();
    // let suChkboxVals = [];
    let suChkboxVals = '';

    const childLeng = $('#signupSelect').val();
    if ( childLeng !=='0') {
        suChkboxGroup = $('input[name="childLeng"]:checked');

        suChkboxGroup.each(function(){
            // suChkboxVals.push($(this).val());
            suChkboxVals += ','+$(this).val();
        });

        console.log('suChkboxVals: ',suChkboxVals);

        signupRes.suCheck = suChkboxVals.substring(1);
        
    } else if( childLeng === '0') {
        signupRes.suCheck = null;
    }

    console.log("signupRes:", signupRes);

    let suEmail = '';
    let suPass = '';    //암호화 필요
    let suAddr = '';
    let suSelect = '';
    let suCheck = '';

        return true;
    } else {
        return false;
    }

}


function signupSuc(){
    modalOpen('finModal','축하합니다!','가입이 완료되었습니다.\n확인버튼을 누르시면 로그인 페이지로 이동합니다.\n로그인 후 푸짐한 선물 챙기세요!');
}

function setFindMailForm () {
    $('.signin__btn').addClass('d-none');
    $('.lost-email').removeClass('d-none');
}

function setFindPassForm () {
    $('.signin__btn').addClass('d-none');
    $('.lost-password').removeClass('d-none');
}

function mailDefineForm () {
    $('.lost-email').addClass('d-none');
    $('.go-back').addClass('d-none');
    $('.go-home').removeClass('d-none');
    $('.find-form').removeClass('d-none');
}

function printRes(e){
    $('.find-form__insert-section').text(e);
}

// 2023-09-26 수정
function signupFin() {
    const suRst = signupRes;

    $.ajax({
        type: "POST",
        url : "https://kideduexpo-test.epopkon.com​/api/user/user-enroll-self",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            "userEmail": suRst.suEmail,
            "userPassword": suRst.suPass,
            "userPhone": signupRes.suPhoneNum,
            "userName": signupRes.suName,
            "userAddress": "suRst.suAddr",
            "childCount": suRst.suSelect,
            "childAge": "suRst.suCheck",
            "subsidiaryIndex": "suRst.subsidiarySeqList"
        }),
        success: function(response){
			if (response.message === "success") {
				alert('fin!');
				
				loginAfterSignup(suRst.suEmail, suRst.suPass);
				// 이동 > (로그인 후 이동)
				// window.location = './main.html';
			} else {
				alert(response.message);
			}
        },
        error: function(response){
            // console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            console.log(response.message);
            alert('잘못된 요청입니다.');
        }
    });
}

// 회원가입 후 로그인 기능
function loginAfterSignup(userEmail, userPassword) {
	$.ajax({
        type: "POST",
        url : "https://kideduexpo-test.epopkon.com​/api/user/login-self",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            "userEmail": userEmail,
			"userPassword": userPassword
        }),
        success: function(response){
			if (response.message === "success") {
				// 이동
				window.location = './main.html';
			} else {
				alert(response.message);
			}
        },
        error: function(response){
            console.log(response.message);
            alert('잘못된 요청입니다.');
        }
    });
}

