import { useFormik } from "formik"
import * as Yup from "yup";
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Form, FormSelect, Select } from 'semantic-ui-react';
import { storage } from "./firebase-config"
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { collection, getDocs, addDoc, query, where, updateDoc, doc } from "firebase/firestore"
import { db } from "./firebase-config"


export default function AddInternshipRequest() {
    let { id } = useParams();

    const companyCollectionRef = collection(db, "companies")
    const periodCollectionRef = collection(db, "periods")
    const internshipCollectionRef = collection(db, "internshipRequests")
    const studentCollectionRef = collection(db, "students")


    const createInternshipRequest = async () => {

       
      
            const q = query(studentCollectionRef, where("id", "==", id))
            const data = await getDocs(q);
            //setStudents(data.docs.map((doc) => ({ ...doc.data() }))[0])
    
    
    
    
            const docref = await addDoc(internshipCollectionRef, { stuNo: data.docs.map((doc) => ({ ...doc.data() }))[0].studentNo, stuName: data.docs.map((doc) => ({ ...doc.data() }))[0].name,stuDepartment:data.docs.map((doc) => ({ ...doc.data() }))[0].department, confirm: values.confirm, company: values.company, period: values.period, isgName: values.isgName, isgUrl: values.isgUrl, internshipformName: values.internshipformName,internshipformUrlNew:"", internshipformUrl: values.internshipformUrl, müstehaklıkUrl: values.müstehaklıkUrl, müstehaklıkName: values.müstehaklıkName, startDate: values.startDate, endDate: values.endDate, workDay: values.workDay, stuId: id, id: 10 })
            const stuDoc = doc(db, "internshipRequests", docref.id)
            await updateDoc(stuDoc, { id: docref.id })
        

       


    }





    const [companies, setCompanies] = useState([]);
    const [periods, setPeriods] = useState([]);
    //const [students, setStudents] = useState([]);

    const [i, setI] = useState()
    useEffect(() => {
        //let companyService = new CompanyService();
        //companyService.getCompanies().then((result) => setCompanies(result.data.data))
        //let periodService = new PeriodService();
        //periodService.getPeriods().then((result) => setPeriods(result.data.data))
        const q = query(companyCollectionRef, where("confirm", "==", "Onaylandı"))
        const getCompanies = async () => {
            let data = await getDocs(q);
            setCompanies(data.docs.map((doc) => ({ ...doc.data() })))
            //console.log(studentCollectionRef)

        }
        //students.map((stu) => setId(stu.id))
        getCompanies().then(() => console.log(companies))


        const getPeriods = async () => {
            //console.log(studentCollectionRef)
            let data = await getDocs(periodCollectionRef);
            setPeriods(data.docs.map((doc) => ({ ...doc.data() })))

        }
        //students.map((stu) => setId(stu.id))
        getPeriods().then(() => console.log(periods))

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
        setFieldValue,
        onBlur,


    } = useFormik({
        initialValues: {
            company: "",
            period: "",
            confirm: "Onaylanmayı bekliyor",
            isgName: "",
            isgUrl: "",
            internshipformName: "",
            internshipformUrl: "",
            müstehaklıkUrl: "",
            müstehaklıkName: "",
            startDate: "",
            endDate: "",
            workDay: "",
        },
        validationSchema: Yup.object({
            companyCompanyId: Yup.number().required("Bir şirket seçiniz"),
            periodPeriodId: Yup.number().required("Bir Dönem seçiniz"),
            startDate: Yup.date().required("Başlangıç tarihi giriniz"),
            endDate: Yup.date().required("Bitiş tarihi giriniz"),
            workDay: Yup.number().required("İş günü sayısı")

        }),
        onSubmit: (values) => {
        },
    });

    function deneme() {
        let k = 0;
        let j = 0;
        while (j < 1) {

            // values.student.studentId = id
            while (k < 1) {
                k = k + 1;
                var şuan=new Date()
                console.log(şuan)
                var staj=new Date(values.startDate)
                console.log(staj)
                var fark=new Date(staj-şuan)
                var saat = Math.floor(fark / 1000 / 60 / 60);
                var sonuç=saat/24
                console.log(sonuç)
                console.log("içinde")
                if (values.company == "" || values.period == "" || values.endDate == "" || values.startDate == "" || values.workDay == "" || z == null || isg == null || internshipform == null) {
                    alert("değerler boş olamaz")
                }
                else if(sonuç<20){
                    alert ("Staj başlama tarihine 20 günden az vakit var. Tekrar düzenleyin")
                }
                else {
                    z.preventDefault();
                    const file = z.target.files[0];
                    isg.preventDefault();
                    const file1 = isg.target.files[0];
                    internshipform.preventDefault();
                    const file2 = internshipform.target.files[0];
                    if (file.type == "application/pdf" && file1.type == "application/pdf" && file2.type == "application/pdf") {
                        formHandler()

                    }
                    else {
                        alert("Yalnızca pdf yüklenebilir")
                    }

                }
            }



            j = j + 1;
        }
    }


    const companiesOptions = companies.map((company) => ({
        key: company.id,
        text: company.name,
        value: company.id,
    }));

    const periodsOptions = periods.map((period) => ({
        key: period.id,
        text: period.name,
        value: period.id,
    }));

    const [isg, setIsg] = useState()
    const [internshipform, setInternshipform] = useState()
    const [z, setZ] = useState();
    //************************* */


    //****************** */

    const [progress, setProgress] = useState(0)
    const [progress2, setProgress2] = useState(0)
    const [progress3, setProgress3] = useState(0)
    const [progress4, setProgress4] = useState(0)
    const [upload, setUpload] = useState("Başlamadı: %")


    const formHandler = () => {
        z.preventDefault();
        const file = z.target.files[0];
        console.log("form handler1-1")
        setUpload("Yükleniyor: %")
        uploadFiles(file)
    };
    const uploadFiles = (file) => {
        if (!file) return;
        let date=new Date()
        const storageRef = ref(storage, `/files/${date+id+"müstehaklık"}`)
        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on("state_changed", (snapshot) => {
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

            setProgress(prog)

        }, (err) => console.log(err),
            () => {
                console.log(file)
                values.müstehaklıkName = file.name
                getDownloadURL(uploadTask.snapshot.ref).then((url) => values.müstehaklıkUrl = url).finally(() => formHandlerIsg())
            }
        )
    };




    const formHandlerIsg = () => {
        isg.preventDefault();
        const file = isg.target.files[0];
        console.log(id)

        uploadFilesIsg(file)
    };
    const uploadFilesIsg = (file) => {
        let date=new Date()
        if (!file) return;
        const storageRef = ref(storage, `/files/${date+id+"isg"}`)
        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on("state_changed", (snapshot) => {
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

            setProgress2(prog)

        }, (err) => console.log(err),
            () => {
                values.isgName = file.name
                console.log("form isg")

                getDownloadURL(uploadTask.snapshot.ref).then((url) => values.isgUrl = url).finally(() => formHandlerForm())
            }
        )
    };




    const formHandlerForm = () => {
        internshipform.preventDefault();
        const file = internshipform.target.files[0];
        console.log(file)

        uploadFilesForm(file)
    };
    const uploadFilesForm = (file) => {
        let date=new Date()
        if (!file) return;
        const storageRef = ref(storage, `/files/${date+id+"formhandler"}`)
        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on("state_changed", (snapshot) => {
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

            setProgress3(prog)


        }, (err) => console.log(err),
            () => {
                values.internshipformName = file.name
                console.log("form form")

                getDownloadURL(uploadTask.snapshot.ref).then((url) => values.internshipformUrl = url).finally(() => createInternshipRequest())
            }
        )
    };


    document.body.style.backgroundColor = "#f5f5dc"


    return (
        <div align="center" className="form" style={{ marginTop: '50px', marginLeft: '130px' }} >

            <h1>Staj Talebi Formu</h1>
            <Form size="tiny" style={{ color: "green" }}>
                <Form.Group widths="equal" >
                    <FormSelect
                        id="company"
                        onChange={(fieldname, data) => setFieldValue("company", data.value)}
                        onBlur={onBlur}
                        options={companiesOptions}
                        label="Şirket"
                        value={values.company}
                        placeholder='Şirket seçiniz'
                        search
                        selection

                    />


                </Form.Group>
                <Form.Group widths={"equal"}>
                    <FormSelect
                        id="period"
                        onChange={(fieldname, data) => setFieldValue("period", data.value)}
                        onBlur={onBlur}
                        options={periodsOptions}
                        label="Dönem"
                        value={values.period.periodId}
                        placeholder='Dönem seçiniz'
                        search
                        selection
                        error={errors.periodId && touched.periodId}

                    />

                </Form.Group  ><Form.Group widths={"equal"}>

                    <Form.Input
                        id="workDay"
                        type="number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.workDay}
                        label="İş günü"
                        placeholder="İş günü"
                        error={errors.workDay && touched.workDay}
                    >
                    </Form.Input>
                </Form.Group>

                <Form.Group widths="equal"  >
                    <Form.Input
                        style={{ color: "green" }}
                        id="startDate"
                        type="date"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.startDate}

                        label="Başlangıç Tarihi"
                        placeholder="Tarihi seçin"
                        error={errors.startDate && touched.startDate}
                    ></Form.Input>


                    <Form.Input
                        id="endDate"
                        type="date"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.endDate}
                        label="Bitiş Tarihi"
                        placeholder="Tarihi seçin"
                        error={errors.endDate && touched.endDate}
                    ></Form.Input>
                </Form.Group>


                <Form.Group widths="equal" >
                    <Form.Input
                        id="url"
                        type='file'
                        onChange={(r) => setIsg(r)}
                        onBlur={onBlur}
                        label="İsg Belgesi"
                        accept="application/pdf"

                    />

                </Form.Group>

                <Form.Group widths="equal" >
                    <Form.Input
                        id="url"
                        type='file'
                        onChange={(r) => setInternshipform(r)}
                        onBlur={onBlur}
                        label="Zorunlu Staj Başvuru Formu"
                        accept="application/pdf"

                    />

                </Form.Group>

                <Form.Group widths="equal" >
                    <Form.Input
                        id="url"
                        type='file'
                        onChange={(r) => setZ(r)}
                        onBlur={onBlur}
                        label="Müstehaklık belgesi"
                        accept="application/pdf"

                    />

                </Form.Group>



                <Link style={{ marginRight: "20px", color: "green" }} to={`/myPage/${id}/AddCompany`}>Şirket Talebi</Link>
                <Button style={{ backgroundColor: "green", color: "white" }} type="submit" onClick={deneme} >Oluştur</Button>
                <h4 align="right" style={{marginTop:"-20px"}}>{upload}{progress3}</h4>
            </Form>
        </div>
    )
}
/*

   <Card style={{ backgroundColor: 'rgba(5000, 5000, 5000, 0.1)',color: "green" }}>
                <Card.Content >
                    <Card.Header style={{ color: "green" }}>Staj Talebi Oluştur</Card.Header>
                </Card.Content>
                <Card.Content>
                    <Form size="tiny" style={{ color: "green" }}>
                        <Form.Group widths="equal" >
                            <FormSelect
                                id="company"
                                onChange={(fieldname, data) => setFieldValue("company", data.value)}
                                onBlur={onBlur}
                                options={companiesOptions}
                                label="Şirket"
                                value={values.company}
                                placeholder='Şirket seçiniz'
                                search
                                selection

                            />


                        </Form.Group>
                        <Form.Group >
                            <FormSelect
                                id="period"
                                onChange={(fieldname, data) => setFieldValue("period", data.value)}
                                onBlur={onBlur}
                                options={periodsOptions}
                                label="Dönem"
                                value={values.period.periodId}
                                placeholder='Dönem seçiniz'
                                search
                                selection
                                error={errors.periodId && touched.periodId}

                            />
                        </Form.Group>
                        <Form.Group>


                            <Form.Input
                                id="workDay"
                                type="number"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.workDay}
                                label="İş günü"
                                placeholder="İş günü"
                                error={errors.workDay && touched.workDay}
                            >
                            </Form.Input>
                        </Form.Group>

                        <Form.Group widths="equal"  >
                            <Form.Input
                                style={{ color: "green" }}
                                id="startDate"
                                type="date"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.startDate}

                                label="Başlangıç Tarihi"
                                placeholder="Tarihi seçin"
                                error={errors.startDate && touched.startDate}
                            ></Form.Input>


                            <Form.Input
                                id="endDate"
                                type="date"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.endDate}
                                label="Bitiş Tarihi"
                                placeholder="Tarihi seçin"
                                error={errors.endDate && touched.endDate}
                            ></Form.Input>
                        </Form.Group>


                        <Form.Group widths="equal" >
                            <Form.Input
                                id="url"
                                type='file'
                                onChange={(r) => setIsg(r)}
                                onBlur={onBlur}
                                label="İsg Belgesi"
                                accept="application/pdf"

                            />

                        </Form.Group>

                        <Form.Group widths="equal" >
                            <Form.Input
                                id="url"
                                type='file'
                                onChange={(r) => setInternshipform(r)}
                                onBlur={onBlur}
                                label="Zorunlu Staj Başvuru Formu"
                                accept="application/pdf"

                            />

                        </Form.Group>

                        <Form.Group widths="equal" >
                            <Form.Input
                                id="url"
                                type='file'
                                onChange={(r) => setZ(r)}
                                onBlur={onBlur}
                                label="Müstehaklık belgesi"
                                accept="application/pdf"

                            />

                        </Form.Group>



                        <Link style={{ marginRight: "20px", color: "green" }} to={`/myPage/${id}/AddCompany`}>Şirket Talebi</Link>
                        <Button style={{ backgroundColor: "green", color: "white" }} type="submit" onClick={deneme} >Oluştur</Button>
                        <h4>{upload}{progress3}</h4>
                    </Form>
                </Card.Content>
            </Card>


*/
