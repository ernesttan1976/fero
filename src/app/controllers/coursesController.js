const Course = require("../models/Course");
const coursesSeed = require("../database-seed/courses-seed");
const User = require("../models/User");



const index = async (req, res) => {
  try {
    //http://127.0.0.1/courses?_end=10&_start=0
    const { _start, _end, idArray } = req.query;
    if (idArray) {
      Course.find({ _id: { $in: idArray } })
        .populate('image')  
        .populate('instructor_id')
        .populate('students_id')
        .populate('lessons_id')
        .populate('discussions_id')
        .then(foundCourses => {
          res.status(200).json(foundCourses);
        })
        .catch(error => {
          res.status(400).json({ error: error.message });
        })
    }

    function convert(_start, _end) {
      const start = parseInt(_start, 10);
      const end = parseInt(_end, 10);

      const page2 = start + 1; // the page number you want to fetch
      const limit = end - start; // the number of documents per page
      const page = start;

      return { page, limit }
    }

    if (_start || _end) {
      
      const total = await Course.countDocuments({});

      const { page, limit } = convert(_start, _end);
      Course.find({}).skip(page).limit(limit)
        .populate('image') 
        .populate('instructor_id')
        .populate('students_id')
        .populate('lessons_id')
        .populate('discussions_id')
        .then(foundCourses => {
          
          res.set('x-total-count', total); //set the header to indicate x-total-count
          const startIndex = (page - 1) * limit;
          const endIndex = page * limit;
          const previousPage = page > 1 ? page - 1 : null; // Set previous page number or null if on first page
          const nextPage = endIndex < total ? page + 1 : null; // Set next page number or null if on last page
          if (previousPage !== null) {
            res.set('previousPage', previousPage);
          }
          if (nextPage !== null) {
            res.set('nextPage', nextPage);
          }

          console.log("total, previousPage, nextPage", total, previousPage, nextPage)
          res.status(200).json(foundCourses);
        })   
        .catch(error => {
          res.status(400).json({ error: error.message });
        })
    } else {
      const foundCourses = await Course.find({})
        .populate('image') 
        .populate('instructor_id')
        .populate('students_id')
        .populate('lessons_id')
        .populate('discussions_id')

      res.status(200).json(foundCourses);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const createdCourse = await Course.create(req.body);
    res.status(201).json(createdCourse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const seed = async (req, res) => {
  try {
    await Course.deleteMany({});

    const courses = await Course.create(coursesSeed);

    //for the courses assign assign instructors
    const courseData = await Course.find({});
    const instructorsData = await User.find({ role: "Instructor" });
    const studentsData = await User.find({ role: "Student" });
    let instructorIndex = 0;
    let studentsIndex = 0;
    for (let i = 0; i < courseData.length; i++) {
      //add instructor to course
      await Course.updateOne({ _id: courseData[i]._id }, { $set: { instructor_id: instructorsData[instructorIndex]._id } });
      await User.updateOne({ _id: instructorsData[instructorIndex]._id }, { $push: { courses_id: courseData[i]._id } });
      instructorIndex++;
      if (instructorIndex === instructorsData.length) instructorIndex = 0;

      //add students to course
      let studentIdArray = [];
      for (let j = studentsIndex; j < 25; j++) {
        studentIdArray.push(studentsData[j]._id);
      }
      await Course.updateOne({ _id: courseData[i]._id }, { $push: { students_id: { $each: studentIdArray } } });
      //add course to each student
      for (let j = studentsIndex; j < 25; j++) {
        await User.updateOne({ _id: studentsData[j]._id }, { $push: { courses_id: courseData[i]._id } })
      }

      studentsIndex += 10;
    }

    const finalCourses = await Course.find({});
    const finalUsers = await User.find({});
    //console.log({ finalCourses, finalUsers });
    res.status(200).json({ finalCourses, finalUsers });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedCourse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const show = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
    .populate('image') 
    .populate('instructor_id')
    .populate('students_id')
    .populate('lessons_id')
    .populate('discussions_id')
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const showNoCache = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
    .populate('image') 
    .populate('instructor_id')
    .populate('students_id')
    .populate('lessons_id')
    .populate('discussions_id')
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const update = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updatePatch = async (req, res) => {
  try {
    if (req.body.lessons_id && !req.body.title){
      //editing the lessons
      console.log("editing lessons")
      const updatedCourse = await Course.findById(req.params.id)
      const updatedLessons = [...updatedCourse.lessons_id];
      req.body.lessons_id.forEach(
        (lesson, index)=>{
          if (lesson===null){
            //nothing skip
          } else {
            updatedLessons[index]={...lesson}
          }
        }
      )
      updatedCourse.lessons_id = [...updatedLessons];
      const updatedCourse2 = await Course.findByIdAndUpdate(req.params.id, updatedCourse)
      res.status(200).json(updatedCourse2);
    } else if (req.body.lessons_id && req.body.title){
      //editing the course only
      console.log("editing course")
      delete req.body.lessons_id
      const updatedCourse = await Course.findById(req.params.id)      
      updatedCourse.title = req.body.title || updatedCourse.title;
      updatedCourse.description = req.body.description || updatedCourse.description;
      updatedCourse.startDate = req.body.startDate || updatedCourse.startDate;
      updatedCourse.endDate = req.body.endDate || updatedCourse.endDate;
      updatedCourse.image = [...req.body.image] || [...updatedCourse.image];
      updatedCourse.instructor_id = req.body.instructor_id || updatedCourse.instructor_id;
      
      const updatedCourse2 = await Course.findByIdAndUpdate(req.params.id, updatedCourse)
      console.log("req.body",req.body)
      console.log("updatedCourse",updatedCourse)
      console.log("updatedCourse2",updatedCourse2)

      res.status(200).json(updatedCourse2);

    } else  {
      const updatedCourse = await Course.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedCourse);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
  create,
  seed,
  index,
  delete: deleteCourse,
  show,
  showNoCache,
  update,
  updatePatch,
};