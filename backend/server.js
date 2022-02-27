const app = require("./app");

const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

//uncaught exception handling
process.on("uncaughtException",(error) => {
    console.log(`Error: ${error.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);

    server.close(()=>{
        process.exit(1);
    })
})

// Setting config variable
dotenv.config({path: "backend/config/config.env"});

// Connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
})


// unhandled promise rejection
process.on("unhandledRejection", error => {
    console.log(`Error: ${error.message}`);
    console.log(`Shutting down the server due to unhandled Promise rejection`);

    server.close(()=>{
        process.exit(1);
    })
})