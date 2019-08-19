const express = require  ('express');
const router = express.Router();

const Task = require('../models/task');

/* Version de como se hacia antes las llamdas asincronas
router.get('/',(req,res)=>{
    Task.find(function (err,tasks){
        console.log(tasks);
        res.json({
            status: 'API WORKS!'
        });
    });    
});
*/

/*Version moderna de llamada asincrona*/
router.get('/', async(req,res) => {
    const tasks = await Task.find();
    console.log(tasks);
    res.json(tasks);
});

router.get('/:id', async(req,res) => {
    const tasks = await Task.findById(req.params.id);
    res.json(tasks);
});


router.post('/', async(req,res) => {
    //console.log(req.body);
    const {title, description,picture} = req.body;
    const task = new Task({title,description,picture});
    await task.save();
    //console.log(task);
    //res.json('received');
    res.json({status: 'Task Saved'});
});

router.put('/:id', async(req,res) => {
    const {title,description,picture} = req.body;
    const newTask = {title,description,picture};
    await Task.findByIdAndUpdate(req.params.id,newTask);
    //console.log(req.params.id);
    //res.json('received');
    res.json({status: 'Task Updated'});
});

router.delete('/:id', async(req,res) => {
    await Task.findByIdAndRemove(req.params.id);
    res.json({status: 'Task Deleted'});
});

module.exports = router;