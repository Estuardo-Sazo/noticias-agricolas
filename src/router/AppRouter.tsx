import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import LoginPage from '../modules/auth/pages/login'
import Profile from '../modules/users/pages/profile'
import FeedPage from '../modules/posts/pages/feedPage'
import NewPostPage from '../modules/posts/pages/newPost'
import MyPostsPage from '../modules/posts/pages/myPost'
import PostDetail from '../modules/posts/pages/postDetail'
import WeatherPage from '../modules/weathers/pages/weatherPage'
import MainLayout from '../layouts/MainLayout'

export default function AppRouter() {
  function ProtectedLayout() {
    /* const { user } = useAuth()
    if (!user) return <Navigate to="/login" /> */
    return (
      <MainLayout>
        <Outlet />
      </MainLayout>
    )
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<ProtectedLayout />}>
          <Route index element={<FeedPage />} />
          <Route path="posts" element={<MyPostsPage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="weather" element={<WeatherPage />} />
          <Route path="posts/new" element={<NewPostPage />} />
          <Route path="posts/:id" element={<PostDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
