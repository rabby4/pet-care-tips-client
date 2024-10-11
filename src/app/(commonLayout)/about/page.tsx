import Container from "@/src/components/ui/Container"
import TeamSocial from "@/src/components/ui/TeamSocial"
import { Button } from "@nextui-org/button"
import { Mail, MapPin, PhoneCall } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
	return (
		<>
			<div className="bg-about-us bg-bottom h-64 flex justify-center items-center">
				<h1 className="text-5xl font-orbitron font-bold text-default-100">
					About Us
				</h1>
			</div>
			<Container>
				<div>
					<div className="grid lg:grid-cols-2 grid-cols-1 justify-between items-center gap-20 my-28">
						<div>
							<Image
								alt="Card background"
								className="w-full h-full object-cover"
								height={0}
								sizes="100vw"
								src="	https://cdn.pixabay.com/photo/2017/06/02/17/47/friendship-2366955_960_720.jpg"
								width={0}
							/>
						</div>
						<div className="space-y-5">
							<h2 className="text-4xl font-semibold font-orbitron tracking-wider">
								Create an account and find new friends
							</h2>
							<p>
								At Cirkle, we believe in the power of communities and
								collaboration. Our mission is to build a platform where
								individuals, organizations, and communities can come together to
								design, develop, and share their innovative social building
								projects.
							</p>

							<Button className="uppercase rounded-md" color="primary">
								Discover Now
							</Button>
						</div>
					</div>
					<div className="grid md:grid-cols-3 grid-cols-1 mt-20 justify-between border border-gray-200 md:py-5 p-10 rounded-md">
						<div className="flex gap-4 mt-5 md:justify-center">
							<MapPin className="text-primary" size={30} />
							<div className="-mt-1">
								<h3 className="text-lg font-bold font-orbitron">Address:</h3>
								<p className="italic font-inter">Mirpur, Dhaka, Bangladesh</p>
							</div>
						</div>
						<div className="flex gap-4 mt-5 md:justify-center">
							<PhoneCall className="text-primary" size={30} />
							<div className="-mt-1">
								<h3 className="text-lg font-bold font-orbitron">Phone:</h3>
								<p className="italic font-inter">+880123456789</p>
							</div>
						</div>
						<div className="flex gap-4 mt-5 md:justify-center">
							<Mail className="text-primary" size={30} />
							<div className="-mt-1">
								<h3 className="text-lg font-bold font-orbitron">Email:</h3>
								<p className="italic font-inter">help@gmail.com</p>
							</div>
						</div>
					</div>
				</div>
				{/* Our mission */}
				<div className="my-28">
					<div className="grid lg:grid-cols-2 justify-between items-center lg:gap-20 gap-5 py-20 ">
						<div className="space-y-5 lg:order-1 order-2">
							<h2 className="text-4xl font-semibold font-orbitron tracking-wider">
								Our Mission at Cirkle
							</h2>
							<p className="font-inter">
								Our mission is to create a digital space where communities can
								come together to build projects that positively impact society.
								We aim to provide a platform that encourages collaboration,
								innovation, and action, allowing individuals and groups to
								design and develop sustainable social building projects that
								improve the world around them. Whether it&apos;s creating urban
								spaces, fostering environmental sustainability, or advancing
								digital tools for social good, our platform is here to connect
								and empower changemakers.
							</p>
						</div>
						<div className="order-1">
							<img
								alt=""
								src="https://cdn.pixabay.com/photo/2023/10/25/07/02/lecturer-8339699_1280.jpg"
							/>
						</div>
					</div>
				</div>
				{/* Our vision */}
				<div className="my-28">
					<div className="grid lg:grid-cols-2 justify-between items-center lg:gap-20 gap-5 py-20 ">
						<div className="space-y-5 order-2">
							<h2 className="text-4xl font-semibold font-orbitron tracking-wider">
								Our Vision at Cirkle
							</h2>
							<p className="font-inter">
								We envision a world where collaboration and shared creativity
								are the foundations of social progress. Our platform aspires to
								be a hub for those who want to make a difference in their
								communities by building together—virtually or physically. We aim
								to bridge the gap between great ideas and actionable change,
								fostering a global network of social builders who are passionate
								about improving urban spaces, societal structures, and digital
								solutions for the common good. In the long run, we want to drive
								collective action toward a more inclusive, sustainable, and
								connected world.
							</p>
						</div>
						<div className="order-1">
							<img
								alt=""
								src="https://cdn.pixabay.com/photo/2024/06/22/20/12/robot-8846964_960_720.jpg"
							/>
						</div>
					</div>
				</div>
				{/* Our team */}
				<div className="container my-28">
					<div className="">
						<div className="md:w-2/4 mx-auto text-center space-y-3">
							<h1 className="text-4xl font-orbitron font-bold">
								Our Team Members
							</h1>
							<p className="italic font-inter">
								We are a group of passionate innovators, designers, and social
								impact advocates committed to using technology as a tool for
								good.
							</p>
						</div>
						<div className="grid md:grid-cols-4 grid-cols-2 lg:gap-7 gap-3 mt-10">
							<div className="flex gap-4 mt-5 justify-center flex-col text-center">
								<div className="member-img relative cursor-pointer">
									<img
										alt=""
										src="https://cdn.pixabay.com/photo/2017/05/31/06/49/model-2359322_1280.jpg"
									/>
									<TeamSocial />
								</div>
								<div className="-mt-1 text-left">
									<p className="italic font-inter text-accent-foreground">
										CEO
									</p>
									<h3 className="lg:text-2xl md:text-lg text-base lg:font-bold font-medium font-orbitron">
										Frank Gordon
									</h3>
								</div>
							</div>
							<div className="flex gap-4 mt-5 justify-center flex-col text-center">
								<div className="member-img relative cursor-pointer">
									<img
										alt=""
										src="https://cdn.pixabay.com/photo/2019/08/11/11/28/man-4398724_960_720.jpg"
									/>
									<TeamSocial />
								</div>
								<div className="-mt-1 text-left">
									<p className="italic font-inter text-accent-foreground">
										Project Manager
									</p>
									<h3 className="lg:text-2xl md:text-lg text-base lg:font-bold font-medium font-orbitron">
										Pepper Harlton
									</h3>
								</div>
							</div>
							<div className="flex gap-4 mt-5 justify-center flex-col text-center">
								<div className="member-img relative cursor-pointer">
									<img
										alt=""
										src="	https://cdn.pixabay.com/photo/2019/12/16/14/46/black-man-4699506_960_720.jpg"
									/>
									<TeamSocial />
								</div>
								<div className="-mt-1 text-left">
									<p className="italic font-inter text-accent-foreground">
										Developer
									</p>
									<h3 className="lg:text-2xl md:text-lg text-base lg:font-bold font-medium font-orbitron">
										Daniel Lond
									</h3>
								</div>
							</div>
							<div className="flex gap-4 mt-5 justify-center flex-col text-center">
								<div className="member-img relative cursor-pointer">
									<img
										alt=""
										src="https://cdn.pixabay.com/photo/2021/12/23/16/47/people-6889599_1280.jpg"
									/>
									<TeamSocial />
								</div>
								<div className="-mt-1 text-left">
									<p className="italic font-inter text-accent-foreground">
										SEO Expert
									</p>
									<h3 className="lg:text-2xl md:text-lg text-base lg:font-bold font-medium font-orbitron">
										Victoria Jordan
									</h3>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="my-28">
					<div className="grid lg:grid-cols-2 justify-between items-center lg:gap-20 gap-5 py-20 ">
						<div className="space-y-5 lg:order-1 order-2">
							<h2 className="text-4xl font-semibold font-orbitron tracking-wider">
								What We Stand For
							</h2>
							<p className="font-inter">
								<strong>Collaboration: </strong>
								We believe that by working together, we can build stronger and
								more impactful projects. Our platform is designed to encourage
								users to pool their knowledge, skills, and resources to bring
								ideas to life.
							</p>
							<p className="font-inter">
								<strong>Inclusivity: </strong>
								Social building is for everyone. We are committed to creating a
								platform that welcomes people of all backgrounds and
								perspectives, ensuring that everyone’s voice can be heard and
								every idea has the potential to grow.
							</p>
							<p className="font-inter">
								<strong>Innovation: </strong>
								We are constantly looking for new and better ways to support our
								users in their projects. Whether through technological
								advancements or new project methodologies, we are dedicated to
								staying on the cutting edge of social building.
							</p>
							<p className="font-inter">
								<strong>Sustainability: </strong>
								Every project we support is focused on long-term impact, both
								for communities and the environment. We encourage users to
								create projects that prioritize sustainability, ensuring that
								the benefits of their work can be enjoyed for generations to
								come.
							</p>
						</div>
						<div className="order-1">
							<img
								alt=""
								src="	https://cdn.pixabay.com/photo/2017/01/14/10/56/people-1979261_960_720.jpg"
							/>
						</div>
					</div>
				</div>
			</Container>
		</>
	)
}
