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

window.onload = () => {
    setTimeout(() => {document.body.style.opacity = '1'}, 500)
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