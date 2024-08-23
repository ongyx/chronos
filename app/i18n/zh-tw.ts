import { Locale } from "./locale";

export class ZhTw implements Locale {
  public readonly tag = "zh-TW";

  public formatDate(date: Date): string {
    let day = date.getDay() + 1;
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    return `年${year}月${month}日${day}`;
  }
}
