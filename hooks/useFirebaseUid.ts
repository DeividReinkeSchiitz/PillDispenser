import {useEffect, useState} from "react";
import firebase from "../config/firebaseConfig";

const EMAIL = "deividrs34@gmail.com";
const PASSWORD = "deivid123";

export default function useFirebaseUid():string {
  const [uid, setUid] = useState("");

  useEffect(()=>{
    async function sign() {
      try {
        const result = await firebase.auth().signInWithEmailAndPassword(EMAIL, PASSWORD);

        setUid(result.user?.uid!);
      } catch (error) {
        console.log(error);
      }
    }

    sign();
  }, []);

  return uid;
}
