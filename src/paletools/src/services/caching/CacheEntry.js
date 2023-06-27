export default class CacheEntry {
    #key;
    #data;
    #expirationDateUtc;

    constructor(key, data, expirationDateUtc) {
        this.#key = key;
        this.#data = data;
        this.#expirationDateUtc = expirationDateUtc;
    }

    get key() {
        return this.#key;
    }

    get data() {
        return this.#data;
    }

    get expirationDateUtc() {
        return this.#expirationDateUtc;
    }

    set expirationDateUtc(value) {
        this.#expirationDateUtc = value;
    }

    get isExpired() {
        if(!this.#expirationDateUtc) return false;

        return new Date() > this.#expirationDateUtc;
    }
}