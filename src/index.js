const express = require("express");
const {serverConfig} = require("./config/index.js");
const apiRoutes = require("./routes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.use("/api",apiRoutes);

app.listen(serverConfig.PORT, async()=>{
    console.log(`Server Running on port:${serverConfig.PORT}`);
    // const {City,Airport} = require("./models");
    // const nd = await City.findByPk(4);
    // const ndAirport = await nd.createAirport({name:"Ankith Airport",code:"BLR"});
    // console.log(ndAirport);
});