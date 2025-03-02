(function(){
    "use strict";
    console.log('reading js');

    const html = document.querySelector('html');
    const inputs = document.querySelectorAll('.input');
    let currentIndex = 0;
    const sections = document.querySelectorAll('section');
    const sectionsContent = [];
    for (let i = 1; i<sections.length; i++){ //populate sections content
        sectionsContent[i] = sections[i].querySelector('div');
    }
    console.log(sectionsContent);
    let sectionTops=[];
    let pageTop;
    let sectionIndex = 1;
    let prevSectionIndex = 1;
    sections.forEach(function(eachSection){
        sectionTops.push(Math.floor(eachSection.getBoundingClientRect().top) + window.scrollY);
    });
    window.addEventListener('scroll', function(){
        pageTop = window.scrollY; // this should be equal to the height of the page before the top of first section (i think)
        console.log(pageTop);
        if (pageTop > sectionTops[sectionIndex]) {
            sectionIndex++;
            console.log(`scrolling down ${sectionIndex}`);
        }
        else if (sectionIndex > 1 && pageTop < sectionTops[sectionIndex - 1]) {
            sectionIndex--;
            console.log(`scrolling up ${sectionIndex}`);
        }
        if (sectionIndex != prevSectionIndex) {
            // do stuff to the page here
            html.setAttribute('class', `bgcolor${sectionIndex}`);
            // reset the counter for the next section...
            prevSectionIndex = sectionIndex;
        }
    });
    console.log(sectionTops);

    
    function nextInput() { //this function is initialized here, and will run every setInterval (at bottom)
        const currentInput = inputs[currentIndex];
        const nextIndex = (currentIndex + 1) % inputs.length;
        const nextInput = inputs[nextIndex];

        currentInput.style.transform = "translateY(-100%)"; //current word animated out
        currentInput.style.opacity = "0";

        nextInput.style.transform = "translateY(0)"; //next word animated in
        nextInput.style.opacity = "1";

        setTimeout(() => { // Prepare the word after that to start from the bottom
            currentInput.style.transform = "translateY(100%)";
        }, 1000); // After animation ends, reset position

        currentIndex = nextIndex;
    }

    // Initialize the first word
    inputs[0].style.opacity = "1";
    inputs[0].style.transform = "translateY(0)";

    // Change word every 3 seconds
    setInterval(nextInput, 3000);
})();