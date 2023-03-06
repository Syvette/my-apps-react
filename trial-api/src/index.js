// trial API main file
const express =require("express");
const app =express();
const port = 6000;

//CRUD - get=read, post==create, put|patch==update, delete==delete
// .get(), .post(), .put(), .delete(), .patch(),
app.get("/",(req, res)=> {
    res.send (`Hello World! Current port is ${port}`)
});  

// app.post(arg1, arg2);
// app.post("/hello")
// app.post ("____",functioname);
// app.post("/hello",()=> {});
app.post("/hello",(req, res)=>{
    console.log(`/hello endpoint was hit. Sending a response...`);
    res.send(`Hello hello, my friend`);
    console.log(`Response sent...`);
});

app.listen(port, () => {
    console.log(`Trial-API listening on port ${port} was started successfully.`);
});