import { me as appbit } from "appbit";
import { HeartRateSensor } from "heart-rate";

import { Complication, UI } from "../complication";

const ICON = "icons/heart.png";

export class HeartRate implements Complication {
  private sensor?: HeartRateSensor;
  private onReading?: () => void;

  constructor() {
    if (appbit.permissions.granted("access_heart_rate") && HeartRateSensor) {
      this.sensor = new HeartRateSensor();
    } else {
      console.error(
        "Permission denied for heart rate sensor, or it doesn't exist.",
      );
    }
  }

  activate(ui: UI): void {
    ui.icon.href = ICON;
    ui.label.text = "-";
    ui.refresh();

    if (this.sensor !== undefined) {
      this.onReading = () => {
        ui.label.text = this.sensor?.heartRate?.toString() ?? "-";
        ui.refresh();
      };

      this.sensor.addEventListener("reading", this.onReading);
      this.sensor.start();
    }
  }

  deactivate(): void {
    if (this.onReading !== undefined && this.sensor !== undefined) {
      this.sensor.removeEventListener("reading", this.onReading);
      this.sensor.stop();
    }
  }
}
