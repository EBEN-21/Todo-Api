const Joi = require('joi');
const express = require('express');
const route = express.Router();

const list =[
    {
        id: 1,
        Todo: "Clean my room",
        Time: "8am-8:30am"
    },
]

route.get("/", (req, res) => {
    res.send(list);
})

route.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const item = list.find((item) => item.id === id);

    if (item){
        res.status(200).send({
            message: "item found",
            data: item,
            date: new Date().toLocaleTimeString(),
        })
    }else{
        res.status(404).send({
            message: "item not found"
        })
    }
});



route.post("/", (req, res) => {
    
    
    const result = validateRequest(req.body);

    if (result.error) {
        return res.status(400).send({
            message: result.error.details[0].message,
        });
    }
    


    const {Todo, Time} = req.body;
    const newItem = {
        id: list.length + 1,
        Todo,
        Time,
    };

    list.push(newItem);
    res.status(201).json(newItem);

    res.status(201).send({
            message: "item added successfully",
            data: newItem,
            date: new Date().toLocaleTimeString(),
        });

        function validateRequest(body) {
            const schema = Joi.object({
                Todo: Joi.string().min(1).required(),
                Time: Joi.string().min(1).required(),
            });
        
            return schema.validate(body);
        }
});

//put request
route.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const {Todo, Time} = req.body;

    const item = list.find((item) => item.id === id);

    if (item){
        item.Todo = Todo;
        item.Time = Time;

        res.status(200).send({
            message: "item updated successfully",
            data: item,
            date: new Date().toLocaleTimeString(),
        })
    }else{
        res.status(404).send({
            message: "item not found"
        })
    }
});

route.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = list.findIndex((item) => item.id === id);

    if (list.length === 0) {
        return res.status(404).send({
            message: "The list is empty.",
            date: new Date().toLocaleTimeString(),
        });
    }

    if(index === -1){
        return res.status(404).send({
            message: "item not found",
        });
    }
    const item = list.find((item) => item.id === id);

    list.splice(list.indexOf(item), 1);
    res.status(200).send({
        message: "item deleted successfully",
        data: item,
        date: new Date().toLocaleTimeString(),
    })
})

module.exports = route;