let plugin;

// #if process.env.GRID_MODE
import styles from "./styles.css";
import UTLabelWithToggleControl from "../../controls/UTLabelWithToggleControl";
import settings, { saveConfiguration } from "../../settings";
import { addStyle, removeStyle } from "../../utils/styles";
import localize from "../../localization";
import { EVENTS, on } from "../../events";
import { addClass, css, insertBefore, prepend, removeClass, select } from "../../utils/dom";
import { hide, show } from "../../utils/visibility";

const cfg = settings.plugins.gridMode;

function run(){

    function addStyles(){
        addClass(document.body, "paletools-gridmode");
        addStyle('paletools-grid', styles);
    }

    function removeStyles() {
        removeClass(document.body, "paletools-gridmode");
        removeStyle('paletools-grid');
    }

    const UTCurrencyNavigationBarView__generate = UTCurrencyNavigationBarView.prototype._generate;
    UTCurrencyNavigationBarView.prototype._generate = function _generate() {
        UTCurrencyNavigationBarView__generate.call(this);
        if (!this._gridModeGenerated) {
            this._gridModeToggle = new UTLabelWithToggleControl();

            this._gridModeToggle.setLabel(localize('plugins.gridMode.title'));
            this._gridModeToggle.onToggle = (elem, eventType, value) => {
                if(value.toggleState){
                    addStyles();
                }
                else {
                    removeStyles();
                }
                cfg.enabled = value.toggleState;
                saveConfiguration();
            };
        
            if(cfg.enabled){
                this._gridModeToggle.toggle();
            }

            css(this._gridModeToggle.getRootElement(), {
                borderRight: "1px solid white",
                    marginRight: "10px",
                    paddingRight: "10px"
            });

            if(isPhone()){
                css(this._gridModeToggle.getRootElement(), {
                    position: "relative",
                });

                css(select("label", this._gridModeToggle.getRootElement()), {
                    position: "absolute",
                    right: "75px",
                    width: "250px",
                    top: "4px"
                });

                css(select(".ut-toggle-control", this._gridModeToggle.getRootElement()), {
                    display: "inline-block"
                });

                prepend(this.__currencies, this._gridModeToggle.getRootElement());
            }
            else {
                insertBefore(this._gridModeToggle.getRootElement(), this.__currencies);
            }
            
            on(EVENTS.APP_ENABLED, () => {
                show(this._gridModeToggle);
                removeStyles();
                if(cfg.enabled){
                    addStyles();
                }
            });
            
            on(EVENTS.APP_DISABLED, () => {
                hide(this._gridModeToggle);
                removeStyles();
            });

            this._gridModeGenerated = true;
        }
    }

    // const UTGameFlowNavigationController_viewDidAppear = UTGameFlowNavigationController.prototype.viewDidAppear;
    // UTGameFlowNavigationController.prototype.viewDidAppear = function() {
    //     UTGameFlowNavigationController_viewDidAppear.call(this);

    //     if(this._navigationBar instanceof UTCurrencyNavigationBarView){
    //         const toggleState = this._navigationBar._gridModeToggle.getToggleState();

    //         if(cfg.enabled && !toggleState){
    //             this._navigationBar._gridModeToggle.toggle();
    //         }
    //         else if(!cfg.enabled && toggleState){
    //             this._navigationBar._gridModeToggle.toggle();
    //         }
    //     }
    // }
}

plugin = {
    run: run,
    order: 4
};
// #endif

export default plugin;