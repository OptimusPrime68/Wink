import {db} from "../firebase";
import { onValue,ref,push, set } from "firebase/database";


const Notification = function(id,message) {

    console.log(id,message);
    set(push(ref(db,id)),{
        message:message,
      })

}

export default Notification;