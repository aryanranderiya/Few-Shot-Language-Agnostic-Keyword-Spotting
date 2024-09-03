import './App.css'
import FileUploaderComponent from "./components/FileUploader"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

export default function App() {
  return (
    <>
      <Navbar />
      <Footer />
      <main className='text-foreground min-w-screen w-screen min-h-screen flex justify-center items-center flex-col gap-6 p-[1em]'>
        <div className='flex flex-col gap-1 items-center'>
          <span className='font-bold sm:text-[1.6rem] text-[1.4rem] text-center'>
            Few Shot Language Agnostic Key Word Spotting system for audio files.
          </span>
          <span className='text-center'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente, autem.</span>
        </div>
        <div className='max-w-[400px]'>
          <FileUploaderComponent />
        </div>
      </main >
    </>
  )
}