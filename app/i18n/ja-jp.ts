import { Locale } from "./locale";

export class JaJp implements Locale {
  public readonly tag = "ja-JP";

  public formatDate(date: Date): string {
    let day = date.getDay() + 1;
    let month = date.getMonth() + 1;

    return `月${month}日${day}`;
  }
}
