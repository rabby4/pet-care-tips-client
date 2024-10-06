"use client"
import { Tab, Tabs } from "@nextui-org/tabs"
import {
	LayoutList,
	PenBox,
	User,
	UserRoundMinus,
	UserRoundPlus,
} from "lucide-react"
import Feed from "./Feed"
import EditProfile from "./EditProfile"
import About from "./About"

const ProfileTabs = () => {
	return (
		<div className="flex w-full flex-col">
			<Tabs aria-label="Options" color="primary" variant="underlined">
				<Tab
					key="feeds"
					title={
						<div className="flex items-center space-x-2">
							<LayoutList size={18} />
							<span>Feeds</span>
						</div>
					}
				>
					<Feed />
				</Tab>
				<Tab
					key="about"
					title={
						<div className="flex items-center space-x-2">
							<User size={18} />
							<span>About</span>
						</div>
					}
				>
					<About />
				</Tab>
				<Tab
					key="edit"
					title={
						<div className="flex items-center space-x-2">
							<PenBox size={18} />
							<span>Edit Profile</span>
						</div>
					}
				>
					<EditProfile />
				</Tab>
				<Tab
					key="follower"
					title={
						<div className="flex items-center space-x-2">
							<UserRoundPlus size={18} />
							<span>Followers</span>
						</div>
					}
				>
					<EditProfile />
				</Tab>
				<Tab
					key="following"
					title={
						<div className="flex items-center space-x-2">
							<UserRoundMinus size={18} />
							<span>Following</span>
						</div>
					}
				>
					<EditProfile />
				</Tab>
			</Tabs>
		</div>
	)
}

export default ProfileTabs
