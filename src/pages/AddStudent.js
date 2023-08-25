import React from 'react'
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, Card, Form, FormSelect, Grid, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { db } from "./firebase-config"
import { collection, getDocs, addDoc, query, where, updateDoc, doc } from "firebase/firestore"
import './ımage.css'
import resim from '../images/baibü.jpg'
import resim2 from '../images/baibu.png'
import { useEffect } from 'react';
import { useState } from 'react';
const studentCollectionRef = collection(db, "students")
const departmentCollectionRef=collection(db,"departments")

export default function AddStudent() {
    const [departments,setDepartment]=useState([])
    useEffect(() => {
      
    const getDepartments = async() => {
        let data = await getDocs(departmentCollectionRef);
        setDepartment(data.docs.map((doc)=>({...doc.data()})));
    }
     getDepartments()
    }, [])
    


    const createStudent = async () => {

        const docref = await addDoc(studentCollectionRef, { login: false, dateofBirth: values.dateofBirth,placeofBirth: values.placeofBirth,address: values.address,fatherName: values.fatherName, phoneNumber:values.phoneNumber,motherName: values.motherName, identificationNumber: values.identificationNumber, name: values.name, surname: values.surname, studentNo: values.studentNo, password: values.password, email: values.email, department: values.department, id: 10 })
        const stuDoc = doc(db, "students", docref.id)
        await updateDoc(stuDoc, { id: docref.id })
        console.log(values)
        alert("Öğrenci eklendi")

    }



    const {
        values,
        errors,
        touched,
        handleSubmit,
        handlereset,
        handleChange,
        handleBlur,
        dirty,
        setFieldValue,
        onBlur,
    } = useFormik({
        initialValues: {
            department: "",//Güncellemek için içine değer yaz
            email: "",
            name: "",
            password: "",
            id: "0",
            studentNo: "",
            surname: "",
            motherName:"",
            fatherName:"",
            identificationNumber:"",
            phoneNumber:"",
            placeofBirth:"",
            dateofBirth:"",
            address:"",
        },
        validationSchema: Yup.object({
            department: Yup.string().required("bölüm giriniz"),
            email: Yup.string().email("email olacak").required("email giriniz"),
            name: Yup.string().required("İsim giriniz"),
            password: Yup.string().required("Şifre giriniz"),
            studentNo: Yup.string().required("Numaranızı giriniz"),
            surname: Yup.string().required("Soyadınızı giriniz"),
            motherName: Yup.string().required("Anne adı giriniz"),
            fatherName: Yup.string().required("Baba adı giriniz"),
            identificationNumber: Yup.string().required("Kimlik numaranızı giriniz"),
            phoneNumber: Yup.string().required("Telefon numarası giriniz"),
            dateofBirth: Yup.date().required("Doğum tarihi giriniz"),
            placeofBirth: Yup.string().required("Doğum yeri giriniz"),
            address: Yup.string().required("Adres giriniz"),
        }),
        onSubmit: (values) => {
           
        },
    });
    
    function Kayıt(){
        console.log("girdi")
            
            
        if (values.placeofBirth == "" ||values.dateofBirth == "" ||values.address == "" ||values.fatherName == "" || values.motherName == "" || values.identificationNumber == "" || values.name == "" || values.surname == "" || values.password == "" || values.studentNo == "" || values.department == "" || values.email == "") {
            alert("Alanları Boş bırakmayınız")
            console.log("boş")

        } else {
            createStudent()

        }
    }
    const departmentsOptions = departments.map((department)=>({
        key:department.id,
        text: department.name,
        value: department.name
    }))
    return (
        <div align="center" style={{ fontFamily: 'Josefin Sans' }}>

            <img style={{ width: "900px", height: "760px", marginRight: "1000px" }} src={resim} className='solbaibü'></img>
            <div style={{ backgroundColor: "#5F9EA0", height: "844px", paddingTop: "200px", paddingBottom: "300px", marginRight: "-50px", marginLeft: "900px", marginTop: "-850px" }}>
                <Image
                    floated='right'
                    style={{ marginRight: "135px", marginTop: "-90px" }}
                    size='tiny'
                    src={resim2}
                />
                <h1 style={{ marginTop: "-70px", fontFamily: 'Josefin Sans', marginRight: "410px" }}>BAIBU</h1><h3 style={{ marginLeft: "-180px", marginTop: "-15px", fontFamily: 'Josefin Sans' }}>Staj Takip Yönetim Sistemi Kayıt Sayfası</h3>

                <Form onSubmit={handleSubmit} style={{ width: "450px", marginRight: "45px" }} size="small">


                    <Form.Group widths="equal">
                        <Form.Input
                            id="name"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}

                           
                            label="İsim"
                            placaholder="İsim giriniz"
                        ></Form.Input>


                        <Form.Input
                            id="surname"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.surname}
                            label="Soyisim"
                            placaholder="Soyisim giriniz"
                         
                        ></Form.Input>
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Form.Input
                            id="motherName"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.motherName}

                            
                            label="Anne Adı"
                            placaholder="Annenizin ismini giriniz"
                        ></Form.Input>

                        <Form.Input
                            id="fatherName"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.fatherName}

                          
                            label="Baba Adı"
                            placaholder="Babanızın ismini giriniz"
                        ></Form.Input>

                    </Form.Group>
                    <Form.Group widths="equal">
                        <Form.Input
                            id="identificationNumber"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.identificationNumber}

                           
                            label="Kimlik Numarası"
                            placaholder="kimlik Numarası giriniz"
                        ></Form.Input>,<Form.Input
                        id="phoneNumber"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phoneNumber}

                       
                        label="Telefon Numarası"
                        placaholder="Telefon giriniz"
                    ></Form.Input>
                    </Form.Group>
                    <Form.Group widths="equal">
                    <Form.Input
                        style={{ color: "green" }}
                        id="dateofBirth"
                        type="date"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.dateofBirth}

                        label="Doğum Tarihi"
                        placeholder="Doğum tarihi seçin"
                     
                    ></Form.Input>

                    <Form.Input
                        id="placeofBirth"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.placeofBirth}

                      
                        label="Doğum yeri"
                        placaholder="Doğum yeri giriniz"
                    ></Form.Input>
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Input
                        id="email"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                       
                        label="Email"
                        placaholder="Email giriniz"
                    ></Form.Input>
                </Form.Group><Form.Group widths="equal">
                <FormSelect
                        id="department"
                        onChange={(fieldname, data) => setFieldValue("department", data.value)}
                        onBlur={onBlur}
                        options={departmentsOptions}
                        label="Bölüm"
                        value={values.department.name}
                        placeholder='Dönem seçiniz'
                        search
                        selection
                        //error={errors.periodId && touched.periodId}

                    />
                </Form.Group>

                <Form.Group widths="equal">
                    <Form.Input
                        id="password"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        

                        label="Şifre"
                    //placaholder="Şifre girinizz"
                    ></Form.Input>
                    <Form.Input
                        id="address"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.address}

                       
                        label="Adres"
                        placaholder="Adres giriniz"
                    ></Form.Input>
                </Form.Group>

                <Form.Group widths="equal">
                    <Form.Input
                        id="studentNo"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.studentNo}
                       

                        label="Okul Numara"
                        placaholder="Okul numaranızı giriniz"
                    ></Form.Input>
                </Form.Group>
                <a href='/' style={{ marginRight: "20px", color: "green" }}>Giriş Sayfası</a>

                <Button onClick={Kayıt}  color="green" handlereset={handlereset} type="submit" disabled={!dirty} > Kayıt Ol</Button>

            </Form>

        </div>

        </div >



    );
}   