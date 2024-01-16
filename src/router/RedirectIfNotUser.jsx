import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"


export default function RedirectIfNotUser() {

    const { authUser } = useContext(AuthContext)

    if (authUser?.role === 'USER') {
        
    }

    return (
        <div>RedirectIfNotUser</div>
    )
}
