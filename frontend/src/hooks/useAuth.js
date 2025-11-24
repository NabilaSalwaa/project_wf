import { useState, useEffect } from 'react'
import api from '../api/axios'

export default function useAuth(){
  const [user,setUser]=useState(null)
  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(!token) return;
    api.get('/user').then(r=>setUser(r.data)).catch(()=>{ localStorage.removeItem('token'); setUser(null); })
  },[])
  return {user,setUser}
}
