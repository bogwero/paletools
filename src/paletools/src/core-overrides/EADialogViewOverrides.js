export function executeDialogViewOverrides() {
    const EADialogView_setMessage = EADialogView.prototype.setMessage;
    EADialogView.prototype.setMessage = function (t) {
        if (t instanceof Element) {
            this.__msg.appendChild(t);
        }
        else {
            this.__msg.innerHTML = t
        }
    }
}