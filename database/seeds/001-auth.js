const bycrpt = require("bcryptjs");



exports.seed = async function(knex) {
	await knex("users").truncate()
	await knex("users").insert([
		{ username: "User1", password:  await bycrpt.hashSync("password", 8) },
		{ username: "User2", password: await bycrpt.hashSync("password", 8) },
		{ username: "User3", password: await bycrpt.hashSync("password", 8) },
		{ username: "User4", password: await bycrpt.hashSync("password", 8) },
	])
}
