const express = require('express');
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');


// Route for all The Notes using : "/api/notes/fetchAllNotes". Login required
router.get('/fetchAllNotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        // res.json();    
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});




// Route for all The Notes using : "/api/notes/addNotes". Login required
router.post('/addNotes', fetchuser,
    [body('title', 'Enter Valid Title!').isLength({ min: 3 }),
    body('description', 'Description Must be atleast 5 characters').isLength({ min: 5 }),
    ], async (req, res) => {
        const { title, description, tag } = req.body;
        //If there are error return bad request with error!!
        const errors = validationResult(req);
        try {
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Notes({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save();

            res.json(note);

        } catch (error) {
            console.log(error.message);
            res.status(500).send("Server Error");
        }
    });

// ROUTE UPDATE EXISTING NOTE : PUT "/api/auth/updateNote".Login Required
router.put('/updateNote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        //Creat a newNote Object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };


        //Finding the note and Update
        let note = await Notes.findById(req.params.id);
        if (!note) { res.status(404).send("Not Found") };

        //Allow Updation only if user owns the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id,{$set : newNote},{new : true})
        res.json({ note });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
})

// ROUTE DELETE EXISTING NOTE : DELETE "/api/auth/deleteNote".Login Required
router.delete('/deleteNote/:id', fetchuser, async (req, res) => {
    try {
        //Finding the note and Delete
        let note = await Notes.findById(req.params.id);
        if (!note) { res.status(404).send("Not Found") };
        //Allow Deletion only if user owns the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note Has Been Deleted!!", note: note });


    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
})
module.exports = router;