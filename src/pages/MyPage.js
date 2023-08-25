//import React, { useState } from 'react'
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, Card, Icon, Container, Form, Grid, GridColumn, Image, List, Menu, Dropdown, DropdownItem, } from 'semantic-ui-react';
//import { useState } from "react";
import { Link, Route, useParams, useHistory } from "react-router-dom";
import MyInternshiprequest from "./MyInternshiprequest";
import Dashboard from "../layouts/Dashboard";
import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, query, where, updateDoc, doc } from "firebase/firestore"
import { db } from "./firebase-config"
import resim from '../images/baibu.png'
import './ımage.css'
import '../App.js'

export default function MyPage() {
  let { id } = useParams();
  const studentCollectionRef = collection(db, "students")
  const departmentCollectionRef = collection(db, "departments")

  //const[student,setStudent]=useState([]);
  const [students, setStudent] = useState([])
  const [department, setDepartment] = useState([])

  useEffect(() => {


    //let studentService = new StudentService()
    //studentService.getById(id).then(result => setStudent(result.data.data))


    const getStudents = async () => {

      const q = query(studentCollectionRef, where("id", "==", id))



      let data = await getDocs(q);
      setStudent(data.docs.map((doc) => ({ ...doc.data() })))
      //console.log(studentCollectionRef)
     
    }
    //students.map((stu) => setId(stu.id))
    getStudents().then(() => console.log(students))

    const loginKontrol = async () => {
      const q = query(studentCollectionRef, where("id", "==", id), where("login", "==", "false"))
      let data = await getDocs(q);
      console.log(data.docs.map((doc) => ({ ...doc.data() })))
      if (data.docs.map((doc) => ({ ...doc.data() })).length != 0) {
        //history.replace("/", "urlhistory");
        window.location.assign(`/`)
      }
    }
    loginKontrol();
  }, [])
  function logOut() {

    let now = new Date();
    const çıkış = async () => {
      const stuDoc = doc(db, "students", id)
      await updateDoc(stuDoc, { login: "false", logOutTime: now })
    }
    çıkış();


  }
  // document.body.style.backgroundImage = "url('https:/dijital.ninja/wp-content/uploads/2021/01/purple-background-1920x1080_c.jpg')";
  document.body.style.backgroundColor = "#f5f5dc"
  return (
    <div style={{ backgroundColor: "lightgreen", paddingBottom: "363px", height: "100%" }} >
      <Container  > <img src={resim} alt="" style={{ marginTop: "10px", width: "200px" }} className='logo' /></Container>
      <Container>
        <List size="big" >
          <List.Item>
            <List.Content >
              <List.Header> {students.map((s) => <h1>{s.name} {s.surname}</h1>)} </List.Header>
              {students.map((s) => (s.email))}
             

<List.Item> {students.map((s) => (s.department))}</List.Item>
              
            </List.Content>
          </List.Item></List >

      </Container>

      <List verticalAlign='big' >


        <List.Content style={{ align: "left", marginRight: "40px", marginLeft: "40px", backgroundColor: "green", color: "white", borderRadius: "15px 15px 15px 15px" }}>
          <Icon size="small" circular name='user' />
          <Link style={{ color: "white" }} to={`/myPage/${id}/Profil`} /*onClick={() => alert("boo")}*/>Profil    </Link>
        </List.Content>

        <List.Item>

          <List.Content style={{ align: "left", marginRight: "40px", marginLeft: "40px", backgroundColor: "green", color: "white", borderRadius: "15px 15px 15px 15px" }}>
            <Icon size="small" circular name='book' />
            <Link style={{ color: "white" }} to={`/myPage/${id}/MyInternshipRequest`}  /*onClick={() => alert("boo")}*/>Staj Taleplerim    </Link>
          </List.Content>

        </List.Item>

        <List.Item>

          <List.Content style={{ align: "left", marginRight: "40px", marginLeft: "40px", backgroundColor: "green", color: "white", borderRadius: "15px 15px 15px 15px" }} >
            <Icon size="small" circular name='book' />
            <Link style={{ color: "white" }} to={`/myPage/${id}/AddCompany`}>Şirket Talebi</Link>


          </List.Content>

        </List.Item>

        <List.Item>

          <List.Content style={{ align: "left", marginRight: "40px", marginLeft: "40px", backgroundColor: "green", color: "white", borderRadius: "15px 15px 15px 15px" }}>
            <Icon size="small" circular name='factory' />
            <Link style={{ color: "white" }} to={`/myPage/${id}/Companies`} >Şirketler    </Link>
          </List.Content>

        </List.Item>

        <List.Content style={{ align: "left", marginRight: "40px", marginLeft: "40px", backgroundColor: "green", color: "white", borderRadius: "15px 15px 15px 15px" }}>
          <Icon size="small" circular name='user' />
          <Link onClick={logOut} style={{ color: "white" }} >Çıkış    </Link>

        </List.Content>
      </List>



    </div>

  );
}
