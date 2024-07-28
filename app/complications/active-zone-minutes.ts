import { me as appbit } from "appbit";
import clock from "clock";
import { today } from "user-activity";

import { Complication, UI } from "../complication";

const ICON = "icons/chevrons-up.png";

export class ActiveZoneMinutes implements Complication {
  private onTick?: () => void;

  activate(ui: UI): void {
    ui.icon.href = ICON;
    ui.label.text = "-";
    ui.refresh();

    if (appbit.permissions.granted("access_activity")) {
      this.onTick = () => {
        ui.label.text =
          today.adjusted.activeZoneMinutes?.total?.toString() ?? "-";
        ui.refresh();
      };

      clock.addEventListener("tick", this.onTick);
    }
  }

  deactivate(): void {
    if (this.onTick !== undefined) {
      clock.removeEventListener("tick", this.onTick);
    }
  }
}
