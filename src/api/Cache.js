
class Cache {
    constructor() {
        if (localStorage.getItem('_cache')) {
            return
        }

        this.value = {}

        localStorage.setItem(
            '_cache', 
            JSON.stringify(this.value)
        )
    }

    stillValid(time) {
        const ttl = 60 * 60 * 24
        const now = new Date().getTime() / 1000
        const timeElapsed = now - time

        return timeElapsed < ttl
    }

    isValid(key) {
        this.value = JSON.parse(localStorage.getItem('_cache'))

        return Boolean(this.value[key].value) &&
            this.stillValid(this.value[key].timeSet)
    }

    get(key) {
        return JSON.parse(localStorage.getItem('_cache'))[key].value
    }

    set(key, value) {
        this.value = JSON.parse(localStorage.getItem('_cache'))
        this.value[key] = {timeSet: new Date().getTime() / 1000, value}

        localStorage.setItem(
            '_cache', 
            JSON.stringify(this.value)
        )
    }

    reset(keys) {
        this.value = JSON.parse(localStorage.getItem('_cache'))

        keys.forEach(key => {
            delete this.value[key]
        })

        localStorage.setItem(
            '_cache', 
            JSON.stringify(this.value)
        )
    }
}

export default Cache