"use client"
import { getCurrentUser } from "@/src/services/authServices"
import React from "react"

const About = async () => {
	const user = await getCurrentUser()
	console.log(user)

	return <div>this is about route</div>
}

export default About
