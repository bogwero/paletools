import UTNativeDropDownControl from "../../controls/UTNativeDropDownControl";
import { on } from "../../events";
import localize from "../../localization";
import { resetConfiguration } from "../../settings";
import { addClass, append, createElem, prepend } from "../../utils/dom";

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
            const jumpMenu = new UTNativeDropDownControl();
            const sortedMenuItems = Object.keys(self._menus).map(x => self._menus[x]);
            sortedMenuItems.sort((a,b) => a.name.localeCompare(b.name));

            for(let menu of sortedMenuItems){
                jumpMenu.addOption(localize(menu.title), `plugin-title-${menu.name}`);
            }

            jumpMenu.onChange(value => {
                location.href = `#${value}`;
            });

            append(content, jumpMenu);
            append(content, createElem("a", { id: "plugins-top" }));

            for(let menu of sortedMenuItems){
                const menuContainer = createElem("div", { id: `paletools-settings-${menu.name}-container`, className: "tile col-1-1"})
                const header = createElem("header", `<h3 class="tileHeader"><a id="plugin-title-${menu.name}">${localize(menu.title)}</a></h3>`);
                menuContainer.appendChild(header);
                menuContainer.appendChild(menu.menu());
                menuContainer.appendChild(createElem("a", { className: "go-to-top", href: "#plugins-top" }));
                content.appendChild(menuContainer);
            }
        }

        createPluginsMenues();

        this.__root = contentContainer;
        this.generated = true;
    }
}

export default SettingsView;