import React, { useState } from 'react'
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import { Button } from 'semantic-ui-react';
import { db } from "./firebase-config"
import { collection, getDocs, addDoc, query, where, updateDoc, doc } from "firebase/firestore"



export default function Pdff() {
    const [companies, setCompany] = useState([])
    const companyCollectionRef = collection(db, "companies")

    const doc = new jsPDF()
    const title = "Şirket Listesi";
    function table() {
        const getCompany = async () => {
            const q = query(companyCollectionRef)
            const data = await getDocs(q);
            setCompany(data.docs.map((doc) => ({ ...doc.data() })))
            console.log(companies)
        }
        getCompany()

        autoTable(doc, {
            title: [['Name']],
            head: [['Name', 'Confirm']],
            body: companies.map((c) =>
                [
                    [c.name]
                    , [c.confirm]
                ],
            ),
            theme: "plain",
        })
        doc.text(title, 15, 10);
        doc.save('table.pdf')
    }
    return (
        <div>
            <Button onClick={table}> apvmc</Button>
        </div>
    )
}
