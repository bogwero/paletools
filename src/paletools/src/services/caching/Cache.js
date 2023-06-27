import CacheEntry from "./cacheEntry";

export default class Cache {
    #entries = {};

    #defaultExpirationSeconds;

    constructor(defaultExpirationSeconds) {
        this.#defaultExpirationSeconds = defaultExpirationSeconds;
    }

    get keys() {
        this.#expireEntries();
        return Object.keys(this.#entries);
    }

    set(...args) {
        if (args.length === 0) return;

        let cacheEntry = null;
        if (args[0] instanceof CacheEntry) {
            cacheEntry = args[0];
        } else if (args.length === 2) {
            cacheEntry = new CacheEntry(args[0], args[1]);
        } else if (args.length > 2) {
            cacheEntry = new CacheEntry(args[0], args[1], args[2]);
        }

        this.#expireEntries();

        if (!cacheEntry.expirationDateUtc && this.#defaultExpirationSeconds) {
            const date = new Date();
            date.setSeconds(date.getSeconds() + this.#defaultExpirationSeconds);
            cacheEntry.expirationDateUtc = date;
        }

        this.#entries[cacheEntry.key] = cacheEntry;
    }

    get(key) {
        this.#expireEntries();
        if (this.#entries[key]) return this.#entries[key].data;

        return null;
    }

    remove(key) {
        this.#expireEntries();
        if (this.#entries[key]) {
            delete this.#entries[key];
        }
    }

    #expireEntries() {
        for (let entry of Object.values(this.#entries)) {
            if (entry.isExpired) {
                delete this.#entries[entry.key];
            }
        }
    }
}