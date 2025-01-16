import { Button, TextField } from '@mui/material';
import { addDoc, collection, onSnapshot, or, orderBy, query, Timestamp, where } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

export default function Messsages({user,db}) {
  
  const[messages,setMessages] = useState([]);

  const[kinek,setKinek] = useState("");
  const[uzenet,setUzenet] = useState("");
  const [Error, setError] = useState(false);

  const datum =new Date;
  
  async function kuldes() {
    try {
      if(kinek=="" && uzenet=="") {
        setError(true);
      
      } else {
        await addDoc(collection(db, "messages"), {ki:user.email,kinek:kinek,mikor:Timestamp.now().toDate(),uzenet:uzenet});
        setKinek(""); setUzenet("");
        setError(false);
      }
      
    } catch (error) {
      console.log(error.code);
      setError(true);
    }
   
  }

  function enter(e){
    if(e.key === "Enter") kuldes();
  }


  useEffect(() => {
   if(user){
    console.log(Timestamp.now().toDate());
    const unsub = onSnapshot(query(collection(db, 'messages'), or(where("kinek","==",user.email), where("ki","==",user.email)), orderBy("mikor")), (snap) => {
      setMessages(snap.docs.map(doc => ({ ...doc.data(), id:doc.id })));
    });
    return unsub;
  } else setMessages([]);
  },[user]);
  
  return (
    <div className='messages' onKeyDown={e => enter(e)}>
      {user ? <> <div className='kuldes'>
        <TextField required error={Error} label="Email"  size="small" variant="outlined" value={kinek} onChange={e => setKinek(e.target.value)} />
        <TextField required error={Error} label="Üzenet" size="small" variant="outlined" value={uzenet} onChange={e => setUzenet(e.target.value)} />
        <Button variant='contained' color='success' onClick={kuldes}>Küldés</Button>
        </div>
        {messages.map((x,i) => <p key={i}>{x.ki} - {x.kinek} : {x.uzenet} {x.mikor.toDate().toDateString()}</p>)}
        </>:"Jelentkezz be!"}
        
    </div>
  )
}
