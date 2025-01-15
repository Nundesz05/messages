import { Button } from '@mui/material';
import { collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom';

export default function Admin({db,admin}) {
  
  const[users,setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const snap = await getDocs(query(collection(db, "felhasznalok"), orderBy("nev")));
      setUsers(snap.docs.map(doc => ({ ...doc.data(), id:doc.id })));
    }
    getUsers();
  },[]);
  
  async function delUser(id) {
    await deleteDoc(doc(db, "felhasznalok", id));
  }

  return (
    <div>
     {admin ? <div>Felhasználók: 
      <br /><ul>
        {users.map(x =><div key={x.id} className='felhasznalok'><li key={x.id}>{x.nev} ({x.email})</li> <Button  variant='contained' color='error' >Törlés</Button> </div>)}
      </ul>
      </div> : <Navigate to="/"/> }
    </div>
  )
}
