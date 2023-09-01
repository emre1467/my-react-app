import React, { useEffect, useState } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { Button, Container, Dropdown, Icon, List, Menu, MenuItem } from 'semantic-ui-react';
import { collection, getDocs, addDoc, query, where, updateDoc, doc } from "firebase/firestore"
import { db } from "./firebase-config"
import resim from '../images/baibu.png'
import './ımage.css'
export default function AdminPage() {
  const adminCollectionRef = collection(db, "admins")
  let { id } = useParams();

  const [admins, setAdmin] = useState([])
  useEffect(() => {

    //let adminService=new AdminService()
    // adminService.getById(id).then(result=>setAdmin(result.data.data))
    const q = query(adminCollectionRef, where("id", "==", id))
    const getAdmin = async () => {
      let data = await getDocs(q);
      setAdmin(data.docs.map((doc) => ({ ...doc.data() })))
      //console.log(studentCollectionRef)


    }
    //students.map((stu) => setId(stu.id))
    getAdmin().then(() => console.log(admins))

    const loginKontrol = async () => {
      const q = query(adminCollectionRef, where("id", "==", id), where("login", "==", "false"))
      let data = await getDocs(q);
      if (data.docs.map((doc) => ({ ...doc.data() })).length != 0) {
        //history.replace("/", "urlhistory");
        window.location.assign(`/`)
      }
    }
    loginKontrol();
  }, [])
  
  function logOut() {


    const çıkış = async () => {
      const adminDoc = doc(db, "admins", id)
      await updateDoc(adminDoc, { login: "false" })
      window.location.href = "http://localhost:3000/";

    }
    çıkış();

  }
  document.body.style.backgroundColor = "#f5f5dc"
  return (
    <div style={{ backgroundColor: "lightgreen", paddingBottom: "393px", height: "100%" }} >
      <Container > <img src={resim} style={{width:"200px",marginTop:"20px"}} alt="" className='logo' /></Container>

      <Container style={{ marginBottom: "50px" }}>
        <List size="big" >
          <List.Item>
            <List.Content >
              <List.Header> {admins.map((s) => <h1>{s.name} {s.surname}</h1>)} </List.Header>
             <List.Item>{admins.map((s) => (s.email))}</List.Item> 
              <List.Item> {admins.map((s) => (s.department))}</List.Item>
            </List.Content>
          </List.Item></List >

      </Container>
      <List verticalAlign='big' >
        <List.Item>

          <List.Content style={{ align: "left", marginRight: "40px", marginLeft: "40px", backgroundColor: "green", color: "white", borderRadius: "15px 15px 15px 15px" }} >
            <Icon size="small" circular name='book' />
            <Link style={{ color: "white" }} to={`/adminPage/${id}/InternshipRequests`}>Staj Talepleri</Link>


          </List.Content>

        </List.Item>
        <List.Item>

          <List.Content style={{ align: "left", marginRight: "40px", marginLeft: "40px", backgroundColor: "green", color: "white", borderRadius: "15px 15px 15px 15px" }} >
            <Icon size="small" circular name='book' />
            <Link style={{ color: "white" }} to={`/adminPage/${id}/CompaniesList`}>Şirketler</Link>


          </List.Content>

        </List.Item>
        <List.Item>

          <List.Content style={{ align: "left", marginRight: "40px", marginLeft: "40px", backgroundColor: "green", color: "white", borderRadius: "15px 15px 15px 15px" }} >
            <Icon size="small" circular name='log out' />
            <Link style={{ color: "white" }} onClick={logOut}>Çıkış Yap</Link>


          </List.Content>

        </List.Item>

      </List>


    </div>
  )
}
