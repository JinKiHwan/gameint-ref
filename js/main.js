const scrollText = document.querySelector('.scroll_text .text p');
scrollText.innerHTML = scrollText.innerText
    .split('')
    .map((char, i) => `<span style="transform:rotate(${i * 7.5}deg">${char}</span>`)
    .join('');

const introText = gsap.utils.toArray('.intro_text p span');

//console.log(introText);
introText.forEach((text, index) => {
    console.log(text.innerHTML);

    text.innerHTML = text.innerText
        .split('')
        .map((char, i) => `<i>${char}</i>`)
        .join('');
});

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
    const scrollAni = gsap.to('.scroll_text', {
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

            //changeTheme(mode);
        },
        onEnterBack: () => {
            mode = 'dark';

            //changeTheme(mode);
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
            filter: 'blur(8px)',
            opacity: 0,
            scale: 1.1,
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
        animation: introForward,
        // onEnter: () => introForward.play(),
        // onLeave: () => introReverse.play(),
        // onEnterBack: () => introReverse.reverse(),
        // onLeaveBack: () => introForward.reverse(),
        //markers: true,
    });
}

function bookWrapAnimation() {
    const books = gsap.utils.toArray('.book_wrap li');

    books.forEach((book, index) => {
        //console.log(index);
        gsap.set(book, {
            rotate: 12 * index,
            position: 'absolute',
            transformOrigin: 'center 100vw',
        });
    });

    ScrollTrigger.create({
        trigger: '.review',
        start: 'top center',
        end: 'bottom top',
        ease: 'none',
        animation: gsap.to('.book_wrap', {
            rotate: -90,
            transformOrigin: 'center center',
        }),
        scrub: 2,
        onEnter: () => {
            gsap.to('.book_wrap li', {
                boxShadow: '0 5px 10px rgba(255, 255, 255, 0.2)',
            });
            mode = 'dark';
            //changeTheme(mode);
        },
        onLeaveBack: () => {
            gsap.to('.book_wrap li', {
                boxShadow: '0 5px 10px rgba(0, 0, 0, 0.5)',
            });
            mode = 'white';

            //changeTheme(mode);
        },
    });
}

function reviewAnimation() {
    const commentsLeft = gsap.utils.toArray('.review_comments .comment.left');
    const commentsRight = gsap.utils.toArray('.review_comments .comment.right');
    const commentsLeftFigure = gsap.utils.toArray('.comment.left figure');
    const commentsRightFigure = gsap.utils.toArray('.comment.right figure');

    const tl = gsap.timeline();

    // 모든 댓글을 초기 상태로 설정
    tl.set([...commentsLeft, ...commentsRight], {
        y: 30,
        opacity: 0,
        filter: 'blur(5px)',
        PointerEvent: 'none',
    })
        .set(commentsLeftFigure, {
            x: 100,
            opacity: 0,
        })
        .set(commentsRightFigure, {
            x: -100,
            opacity: 0,
        });

    // 댓글 수 중 더 많은 쪽을 기준으로 루프
    const maxComments = Math.max(commentsLeft.length, commentsRight.length);

    for (let i = 0; i < maxComments; i++) {
        // 왼쪽 댓글 애니메이션
        if (i < commentsLeft.length) {
            tl.to(commentsLeft[i], {
                y: 0,
                opacity: 1,
                filter: 'blur(0)',
                duration: 0.5,
            })
                .to(
                    commentsLeft[i],
                    {
                        yPercent: -100,
                        opacity: 0,
                        filter: 'blur(5px)',
                        duration: 0.5,
                    },
                    '+=1'
                )
                .to(
                    commentsLeftFigure[i],
                    {
                        x: 0,
                        opacity: 1,
                    },
                    '-=1'
                );
        }

        // 오른쪽 댓글 애니메이션
        if (i < commentsRight.length) {
            tl.to(commentsRight[i], {
                y: 0,
                opacity: 1,
                filter: 'blur(0)',
                duration: 0.5,
            })
                .to(
                    commentsRight[i],
                    {
                        yPercent: -100,
                        opacity: 0,
                        filter: 'blur(5px)',
                        duration: 0.5,
                    },
                    '+=1'
                ) // 1초 동안 표시
                .to(
                    commentsRightFigure[i],
                    {
                        x: 0,
                        opacity: 1,
                    },
                    '-=1'
                );
        }
    }

    ScrollTrigger.create({
        trigger: '.review_comments',
        start: 'center center',
        end: '+=10000',
        animation: tl,
        pin: true,
        pinSpacing: true,
        //markers: true,
        scrub: 1,
    });
}

headerFixed();
//bodyBgAnimation();
mainBgAnimation();
scrollAnimation();
introAnimation();
bookWrapAnimation();
reviewAnimation();

markers();
