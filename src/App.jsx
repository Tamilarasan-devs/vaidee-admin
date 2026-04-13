import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import SideBar from './component/pages/SideFolder'
import './App.css'
import AdminPanel from './component/pages/CourseUpload'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SideBar />
    </>
  );
}

export default App
