const express = require("express")

const NotesModel  = require("../models/Notes.model")

const notesController = express.Router();


notesController.post("/create", async (req, res) => {
    const {taskname, status,tag,userId} = req.body;
    const new_note = new NotesModel({
        taskname,
        status,
        tag,
        userId
    })
    console.log(new_note,"nn")
    await new_note.save()
    res.send({"message": "note created", new_note}) 
})

notesController.get("/read", async (req, res) => {
    console.log(req.query,"dd");
    const userId= req.headers.userid
   const notes = await NotesModel.find({userId})
   res.send(notes)
 
})


notesController.patch("/:noteId/edit", async (req, res) => {
   const {noteId} = req.params;
   const {userId} = req.body;
   console.log(noteId,userId)
   const note = await NotesModel.findOne({_id: noteId})
   if(note.userId === userId){
       const new_note =  await NotesModel.findOneAndUpdate({_id: noteId}, req.body, {new: true})
       return res.send({"message": "sucessfully updated", new_note})
   }
   else{
    res.send("you are not authorize to do it")
   }
    
})


notesController.delete("/:noteId/delete", async (req, res) => {
    const {noteId} = req.params;
    const {userId} = req.body;
    const note = await NotesModel.findOne({_id: noteId})
    if(note.userId === userId){
         await NotesModel.findOneAndDelete({_id: noteId})
        return res.send({"message": "sucessfully deleted"})
    }
    else{
     res.send("you are not authorize to do it")
    }
     
 })


module.exports = notesController