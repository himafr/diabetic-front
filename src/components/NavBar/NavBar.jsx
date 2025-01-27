import { NavLink } from 'react-router-dom'
import styles from './NavBar.module.css'
function NavBar() {
    return (
        <div className='max-w-screen-2xl mx-auto px-4 '>
            <nav className='w-full py-6'>
                <ul className='flex flex-row gap-10'>
                    <li>
                        <NavLink className={"py-6 mr-7 font-bold"}  to="/">😁 home</NavLink>
                    </li>
                    <li>
                    <NavLink className={"py-6 text-gray-300 "} to="/about">About</NavLink>
                    </li>
                    <li>
                    <NavLink className={"py-6 text-gray-300"} to="/medicine">Medicines</NavLink>
                    </li>

                </ul>
            </nav>
        </div>
    )
}

export default NavBar
