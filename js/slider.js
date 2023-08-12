import {toggleAttribute} from "./utils.js";

export function slider(event, {
    arrowNextClassName = 'arrow-right',
    arrowPrevClassName = 'arrow-left',
    counterName = 'slide',
    slidesWrapperClassName = 'slides',
    sliderClassName = 'slider'
}) {
    const slider = event.target.closest(`.${sliderClassName}`)
    if (!slider) return;

    let position = slider.getAttribute(counterName) || 0

    const isNext = isContains(arrowNextClassName)
    const isPrev = isContains(arrowPrevClassName)

    const slidesContainer = getNode(slidesWrapperClassName)
    const slides = slidesContainer.children

    if (slides.length <= 1) return

    const isNextDisable = position >= slides.length - 1
    const isPrevDisable = position < 1

    if (isNext && !isNextDisable) position++
    if (isPrev && !isPrevDisable) position--

    const nextArrow = getNode(arrowNextClassName)
    const prevArrow = getNode(arrowPrevClassName)

    toggleDisabledArrows({
        nextArrow,
        prevArrow,
        isNextDisable: position + 1 > slides.length - 1,
        isPrevDisable: position <= 0
    })
    slider.setAttribute('slide', position)


    slidesContainer.style.cssText = `transform: translateX(-${100 * position}%);`

    function getNode(className) {
        return slider.querySelector(`.${className}`)
    }

    function isContains(className) {
        return event.target.classList.contains(className)
    }

    function toggleDisabledArrows({nextArrow, prevArrow, isPrevDisable, isNextDisable}) {
        if (!nextArrow || !prevArrow) return;

        toggleAttribute({
            target: nextArrow,
            value: isNextDisable
        })

        toggleAttribute({
            target: prevArrow,
            value: isPrevDisable
        })

    }
}