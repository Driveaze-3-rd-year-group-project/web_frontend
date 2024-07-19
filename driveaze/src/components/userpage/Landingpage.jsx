import { useEffect, useState } from 'react'
import UserService from '../service/UserService';

const Landingpage = () => {
    // const [state, setState] = useState(false);
    // const isAuthenticated = UserService.isAuthenticated();


    // // Replace javascript:void(0) paths with your paths
    // const navigation = [
    //     { title: "Features", path: "#" },
    //     { title: "Integrations", path: "#" },
    //     { title: "Customers", path: "#" },
    //     { title: "Pricing", path: "#" }
    // ]

    // useEffect(() => {
    //     document.onclick = (e) => {
    //         const target = e.target;
    //         if (!target.closest(".menu-btn")) setState(false);
    //     };
    // }, [])

    // if (location.pathname !== '/') {
    //     return null;
    // }
    return (
        <h1>Landing</h1>
    )
}

export default Landingpage