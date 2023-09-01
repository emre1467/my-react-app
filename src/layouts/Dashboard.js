import React from 'react';
import StudentList from '../pages/StudentList';
//import { Grid } from 'semantic-ui-react'
import { Routes, Route } from 'react-router-dom';
import InternshipRequestList from '../pages/InternshipRequestList';
import AddStudent from '../pages/AddStudent';
import Login from '../pages/Login';
import MyPage from '../pages/MyPage';
import MyInternshiprequest from '../pages/MyInternshiprequest';
import AddInternshipRequest from '../pages/AddInternshipRequest';
import MyInternshipRequestDetail from '../pages/MyInternshipRequestDetail';
import File from '../pages/File';
import AdminLogin from '../pages/AdminLogin';
import { Grid, GridColumn } from 'semantic-ui-react';
import FileUploadd from '../pages/FileUploadd';
import FirebaseFile from '../pages/FirebaseFile';
import AddCompany from '../pages/AddCompany';
import Companies from '../pages/Companies';
import AdminPage from '../pages/AdminPage';
import ApprovedConfirmCompanies from '../pages/CompaniesList';
import RejectedConfirm from '../pages/RejectedConfirm';
import UncertainConfirmCompanies from '../pages/UncertainConfirmCompanies';
import CompanyDetail from '../pages/CompanyDetail';
import ApprovedInternshipRequest from '../pages/ApprovedInternshipRequest';
import UncertainInternshipRequest from '../pages/UncertainInternshipRequest';
import RejectedInternshipRequest from '../pages/InternshipRequestList';
import InternshipRequestDetail from '../pages/InternshipRequestDetail';
import Profil from '../pages/Profil';
import FirebaseDeneme from '../pages/FirebaseDeneme';
import AddStudent2 from '../pages/AddStudent2';
import CompaniesList from '../pages/CompaniesList';
import Image from '../pages/Image';

import Navi from './Navi';
import Karekod from '../pages/Karekod';
import pdfff from '../pages/pdfff';
import gptpdf from "../pages/gptpdf"
import SecretaryLogin from '../pages/SecretaryLogin';
import SecretaryPage from '../pages/SecretaryPage';
import SecretaryInternshipList from '../pages/SecretaryInternshipList';
import SecretaryInternshipDetail from '../pages/SecretaryInternshipDetail';
import SecretaryCompanies from '../pages/SecretaryCompanies';
import SecretaryCompanyDetail from '../pages/SecretaryCompanyDetail';
import Sol from './Sol';
import Sag from './Sag';

export default function Dashboard() {
    return (

        <div >

            <Routes>

                <Route path="/" element={<Login />} />
                <Route path="/adminLogin" element={<AdminLogin />} />
                <Route path="/secretaryLogin" element={<SecretaryLogin />} />
                <Route path="/addstudent" element={<AddStudent />} />

            </Routes>



            <Grid  >
                <Grid.Row>
                    <Grid.Column width={3}>

                        <Sol/>
                    </Grid.Column>
                    <Grid.Column width={12} >
                        <Sag />
                    </Grid.Column>

                </Grid.Row>
            </Grid>


        </div>
    )
}
