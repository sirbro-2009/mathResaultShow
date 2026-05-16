const express = require("express")
const studentList = require("./studentsList.json")
const fs = require("fs")
const { resourceLimits } = require("worker_threads")

const app = express()
app.use(express.static("./front-end"))
app.use(express.json())
app.post("/signIn",(req,res)=>{
    let {name,password} = req.body
    if(name === "9ayed" && password === "9ayed2027"){return res.json({state:true,token:"123456789"})}
    else{res.json({state:false})}
})
app.post("/addStudent",(req,res)=>{
    let {name,gender,theClass,note,mark} = req.body
    let token = Date.now()
    try{
    studentList.push({...req.body,token:token,note:null,mark:null})
    fs.writeFileSync('./studentsList.json',JSON.stringify(studentList))
    res.json({
        state:true,
        name:name,
        token:token,
    })
    }
    catch{
        res.json({state:false})
    }
})
app.get("/studentList",(req,res)=>{
let {name,token,password} = req.query
if(token){

studentList.forEach(e=>{
if(`${e.token}` === token){
return res.json([e])
}

})
}
if(name && password){
try{
let array = []
let reqEx = new RegExp(name)
studentList.forEach((e)=>{
if((e.name.match(reqEx) && e.password === password)||(e.password === password)){
array.push(e)
}
})
if(array.length>0){return res.json(array)}
else if(array.length===0){return res.json({state:false})}
}
catch{
return res.json({state:false})
}
}
if(name && !password ){
try{
let array = []
let reqEx = new RegExp(name)
studentList.forEach((e)=>{
if(e.name.match(reqEx)){
array.push(e)
}
})
return res.json(array)
}
catch{
return res.json({state:false})
}
}
})
app.delete("/deletStudent",(req,res)=>{
let {name} = req.query
    try{
    studentList.forEach(e,i=>{
    if(e.name === name){
    studentList.splice(i,1)
    fs.writeFileSync('./studentsList.json',JSON.stringify(studentList))
    return res.json({
        state:true,
        name:name
    })
    }
    })
    }
    catch{
        res.json({state:false})
    }
})
app.put("/setNote",(req,res)=>{
let {note,mark,token} = req.body
try{
studentList.forEach((e)=>{
if(e.token === token){
e.note = note
e.mark = mark
}
})
fs.writeFileSync("./studentsList.json",JSON.stringify(studentList))
return res.json({state:true})
}
catch(e){
console.log(e)
return res.json({state:false})
}
})

app.listen(3000,()=>{
    console.log("app working in port 3000")
})