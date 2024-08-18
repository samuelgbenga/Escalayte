
import { getToken, deleteToken, onMessage } from "firebase/messaging";
import { messaging } from "../firebaseConfig";
import axios from "axios";

const vapidKey = import.meta.env.VITE_APP_VAPID_KEY;

export async function requestPermission(userId) {

    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      console.log("granted")
  
      const token = await getToken(messaging, {
        vapidKey: vapidKey
      });

      // if (token) {
      //   console.log("you bad token", token)
      //   // unregisterServiceWorkers();

      //   // await deleteToken(messaging);
      //   console.log('Token deleted.');
      // }

      
      if (token) {
      
        // Send token to backend
        await axios.post("http://localhost:8080/token/save", { userId, token });
        console.log("Token generated and sent to backend: ", token);
      }
    } else if (permission === "denied") {
      alert("You denied the notification");
      console.log("denied")

    }
  }


//   function clearFirebaseMessagingIndexedDB() {
//     const request = indexedDB.deleteDatabase('firebase-messaging-database');

//     request.onsuccess = () => {
//         console.log('Firebase messaging IndexedDB cleared successfully.');
//     };

//     request.onerror = (event) => {
//         console.error('Error clearing Firebase messaging IndexedDB:', event);
//     };

//     request.onblocked = () => {
//         console.warn('Firebase messaging IndexedDB is blocked and cannot be cleared.');
//     };
// }

// async function unregisterServiceWorkers() {
//   const registrations = await navigator.serviceWorker.getRegistrations();
//   for (const registration of registrations) {
//       await registration.unregister();
//       console.log('Service worker unregistered:', registration);
//   }
// }

// Call this function before clearing IndexedDB
// unregisterServiceWorkers().then(() => {
//   clearFirebaseMessagingIndexedDB();
// });


// Call this function to clear the IndexedDB

// import { getToken, deleteToken } from "firebase/messaging";
// import { messaging } from "../firebaseConfig";
// import axios from "axios";

// const vapidKey = import.meta.env.VITE_APP_VAPID_KEY;

// export async function requestPermission() {
//     try {
//         const permission = await Notification.requestPermission();

//         if (permission === "granted") {
//             const token = await getToken(messaging, { vapidKey });

//             if (token) {
//                 console.log("Token generated:", token);

//                 // Uncomment this if you want to save the token to your backend
//                 // await axios.post("http://localhost:8080/token/save-token", { token });
//                 // console.log("Token sent to backend");

//                 // Delete the token if it's no longer needed
//                 try {
//                     const deleteResult = await deleteToken(messaging);
//                     if (deleteResult) {
//                         console.log('Token deleted successfully.');
//                     } else {
//                         console.log('Token deletion failed. Token might not exist.');
//                     }
//                 } catch (deleteError) {
//                     console.error('Error deleting token:', deleteError);
//                 }
//             } else {
//                 console.log('No token retrieved.');
//             }
//         } else if (permission === "denied") {
//             alert("You denied the notification permission.");
//         }
//     } catch (error) {
//         console.error('Error during permission request or token handling:', error);
//     }
// }




