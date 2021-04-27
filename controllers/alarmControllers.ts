import firebase from "../config/firebaseConfig";


interface AlarmType {
   time:string;
   enabled?: boolean;
   name:string;
   repeted:string[] | "Uma vez" | "Diáriamente" | "Seg à Sex";
   id?:string;
}

const db = firebase.database();

export async function show(uid:string) {
  try {
    const alarms:any[] = [];
    const result = await db.ref(`users/${uid}/alarms`).get();

    Object.entries(result.val()).forEach(([id, alarm]:any)=>{
      alarms.push({
        id,
        ...alarm,
      });
    });

    return alarms as AlarmType[];
  } catch (error) {
    console.log(error);
  }
}

export async function put(uid:string, alarmId:string, enabled:boolean) {
  try {
    const result = await db.ref(`users/${uid}/alarms/${alarmId}`).update({
      enabled,
    });

    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function create(uid:string, data:AlarmType) {
  try {
    const result = await db.ref(`users/${uid}/alarms`).push({...data, enabled: true});
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function remove(uid:string, alarmsIds: string[]) {
  try {
    for (let index = 0; index < alarmsIds?.length; index++) {
      const id = alarmsIds[index];

      await db.ref(`users/${uid}/alarms/${id}`).remove();
    }
  } catch (error) {
    console.log(error);
  }
}
