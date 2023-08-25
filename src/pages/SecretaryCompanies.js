import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Form, Header, Icon, Input, Table } from 'semantic-ui-react';
import { db } from "./firebase-config"
import { collection, getDocs, addDoc, query, where, updateDoc, doc } from "firebase/firestore"
import * as Yup from "yup";
import { useFormik } from 'formik';
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';

export default function SecretaryCompanies() {
  let { id } = useParams();
  const [companies, setCompany] = useState([])
  const companyCollectionRef = collection(db, "companies")

  useEffect(() => {
    //let companyService=new CompanyService()
    //companyService.getByConfirmCompanies(confirm).then(result=>setCompany(result.data.data))
    const getCompany = async () => {
      const q = query(companyCollectionRef)
      const data = await getDocs(q);
      setCompany(data.docs.map((doc) => ({ ...doc.data() })))

    }
    getCompany()

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

      name: "",
    },
    validationSchema: Yup.object({
      //name: Yup.string().required("isim giriniz"),
    }),

    onSubmit: (values) => {
    },

  });

  function Namefilter() {
    const getCompany = async () => {
      const q = query(companyCollectionRef, where("name", "==", values.name))
      const data = await getDocs(q);
      setCompany(data.docs.map((doc) => ({ ...doc.data() })))
    }
    getCompany()
  }
  function Onaylananlar() {
    const getCompany = async () => {
      const q = query(companyCollectionRef, where("confirm", "==", "Onaylandı"))
      const data = await getDocs(q);
      setCompany(data.docs.map((doc) => ({ ...doc.data() })))

    }
    getCompany()
  }
  function Reddedilenler() {
    const getCompany = async () => {
      const q = query(companyCollectionRef, where("confirm", "==", "Onaylanmadı"))
      const data = await getDocs(q);
      setCompany(data.docs.map((doc) => ({ ...doc.data() })))

    }
    getCompany()
  }
  function OnaylanmayıBekleyenler() {
    const getCompany = async () => {
      const q = query(companyCollectionRef, where("confirm", "==", "Onaylanmayı bekliyor"))
      const data = await getDocs(q);
      setCompany(data.docs.map((doc) => ({ ...doc.data() })))

    }
    getCompany()
  }
  let title="Sirketler"
  const doc = new jsPDF().setLanguage("tr")
  function TabletoPdf() {
  doc.setLanguage("tr");

    autoTable(doc, {
      startY: 30,
      head: [['Isim', 'Vergi Numarasi','Onay Durumu']],
      body: companies.map((c) =>
        [
          [c.name],
          [c.taxNumber],
           [c.confirm],
        ],
      ),
      theme: "plain",
    })
    let num=companies.length
    let txt=num.toString()
    doc.text(title, 15, 20);
    doc.text("sirket sayisi: ", 130, 20);
    doc.text(txt, 165, 20)
    doc.save('table.pdf')
  }
  document.body.style.backgroundColor="#f5f5dc"

  return (
    <div style={{ marginTop: "30px" }}>
      <Header as="h2">
        <Icon name="list alternate outline" />
        <Header.Content>Şirketler</Header.Content>
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

          <Button color='green' style={{ marginTop: "35px" }} onClick={Namefilter}>İsme Göre Ara</Button>
          
           <Button  style={{marginLeft:"50px",marginTop:"35px"}} onClick={TabletoPdf}>Pdf indir</Button>
          
          <Button.Group style={{ marginLeft: "450px", marginTop: "35px" }}>
            <Button color='green' onClick={Onaylananlar}>Onaylananlar</Button>
            <Button color='red' onClick={Reddedilenler}>Reddedilenler</Button>
            <Button color='yellow' onClick={OnaylanmayıBekleyenler}>Bekleyenler</Button>

          </Button.Group>
        </Form.Group>


        </Form>
      </Header>
      <Table style={{backgroundColor:"#f5f5dc"}}>
        <Table.Header>
          <Table.Row>

            <Table.HeaderCell style={{backgroundColor:"#e0e094"}}>Ad</Table.HeaderCell>
            <Table.HeaderCell style={{backgroundColor:"#e0e094"}}>Onay Durumu </Table.HeaderCell>
            <Table.HeaderCell style={{backgroundColor:"#e0e094"}}>Görüntüle </Table.HeaderCell>
          
          </Table.Row>
        </Table.Header>

        <Table.Body>{
          companies.map((company) => (


            <Table.Row key={company.companyId}>
              <Table.Cell>{company.name}</Table.Cell>
              <Table.Cell>{company.confirm}</Table.Cell>
              <Table.Cell><Link style={{color:"black"}} to={`/secretaryPage/${id}/CompaniesList/${company.id}`}> Görüntüle</Link></Table.Cell>

            </Table.Row>

          ))
        }

        </Table.Body>
      </Table>
    </div>
  )
}
