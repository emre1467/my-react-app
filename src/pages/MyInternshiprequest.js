import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Button, Header, Icon, Table } from 'semantic-ui-react';
import { db } from "./firebase-config"
import { collection, getDocs, addDoc, query, where, updateDoc, doc } from "firebase/firestore"

export default function MyInternshiprequest() {
    let { id } = useParams();
    const studentCollectionRef = collection(db, "students")

    const internshipCollectionRef = collection(db, "internshipRequests")

    const [internships, setInternship] = useState([])
    useEffect(() => {
        //let internshipService = new InternshipRequestService()
        //internshipService.getInternshipRequestByStudentId(id).then(result => setInternship(result.data.data))
     
    
        const q = query(internshipCollectionRef, where("stuId", "==", id))
        const getInternships = async () => {
            let data = await getDocs(q);
            setInternship(data.docs.map((doc) => ({ ...doc.data() })))
            //console.log(studentCollectionRef)
       
           
        }
        //students.map((stu) => setId(stu.id))
        getInternships().then(()=>console.log(internships ))
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
        
    
    }, []);
    


    return (
        <div style={{marginTop:"50px",marginLeft:"50px"}} >

            <Header as="h2">
                <Icon name="list alternate outline" />
                <Header.Content>Staj Taleplerim</Header.Content>
                
            </Header>
            <Table style={{backgroundColor:"#f5f5dc"}}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell style={{backgroundColor:"#e0e094"}}>Onay durumu</Table.HeaderCell>
                        <Table.HeaderCell style={{backgroundColor:"#e0e094"}}>Detay Sayfası</Table.HeaderCell>

                    
                    </Table.Row>
                </Table.Header>
                <Table.Body>{
                    internships.map((internship) => (

                        <Table.Row  key={internship.id}>
                            <Table.Cell >{internship.confirm}</Table.Cell>
                            
                            <Table.Cell><Link to={`/myPage/${id}/MyInternshipRequest/${internship.id}`}> Görüntüle</Link></Table.Cell>
                        </Table.Row>

                    ))
                }

                </Table.Body>
            </Table>
            <Button style={{color:"lightgreen"}}><Link style={{color:"black"}} to={`/myPage/${id}/MyInternshipRequestAdd`}> Yeni Staj Talebi</Link></Button>
        </div>
    )
}
