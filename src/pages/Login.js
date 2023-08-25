import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { Button, Card, Form, Grid, Icon, Image } from 'semantic-ui-react';
import * as Yup from "yup";
import { db } from "./firebase-config"
import { collection, getDocs, addDoc, query, where, updateDoc, doc } from "firebase/firestore"
import './ımage.css'
import resim from '../images/baibü.jpg'
import resim2 from '../images/baibu.png'



export default function Login() {

    const studentCollectionRef = collection(db, "students")
    const [students, setStudents] = useState([])
    const [id, setId] = useState()

    useEffect(() => {
       

        //localStorage.clear()
        //history.index=0;
        //history.go(-(history.length - 1))

        //history.replace("/", "urlhistory");
    }, [])

    const [e, setE] = useState()
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
            /*
                        studentService.getStudentsByEmailandPassword(values.email, values.password)
                            .then(result => (setE(result)
                            ))
                        if (e.data.success == true) {
                            console.log(e.data.success)
                            window.location.assign(`http://localhost:3000/myPage/${e.data.data[0].studentId}/profil`)
            
                        }
                        else if (e.data.success == false) {
                            console.log(e.data.success)
                            alert("Yanlış kullanıcı adı veya şifre")
            
                        }*/

            const q = query(studentCollectionRef, where("email", "==", values.email), where("password", "==", values.password))
            const getStudents = async () => {
                let data = await getDocs(q);
                setStudents(data.docs.map((doc) => ({ ...doc.data() })))
                if (data.docs.map((doc) => ({ ...doc.data() })).length == 0) {
                    alert("Mail veya şifre hatalı!")
                }
                else {
                    const stuDoc = doc(db, "students", data.docs.map((doc) => ({ ...doc.data() }))[0].id)
                    let now = new Date();

                    await updateDoc(stuDoc, { login: "true" ,loginTime:now})
                    window.location.assign(`/myPage/${data.docs.map((doc) => ({ ...doc.data() }))[0].id}/profil`)

                }
                //console.log(studentCollectionRef)
                console.log(students)


            }
            //students.map((stu) => setId(stu.id))
            getStudents()




        },

    });
    function kontrol() {
        if (students.length == 0) {
            console.log("boş")
            alert("hatalı giriş ")
        }
        else {
            window.location.assign(`http://localhost:3000/myPage/${students[0].id}/profil`)

        }
    }
    //document.body.style.backgroundImage = "url('https:/dijital.ninja/wp-content/uploads/2021/01/purple-background-1920x1080_c.jpg')";
    return (



        <div align="center" style={{ fontFamily: 'Josefin Sans' }}>
         
                        <img style={{width:"900px",height:"760px",marginRight:"1000px"}} src={resim} className='solbaibü'></img>
                        <div style={{backgroundColor:"#5F9EA0",height:"844px",paddingTop:"200px",paddingBottom:"300px", marginRight: "-50px", marginLeft: "900px",marginTop:"-850px" }}>
                            <Image
                                floated='left'
                                style={{marginLeft:"70px"}}
                                size='tiny'
                                src={resim2}
                            />
                            <h1 style={{ fontFamily: 'Josefin Sans', marginRight: "200px" }}>BAIBU</h1><h3 style={{ marginRight: "170px", marginTop: "-15px", fontFamily: 'Josefin Sans' }}>Staj Takip Yönetim Sistemi Öğrenci Girişi</h3>
                            <Form style={{ marginTop: "100px",marginLeft:"70px",marginRight:"100px" }} onSubmit={handleSubmit} >
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
                                <Button.Group style={{ marginTop: "30px",marginLeft:"100px" }}>
                                    <Button style={{color:"black"}} color='white' disabled={!dirty} type="submitt" >Giriş Yap </Button>

                                    <Button.Or />
                                    <Button  color='white     '  ><Link style={{color:"black"}} color='white' to={`/addStudent`} >Kayıt Ol</Link></Button>

                                </Button.Group>
                                <Button style={{ marginTop: "10px" }} floated='right' size='medium'><Link style={{color:"black"}} to={`/adminLogin`}>Yönetici </Link></Button>
                                <Button style={{ marginTop: "10px" }} floated='right' size='medium'><Link style={{color:"black"}} to={`/secretaryLogin`}>Sekreter </Link></Button>
                            </Form>
                        </div>



        </div>



    )
}
/*
  <Card widths="equal" image='/resim.png' style={{ borderRadius: "15px 15px 15px 15px" }}>

                            <Card.Content header="Giriş Yap">

                                <Image
                                    floated='left'
                                    size='tiny'
                                    src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Aibu.jpg"
                                />
                                <Card.Header style={{ color: "#00ADB5", marginTop: "8px", marginRight: "45px" }}><h1 style={{ fontFamily: 'Josefin Sans' }}>BAIBU</h1><h5 style={{ marginLeft: "45px", marginTop: "-15px", fontFamily: 'Josefin Sans' }}>Staj Takip Yönetim Sistemi</h5></Card.Header>
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
                                    <Button.Group style={{ marginTop: "30px" }}>
                                        <Button color='green' disabled={!dirty} type="submitt" >Giriş Yap </Button>

                                        <Button.Or />
                                        <Button basic color='blue   '  ><Link color='green' to={`/addStudent`} >Kayıt Ol</Link></Button>

                                    </Button.Group>
                                    <Button style={{ marginTop: "10px" }} floated='right' size='mini'><Link to={`/adminLogin`}>Yönetici </Link></Button>
                                </Form>
                            </Card.Content>
                        </Card>
                        

*/ 