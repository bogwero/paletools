import localize from "../../localization";
import { resetConfiguration } from "../../settings";
import { addClass, createElem, prepend } from "../../utils/dom";

const SettingsView = function (menus) {
    this._menus = menus;
    UTView.call(this);
}

JSUtils.inherits(SettingsView, UTView);

SettingsView.prototype._generate = function _generate() {
    if (!this.generated) {
        let contentContainer = document.createElement("div");
        let content = document.createElement("div");
        content.classList.add("paletools-settings-wrapper");
        content.classList.add("layout-hub");
        content.classList.add("grid");
        contentContainer.appendChild(content);

        const resetSettingsButton = new UTStandardButtonControl();
        resetSettingsButton.init();
        resetSettingsButton.setText(localize("plugins.settings.reset"));
        resetSettingsButton.addTarget(this, () => {
            resetConfiguration();
            content.innerHTML = "";
            createPluginsMenues();
        }, EventType.TAP)


        prepend(contentContainer, addClass(resetSettingsButton, "reset-settings"));


        const self = this;
        function createPluginsMenues(){
            for(let menu of self._menus){
                const menuContainer = createElem("div", { id: `paletools-settings-${menu.name}-container`, className: "tile col-1-1"})
                const header = createElem("header", `<h3 class="tileHeader">${localize(menu.title)}</h3>`);
                menuContainer.appendChild(header);
                menuContainer.appendChild(menu.menu());
                content.appendChild(menuContainer);
            }
        }

        createPluginsMenues();

        this.__root = contentContainer;
        this.generated = true;
    }
}

export default SettingsView;