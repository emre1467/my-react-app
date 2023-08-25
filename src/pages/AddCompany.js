import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup";
import { Button, Card, Form, Grid } from 'semantic-ui-react';
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { storage } from "./firebase-config"
import { db } from "./firebase-config"
import { collection, getDocs,addDoc, query,where,updateDoc ,doc} from "firebase/firestore"
const companyCollectionRef = collection(db, "companies")

export default function AddCompany() {
  const createCompany=async ()=>{

      const docref=await addDoc(companyCollectionRef,{email:values.email,faks:values.faks,activityArea:values.activityArea,employeeNumber:values.employeeNumber,taxNumber:values.taxNumber,name:values.name,address:values.address,phoneNumber:values.phoneNumber,protocolUrl:values.protocolUrl,confirm:values.confirm,id:10,yetkiliAlanı:values.yetkiliAlanı,yetkiliMail:values.yetkiliMail,yetkiliTelefon:values.yetkiliTelefon,yetkiliUnvan:values.yetkiliUnvan,yetkiliİsmi:values.yetkiliİsmi,})
      const stuDoc=doc(db,"companies",docref.id)
      await updateDoc(stuDoc,{id:docref.id})
      console.log(values)
    
  
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
    onBlur,

  } = useFormik({
    initialValues: {
      companyId: "0",
      name: "",
      address: "",
      protocolUrl: "",
      phoneNumber: "",
      confirm: "Onaylanmayı bekliyor",
      taxNumber:"",
      email:"",
      activityArea:"",
      employeeNumber:"",
      faks:"",
      yetkiliİsmi:"",
      yetkiliUnvan:"",
      yetkiliMail:"",
      yetkiliTelefon:"",
      yetkiliAlanı:"",


    },
    validationSchema: Yup.object({
      name: Yup.string().required("Şirketin ismini giriniz"),
      address: Yup.string().required("Şirketin adresini giriniz"),
      phoneNumber: Yup.string().required("Şirketin telefon numarasını giriniz"),
      taxNumber: Yup.string().required("Şirketin vergi numarasını giriniz"),


    }),
    onSubmit: (values) => {

    }
  })
  const [z, setZ] = useState();
  const [progress, setProgress] = useState(0)
  const [url, setUrl] = useState("")


  function gönder() {
    dene()
  }
  let j = 0;

  function dene() {
    let i = 0;
    while (i < 1) {
      if(values.yetkiliİsmi==""||values.yetkiliUnvan==""||values.yetkiliTelefon==""||values.yetkiliMail==""||values.yetkiliAlanı==""||values.faks==""||values.employeeNumber==""||values.activityArea==""||values.email==""||values.name==""||values.address==""||values.phoneNumber==""||values.taxNumber==""||z==null){
        alert("Alanları boş bırakmayınız.")
      }else{
        formHandler()
      }
      i = i + 1;
    }
  }




  const formHandler = () => {
    console.log("form")
    z.preventDefault();
    const file = z.target.files[0];
    if(file.type=="application/pdf"){
    uploadFiles(file)
      
    }
    else{
      alert("Sadece pdf şeklinde dosyalar yüklenebilir.")
    }
    
  };
  const uploadFiles = (file) => {
    if (!file) return;
    
    console.log(file.type)

    const storageRef = ref(storage, `/company/${values.phoneNumber}`)
    const uploadTask = uploadBytesResumable(storageRef, file)
    uploadTask.on("state_changed", (snapshot) => {
      const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
setUpload("Yükleniyor: %")
      setProgress(prog)

    }, (err) => console.log(err),
      () => {
        //getDownloadURL(uploadTask.snapshot.ref).then((url) => values.protocolUrl = url).finally(()=>companyService.addCompany(values).then(result => console.log(result)))
        getDownloadURL(uploadTask.snapshot.ref).then((url) => values.protocolUrl = url).finally(()=>createCompany())
      
      }
    )
  };
  const [upload, setUpload] = useState("Başlamadı: %")


  return (
    <div align="center" style={{ marginTop: '100px', marginLeft: '130px', marginBottom: "160px" }}>
            <h1>Şirket Talebi Formu</h1>
            <Form onSubmit={handleSubmit}>
            <Form.Group widths={'equal'}>
              <Form.Input
                id="name"
                type='text'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                error={errors.name && touched.name}
                label="İsim"
                placeholder="İsim giriniz"></Form.Input>
            </Form.Group>

            <Form.Group widths={'equal'}>
              <Form.Input
                id="taxNumber"
                type='text'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.taxNumber}
                error={errors.taxNumber && touched.taxNumber}
                label="Vergi Numrası"
                placeholder="Vergi numarası giriniz"></Form.Input>
              <Form.Input
                id="faks"
                type='text'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.faks}
                error={errors.faks && touched.faks}
                label="Faks Numarası"
                placeholder="Faks numarası giriniz">
                </Form.Input>
            
            </Form.Group>

            
            <Form.Group widths={'equal'}>
              <Form.Input
                id="address"
                type='text'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
                error={errors.address && touched.address}
                label="Adres"
                placeholder="Adres giriniz"></Form.Input>
             <Form.Input
                id="activityArea"
                type='text'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.activityArea}
                error={errors.activityArea && touched.activityArea}
                label="Faaliyet Alanı"
                placeholder="Faaliyet alanı giriniz"></Form.Input>
           
            </Form.Group>

            <Form.Group widths={'equal'}>
              <Form.Input
                id="phoneNumber"
                type='text'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phoneNumber}
                error={errors.phoneNumber && touched.phoneNumber}
                label="Telefon Numarası"
                placeholder="Telefon numarası giriniz"></Form.Input>
             <Form.Input
                id="employeeNumber"
                type='text'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.employeeNumber}
                error={errors.employeeNumber && touched.employeeNumber}
                label="Çalışan sayısı"
                placeholder="Çalışan sayısı giriniz"></Form.Input>
           
            <Form.Input
                id="email"
                type='text'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={errors.email && touched.email}
                label="Email"
                placeholder="email giriniz"></Form.Input>
          
            </Form.Group>


         

            <Form.Group widths="equal" >
            <Form.Input
                id="yetkiliİsmi"
                type='text'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.yetkiliİsmi}
                error={errors.yetkiliİsmi && touched.yetkiliİsmi}
                label="Yetkili adı soyadı"
                placeholder="Yetkili adı soyadı giriniz"></Form.Input>
          
          <Form.Input
                id="yetkiliMail"
                type='text'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.yetkiliMail}
                error={errors.yetkiliMail && touched.yetkiliMail}
                label="Yetkili maili"
                placeholder="Yetkili maili giriniz"></Form.Input>
            <Form.Input
                id="yetkiliTelefon"
                type='text'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.yetkiliTelefon}
                error={errors.yetkiliTelefon && touched.yetkiliTelefon}
                label="Yetkili Telefonu"
                placeholder="Yetkili telefonu giriniz"></Form.Input>
            </Form.Group>
            <Form.Group widths="equal" >
            <Form.Input
                id="yetkiliUnvan"
                type='text'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.yetkiliUnvan}
                error={errors.yetkiliUnvan && touched.yetkiliUnvan}
                label="Yetkili Unvanı"
                placeholder="Yetkili ünvanı giriniz"></Form.Input>
          <Form.Input
                id="yetkiliAlanı"
                type='text'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.yetkiliAlanı}
                error={errors.yetkiliAlanı && touched.yetkiliAlanı}
                label="Yetkili Alanı"
                placeholder="Yetkili alanı giriniz"></Form.Input>
          
            </Form.Group>
            <Form.Group widths="equal" >
              <Form.Input
                id="url"
                type='file'
                onChange={(r) => setZ(r)}
                onBlur={onBlur}
                label="Şirket Protokolü"
                accept="application/pdf"
              />
            </Form.Group>
            <Button color='green' type="submit" handleSubmit={handleSubmit} onClick={gönder} >Oluştur</Button>
            <h3 align="right" style={{marginTop:"-20px" ,color:"green"}} > {upload} {progress}</h3>

          </Form>
    </div>
  );
}
/*
 <Card widths="equal" style={{ backgroundColor: 'rgba(5000, 5000, 5000, 0.1)'}}>
        <Card.Content header="Şirket Ekle"></Card.Content>
        <Card.Content>
          <Form onSubmit={handleSubmit}>
            <Form.Group widths={'equal'}>
              <Form.Input
                id="name"
                type='text'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                error={errors.name && touched.name}
                label="İsim"
                placeholder="İsim giriniz"></Form.Input>
            </Form.Group>

            <Form.Group widths={'equal'}>
              <Form.Input
                id="taxNumber"
                type='text'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.taxNumber}
                error={errors.taxNumber && touched.taxNumber}
                label="Vergi Numrası"
                placeholder="Vergi numarası giriniz"></Form.Input>
            </Form.Group>

            
            <Form.Group widths={'equal'}>
              <Form.Input
                id="address"
                type='text'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
                error={errors.address && touched.address}
                label="Adres"
                placeholder="Adres giriniz"></Form.Input>
            </Form.Group>

            <Form.Group widths={'equal'}>
              <Form.Input
                id="phoneNumber"
                type='text'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phoneNumber}
                error={errors.phoneNumber && touched.phoneNumber}
                label="Telefon Numarası"
                placeholder="Telefon numarası giriniz"></Form.Input>
            </Form.Group>


            <Form.Group widths="equal" >
              <Form.Input
                id="url"
                type='file'
                onChange={(r) => setZ(r)}
                onBlur={onBlur}
                label="Şirket Protokolü"
                accept="application/pdf"
              />

            </Form.Group>

            <Button color='green' type="submit" handleSubmit={handleSubmit} onClick={gönder} >Oluştur</Button>
            <h3 > {upload} {progress}</h3>

          </Form>
        </Card.Content>
      </Card>
*/