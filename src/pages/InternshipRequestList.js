import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Form, Header, Icon, Input, Table } from 'semantic-ui-react';
import { db } from "./firebase-config"
import { collection, getDocs, addDoc, query, where, updateDoc, doc } from "firebase/firestore"
import { async } from '@firebase/util';
import { array } from 'yup';
import * as Yup from "yup";
import { useFormik } from 'formik';
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import resim from '../images/baibü.jpg'
import QRCode from 'qrcode'
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';



export default function InternshipRequestList()  {
  let { id } = useParams();
  const url = "https://firebasestorage.googleapis.com/v0/b/fir-tutorial-ca834.appspot.com/o/files%2F1662912088930?alt=media&token=d654c91c-582d-4704-bf55-f76bd1dddf8b"
  const [internships, setInternship] = useState([])
  const [company, setCompany] = useState([])
  const [student, setStudent] = useState()
  const [student2, setStudent2] = useState([])
  const [student3, setStudent3] = useState([])
  const [admin,setAdmin]=useState([])


  const internshipCollectionRef = collection(db, "internshipRequests")
  const companyCollectionRef = collection(db, "companies")
  const studentCollectionRef = collection(db, "students")
  const adminCollectionRef = collection(db, "admins")
  useEffect(() => {
    GenerateQRCode()
    // let confirm="Onaylanmadı"
    //let internshipRequestService=new InternshipRequestService()
    //internshipRequestService.getConfirmInternshipRequest(confirm).then(result=>setInternships(result.data.data) )
    //console.log(internships)


    const getInternship = async () => {

      const qadmin=query(adminCollectionRef,where("id","==",id))
      const dataAdmin=await getDocs(qadmin);
      setAdmin(dataAdmin.docs.map((doc) => ({ ...doc.data() })))

      const q=query(internshipCollectionRef,where("stuDepartment","==",dataAdmin.docs.map((doc) => ({ ...doc.data() }))[0].department))
      const data = await getDocs(q);
      setInternship(data.docs.map((doc) => ({ ...doc.data() })))
      //setC(data.docs.map((doc) => ({ ...doc.data() }))[0].company)
      //setP(data.docs.map((doc) => ({ ...doc.data() }))[0].period)




      /* const qcompany = query(companyCollectionRef, where("id", "==", data.docs.map((doc) => ({ ...doc.data() }))[0].company))
       const data1 = await getDocs(qcompany);
       setCompany(data1.docs.map((doc) => ({ ...doc.data() }))[0].name)
       console.log(company)
 
       const qstudent = query(studentCollectionRef, where("id", "==", data.docs.map((doc) => ({ ...doc.data() }))[0].stuId))
       const data2 = await getDocs(qstudent);
       setStudent(data2.docs.map((doc) => ({ ...doc.data() }))[0].name)
       setStudent2(data2.docs.map((doc) => ({ ...doc.data() }))[0].surname)
 
       console.log(student)
 */
    }

    getInternship()



  }, [])



  function Namefilter() {
    
    const getInternship = async () => {

      const qadmin=query(adminCollectionRef,where("id","==",id))
      const dataAdmin=await getDocs(qadmin);
      setAdmin(dataAdmin.docs.map((doc) => ({ ...doc.data() })))
      
      const q = query(internshipCollectionRef, where("stuName", "==", values.name),where("stuDepartment","==",dataAdmin.docs.map((doc) => ({ ...doc.data() }))[0].department))
      const data = await getDocs(q);
      setInternship(data.docs.map((doc) => ({ ...doc.data() })))
    }
    getInternship()
  }
  function Nofilter() {
    const getInternship = async () => {
      const qadmin=query(adminCollectionRef,where("id","==",id))
      const dataAdmin=await getDocs(qadmin);
      setAdmin(dataAdmin.docs.map((doc) => ({ ...doc.data() })))
      

      const q = query(internshipCollectionRef, where("stuNo", "==", values.numara),where("stuDepartment","==",dataAdmin.docs.map((doc) => ({ ...doc.data() }))[0].department))
      const data = await getDocs(q);
      setInternship(data.docs.map((doc) => ({ ...doc.data() })))
    }
    getInternship()
  }

  function Onaylananlar() {
    const getInternship = async () => {

      
      const qadmin=query(adminCollectionRef,where("id","==",id))
      const dataAdmin=await getDocs(qadmin);
      setAdmin(dataAdmin.docs.map((doc) => ({ ...doc.data() })))
      

      const q = query(internshipCollectionRef, where("confirm", "==", "Onaylandı"),where("stuDepartment","==",dataAdmin.docs.map((doc) => ({ ...doc.data() }))[0].department))
      const data = await getDocs(q);
      setInternship(data.docs.map((doc) => ({ ...doc.data() })))
    }
    getInternship()
  }
  function Reddedilenler() {
    const getInternship = async () => {

      const qadmin=query(adminCollectionRef,where("id","==",id))
      const dataAdmin=await getDocs(qadmin);
      setAdmin(dataAdmin.docs.map((doc) => ({ ...doc.data() })))
      

      const q = query(internshipCollectionRef, where("confirm", "==", "Onaylanmadı"),where("stuDepartment","==",dataAdmin.docs.map((doc) => ({ ...doc.data() }))[0].department))
      const data = await getDocs(q);
      setInternship(data.docs.map((doc) => ({ ...doc.data() })))
    }
    getInternship()
  }
  function OnaylanmayıBekleyenler() {
    const getInternship = async () => {

      const qadmin=query(adminCollectionRef,where("id","==",id))
      const dataAdmin=await getDocs(qadmin);
      setAdmin(dataAdmin.docs.map((doc) => ({ ...doc.data() })))
      

      const q = query(internshipCollectionRef, where("confirm", "==", "Onaylanmayı bekliyor"),where("stuDepartment","==",dataAdmin.docs.map((doc) => ({ ...doc.data() }))[0].department))
      const data = await getDocs(q);
      setInternship(data.docs.map((doc) => ({ ...doc.data() })))
    }
    getInternship()
  }


  let title = "Staj Talepleri"
  const doc = new jsPDF()
  const doc2 = new jsPDF("https://firebasestorage.googleapis.com/v0/b/fir-tutorial-ca834.appspot.com/o/files%2FSun%20Sep%2011%202022%2018%3A28%3A06%20GMT%2B0300%20(GMT%2B03%3A00)q3fYgEncTrttfPKYQKcL?alt=media&token=a23afa5b-21c5-4365-bfa8-3c764c4982e8")
  //doc2.toDataURL("https://firebasestorage.googleapis.com/v0/b/fir-tutorial-ca834.appspot.com/o/files%2F1662912088930?alt=media&token=d654c91c-582d-4704-bf55-f76bd1dddf8b")
  async function TabletoPdf() {

    doc.setLanguage("tr");
    autoTable(doc, {
      startY: 30,
      head: [['Ö. Numara', 'Baslangic Tarihi', 'Bitis Tarihi', 'Onay Durumu']],
      body: internships.map((i) =>
        [
          [i.stuNo],
          [i.startDate],
          [i.endDate],
          [i.confirm],
        ],
      ),
      theme: "plain",
    })
    let num = internships.length
    let txt = num.toString()
    doc.text(title, 15, 20);
    doc.text("Staj talep sayisi: ", 150, 20);
    doc.text(txt, 195, 20)

   // doc.addImage(qrcode, 'PNG', 180, 0, 30, 30)
    //doc2.save("dsc.pdf")
    //doc2.addImage(qrcode, 'PNG', 50, 0, 50, 50)
    //doc2.save('table2.pdf')
    const url = 'https://pdf-lib.js.org/assets/with_update_sections.pdf'
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

    const pdfDoc = await PDFDocument.load(existingPdfBytes)

    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    const { width, height } = firstPage.getSize()
    const pdfBytes = await pdfDoc.save()
  //pdfBytes.copyWithin(doc)
  
    doc.save('table.pdf')

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

  } = useFormik({
    initialValues: {

      name: "",
      numara: "",
    },
    validationSchema: Yup.object({
      //name: Yup.string().required("isim giriniz"),
    }),

    onSubmit: (values) => {
    },

  });

  const [qrcode, setQrcode] = useState('')

  const GenerateQRCode = () => {
    let url = "https://www.google.com/"
    QRCode.toDataURL(url, {
      width: 200,
      margin: 2
    }, (err, url) => {
      if (err) return console.error(err)

      console.log("url  " + url)
      //console.log("gr   "+qrcode)
      setQrcode(url)
    })
  }

  return (
    <div id="göster" style={{ marginTop: "30px" }}>
      <Header as="h2">
        <Icon name="list alternate outline" />
        <Header.Content>Staj Talepleri</Header.Content>
        <Form >  <Form.Group>



          <Form.Input
            id="name"
            type="text"
            label="İsim"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
          >
          </Form.Input>
          <Button style={{ marginTop: "35px" }} color='green' size='tiny' onClick={Namefilter}>İsme Göre Ara</Button>

          <Form.Input

            id="numara"
            type="text"
            label="Numara"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.numara}
          >
          </Form.Input>
          <Button size='tiny' color='green' style={{ marginTop: "35px" }} onClick={Nofilter}>Numaraya Göre Ara</Button>

          <Button style={{ marginLeft: "50px", marginTop: "35px" }} onClick={TabletoPdf}>Pdf indir</Button>

          <Button.Group style={{ marginLeft: "120px", marginTop: "35px" }}>
            <Button color='green' onClick={Onaylananlar}>Onaylananlar</Button>
            <Button color='red' onClick={Reddedilenler}>Reddedilenler</Button>
            <Button color='yellow' onClick={OnaylanmayıBekleyenler}>Bekleyenler</Button>

          </Button.Group>

        </Form.Group>


        </Form>

      </Header>
      <Table style={{ backgroundColor: "#f5f5dc" }}>
        <Table.Header>

          <Table.Row>

            <Table.HeaderCell style={{ backgroundColor: "#e0e094" }}>Onay Durumu </Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor: "#e0e094" }}>Başlangıç Tarihi </Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor: "#e0e094" }}>Bitiş Tarihi </Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor: "#e0e094" }}>İsim </Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor: "#e0e094" }}>Ö.Numara </Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor: "#e0e094" }}>Görüntüle </Table.HeaderCell>


          </Table.Row>
        </Table.Header>

        <Table.Body>{
          internships.map((intern) => (

            <Table.Row key={intern.id}>

              <Table.Cell >{intern.confirm}</Table.Cell>
              <Table.Cell>{intern.startDate}</Table.Cell>
              <Table.Cell>{intern.endDate}</Table.Cell>
              <Table.Cell>{intern.stuName}</Table.Cell>
              <Table.Cell>{intern.stuNo}</Table.Cell>




              <Table.Cell><Link style={{ color: "green" }} to={`/adminPage/${id}/InternshipRequests/${intern.id}`}> Görüntüle</Link></Table.Cell>
            </Table.Row>
          ))
        }

        </Table.Body>
      </Table>
      <div>

      </div>
    </div>

  )
}

