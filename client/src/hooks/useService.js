import { useState, useEffect } from "react";
import axios from "axios";

export default function useService() {
    const [services, setServices] = useState([]);

    //getservices
    const getServices = async () => {
        try {
            const {data} = await axios.get(
                `${process.env.REACT_APP_API}/api/services/services`
            );
            setServices(data?.services);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getServices();
    }, []);
    return services;
};