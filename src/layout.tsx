import { Link, Outlet } from "react-router-dom"

export const Layout = () => {
return <div>
<nav>
    <Link to = "/">Home</Link>

</nav>
<div>
    <Outlet/>
</div> 
</div>
}