export type Selection = {
  values: {
    name: string,
    value: any,
  }[],
  selected: number[],
}

export function getSelected(sel: Selection): any {
  return sel.values[0].value;
}
