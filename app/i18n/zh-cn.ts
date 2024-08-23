import { Locale } from "./locale";

export class ZhCn implements Locale {
  public readonly tag = "zh-CN";

  public formatDate(date: Date): string {
    let day = date.getDay() + 1;
    let month = date.getMonth() + 1;

    return `月${month}日${day}`;
  }
}
