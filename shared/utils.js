/**
 * Shared utility functions for LLM Chat Navigator.
 * Provides scroll detection and smooth navigation helpers.
 */

function getScrollContainer(element) {
    let current = element;
    while (current && current !== document.body) {
        const style = window.getComputedStyle(current);
        if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
            return current;
        }
        current = current.parentElement;
    }
    return window;
}

function fastScrollTo(targetElement) {
    const container = getScrollContainer(targetElement);
    const duration = 100;

    let startPosition, targetPosition;

    if (container === window) {
        startPosition = window.scrollY;
        targetPosition = targetElement.getBoundingClientRect().top + startPosition;
    } else {
        startPosition = container.scrollTop;
        const containerTop = container.getBoundingClientRect().top;
        const targetTop = targetElement.getBoundingClientRect().top;
        targetPosition = startPosition + (targetTop - containerTop) - 50;
    }

    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const currentScroll = startPosition + distance * progress;

        if (container === window) {
            window.scrollTo(0, currentScroll);
        } else {
            container.scrollTop = currentScroll;
        }

        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    requestAnimationFrame(animation);
}
