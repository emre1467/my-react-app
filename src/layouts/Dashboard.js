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

export default function Dashboard() {
    return (
        
        <div >
            <Routes>

            <Route exact path="/" element={<Login />} />
            <Route exact path="/adminLogin" element={<AdminLogin />} />
            <Route exact path="/secretaryLogin" element={<SecretaryLogin />} />
            <Route exact path="/addstudent" element={<AddStudent />} />


            </Routes>

            
            <Grid  >
                <Grid.Row>
                    <Grid.Column width={3}>
                    <Routes>


                            <Route exact path="/students" element={<StudentList />}/>
                            <Route path="/myPage/:id"element={<MyPage />}/>
                            <Route path="/adminPage/:id" element={<AdminPage />}/>
                            <Route path="/secretaryPage/:id" element={<SecretaryPage />}/>

                            <Route path="/internshiprequest" element={<InternshipRequestList />} />


                            </Routes>


                    </Grid.Column>
                    <Grid.Column width={11}>
                    <Routes>

                        <Route exact path="/myPage/:id/MyInternshipRequest" element={<MyInternshiprequest />} />
                        <Route path="/myPage/:id/MyInternshipRequestAdd"element={<AddInternshipRequest />}/>
                        <Route path="/myPage/:id/AddCompany" element={<AddCompany />} />
                        <Route path="/myPage/:id/Companies" element={<Companies />} />
                        <Route path="/myPage/:id/Profil" element={<Profil />}/>


                        <Route exact path="/adminPage/:id/Companies" element={<Companies />}/>
                        <Route path="/adminPage/:id/AddCompany" element={<AddCompany />}/>
                        <Route exact path="/adminPage/:id/ApprovedConfirmCompanies" element={<ApprovedConfirmCompanies />}/>
                        <Route exact path="/adminPage/:id/RejectedConfirmCompanies" element={<RejectedConfirm />}/>
                        <Route exact path="/adminPage/:id/UncertainConfirmCompanies" element={<UncertainConfirmCompanies />}/>
                        <Route exact path="/adminPage/:id/CompaniesList"element={<CompaniesList />} />

                        <Route exact path="/adminPage/:id/ApprovedInternshipRequest" element={<ApprovedInternshipRequest />}/>
                        <Route exact path="/adminPage/:id/RejectedInternshipRequest" element={<RejectedInternshipRequest />} />
                        <Route exact path="/adminPage/:id/UncertainInternshipRequest" element={<UncertainInternshipRequest />} />
                        <Route exact path="/adminPage/:id/InternshipRequests" element={<InternshipRequestList />}/>

                        <Route exact path="/secretaryPage/:id/InternshipRequests" element={<SecretaryInternshipList />}/>
                        <Route exact path="/secretaryPage/:id/InternshipRequests/:idd" element={<SecretaryInternshipDetail />}/>
                        <Route exact path="/secretaryPage/:id/CompaniesList" element={<SecretaryCompanies />}/>
                        <Route exact path="/secretaryPage/:id/CompaniesList/:idd" element={<SecretaryCompanyDetail />}/>

                        <Route exact path="/myPage/:id/MyInternshipRequest/:idd" element={<MyInternshipRequestDetail />} />
                        <Route exact path="/adminPage/:id/ApprovedConfirmCompanies/:idd"element={<CompanyDetail />} />
                        <Route exact path="/adminPage/:id/RejectedConfirmCompanies/:idd" element={<CompanyDetail />}/>
                        <Route exact path="/adminPage/:id/UncertainConfirmCompanies/:idd" element={<CompanyDetail />}/>
                        <Route exact path="/adminPage/:id/CompaniesList/:idd" element={<CompanyDetail />} />


                        <Route exact path="/adminPage/:id/ApprovedInternshipRequest/:idd" element={<InternshipRequestDetail />} />
                        <Route exact path="/adminPage/:id/RejectedInternshipRequest/:idd" element={<InternshipRequestDetail />} />
                        <Route exact path="/adminPage/:id/UncertainInternshipRequest/:idd" element={<InternshipRequestDetail />} />
                        <Route exact path="/adminPage/:id/InternshipRequests/:idd" element={<InternshipRequestDetail />}/>

                        </Routes>

                    </Grid.Column>
              
                </Grid.Row>
            </Grid>

        </div>
    )
}
