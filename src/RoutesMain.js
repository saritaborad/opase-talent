import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Requests from './pages/Requests';
import UploadVideo from './pages/UploadVideo';
import UploadedVideos from './pages/Uploadedvideos';
import ChangePassword from './pages/ChangePassword';
import EditServiceDetails from './pages/EditServiceDetails';
import OpaseCash from './pages/OpaseCash';
import Review from './pages/Review';
import SocialMediaAccount from './pages/SocialMediaAccount';
import RequestDetails from './pages/RequestDetails';
import ProfileVideo from './pages/ProfileVideo';
import Chat from './pages/Chat';
import Login from './pages/common/Login';
import EditProfile from './pages/EditProfile';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';

export default function RoutesMain() {
  function RequireAuth({ children, redirectTo }) {
    let isAuthenticated = localStorage.getItem('opata_token');
    return isAuthenticated !== null &&
      isAuthenticated !== undefined &&
      isAuthenticated !== '' ? (
      children
    ) : (
      <Navigate to={redirectTo} />
    );
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            strict
            element={
              <RequireAuth redirectTo="/login">
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route path="/login" exact element={<Login />} />
          <Route
            path="/dashboard"
            strict
            element={
              <RequireAuth redirectTo="/login">
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/requests"
            strict
            element={
              <RequireAuth redirectTo="/login">
                <Requests />
              </RequireAuth>
            }
          />
          <Route
            path="/changepassword"
            strict
            element={
              <RequireAuth redirectTo="/login">
                <ChangePassword />
              </RequireAuth>
            }
          />
          <Route
            path="/uploadvideo"
            strict
            element={
              <RequireAuth redirectTo="/login">
                <UploadVideo />
              </RequireAuth>
            }
          />
          <Route
            path="/uploadedvideos"
            strict
            element={
              <RequireAuth redirectTo="/login">
                <UploadedVideos />
              </RequireAuth>
            }
          />
          <Route
            path="/review"
            strict
            element={
              <RequireAuth redirectTo="/login">
                <Review />
              </RequireAuth>
            }
          />
          <Route
            path="/chat"
            strict
            element={
              <RequireAuth redirectTo="/login">
                <Chat />
              </RequireAuth>
            }
          />
          <Route
            path="/profilevideo"
            strict
            element={
              <RequireAuth redirectTo="/login">
                <ProfileVideo />
              </RequireAuth>
            }
          />
          <Route
            path="/socialmediaaccount"
            strict
            element={
              <RequireAuth redirectTo="/login">
                <SocialMediaAccount />
              </RequireAuth>
            }
          />
          <Route
            path="/editservicedetails"
            strict
            element={
              <RequireAuth redirectTo="/login">
                <EditServiceDetails />
              </RequireAuth>
            }
          />
          <Route
            path="/opasecash"
            strict
            element={
              <RequireAuth redirectTo="/login">
                <OpaseCash />
              </RequireAuth>
            }
          />
          <Route
            path="/requestdetails"
            strict
            element={
              <RequireAuth redirectTo="/login">
                <RequestDetails />
              </RequireAuth>
            }
          />
          <Route
            path="/edit-profile"
            strict
            element={
              <RequireAuth redirectTo="/login">
                <EditProfile />
              </RequireAuth>
            }
          />
          <Route path="/privacypolicy" exact element={<PrivacyPolicy />} />
          <Route path="/termsconditions" exact element={<TermsConditions />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
