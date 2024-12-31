const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const dotenv = require('dotenv')
dotenv.config()
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/images/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({storage: storage})

app.post('/upload', upload.single('file'), (req, res) => {
    cloudinary.uploader.upload(req.file.path, {folder: 'images'})
        .then(result => {
            res.send({url: result.secure_url})
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({message: 'Error uploading image'})
        })
})

app.listen(3000, () => {
    console.log('server listening on port 3000!')
})

