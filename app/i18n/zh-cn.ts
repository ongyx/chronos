import { Locale } from "./locale";

export class ZhCn implements Locale {
  public readonly tag = "zh-CN";

  public formatDate(date: Date): string {
    let day = date.getDay() + 1;
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    return `年${year}月${month}日${day}`;
  }
}
