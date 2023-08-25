import React, { useEffect, useState } from 'react'
import { Header, Icon, Table } from 'semantic-ui-react'
import { db } from "./firebase-config"
import { collection, getDocs, addDoc, query, where, updateDoc, doc } from "firebase/firestore"

export default function Companies() {
  const companyCollectionRef=collection(db,"companies")
    const [companies,setCompany]=useState([])
    useEffect(() => {
      const getCompany = async () => {
        let data = await getDocs(companyCollectionRef);
        setCompany(data.docs.map((doc) => ({ ...doc.data() })))
      
    }
    getCompany()
   
    }, [])
    
  return (
    <div style={{margin:"30px,46px,50px,50px"}}>
         <Header as="h2" >
                <Icon name="list alternate outline" />
                <Header.Content >Şirketler</Header.Content>

            </Header>
            <Table style={{backgroundColor:"#f5f5dc"}}>
            <Table.Header  style={{backgroundColor:"#f5f5dc"}}>
                    <Table.Row>
                        
                        <Table.HeaderCell style={{backgroundColor:"#e0e094"}}>Ad</Table.HeaderCell>
                        <Table.HeaderCell style={{backgroundColor:"#e0e094"}}>Adres</Table.HeaderCell>
                        <Table.HeaderCell style={{backgroundColor:"#e0e094"}}>Telefon Numarası</Table.HeaderCell>
                        <Table.HeaderCell style={{backgroundColor:"#e0e094"}}>Vergi Numarası </Table.HeaderCell>
                        <Table.HeaderCell style={{backgroundColor:"#e0e094"}}>Aktivite Alanı </Table.HeaderCell>
                        <Table.HeaderCell style={{backgroundColor:"#e0e094"}}>Onay Durumu </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>{
                    companies.map((company) => (


                        <Table.Row key={company.companyId}>
                            <Table.Cell>{company.name}</Table.Cell>
                            <Table.Cell>{company.address}</Table.Cell>
                            <Table.Cell>{company.phoneNumber}</Table.Cell>
                            <Table.Cell>{company.taxNumber}</Table.Cell>
                            <Table.Cell>{company.activityArea}</Table.Cell>
                            <Table.Cell>{company.confirm}</Table.Cell>

                        </Table.Row>

                    ))
                }

                </Table.Body>
            </Table>
    </div>
  )
}
