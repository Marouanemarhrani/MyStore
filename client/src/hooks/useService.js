import { useState, useEffect } from "react";
import axios from "axios";

export default function useService() {
    const [services, setServices] = useState([]);

    //getcat
    const getServices = async () => {
        try {
            const {data} = await axios.get(
                `${process.env.REACT_APP_API}/api/services/services`
            );
            setServices(data?.service);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getServices();
    }, []);
    return services;
};