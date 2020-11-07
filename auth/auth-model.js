const db = require("../database/dbConfig");

 async function add (user) {
    const [id] = await db("users").insert(user);
    // console.log("Made it to end of add");
    return findById(id)
}

 function findById(id) {
    //  console.log("Made it to find by id");
    return  db("users").select("id", "username").where({id}).first();
    
}

 function findBy(filter) {
    return  db("users").select("id", "username", "password").where(filter);
}

module.exports = {add, findBy};