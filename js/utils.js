export function debounce(callback, timeout) {
    let timer;

    return () => {

        if (timer) clearTimeout(timer)

        timer = setTimeout(() => callback(), timeout)
    }
}

export function setWindowHeight(height = window.innerHeight || 0) {
    document.documentElement.style.setProperty('--height', `${height}px`)
}

export function toggleTargetClass({target, condition, className}) {
    if (condition) {
        target?.classList.add(className)
    } else {
        target?.classList.remove(className)
    }
}

export function setOpacity(value = 0) {
    document.documentElement.style.setProperty('--opacity', `${value}`)
}

export function toggleAttribute({target, attribute = 'disabled', value}) {
    if (value) {
        target.setAttribute(attribute, value)
    } else {
        target.removeAttribute(attribute)
    }
}
