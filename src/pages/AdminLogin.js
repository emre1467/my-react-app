import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Card, Form, Grid, Image } from 'semantic-ui-react';
import * as Yup from "yup";
import { db } from "./firebase-config"
import { collection, getDocs, addDoc, query, where, updateDoc, doc } from "firebase/firestore"
import './ımage.css'
import resim from '../images/baibü.jpg'
import resim2 from '../images/baibu.png'
export default function AdminLogin() {

  const adminCollectionRef = collection(db, "admins")
  const [admin, setAdmin] = useState([])
  const [e, setE] = useState()
  useEffect(() => {
    window.localStorage.clear()

  }, [])

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handlereset,
    handleChange,
    handleBlur,
    dirty,

  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("mail olarak girin").required("email giriniz"),
      password: Yup.string().required("email giriniz"),
    }),

    onSubmit: (values) => {
      //adminService.getAdminsByEmailandPassword(values.email, values.password)
      //  .then(result => setE(result.data.data[0].adminId))
      // console.log(e)
      // if (e != null) {
      //    window.location.assign(`http://localhost:3000/adminPage/${e}`)
      //}
      const q = query(adminCollectionRef, where("email", "==", values.email), where("password", "==", values.password))
      const getAdmin = async () => {
        let data = await getDocs(q);
        setAdmin(data.docs.map((doc) => ({ ...doc.data() })))
        //console.log(studentCollectionRef)
        if (data.docs.map((doc) => ({ ...doc.data() })).length == 0) {
          alert("Hatalı giriş!")
        }
        else {
          const adminDoc = doc(db, "admins", data.docs.map((doc) => ({ ...doc.data() }))[0].id)
          await updateDoc(adminDoc, { login: "true" })

          window.location.assign(`/adminPage/${data.docs.map((doc) => ({ ...doc.data() }))[0].id}/`)

        }

      }
      //students.map((stu) => setId(stu.id))
      getAdmin()

    },
  });


  return (
    <div align="center" style={{ fontFamily: 'Josefin Sans' }}>

      <img style={{ width: "900px", height: "760px", marginRight: "1000px" }} src={resim} className='solbaibü'></img>
      <div style={{ backgroundColor: "#5F9EA0", height: "844px", paddingTop: "200px", paddingBottom: "300px", marginRight: "-50px", marginLeft: "900px", marginTop: "-850px" }}>
        <Image
          floated='left'
          style={{ marginLeft: "70px" }}
          size='tiny'
          src={resim2}
        />
        <h1 style={{ fontFamily: 'Josefin Sans', marginRight: "200px" }}>BAIBU</h1><h3 style={{ marginRight: "170px", marginTop: "-15px", fontFamily: 'Josefin Sans' }}>Staj Takip Yönetim Sistemi Yönetici Girişi</h3>
        <Form style={{ marginTop: "100px", marginLeft: "70px", marginRight: "100px" }} onSubmit={handleSubmit} >
          <Form.Group widths="equal">
            <Form.Input
              style={{}}
              id="email"

              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={
                errors.email && touched.email}
              label="Email"
              placaholder="Email giriniz"
            ></Form.Input>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              id="password"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              error={
                errors.password && touched.password}
              label="Şifre"
              placaholder="Şifre giriniz"
            ></Form.Input>
          </Form.Group>
          <Button color='green' disabled={!dirty} type="submitt" >Giriş Yap </Button>

        </Form>
      </div>

    </div>
  )
}
/*
 <Card widths="equal" image='/resim.png' color='blue' style={{ borderRadius: "15px 15px 15px 15px" }}>

        <Card.Content header="Giriş Yap">

          <Image
            floated='left'
            size='tiny'
            src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Aibu.jpg"
          />
          <Card.Header style={{ color: "#00ADB5", marginTop: "8px", marginRight: "45px" }}><h1 >BAIBU</h1><h5 style={{ marginLeft: "45px", marginTop: "-15px" }}>Staj Takip Yönetim Sistemi</h5></Card.Header>
        </Card.Content>
        <Card.Content >
          <Form onSubmit={handleSubmit} >
            <Form.Group widths="equal">
              <Form.Input
                id="email"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={
                  errors.email && touched.email}
                label="Email"
                placaholder="Email giriniz"
              ></Form.Input>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                id="password"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={
                  errors.password && touched.password}
                label="Şifre"
                placaholder="Şifre giriniz"
              ></Form.Input>
            </Form.Group>
            <Button  color='green' disabled={!dirty} type="submitt" >Giriş Yap </Button>


          </Form>
        </Card.Content>
      </Card>
*/