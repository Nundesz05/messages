import './App.css'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Messages from './pages/Messsages.jsx'
import Users from './pages/Users.jsx'
import About from './pages/About.jsx'
import Login from './pages/Login.jsx'
import Notfound from './pages/Notfound.jsx'


import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../firebaseConfig.js"
import { useState } from 'react'
import Layout from './Layout.jsx'
import { useEffect } from 'react'

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default function App() {

 const [ user, setUser ] = useState(null);

 useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
  return () => unsubscribe
}, []);

async function logout() {
  await signOut(auth);
}

 const router = createBrowserRouter([
  { path: "/", element: <Layout user={user} logout={logout}/>, children: [
    { path: "/", element: <Messages user={user} db={db}/>},
    { path: "/users", element: <Users user={user} db={db}/> },
    { path: "/about", element: <About /> },
    { path: "/login", element: <Login auth={auth} setUser={setUser} /> },
    { path: "*", element: <Notfound /> }
  ]}
]);
  
 return (
    <div className='app'>
      <RouterProvider router={router}/>
    </div>
  
  )
}
