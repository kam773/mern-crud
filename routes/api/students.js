const express = require('express');
const router = express.Router();
const multer = require('multer')
const cloudinary = require('cloudinary');

// Students model
const Student = require('../../models/Student');

// // MULTER
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//         console.log(file)
//         cb(null, file.originalname)
//     }
// })

// router.post('/uploads', (req, res, next) => {
//     const upload = multer({ storage }).single('file')
//     upload(req, res, function (err) {
//         if (err) {
//             return res.send(err)
//         }
//         console.log('file uploaded to server')
//         console.log(req.file)

//         // SEND FILE TO CLOUDINARY
//         const cloudinary = require('cloudinary').v2
//         cloudinary.config({
//             cloud_name: 'dpwtsrjko',
//             api_key: '',
//             api_secret: ''
//         })

//         const path = req.file.path
//         const uniqueFilename = new Date().toISOString()

//         cloudinary.uploader.upload(path, { public_id: `students/${uniqueFilename}`, tags: `students` }, function (err, image) {
//             if (err) return res.send(err)
//             console.log('file uploaded to Cloudinary')
//             // remove file from server
//             const fs = require('fs')
//             fs.unlinkSync(path)
//             // return image details
//             res.json(image)
//             // const newStudent = Student({
//             //     firstName: req.body.firstName,
//             //     lastName: req.body.lastName,
//             //     dob: req.body.dob,
//             //     hobby: req.body.hobby,
//             //     imageUrl: image.url
//             // })
//             // newStudent.save().then(student => res.json(student))
//         })
//     })
// })

router.get('/uploads', (req, res) => {

    const timestamp = Math.round(new Date().getTime() / 1000);

    const api_secret = process.env.API_SECRET;

    const signature = cloudinary.utils.api_sign_request({ timestamp: timestamp }, api_secret);
    //Define our payload that will have the api key
    const payload = {
        timestamp,
        signature
    }
    //Then send our payload to our front-end
    res.status(200).json({ payload });
});



// @route   GET api/students
// @desc    GET all students
// @access  Public
router.get('/', (req, res) => {
    Student.find()
        .sort({ date: -1 })
        .then(students => res.json(students))
})

// @route   POST api/students
// @desc    POST a student
// @access  Public
router.post('/', (req, res) => {
    const newStudent = Student({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dob: req.body.dob,
        hobby: req.body.hobby,
        imageUrl: req.body.imageUrl
    })
    newStudent.save().then(student => res.json(student))
})

// Defined edit route
router.get('/:id', (req, res) => {
    let id = req.params.id;
    Student.findById(id, function (err, student) {
        res.json(student);
    });
})

// @route   PUT api/students
// @desc    UPDATE a student
// // @access  Public
router.put('/:id', (req, res) => {
    let updatedStudent = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dob: req.body.dob,
        hobby: req.body.hobby
    }
    Student.findOneAndUpdate({ _id: req.params.id }, updatedStudent, { runValidators: true, context: 'query' })
        .then(oldStudent => {
            Student.findById({ _id: req.params.id })
                .then(newStudent => {
                    res.json(newStudent)
                })
        })
});


// @route   DELETE api/students
// @desc    DELETE a student
// @access  Public
router.delete('/:id', (req, res) => {
    Student.findById(req.params.id)
        .then(student => student.remove(student).then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }))
})


module.exports = router;