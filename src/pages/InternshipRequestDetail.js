import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Header, Icon, List, Tab, Table } from 'semantic-ui-react';
import { db } from "./firebase-config"
import { collection, getDocs, deleteDoc, addDoc, query, where, updateDoc, doc } from "firebase/firestore"
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { storage } from "./firebase-config"
import QRCode from 'qrcode'

export default function InternshipRequestDetail() {
    let { idd } = useParams();
    const [internships, setInternship] = useState([])
    const [company, setCompany] = useState([])
    const [student, setStudent] = useState([])
    const periodCollectionRef = collection(db, "periods")
    const [period, setPeriod] = useState([])
    const internshipCollectionRef = collection(db, "internshipRequests")
    const companyCollectionRef = collection(db, "companies")
    const studentCollectionRef = collection(db, "students")
    const departmentCollectionRef = collection(db, "departments")
    const [department, setDepartment] = useState([])
    let onaylandı = "Onaylandı"
    let reddedildi = "Onaylanmadı"
    useEffect(() => {
        //internshipService.getInternshipRequestById(idd).then(result => setInternships(result.data.data))
        const getInternship = async () => {
            const q = query(internshipCollectionRef, where("id", "==", idd))
            const data = await getDocs(q);
            setInternship(data.docs.map((doc) => ({ ...doc.data() })))
            //setC(data.docs.map((doc) => ({ ...doc.data() }))[0].company)
            //setP(data.docs.map((doc) => ({ ...doc.data() }))[0].period)
            //console.log(internships)
            const qcompany = query(companyCollectionRef, where("id", "==", data.docs.map((doc) => ({ ...doc.data() }))[0].company))
            const data1 = await getDocs(qcompany);
            setCompany(data1.docs.map((doc) => ({ ...doc.data() })))
            //console.log(company)

            const qstudent = query(studentCollectionRef, where("id", "==", data.docs.map((doc) => ({ ...doc.data() }))[0].stuId))
            const data2 = await getDocs(qstudent);
            setStudent(data2.docs.map((doc) => ({ ...doc.data() })))
            //console.log(student)

            const qperiod = query(periodCollectionRef, where("id", "==", data.docs.map((doc) => ({ ...doc.data() }))[0].period))
            const data3 = await getDocs(qperiod);
            setPeriod(data3.docs.map((doc) => ({ ...doc.data() }))[0].name)


        }

        getInternship()



    }, [])

    const Onayla = async () => {
        // internshipService.updateConfirm(idd, onaylandı).then(result => console.log(result.data.message))
        const stajDoc = doc(db, "internshipRequests", idd)
        if (window.confirm("Staj talebi'ni onaylıyor musunuz?")) {
            await updateDoc(stajDoc, { confirm: onaylandı })
            alert("Staj talebi onaylandı")

        }
        /*
        
                class App extends React.Component {
        
                    modifyPdf = async () => {
        
                        //Deneme()
        
                        //const url = 'https://firebasestorage.googleapis.com/v0/b/fir-tutorial-ca834.appspot.com/o/files%2FSun%20Sep%2011%202022%2018%3A28%3A06%20GMT%2B0300%20(GMT%2B03%3A00)q3fYgEncTrttfPKYQKcL?alt=media&token=dc5d99de-2fce-45cd-9d83-97057d7fec09';
                     
                        const url = internships[0].internshipformUrl
                        const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
                        //const existingPdfBytes = await fetch(url, { mode: 'no-cors' }).then(res => res.arrayBuffer())
                        console.log(internships[0].internshipformUrl)
                        const pdfDoc = await PDFDocument.load(existingPdfBytes)
                        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
                        const font = await pdfDoc.embedFont('Arial');
                        const pages = pdfDoc.getPages()
                        const firstPage = pages[0]
                        const { width, height } = firstPage.getSize()
        
                        //const jpgUrl = 'https://pdf-lib.js.org/assets/cat_riding_unicorn.jpg'
                        //const jpgImageBytes = await fetch(jpgUrl).then((res) => res.arrayBuffer())
                        //const jpgImage = await pdfDoc.embedJpg(jpgImageBytes)
                        //const jpgDims = jpgImage.scale(0.5)
                       /*
                        firstPage.drawImage(qrcode, {
                            x:10, //firstPage.getWidth() / 2 - jpgDims.width / 2,
                            y: 20,//firstPage.getHeight() / 2 - jpgDims.height / 2 + 250,
                            width: 100,
                            height: 100,
                        })
        
        
                        var bugun = new Date();
                        var tarih = bugun.getFullYear() + '-' + (bugun.getMonth() + 1) + '-' + bugun.getDate()
        
                        var saat = bugun.getHours() + ":" + bugun.getMinutes() + ":" + bugun.getSeconds()
        
                        var tarihSaat = tarih + ' ' + saat
        
                        firstPage.drawText(tarihSaat, {
                            x: 310,
                            y: 98,
                            size: 13,
                            font: helveticaFont,
                            color: rgb(0, 0, 0),
                            //rotate: degrees(-45),
                        })
                        /*
                            const pdfBytes = await pdfDoc.save()
                            const pdfBase64 = btoa(String.fromCharCode(...new Uint8Array(pdfBytes)))
                            
                            const downloadLink = document.createElement('a')
                            downloadLink.href = `data:application/pdf;base64,${pdfBase64}`
                            downloadLink.download = 'example.pdf'
                            
                            downloadLink.click()
                        const pdfBytes = await pdfDoc.save();
        
                        const fileName = 'example.pdf';
                        const fileType = 'application/pdf';
        
                        const blob = new Blob([pdfBytes], { type: fileType });
        
                        const file = new File([blob], fileName, { type: fileType });
                        //console.log(file)
        
                        // Dosyayı indirin
                        const downloadLink = document.createElement('a');
                        downloadLink.href = window.URL.createObjectURL(file);
                        downloadLink.download = fileName;
                        downloadLink.click();
        
        
        
                        const uploadFiles = (file) => {
                            if (!file) return;
                            const storageRef = ref(storage, `/files/${internships[0].internshipformUrl + "yenilenmiş"}`)
                            const uploadTask = uploadBytesResumable(storageRef, file)
                            uploadTask.on("state_changed", (snapshot) => {
                               
        
        
                            }, (err) => console.log(err),
                                () => {
                                    //console.log(file)
        
                                    getDownloadURL(uploadTask.snapshot.ref).then((url) => updateDoc(stajDoc, { internshipformUrl: url }))
        
                                }
                            )
                        };
        
                        uploadFiles(file)
                    }
        
                }
        
                let app = new App()
                app.modifyPdf()
        
        */
    }
    const reddet = async () => {
        // internshipService.updateConfirm(idd, onaylandı).then(result => console.log(result.data.message))
        const stajDoc = doc(db, "internshipRequests", idd)
        if (window.confirm("Staj talebi'ni reddediyor musunuz?")) {
            await updateDoc(stajDoc, { confirm: reddedildi })
            alert("Staj talebi reddedildi")
        }
    }

    const delet = async () => {
        if (window.confirm("Staj talebi silinecek onaylıyor musunuz?")) {
            await deleteDoc(doc(db, "internshipRequests", idd))
            alert("Staj talebi silindi")
        }

    }

    const yazdır = async () => {
        /* if (window.confirm("Staj talebi silinecek onaylıyor musunuz?")) {
           await deleteDoc(doc(db, "internshipRequests", idd))
            alert("Staj talebi silindi")
         }*/
        const stajDoc = doc(db, "internshipRequests", idd)
        class App extends React.Component {

            modifyPdf = async () => {
                console.log(student[0])

                // const url = internships[0].internshipformUrl
                const url = "https://firebasestorage.googleapis.com/v0/b/fir-tutorial-ca834.appspot.com/o/files%2FBILGISAYAR_STAJ_BASVURU_FORMU%20(3).pdf?alt=media&token=be8560fa-edf2-45e8-a379-57ed8099e017"
                const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
                //const existingPdfBytes = await fetch(url, { mode: 'no-cors' }).then(res => res.arrayBuffer())
                console.log(internships[0].internshipformUrl)
                const pdfDoc = await PDFDocument.load(existingPdfBytes)
                const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

                const pages = pdfDoc.getPages()
                const firstPage = pages[0]
                const { width, height } = firstPage.getSize()



                var bugun = new Date();
                var tarih = bugun.getFullYear() + '-' + (bugun.getMonth() + 1) + '-' + bugun.getDate()

                var saat = bugun.getHours() + ":" + bugun.getMinutes() + ":" + bugun.getSeconds()

                var tarihSaat = tarih + ' ' + saat

                firstPage.drawText(tarihSaat, {
                    x: 310,
                    y: 98,
                    size: 12,
                    font: helveticaFont,
                    color: rgb(0, 0, 0),
                    //rotate: degrees(-45),
                })

                firstPage.drawText(student[0].name, {
                    x: 134,
                    y: 451,
                    size: 12,
                    font: helveticaFont,
                    color: rgb(0, 0, 0),
                    //rotate: degrees(-45),
                })
                firstPage.drawText(student[0].surname, {
                    x: 205,
                    y: 451,
                    size: 12,
                    font: helveticaFont,
                    color: rgb(0, 0, 0),
                    //rotate: degrees(-45),
                })

                firstPage.drawText(student[0].identificationNumber, {
                    x: 134,
                    y: 440,
                    size: 11,
                    font: helveticaFont,
                    color: rgb(0, 0, 0),
                    //rotate: degrees(-45),
                })
                firstPage.drawText(student[0].fatherName, {
                    x: 134,
                    y: 430,
                    size: 11,
                    font: helveticaFont,
                    color: rgb(0, 0, 0),
                    //rotate: degrees(-45),
                })
                firstPage.drawText(student[0].motherName, {
                    x: 134,
                    y: 417,
                    size: 11,
                    font: helveticaFont,
                    color: rgb(0, 0, 0),
                    //rotate: degrees(-45),
                })
                firstPage.drawText(student[0].placeofBirth, {
                    x: 134,
                    y: 402,
                    size: 11,
                    font: helveticaFont,
                    color: rgb(0, 0, 0),
                    //rotate: degrees(-45),
                })
                firstPage.drawText(student[0].dateofBirth, {
                    x: 134,
                    y: 387,
                    size: 11,
                    font: helveticaFont,
                    color: rgb(0, 0, 0),
                    //rotate: degrees(-45),
                })
                firstPage.drawText("Yeni Mahalle Semsi denizer caddesi No9 Kat:1 Zonguldak Çaycuma", {
                    x: 340,
                    y: 451,
                    size: 11,
                    font: helveticaFont,
                    color: rgb(0, 0, 0),
                    //rotate: degrees(-45),
                })
                firstPage.drawText("---", {
                    x: 340,
                    y: 417,
                    size: 11,
                    font: helveticaFont,
                    color: rgb(0, 0, 0),
                    //rotate: degrees(-45),
                })
                firstPage.drawText(student[0].phoneNumber, {
                    x: 340,
                    y: 402,
                    size: 11,
                    font: helveticaFont,
                    color: rgb(0, 0, 0),
                    //rotate: degrees(-45),
                })
                firstPage.drawText(student[0].email, {
                    x: 340,
                    y: 387,
                    size: 11,
                    font: helveticaFont,
                    color: rgb(0, 0, 0),
                    //rotate: degrees(-45),
                })
                firstPage.drawText(student[0].studentNo, {
                    x: 134,
                    y: 589,
                    size: 11,
                    font: helveticaFont,
                    color: rgb(0, 0, 0),
                    //rotate: degrees(-45),
                })
                firstPage.drawText(student[0].department, {
                    x: 134,
                    y: 569,
                    size: 11,
                    font: helveticaFont,
                    color: rgb(0, 0, 0),
                    //rotate: degrees(-45),
                })
                firstPage.drawText(internships[0].startDate, {
                    x: 134,
                    y: 487,
                    size: 11,
                    font: helveticaFont,
                    color: rgb(0, 0, 0),
                    //rotate: degrees(-45),
                })
                firstPage.drawText(internships[0].endDate, {
                    x: 356,
                    y: 487,
                    size: 11,
                    font: helveticaFont,
                    color: rgb(0, 0, 0),
                    //rotate: degrees(-45),
                })


                const pdfBytes = await pdfDoc.save();

                const fileName = 'example2.pdf';
                const fileType = 'application/pdf';

                const blob = new Blob([pdfBytes], { type: fileType });

                const file = new File([blob], fileName, { type: fileType });

                const downloadLink = document.createElement('a');
                downloadLink.href = window.URL.createObjectURL(file);
                downloadLink.download = fileName;
                downloadLink.click();



                const uploadFiles = (file) => {
                    console.log(file)
                    if (!file) return;
                    const storageRef = ref(storage, `/files/${"ecds" + "yenilenmiş"}`)
                    const uploadTask = uploadBytesResumable(storageRef, file)
                    uploadTask.on("state_changed", (snapshot) => {



                    }, (err) => console.log(err),
                        () => {
                            //console.log(file)

                            getDownloadURL(uploadTask.snapshot.ref).then((url) => updateDoc(stajDoc, { internshipformUrl: url }))

                        }
                    )
                };

                uploadFiles(file)
            }

        }

        let app = new App()
        app.modifyPdf()


    }
    return (
        <div style={{ marginTop: "50px" }}>

            <Header as="h3">
                <Icon name="list alternate outline" />
                <Header.Content>Öğrenci Bilgileri </Header.Content>

            </Header>
            <Table style={{ backgroundColor: "#f5f5dc" }} celled>
                <Table.Header>
                    <Table.Row>

                        <Table.HeaderCell style={{ backgroundColor: "#e0e094" }}> Adı</Table.HeaderCell>
                        <Table.HeaderCell style={{ backgroundColor: "#e0e094" }}>Soyadı</Table.HeaderCell>
                        <Table.HeaderCell style={{ backgroundColor: "#e0e094" }}>Öğrenci Numarası</Table.HeaderCell>
                        <Table.HeaderCell style={{ backgroundColor: "#e0e094" }}>E-posta</Table.HeaderCell>
                        <Table.HeaderCell style={{ backgroundColor: "#e0e094" }}>Bölüm</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>{
                    student.map((stu) => (
                        <Table.Row key={stu.id}>
                            <Table.Cell>{stu.name}</Table.Cell>
                            <Table.Cell >{stu.surname}</Table.Cell>
                            <Table.Cell >{stu.studentNo}</Table.Cell>
                            <Table.Cell >{stu.email}</Table.Cell>
                            <Table.Cell >{stu.department}</Table.Cell>
                        </Table.Row>
                    ))
                }
                </Table.Body>
            </Table >
            <Header as="h3">
                <Icon name="list alternate outline" />
                <Header.Content>Şirket Bilgileri </Header.Content>

            </Header>

            <Table style={{ backgroundColor: "#f5f5dc" }} celled>
                <Table.Header>
                    <Table.Row>

                        <Table.HeaderCell style={{ backgroundColor: "#e0e094" }}>Şirket Adı</Table.HeaderCell>
                        <Table.HeaderCell style={{ backgroundColor: "#e0e094" }}>Adresi</Table.HeaderCell>
                        <Table.HeaderCell style={{ backgroundColor: "#e0e094" }}>Protokol</Table.HeaderCell>
                        <Table.HeaderCell style={{ backgroundColor: "#e0e094" }}>Telefon Numarası</Table.HeaderCell>
                        <Table.HeaderCell style={{ backgroundColor: "#e0e094" }}>Onay Durumu</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>{
                    company.map((company) => (
                        <Table.Row key={company.id}>
                            <Table.Cell>{company.name}</Table.Cell>
                            <Table.Cell >{company.address}</Table.Cell>
                            <Table.Cell><a href={(company.protocolUrl)} target="_blank"><Icon size="small" circular name='file pdf' />Protokol</a></Table.Cell>
                            <Table.Cell >{company.phoneNumber}</Table.Cell>
                            <Table.Cell >{company.confirm}</Table.Cell>
                        </Table.Row>
                    ))
                }
                </Table.Body>
            </Table>
            <Header as="h3">
                <Icon name="list alternate outline" />
                <Header.Content>Staj Talebi Bilgileri</Header.Content>

            </Header>
            <Table style={{ backgroundColor: "#f5f5dc" }} celled>
                <Table.Header>
                    <Table.Row>

                        <Table.HeaderCell style={{ backgroundColor: "#e0e094" }}>Staj Dönemi</Table.HeaderCell>

                        <Table.HeaderCell style={{ backgroundColor: "#e0e094" }}>Onay Durumu</Table.HeaderCell>
                        <Table.HeaderCell style={{ backgroundColor: "#e0e094" }}>İsg Belgesi</Table.HeaderCell>
                        <Table.HeaderCell style={{ backgroundColor: "#e0e094" }}>Müstehaklık Belgesi</Table.HeaderCell>
                        <Table.HeaderCell style={{ backgroundColor: "#e0e094" }}>Başvuru Formu</Table.HeaderCell>

                    </Table.Row>
                </Table.Header>
                <Table.Body>{
                    internships.map((intern) => (
                        <Table.Row key={intern.id}>
                            <Table.Cell >{period}</Table.Cell>

                            <Table.Cell >{intern.confirm}</Table.Cell>
                            <Table.Cell><a href={(intern.isgUrl)} target="_blank"><Icon size="small" circular name='file pdf' />İsg Belgesi</a></Table.Cell>
                            <Table.Cell><a href={(intern.müstehaklıkUrl)} target="_blank"><Icon size="small" circular name='file pdf' />Müstehaklık Belgesi</a></Table.Cell>
                            <Table.Cell> <a href={(intern.internshipformUrl)} target="_blank"><Icon size="small" circular name='file pdf' />Başvuru formu</a></Table.Cell>

                        </Table.Row>
                    ))

                }
                </Table.Body>

            </Table>

            <Table style={{ backgroundColor: "#f5f5dc" }} celled>
                <Table.Header>
                    <Table.Row>

                        <Table.HeaderCell style={{ backgroundColor: "#e0e094" }}>Başlangıç Tarihi</Table.HeaderCell>
                        <Table.HeaderCell style={{ backgroundColor: "#e0e094" }}>Bitiş Tarihi</Table.HeaderCell>
                        <Table.HeaderCell style={{ backgroundColor: "#e0e094" }}> İş günü</Table.HeaderCell>

                    </Table.Row>
                </Table.Header>
                <Table.Body>{
                    internships.map((intern) => (
                        <Table.Row key={intern.id}>
                            <Table.Cell >{intern.startDate}</Table.Cell>
                            <Table.Cell >{intern.endDate}</Table.Cell>
                            <Table.Cell>{intern.workDay}</Table.Cell>

                        </Table.Row>
                    ))

                }
                </Table.Body>

            </Table>

            <Button onClick={reddet} color='red' align="center">Reddet</Button>
            <Button onClick={Onayla} color='green'>Onayla</Button>
            <Button onClick={delet} color='purple'>Sil</Button>



        </div >

    )
}
//<Button onClick={Tıkla(intern.isgUrl)}>tıkla</Button>
