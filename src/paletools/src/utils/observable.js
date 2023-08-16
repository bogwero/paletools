export function toPromise(callback) {
    return new Promise((resolve, reject) => {
        callback.observe(this, (sender, response) => {
            sender.unobserve(this);
            resolve(response);
        });
    });
}