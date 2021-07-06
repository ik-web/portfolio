document.addEventListener("DOMContentLoaded", () => {

    function doHeaderShadow() {
        const header = document.querySelector('#header');
        const windowPositionTop = 0;
        let windowScrollPosition = window.scrollY;

        window.addEventListener('scroll', function() {
            windowScrollPosition = window.scrollY;

            if (windowScrollPosition > windowPositionTop) {
                header.classList.add('shadow');
            } else {
                header.classList.remove('shadow');
            }
        });
    }

    function doSmoothScroll(target) {
        const scrollSpeed = 0.5;
        const link = target.closest('.header__link');

        if (!link) return false;

        const windowPosition = window.pageYOffset;
        const hash = link.href.replace(/[^#]*(.*)/, '$1');
        const targetBlock = document.querySelector(hash).getBoundingClientRect().top;
        let start = null;
    
        function step(time) {
            if (!start) start = time;
            
            const progress = time - start;
            const scrollDown = Math.max(windowPosition - progress/scrollSpeed, windowPosition + targetBlock);
            const scrollUp = Math.min(windowPosition + progress/scrollSpeed, windowPosition + targetBlock);
            let blockPositionY = (targetBlock < 0 ? scrollDown : scrollUp);
            
            window.scrollTo(0, blockPositionY);
    
            if (blockPositionY != windowPosition + targetBlock) requestAnimationFrame(step);
            else location.hash = hash;
        }
    
        requestAnimationFrame(step);
        return true;
    }

    function doBurgerMenu(burger, menu) {
        burger.addEventListener('click', () => {
            toggleBurgerMenu(burger, menu);
        });
    }

    function toggleBurgerMenu(burger, menu) {
        burger.classList.toggle('active');
        menu.classList.toggle('active');
    }

    function hideBurgerMenu(burger, menu) {
        burger.classList.remove('active');
        menu.classList.remove('active');
    }
    
    function startApp() {
        const menu = document.querySelector('#header-menu');
        const burger = document.querySelector('#burger');

        doHeaderShadow();
        doBurgerMenu(burger, menu);

        menu.addEventListener('click', ({target}) => {
            if (doSmoothScroll(target)) {
                hideBurgerMenu(burger, menu);
                doSmoothScroll(target);
            };
        });
    }
    
    startApp();

});
