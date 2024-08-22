import { me as appbit } from "appbit";
import { display } from "display";

import { show as backgroundShow, hide as backgroundHide } from "./background";

import {
  show as complicationsShow,
  hide as complicationsHide,
} from "./complications";

export function init() {
  if (display.aodAvailable && appbit.permissions.granted("access_aod")) {
    display.aodAllowed = true;

    display.addEventListener("change", () => {
      if (display.on) {
        if (display.aodActive) {
          // Hide background and complications.
          console.log("Hiding");
          backgroundHide();
          complicationsHide();
        } else {
          // Show them again.
          console.log("Showing");
          backgroundShow();
          complicationsShow();
        }
      }
    });
  }
}
