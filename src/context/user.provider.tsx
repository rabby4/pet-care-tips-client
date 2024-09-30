import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react"
import { TUser } from "../types"
import { getCurrentUser } from "../services/authServices"

interface IUserProviderValue {
	user: TUser | null
	setUser: (user: TUser | null) => void
	isLoading: boolean
	setIsLoading: Dispatch<SetStateAction<boolean>>
}

const UserContext = createContext<IUserProviderValue | undefined>(undefined)

const UserProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<TUser | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	const handleUser = async () => {
		const user = await getCurrentUser()

		setUser(user)
		setIsLoading(false)
	}

	useEffect(() => {
		handleUser()
	}, [isLoading])

	return (
		<UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
			{children}
		</UserContext.Provider>
	)
}

export const useUser = () => {
	const context = useContext(UserContext)

	if (context === undefined) {
		throw new Error("useUser must be used within the UserProvider context")
	}

	return context
}

export default UserProvider
