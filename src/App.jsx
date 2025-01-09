import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Header from '@/components/Header';
import Home from '@/pages/Home';
import Archive from '@/pages/Archive';
import About from '@/pages/About';
import Wildcard from '@/pages/Wildcard';
import Residency from './pages/Residency';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route index element={<About />} /> 
      <Route path="archive" element={<Archive />} />
      <Route path="info" element={<About />} />
      <Route path="wildcard" element={<Wildcard />} />
      <Route path="future" element={<Residency />} />
      <Route path="shift" element={<Home />} />
    </Route>
  )
)

function App({routes}) {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
