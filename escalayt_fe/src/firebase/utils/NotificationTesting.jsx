import { getToken, deleteToken, onMessage } from "firebase/messaging";
import { messaging } from "../firebaseConfig";
import { useEffect } from "react";

const vapidKey = import.meta.env.VITE_APP_VAPID_KEY;

const NotificationTesting = () => {
  // if (token) {
  //   console.log("you bad token", token)
  //   // unregisterServiceWorkers();

  //   // await deleteToken(messaging);
  //   console.log('Token deleted.');
  // }

  useEffect(() => {
    const getPermission = async () => {
      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        console.log("granted");

        const token = await getToken(messaging, {
          vapidKey: vapidKey,
        });

        if (token) {
          console.log("Token generated and sent to backend: ", token);
        }
      } else if (permission === "denied") {
        alert("You denied the notification");
        console.log("denied");
      }
    };

    getPermission();
  }, []);

  //   useEffect(() => {
  //     const getToken1 = async () => {
  //       try {
  //         // Check if the browser supports Service Workers and Push Notifications
  //         if ("serviceWorker" in navigator && "PushManager" in window) {
  //           // Request Notification permission
  //           const permission = await Notification.requestPermission();
  //           if (permission === "granted") {
  //             // Get FCM token
  //             const token = await getToken(messaging, {
  //               vapidKey: vapidKey,
  //             });
  //             console.log("Token:", token);
  //           } else {
  //             console.error("Permission not granted for Notification");
  //           }
  //         } else {
  //           console.warn("Push messaging is not supported by this browser");
  //         }
  //       } catch (error) {
  //         console.error("Error:", error);
  //       }
  //     };

  //     getToken1();

  //     // Optional: Handle incoming messages while the app is in the foreground
  //     const unsubscribe = onMessage(messaging, (payload) => {
  //       console.log("Message received. ", payload);
  //       // Customize your notification handling here if needed
  //     });

  //     // Cleanup on unmount
  //     return () => {
  //       unsubscribe && unsubscribe();
  //     };
  //   }, []);

  return <button>Enable Notification</button>;
};

export default NotificationTesting;
