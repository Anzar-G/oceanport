import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/common/ProtectedRoute';
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import NotFound from '@/pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-navy-base text-white">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;