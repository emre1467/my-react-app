import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Icon, List, Table } from 'semantic-ui-react';
import { db } from "./firebase-config"
import { collection, getDocs, addDoc,deleteDoc, query, where, updateDoc, doc } from "firebase/firestore"


export default function SecretaryCompanyDetail() {
    let { idd } = useParams();
    const [companies, setCompany] = useState([])
    const companyCollectionRef = collection(db, "companies")

    let onaylandı = "Onaylandı"
    let reddedildi = "Onaylanmadı"
    useEffect(() => {

        const getCompany = async () => {
            const q = query(companyCollectionRef, where("id", "==", idd))
            const data = await getDocs(q);
            setCompany(data.docs.map((doc) => ({ ...doc.data() })))
        console.log(data.docs.map((doc) => ({ ...doc.data() })))
        }
        getCompany()

    }, [])
    function gönder(params) {
        window.location.replace(` ${params}`);
    }
    const onayla = async () => {
        // internshipService.updateConfirm(idd, onaylandı).then(result => console.log(result.data.message))
        const compDoc = doc(db, "companies", idd)
       if(window.confirm("Şirketi onaylıyor musunuz?")){
        await updateDoc(compDoc, { confirm: onaylandı })
        alert("Şirket onaylandı")
       }
       
    }
    const reddet = async () => {
        // internshipService.updateConfirm(idd, onaylandı).then(result => console.log(result.data.message))
        const compDoc = doc(db, "companies", idd)
       if(window.confirm("Şirketi reddediyor musunuz?")){
        await updateDoc(compDoc, { confirm: reddedildi })
        alert("Şirket reddedildi")
    
    } 
    }
    const delet=async()=>{
        if( window.confirm("Şirket silinecek onaylıyor musunuz?")){
         await deleteDoc(doc(db,"companies",idd))
     alert("Şirket silindi")
        }
     
     }
    return (
        <div style={{ marginTop: "50px" }}>
            <Table style={{backgroundColor:"#f5f5dc"}}celled>
                <Table.Header>
                    <Table.Row>

                        <Table.HeaderCell  style={{backgroundColor:"#e0e094"}}>Şirket Adı</Table.HeaderCell>
                        <Table.HeaderCell style={{backgroundColor:"#e0e094"}}>Adresi</Table.HeaderCell>
                        <Table.HeaderCell style={{backgroundColor:"#e0e094"}}>Protokol</Table.HeaderCell>
                        <Table.HeaderCell style={{backgroundColor:"#e0e094"}}>Telefon Numarası</Table.HeaderCell>
                        <Table.HeaderCell style={{backgroundColor:"#e0e094"}}>Onay Durumu</Table.HeaderCell>


                    </Table.Row>

                </Table.Header>
                <Table.Body >{
                    companies.map((company) => (

                        <Table.Row key={company.companyId}>
                            <Table.Cell>{company.name}</Table.Cell>
                            <Table.Cell >{company.address}</Table.Cell>

                            <Table.Cell ><a href={(company.protocolUrl)} target="_blank" ><Icon size="small" circular name='file pdf' />Protokol</a></Table.Cell>
                            <Table.Cell >{company.phoneNumber}</Table.Cell>
                            <Table.Cell >{company.confirm}</Table.Cell>

                        </Table.Row>
                    ))

                }

                </Table.Body>

            </Table>
            <Table style={{backgroundColor:"#f5f5dc"}}celled>
                <Table.Header>
                    <Table.Row>

                        <Table.HeaderCell  style={{backgroundColor:"#e0e094"}}>Şirket Maili</Table.HeaderCell>
                        <Table.HeaderCell style={{backgroundColor:"#e0e094"}}>Faaliyet Alanı</Table.HeaderCell>
                        <Table.HeaderCell style={{backgroundColor:"#e0e094"}}>Çalışan Sayısı</Table.HeaderCell>
                        <Table.HeaderCell style={{backgroundColor:"#e0e094"}}>Faks Numarası</Table.HeaderCell>


                    </Table.Row>

                </Table.Header>
                <Table.Body >{
                    companies.map((company) => (

                        <Table.Row key={company.companyId}>
                            <Table.Cell>{company.email}</Table.Cell>
                            <Table.Cell >{company.activityArea}</Table.Cell>

                            <Table.Cell >{company.employeeNumber}</Table.Cell>
                            <Table.Cell >{company.faks}</Table.Cell>

                        </Table.Row>
                    ))

                }

                </Table.Body>

            </Table>
            <Table style={{backgroundColor:"#f5f5dc"}}celled>
                <Table.Header>
                    <Table.Row>

                        <Table.HeaderCell  style={{backgroundColor:"#e0e094"}}>Yetkili Adı</Table.HeaderCell>
                        <Table.HeaderCell style={{backgroundColor:"#e0e094"}}>Yetkili maili</Table.HeaderCell>
                        <Table.HeaderCell style={{backgroundColor:"#e0e094"}}>Yetkili Unvanı</Table.HeaderCell>
                        <Table.HeaderCell style={{backgroundColor:"#e0e094"}}>Yetkili Telefon Numarası</Table.HeaderCell>
                        <Table.HeaderCell style={{backgroundColor:"#e0e094"}}>Yetkili Çalışma Alanı</Table.HeaderCell>


                    </Table.Row>

                </Table.Header>
                <Table.Body >{
                    companies.map((company) => (

                        <Table.Row key={company.companyId}>
                            <Table.Cell>{company.yetkiliİsmi}</Table.Cell>
                            <Table.Cell >{company.yetkiliMail}</Table.Cell>
                            <Table.Cell >{company.yetkiliUnvan}</Table.Cell>
                            <Table.Cell >{company.yetkiliTelefon}</Table.Cell>
                            <Table.Cell >{company.yetkiliAlanı}</Table.Cell>

                        </Table.Row>
                    ))

                }

                </Table.Body>

            </Table>
            <Button onClick={reddet} color='red' align="center">Reddet</Button>
            <Button onClick={onayla} color='green'>Onayla</Button>
            <Button onClick={delet} color='purple'>Sil</Button>



        </div>

    )
}
