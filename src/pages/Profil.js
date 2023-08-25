import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, Card, Form, Grid } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, addDoc, query, where, updateDoc, doc } from "firebase/firestore"
import { db } from "./firebase-config"
export default function Profil() {
    let { id } = useParams();
    const [s, setS] = useState([])
    const [ko, setKo] = useState([])
    const [bölüm,setBölüm]=useState([])
    const departmentCollectionRef = collection(db, "departments")
    const studentCollectionRef = collection(db, "students")
    const internshipCollectionRef = collection(db, "internshipRequests")

    useEffect(function () {
        // studentService.getById(id).then(result => setS(result.data.data[0]))


        const q = query(studentCollectionRef, where("id", "==", id))
        const getStudents = async () => {
            let data = await getDocs(q);
            setS(data.docs.map((doc) => ({ ...doc.data() })))
            console.log(data.docs.map((doc) => ({ ...doc.data() })))
            //console.log(studentCollectionRef)

        }
        //students.map((stu) => setId(stu.id))
        getStudents().then(() => console.log(s))
        const çal = async () => {

            const q = query(studentCollectionRef, where("id", "==", id))
            let data = await getDocs(q);
            setS(data.docs.map((doc) => ({ ...doc.data() })))

            const q1=query(departmentCollectionRef, where("id", "==",data.docs.map((doc) => ({ ...doc.data() }))[0].department ))
            let data1=await getDocs(q1);
            console.log(data1.docs.map((doc) => ({ ...doc.data() })))

            values.password = data.docs.map((doc) => ({ ...doc.data() }))[0].password
            values.email = data.docs.map((doc) => ({ ...doc.data() }))[0].email
            values.name = data.docs.map((doc) => ({ ...doc.data() }))[0].name
            values.surname = data.docs.map((doc) => ({ ...doc.data() }))[0].surname
            //values.department = data1.docs.map((doc) => ({ ...doc.data() }))[0].name
            values.studentNo = data.docs.map((doc) => ({ ...doc.data() }))[0].studentNo
            values.motherName = data.docs.map((doc) => ({ ...doc.data() }))[0].motherName
            values.fatherName = data.docs.map((doc) => ({ ...doc.data() }))[0].fatherName
            values.identificationNumber = data.docs.map((doc) => ({ ...doc.data() }))[0].identificationNumber
            values.phoneNumber = data.docs.map((doc) => ({ ...doc.data() }))[0].phoneNumber
            values.placeofBirth = data.docs.map((doc) => ({ ...doc.data() }))[0].placeofBirth
            values.dateofBirth = data.docs.map((doc) => ({ ...doc.data() }))[0].dateofBirth
            values.address = data.docs.map((doc) => ({ ...doc.data() }))[0].address
        }
        çal()
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
            //department: "",//Güncellemek için içine değer yaz
            email: "",
            name: "",
            password: "",
            studentId: "0",
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
           // department: Yup.string().required("bölüm giriniz"),
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
    function submit(){
        console.log("wffgd")
        //values.studentId = id;
        // console.log(values);
        //studentService.updateStudent(values).then(result => console.log(result))
        //alert("Bilgileriniz güncellendi")

        const güncelle = async () => {

            

            const q = query(studentCollectionRef, where("id", "==", id))
            let data = await getDocs(q);
            setS(data.docs.map((doc) => ({ ...doc.data() })))
           
            
            console.log(s[0])
            console.log(values.surname)

            const stuDoc = doc(db, "students", id)
            await updateDoc(stuDoc, { address:values.address,phoneNumber:values.phoneNumber,dateofBirth:values.dateofBirth,placeofBirth:values.placeofBirth,motherName:values.motherName,fatherName:values.fatherName,identificationNumber:values.identificationNumber, name: values.name, surname: values.surname,  password: values.password, email: values.email, studentNo: values.studentNo })
            alert("Bilgiler güncellendi")
        }
        const kont = async () => {

            const q1 = query(studentCollectionRef, where("id", "==", id))
            let data1 = await getDocs(q1);
            setS(data1.docs.map((doc) => ({ ...doc.data() })))

            const q = query(internshipCollectionRef, where("stuId", "==", id))
            let data = await getDocs(q);
            setKo(data.docs.map((doc) => ({ ...doc.data() })).length)
            console.log(data.docs.map((doc) => ({ ...doc.data() })).length)
            return data.docs.map((doc) => ({ ...doc.data() })).length
        }
        kont()
        if (values.address == "" ||values.placeofBirth == "" ||values.dateofBirth == "" ||values.phoneNumber == "" ||values.identificationNumber == "" ||values.fatherName == "" ||values.motherName == "" ||values.name == "" || values.surname == "" || values.password == "" || values.studentNo == "" ||  values.email == "" ) {
           
                alert("Alanları Boş bırakmayınız")
                console.log("boş")
        }

        else {
            if((s[0].studentNo!=values.studentNo&&ko>0)||(s[0].name!=values.name&&ko>0)||(s[0].surname!=values.surname&&ko>0)){
                alert("Sistemde staj talebiniz kayıtlıyken numaranızı veya isminizi değiştiremezsiniz")
            }
            else {
                
                güncelle()
            }
            

        }
    }
    document.body.style.backgroundColor = "#f5f5dc"
    return (

        <div className="form" align="center" style={{ marginTop: "80px", backgroundColor: "#f5f5dc" }}>
                    <h1 style={{}}>Profilim</h1>
                    <Form onSubmit={handleSubmit} style={{marginLeft:"60px"}} size="small">
                        <Form.Group widths="equal">
                            <Form.Input
                                id="name"
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}

                                error={
                                    errors.name && touched.name && errors.name}
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
                                error={
                                    errors.surname && touched.surname && errors.surname
                                }
                            ></Form.Input>
                        </Form.Group>
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
                                id="password"
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}

                                label="Şifre"
                            //placaholder="Şifre girinizz"
                            ></Form.Input>
                     
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

                        <Button onClick={submit} style={{backgroundColor:"green"}} type="submit" primary> GÜNCELLE</Button>
                    </Form>

        </div>



    );
}   