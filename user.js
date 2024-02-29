const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User,Course,}=require("../db")

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username=req.body.username
    const password=req.body.password

    User.create({
        username,
        password
    })
    res.json({
        msg:"new user added"
    })

});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    const allcourses= await Course.find({

    })
    res.json({
        allcourses
    })

});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    
    const courseId= req.params.courseId
    const username= req.headers.username                // ** header (X) => headers(correct)

    await User.updateOne({
        username:username
    },
        {
            "$push":
            {
            purchasedCourse:courseId
            }
    })
    
    res.json({
        msg:"course is purchased! congratulation"
    })

});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic

    const user = await User.findOne({         // doesn't show duplicate courses
        username: req.headers.username
    });

    console.log(user.purchasedCourse);
    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourse
        }
    });

    res.json({
        courses: courses
    })
});

module.exports = router