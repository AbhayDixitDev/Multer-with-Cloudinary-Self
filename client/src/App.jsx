import axios from 'axios'
import { useState } from 'react'

const App=()=>{
  const [img, setImg] = useState(null)
  const handleUpload = async () => {
    const apiUrl = 'http://localhost:3000/upload'
    const file = document.querySelector('input[type=file]').files[0]
    const data = new FormData()
    data.append('file', file)
    const res = await axios.post(apiUrl, data)
    const result = await res.data.url
    console.log(result)
    setImg(result)
  }
  return(

  
    <>
        <div>
          <input type="file" />   <button onClick={handleUpload}>Upload File</button>
          <img src={img} alt="" width={200} />

        </div>
    </>
  )
}

export default App