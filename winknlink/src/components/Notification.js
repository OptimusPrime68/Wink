import {db} from "../firebase";
import { onValue,ref,push, set } from "firebase/database";


const Notification = function(id,message) {

    const time = new Date().toString();
    console.log(time);
    console.log(id,message);
    set(push(ref(db,id)),{
        message:message,
        time:time,
      })
}

export default Notification;