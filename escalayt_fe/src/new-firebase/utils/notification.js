import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "../firebaseConfig";
import axios from "axios";

const vapidKey = import.meta.env.VITE_APP_VAPID_KEY;

export async function requestPermission() {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
  
      const token = await getToken(messaging, {
        vapidKey: vapidKey,
      });
      

      if (token) {
        // setToken(token);
        // Send token to backend
        await axios.post("http://localhost:8080/token/save-token", { token });
        console.log("Token generated and sent to backend: ", token);
      }
    } else if (permission === "denied") {
      alert("You denied the notification");
    }
  }