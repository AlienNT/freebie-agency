import '../css/main.scss'
import {debounce, setOpacity, setWindowHeight, toggleTargetClass} from "./utils.js";
import {slider} from "./slider.js";

const header = document.querySelector('.header')

setWindowHeight()
setOpacity(getOpacity())

const resizeTimer = debounce(() => setWindowHeight(), 500)

window.onresize = () => {
    resizeTimer()
}

document.onscroll = e => {
    const scrollTop = e.target.documentElement.scrollTop
    const innerHeight = window.innerHeight

    toggleTargetClass({
        target: header,
        condition: scrollTop + 60 / 2 >= innerHeight,
        className: 'scrolled'
    })
    toggleTargetClass({
        target: header,
        condition: scrollTop >= 60,
        className: 'fixed'
    })

    setOpacity(getOpacity())

}

document.onclick = e => {
    const target = e.target
    const isActiveNav = document.querySelector('.burger.active')

    if (target.closest('.nav ul')) {
        toggleNavActive(e)
    }

    if (
        target.closest('.nav ul a') ||
        target.closest('.burger') ||
        (isActiveNav && !target.closest('.header'))
    ) {
        toggleNav(e)
    }

    if (target.closest('.slider')) {
        slider(e, {})
    }
}

function toggleNavActive(e) {
    const target = e.target
    const isLink = target.closest('.nav-link')
    const nav = document.querySelector('.nav ul')
    const navLinks = nav.querySelectorAll('.nav-link a')

    if (isLink) {
        navLinks.forEach(link => link.classList.remove('active'))
        target.classList.add('active')
    }
}

// function slider(selector) {
//     const sliders = document.querySelectorAll(selector)
//     sliders.forEach(slider => {
//         let position = 0
//         slider.onclick = (e) => {
//             const isNext = e.target.classList.contains('arrow-right')
//             const isPrev = e.target.classList.contains('arrow-left')
//             const slidesContainer = slider.querySelector('.slides')
//             const slides = slidesContainer.children
//
//             if (slides.length <= 1) return
//
//             const isNextDisable = position >= slides.length - 1
//             const isPrevDisable = position < 1
//
//             if (isNext && !isNextDisable) position++
//             if (isPrev && !isPrevDisable) position--
//
//             const nextArrow = slider.querySelector('.arrow-right')
//             const prevArrow = slider.querySelector('.arrow-left')
//
//             toggleDisabledArrows({
//                 nextArrow,
//                 prevArrow,
//                 isNextDisable: position + 1 > slides.length - 1,
//                 isPrevDisable: position <= 0
//             })
//
//
//             slidesContainer.style.cssText = `transform: translateX(-${100 * position}%);`
//         }
//     })
//
//     function toggleDisabledArrows({nextArrow, prevArrow, isPrevDisable, isNextDisable}) {
//         if (!nextArrow || !prevArrow) return;
//
//         toggleAttribute({
//             target: nextArrow,
//             value: isNextDisable
//         })
//
//         toggleAttribute({
//             target: prevArrow,
//             value: isPrevDisable
//         })
//
//     }
// }


function toggleNav() {
    const burger = document.querySelector('.burger')
    const nav = document.querySelector('.nav')

    nav.classList.toggle('active')
    burger.classList.toggle('active')
}

function getOpacity() {
    const scrollTop = document.documentElement.scrollTop
    const innerHeight = window.innerHeight

    const opacity = (
        innerHeight / (innerHeight - scrollTop > 0 ?
                innerHeight - (scrollTop / 1.2) : 0
        ) - 1).toFixed(2)
    return opacity > 1 ? 1 : opacity
}