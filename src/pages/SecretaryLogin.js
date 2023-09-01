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
export default function SecretaryLogin() {

  const secretaryCollectionRef = collection(db, "secretary")
  const [secretary, setSecretary] = useState([])
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
      console.log(values)
      const q = query(secretaryCollectionRef, where("email", "==", values.email), where("password", "==", values.password))
      const getSecretary = async () => {
        let data = await getDocs(q);
        setSecretary(data.docs.map((doc) => ({ ...doc.data() })))
        console.log(data.docs.map((doc) => ({ ...doc.data() })))
        if (data.docs.map((doc) => ({ ...doc.data() })).length == 0) {
          alert("Hatalı giriş!")
        }
        else {
          const secretaryDoc = doc(db, "secretary", data.docs.map((doc) => ({ ...doc.data() }))[0].id)
          await updateDoc(secretaryDoc, { login: "true" })

          window.location.assign(`/secretaryPage/${data.docs.map((doc) => ({ ...doc.data() }))[0].id}/`)

        }

      }
      //students.map((stu) => setId(stu.id))
      getSecretary()

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
        <h1 style={{ fontFamily: 'Josefin Sans', marginRight: "200px" }}>BAIBU</h1><h3 style={{ marginRight: "170px", marginTop: "-15px", fontFamily: 'Josefin Sans' }}>Staj Takip Yönetim Sistemi Sekreter Girişi</h3>
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