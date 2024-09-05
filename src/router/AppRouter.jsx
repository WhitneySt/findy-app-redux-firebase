import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Feed from "../pages/Feed/Feed";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import PostDetails from "../pages/PostDetails/PostDetails";
import Profile from "../pages/Profile/Profile";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Feed />} />
          <Route path="post/:postId" element={<PostDetails />} />
          <Route path="profile/:userId" element={<Profile />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Navigate to={'/' } /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
