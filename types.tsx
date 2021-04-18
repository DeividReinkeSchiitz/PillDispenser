export type AlarmType = {
  time: string;
  name: string;
  repeted: string[] | "Uma vez" | "Diáriamente" | "Seg à Sex";
  enabled: boolean;
  id:string;
}
