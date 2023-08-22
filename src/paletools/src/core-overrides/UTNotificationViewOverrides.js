
export default function executeNotificationViewOverrides() {
    const UTNotificationView_display = UTNotificationView.prototype.display;
    UTNotificationView.prototype.display = function (...args) {
        this.__content.textContent = '';
        this.__content.innerHTML = this.message;
        UTNotificationView_display.call(this, ...args);
    }
}