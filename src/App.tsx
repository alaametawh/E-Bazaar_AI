import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'

import Home from './pages/Home'
import About from './pages/About'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar/Navbar'
import Login from './pages/login'
import Dashboard from './pages/dashboard'
import ProtectingRoute from './components/ProtectingRoute'

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar />
        <Toaster
          position="top-center"
          gutter={10}
          containerStyle={{ top: 70 }}
          toastOptions={{
            success: {
              duration: 3000,
              style: {
                background: "#16a34a",
                color: "#fff",
              },
            },
            error: {
              duration: 5000,
              style: {
                background: "#dc2626",
                color: "#fff",
              },
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              borderRadius: "8px",
            },
          }}
        />
        <div className="p-4 bg-bg min-h-[calc(100vh-64px)] w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectingRoute><Dashboard /></ProtectingRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
