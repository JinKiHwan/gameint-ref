function mainBgAnimation() {
    const mainBook = gsap.utils.toArray('.main .book');

    mainBook.forEach((elem, index) => {
        gsap.to('.book div', {
            yPercent: gsap.utils.wrap([50, -80]),
            duration: 50,
            repeat: -1,
            ease: 'none',
        });
    });
}

function scrollAnimation() {
    const scrollAni = gsap.to('.scroll_wrap', {
        rotate: 360,
        repeat: -1,
        duration: 20,
        ease: 'none',
    });

    const scrollAni2 = gsap.to('.scroll_star', {
        rotate: -360,
        repeat: -1,
        duration: 20,
        ease: 'none',
    });

    ScrollTrigger.create({
        trigger: '.mainSection',
        start: 'top center',
        end: 'bottom top',
        animation: gsap.to('.scroll', {
            rotate: 520,
            ease: 'none',
        }),
        scrub: true,
    });

    ScrollTrigger.create({
        trigger: '.mainSection',
        start: 'top center',
        end: 'bottom top',
        animation: gsap.to('.scroll_star img', {
            rotate: -520,
            ease: 'none',
        }),
        scrub: true,
    });
}

const text = document.querySelector('#telegram');
function contactMouseEnter() {
    text.textContent = 'Telegram';
}
function contactMouseLeave() {
    text.textContent = 'Contact';
}

text.addEventListener('mouseenter', contactMouseEnter);
text.addEventListener('mouseleave', contactMouseLeave);

function headerFixed() {
    ScrollTrigger.create({
        trigger: '.header',
        start: 'top top',
        end: 'max',
        pin: true,
        pinSpacing: false,
<<<<<<< HEAD
        //markers: true,
=======
        markers: true,
>>>>>>> parent of 1b4db02 (abc)
    });
}

headerFixed();
mainBgAnimation();
scrollAnimation();
markers();
