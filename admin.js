const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin,Course}=require("../db")

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username= req.body.username
    const password =req.body.password
            Admin.findOne({
                username:username,
                password:password
            })
            .then(function(answer){ //.then hold the function till promise fullfilled then returned to value
               
                if (answer) {    // if value is 1 or more means username pass exist db then forward to route
                  res.status(401).json({
                    msg:"Admin already created"
                  })
                }
                else{
                    res.json({
                        msg:"Admin created successfully"
                      })
                    
                    }
                })
})
      
            


router.post('/courses', adminMiddleware, async(req, res) => {
    // Implement course creation logic
    const title= req.body.title
    const description= req.body.description
    const price= req.body.price
    const imageLink= req.body.imageLink
    

    const courseid= await Course.create({
        title,           // title, or title=title works same
        description,
        price,
        imageLink
    })
    res.json({
        msg:`new course is created with course_Id${ courseid._id}`
    })




});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    const allcourses = await Course.find({

    })
    res.json({
        allcourses
    })
});

module.exports = router;