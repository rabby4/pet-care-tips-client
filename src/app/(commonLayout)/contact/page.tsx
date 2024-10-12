import Container from "@/src/components/ui/Container"
import GoogleMap from "@/src/components/ui/GoogleMap"
import { Button } from "@nextui-org/button"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Input, Textarea } from "@nextui-org/input"
import React from "react"

const ContactPage = () => {
	return (
		<div>
			<div className="bg-about-us bg-bottom h-64 flex justify-center items-center">
				<h1 className="text-5xl font-orbitron font-bold text-default-100">
					Our Bikes
				</h1>
			</div>
			<div>
				<GoogleMap />
			</div>
			<div className="bg-contact bg-cover bg-no-repeat bg-center relative">
				<div className=" bg-black absolute bg-opacity-50 inset-0 z-10" />
				<div className=" py-36 z-20 relative">
					<Container>
						<div className="grid lg:grid-cols-2 grid-cols-1 gap-20 mt-10 lg:px-0 md:px-10 px-5">
							<div className="space-y-10 order-2">
								<div>
									<div className="space-y-3 md:px-0 px-5 text-white">
										<h1 className="text-4xl font-orbitron font-bold">
											Get in touch with our cycling community
										</h1>
										<p className="italic font-inter">
											Our collection of gear and apparel, developed and tested
											by some of the top teams and athletes in pro racing,
											continues to expand. Our industry-leading E-bikes are
											redefining what’s possible for cyclists of all abilities.
										</p>
									</div>
								</div>
							</div>

							<div className="space-y-10 order-1">
								<Card className="rounded-md p-5">
									<CardHeader>
										<div>
											<h2 className="text-2xl font-orbitron font-medium">
												Contact Us for Any Questions
											</h2>
										</div>
									</CardHeader>
									<CardBody>
										<form className="space-y-5 font-inter">
											<div className="flex gap-5">
												<div className="grid w-full max-w-sm items-center gap-1.5">
													{/* <Label
													htmlFor="firsName"
													className="font-normal text-lg"
												>
													First Name
												</Label> */}
													<Input
														id="firsName"
														label="First Name"
														type="text"
														variant="underlined"
													/>
												</div>
												<div className="grid w-full max-w-sm items-center gap-1.5">
													{/* <Label
													htmlFor="lastName"
													className="font-normal text-lg"
												>
													Last Name
												</Label> */}
													<Input
														id="lastName"
														label="Last Name"
														type="text"
														variant="underlined"
													/>
												</div>
											</div>
											<div className="flex gap-5">
												<div className="grid w-full max-w-sm items-center gap-1.5">
													{/* <Label htmlFor="phone" className="font-normal text-lg">
													Phone Number
												</Label> */}
													<Input
														id="phone"
														label="Phone Number"
														type="phone"
														variant="underlined"
													/>
												</div>
												<div className="grid w-full max-w-sm items-center gap-1.5">
													{/* <Label htmlFor="email" className="font-normal text-lg">
													Email
												</Label> */}
													<Input
														id="email"
														label="Email"
														type="email"
														variant="underlined"
													/>
												</div>
											</div>
											<div className="grid w-full gap-1.5">
												{/* <Label htmlFor="message" className="font-normal text-lg">
												Your message
											</Label> */}
												<Textarea
													id="message"
													label="What's on your mind"
													variant="underlined"
												/>
											</div>
											<div>
												<Button className="rounded-md" color="primary">
													Send Message
												</Button>
											</div>
										</form>
									</CardBody>
								</Card>
							</div>
						</div>
					</Container>
				</div>
			</div>
		</div>
	)
}

export default ContactPage
