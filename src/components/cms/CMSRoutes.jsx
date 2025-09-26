import { Route, Routes } from 'react-router-dom'
import BlogManagement from '../../pages/cms/BlogManagement'
import CreateBlog from '../../pages/cms/CreateBlog'
import Dashboard from '../../pages/cms/Dashboard'
import EditBlog from '../../pages/cms/EditBlog'
import Login from '../../pages/cms/Login'
import AuthGuard from '../auth/AuthGuard'
import SecurityWrapper from '../security/SecurityWrapper'

const CMSRoutes = () => {
  return (
    <SecurityWrapper>
      <Routes>
        {/* Login route - accessible without authentication but with security checks */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected CMS routes */}
        <Route 
          path="/" 
          element={
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          } 
        />
        
        {/* Blog management routes */}
        <Route 
          path="/blogs" 
          element={
            <AuthGuard>
              <BlogManagement />
            </AuthGuard>
          } 
        />
        
        <Route 
          path="/blogs/create" 
          element={
            <AuthGuard>
              <CreateBlog />
            </AuthGuard>
          } 
        />
        
        <Route 
          path="/blogs/edit/:id" 
          element={
            <AuthGuard>
              <EditBlog />
            </AuthGuard>
          } 
        />
        
        <Route 
          path="/dashboard" 
          element={
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          } 
        />
        
        {/* Catch-all for any unmatched CMS routes - redirect to dashboard */}
        <Route 
          path="/*" 
          element={
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          } 
        />
      </Routes>
    </SecurityWrapper>
  )
}

export default CMSRoutes