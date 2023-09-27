document.addEventListener("DOMContentLoaded", function () {
    const stepsList = document.querySelector('.signup__steplist');
    const content = document.querySelector('.signup__cont');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const finBtn = document.getElementById('finBtn');
    const cancBtn = document.getElementById('cancBtn');

    const stepHeaders = content.querySelectorAll("h2");

    stepsList.addEventListener("click", function(e){
        e.preventDefault();
        console.log('e:',e);
        const targetStepId = e.target.getAttribute("href");
        console.log('href:',targetStepId);
        const targetStep = document.querySelector(targetStepId);
        targetStep.scrollIntoView({ behavior: "smooth" });
    });

    let currentStep = 0;

    function updateButtons(){
        prevBtn.disabled = currentStep === 0;
        nextBtn.disabled = currentStep === stepHeaders.length - 1;
        finBtn.disabled = currentStep !== stepHeaders.length - 1;
    }

    function showStep (stepIdx){
        stepHeaders.forEach((header, idx) => {
            const step = document.getElementById(`step${idx+1}`);
            if (idx===stepIdx){
                step.style.display="block";
            }else{
                step.style.display="none";
            }
        });
    }

    prevBtn.addEventListener("click",function(){
        if(currentStep > 0){
            cuttentStep--;
            showStep(currentStep);
            updateButtons();
        }
    });
    
    nextBtn.addEventListener("click", function() {
        if(currentStep < stepHeaders.length - 1) {
            currentStep++;
            showStep(currentStep);
            updateButtons();
        }
    });

    finBtn.addEventListener("click",function(){
        alert("process fin!");
    });

    cancBtn.addEventListener("click",function(){
        alert("cancel!");
    });

    updateButtons();

});