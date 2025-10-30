export type View = number;

export const contentMapping = <T>(arr: readonly T[], view: View): T => {
  return arr[view];
};
