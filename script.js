(() => {
    "use strict";
    console.log('reading js');
    const html = document.querySelector('html');
    const inputs = document.querySelectorAll('.input'); // this class is used to get divs
    const homepageLinks = document.querySelectorAll('.homepage-link');
    const pageData = { // these switch based on which section is in the viewport
        backgroundColor: ['var(--default-light)', 'var(--aquamarine)', 'var(--medium-blue)', 'var(--default-light)'],
        textColor: ['var(--default-dark)', 'var(--default-dark)', 'var(--default-light)', 'var(--scarlet)'],
        linkHoverColor: ['var(--medium-blue)', 'var(--scarlet)', 'var(--aquamarine)', 'var(--medium-blue)'],
    }
    const footerLinks = document.querySelectorAll('#footer-link-stack a');
    for(let i=0; i<footerLinks.length; i++){
        footerLinks[i].querySelector('.material-symbols-outlined').classList.toggle('hidden'); // hide the arrow icons by default
        footerLinks[i].addEventListener('mouseover', () =>{
            footerLinks[i].querySelector('.material-symbols-outlined').classList.toggle('hidden');
        });
        footerLinks[i].addEventListener('mouseout', () =>{
            footerLinks[i].querySelector('.material-symbols-outlined').classList.toggle('hidden');
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
        // create an array of all sections
        const sections = document.querySelectorAll(".section-content");
    
        // Function to check if an element is in the viewport
        function isInViewport(element) {
            let rect = element.getBoundingClientRect(); 
            return (
                rect.top < window.innerHeight * 0.8 && rect.bottom > 0
            );
        }
    
        // Function to check all sections and toggle visibility
        function checkSections() {
            for (let i = 0; i < sections.length; i++) {
                let section = sections[i];
                let link = homepageLinks[i];
    
                if (isInViewport(section)) { // if the section IS in the viewport, do the following
                    section.classList.add("visible"); // make it visible
                    html.style.backgroundColor = pageData.backgroundColor[i]; // change the background color
                    section.style.color = pageData.textColor[i]; // set the text color
                    link.style.color = pageData.textColor[i]; // the link inactive color should match the text color
                } else { // if the section IS NOT in the viewport, do the following
                    section.classList.remove("visible"); // Make it invisible
                }
            }
        }

        for (let i=0; i<homepageLinks.length; i++){
            let link = homepageLinks[i];
            link.addEventListener("mouseover", ()=> {
                link.style.color = pageData.linkHoverColor[i];
                link.style.setProperty("--underline-color", pageData.linkHoverColor[i]); // changes var(--underline-color), applied in ::after in css to match the hover color
            });
            link.addEventListener("mouseout", ()=> {
                link.style.color = pageData.textColor[i];
            });
        }
    
        // Run the check when scrolling or resizing
        window.addEventListener("scroll", checkSections);
        window.addEventListener("resize", checkSections);
    
        // Initial check in case sections are already visible on load
        checkSections();
    });

    // the following handles the tagline word replacement
    let currentIndex = 0
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