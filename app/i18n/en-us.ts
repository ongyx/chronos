import { Locale } from "./locale";

// NOTE: Date.getDay() returns 0 for Sunday.
const DAYS: { [day: number]: string } = {
  0: "sun",
  1: "mon",
  2: "tue",
  3: "wed",
  4: "thu",
  5: "fri",
  6: "sat",
};

const MONTHS: { [month: number]: string } = {
  0: "jan",
  1: "feb",
  2: "mar",
  3: "apr",
  4: "may",
  5: "jun",
  6: "jul",
  7: "aug",
  8: "sep",
  9: "oct",
  10: "nov",
  11: "dec",
};

export class EnUs implements Locale {
  public readonly tag = "en-US";

  public formatDate(date: Date): string {
    let day = DAYS[date.getDay()];
    let dayOfMonth = date.getDate();
    let month = MONTHS[date.getMonth()];

    return `${day}, ${month} ${dayOfMonth}`;
  }
}
