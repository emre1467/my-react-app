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

export default function Sol() {
    return (
        <div>
            <Routes>
            <Route path="/myPage/:id/" element={<MyPage />} />
            <Route path="/myPage/:id/profil" element={<MyPage />} />

            <Route path="/adminPage/:id" element={<AdminPage />} />
            <Route path="/secretaryPage/:id" element={<SecretaryPage />} />

            <Route path="/internshiprequest" element={<InternshipRequestList />} />


            <Route exact path="/myPage/:id/MyInternshipRequest" element={<MyPage />} />
                <Route exact path="/myPage/:id/MyInternshipRequestAdd" element={<MyPage />} />
                <Route exact path="/myPage/:id/AddCompany" element={<MyPage />} />
                <Route exact path="/myPage/:id/Companies" element={<MyPage />} />
                <Route exact path="/myPage/:id/Profil" element={<MyPage />} />


                <Route exact path="/adminPage/:id/Companies" element={<AdminPage />} />
                <Route exact path="/adminPage/:id/AddCompany" element={<AdminPage />} />
                <Route exact path="/adminPage/:id/ApprovedConfirmCompanies" element={<AdminPage />} />
                <Route exact path="/adminPage/:id/RejectedConfirmCompanies" element={<AdminPage />} />
                <Route exact path="/adminPage/:id/UncertainConfirmCompanies" element={<AdminPage />} />
                <Route exact path="/adminPage/:id/CompaniesList" element={<AdminPage />} />

                <Route exact path="/adminPage/:id/ApprovedInternshipRequest" element={<AdminPage />} />
                <Route exact path="/adminPage/:id/RejectedInternshipRequest" element={<AdminPage />} />
                <Route exact path="/adminPage/:id/UncertainInternshipRequest" element={<AdminPage />} />
                <Route exact path="/adminPage/:id/InternshipRequests" element={<AdminPage />} />

                <Route exact path="/secretaryPage/:id/InternshipRequests" element={<SecretaryPage />} />
                <Route exact path="/secretaryPage/:id/InternshipRequests/:idd" element={<SecretaryPage />} />
                <Route exact path="/secretaryPage/:id/CompaniesList" element={<SecretaryPage />} />
                <Route exact path="/secretaryPage/:id/CompaniesList/:idd" element={<SecretaryPage />} />

                <Route exact path="/myPage/:id/MyInternshipRequest/:idd" element={<MyPage />} />
                <Route exact path="/adminPage/:id/ApprovedConfirmCompanies/:idd" element={<AdminPage />} />
                <Route exact path="/adminPage/:id/RejectedConfirmCompanies/:idd" element={<AdminPage />} />
                <Route exact path="/adminPage/:id/UncertainConfirmCompanies/:idd" element={<AdminPage />} />
                <Route exact path="/adminPage/:id/CompaniesList/:idd" element={<AdminPage />} />

                <Route exact path="/adminPage/:id/Profil" element={<AdminPage />} />
                <Route exact path="/secretaryPage/:id/Profil" element={<SecretaryPage />} />


                <Route exact path="/adminPage/:id/ApprovedInternshipRequest/:idd" element={<AdminPage />} />
                <Route exact path="/adminPage/:id/RejectedInternshipRequest/:idd" element={<AdminPage />} />
                <Route exact path="/adminPage/:id/UncertainInternshipRequest/:idd" element={<AdminPage />} />
                <Route exact path="/adminPage/:id/InternshipRequests/:idd" element={<AdminPage />} />


            </Routes>
            
        </div>
    )
}
