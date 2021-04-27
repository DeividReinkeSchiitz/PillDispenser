import {useEffect, useState} from "react";
import firebase from "../config/firebaseConfig";

const EMAIL = "";
const PASSWORD = "";

export default function useFirebaseUid() {
  const [uid, setUid] = useState<string | undefined>("");

  useEffect(()=>{
    (async () => {
      try {
        const sign = await firebase.auth().signInWithEmailAndPassword(EMAIL, PASSWORD);
        setUid(sign.user?.uid);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return uid;
}
