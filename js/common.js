// action
let fadeInKF = [
    {opacity: 0},
    {opacity: 0.2},
    {opacity: 1, transform: "translate(100px, 0)"}
];
let fadeInOpt = {
    delay: 1300,
    duration: 1000,
    easing: "ease-in",
    iterations: Infinity,
    fill: "forwards"
};

// funtion
function go2page(page) {
    location.href = "./"+page+".html";
}

function numMax(e) {
    if(e.value.length > e.maxLength){
        e.value = e.value.slice(0, e.maxLength);
    }
}

function modalOpen (modalId, modTtl, modCopy){

    let openModal = document.querySelector('#'+modalId);
    openModal.classList.add('show');

    $('body').append('<div class="modal-backdrop"></div>');

    let changedTtl = document.querySelector('.modal__body__ttl');
    changedTtl.textContent = modTtl;

    let changedCopy = document.querySelector('.modal__body__txt');
    changedCopy.textContent = modCopy;
    
}



// 날짜 데이터 표시 변환
function formatDateTime(dateTimeString) {
    var date = new Date(dateTimeString);
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');
    var hours = date.getHours().toString().padStart(2, '0');
    var minutes = date.getMinutes().toString().padStart(2, '0');
    
    return year + "-" + month + "-" + day + " " + hours + ":" + minutes;
}