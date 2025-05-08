// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const firebaseConfig = {
apiKey: "AIzaSyCALbU1ilA1O9ZOEP8A1_6gLHqzWfOuFIk",
  authDomain: "axiom-528ab.firebaseapp.com",
  projectId: "axiom-528ab",
  storageBucket: "axiom-528ab.appspot.com",
  messagingSenderId: "788965920996",
  appId: "1:788965920996:web:a4fb1e2abf626159ff5cf1",
  measurementId: "G-E4M3F5JNZY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);

// export const uploadSingleFile = ({ file, folderName, urlSetter, setProgress }) => {
//   folderName = folderName || "uploads";
//   if (!file) return;
//   const storageRef = ref(storage, `/${folderName}/${file.name}`);
//   const uploadTask = uploadBytesResumable(storageRef, file);
//   uploadTask.on(
//     "state_changed",
//     (snapshot) => {
//       const prog = Math.round(
//         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//       );
//       setProgress(prog);
//     },
//     (err) => console.log(err),
//     () => {
//       getDownloadURL(uploadTask.snapshot.ref).then(
//         (url) => urlSetter(url)
//         // url fetched... store it
//         // handleChangeCategory({ name: "image", value: url })
//       );
//     }
//   );
// };

export const uploadSingleFile = ({ file, folderName, urlSetter, setProgress }) => {
  folderName = folderName || "uploads";
  if (!file) return;

  const storageRef = ref(storage, `/${folderName}/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const prog = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(prog); // Update progress
    },
    (err) => console.log(err), // Handle errors
    () => {
      // Upload complete, get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        urlSetter(url); // Update the URL state with the Firebase URL
      });
    }
  );
};