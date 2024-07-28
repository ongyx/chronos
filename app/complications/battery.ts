import { battery } from "power";

import { Complication, UI } from "../complication";

const ICON = "icons/battery.png";
const CHARGING_ICON = "icons/battery-charging.png";

/**
 * A complication that shows battery life.
 */
export class Battery implements Complication {
  // The event listener for changes in battery life.
  private onChange?: () => void;

  activate(ui: UI): void {
    ui.label.text = battery.chargeLevel.toString();
    ui.icon.href = ICON;

    this.onChange = () => {
      ui.label.text = battery.chargeLevel.toString();

      if (battery.charging) {
        ui.icon.href = CHARGING_ICON;
      } else {
        ui.icon.href = ICON;
      }

      ui.refresh();
    }

    battery.addEventListener("change", this.onChange);
  }

  deactivate(): void {
    if (this.onChange !== undefined) {
      battery.removeEventListener("change", this.onChange);
    }
  }
}  