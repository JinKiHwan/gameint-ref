const theme = {
    primary: '#ecceae',
    secondary: '#26355d',
};

function changeTheme(themeMode = 'dark') {
    const tween = gsap
        .timeline()
        .to('body, .header', {
            backgroundColor: themeMode === 'dark' ? theme.secondary : '#eee',
            color: themeMode === 'dark' ? theme.primary : theme.secondary,
            borderColor: themeMode === 'dark' ? '#fff' : theme.secondary,
        })
        .to(
            '.intro_text p',
            {
                color: themeMode === 'dark' ? theme.primary : theme.secondary,
            },
            0
        );

    return tween;
}

function headerFixed() {
    ScrollTrigger.create({
        trigger: '.header',
        start: 'top top',
        end: 'max',
        pin: true,
        pinSpacing: false,
        //markers: true,
    });
}

function mainBgAnimation() {
    const mainBook = gsap.utils.toArray('.main .book');

    mainBook.forEach((elem) => {
        gsap.timeline()
            .set('.book div img', {
                filter: 'blur(10px)',
            })
            .to('.book div img', {
                filter: 'blur(0)',
                stagger: {
                    amount: 1.5,
                    from: 'random',
                },
            })
            .to('.book div', {
                yPercent: gsap.utils.wrap([50, -80]),
                duration: 100,
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

    const scrollAni2 = gsap
        .timeline()
        .set('.scroll_star', {
            xPercent: -50,
            yPercent: -50,
        })
        .to('.scroll_star', {
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
            rotate: -720,
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

function bodyBgAnimation() {
    const bodyAni = gsap.to('body', {});

    ScrollTrigger.create({
        trigger: '.intro',
        start: 'top top',
        end: 'top top',
        animation: bodyAni,
        //markers: true,
        //scrub: true,
        //enter leave enterback leaveback
        toggleActions: 'play none none reverse',

        onEnter: () => {
            mode = 'white';

            changeTheme(mode);
        },
        onEnterBack: () => {
            mode = 'dark';

            changeTheme(mode);
        },
    });
}

function introAnimation() {
    const introForward = gsap
        .timeline({ paused: true })
        .to('.intro_text p span', {
            yPercent: 0,
            stagger: {
                each: 0.1,
            },
        })
        .to('.intro_img figure', {
            opacity: 1,
            xPercent: 0,
            ease: 'back(3)',
        });

    const introReverse = gsap
        .timeline({ paused: true })
        .to('.intro_text p span', {
            xPercent: -100,
            stagger: {
                each: 0.1,
            },
        })
        .to(
            '.intro_img figure',
            {
                opacity: 0,
                xPercent: 10,
            },
            '<'
        );

    gsap.set('.intro_text p span', { yPercent: 100 });
    gsap.set('.intro_img figure', { opacity: 0, xPercent: 10 });

    ScrollTrigger.create({
        trigger: '.intro',
        start: 'top center', // 요소의 상단이 뷰포트의 하단에 도달할 때 시작
        end: '80% center', // 요소의 하단이 뷰포트의 상단에 도달할 때 끝
        onEnter: () => introForward.play(),
        onLeave: () => introReverse.play(),
        onEnterBack: () => introReverse.reverse(),
        onLeaveBack: () => introForward.reverse(),
        markers: true,
    });
}

headerFixed();
bodyBgAnimation();
mainBgAnimation();
scrollAnimation();
introAnimation();
markers();
