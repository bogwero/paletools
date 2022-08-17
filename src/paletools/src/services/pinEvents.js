export default function sendPinEvents(pageId) {
    services.PIN.sendData(PINEventType.PAGE_VIEW, {
        type: PIN_PAGEVIEW_EVT_TYPE,
        pgid: pageId,
    });
};