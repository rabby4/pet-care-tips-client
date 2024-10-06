"use client"
import { getCurrentUser } from "@/src/services/authServices"
import React from "react"

const About = async () => {
	const user = await getCurrentUser()

	return <>this is about route</>
}

export default About
