import { useState, useEffect } from "react";

const useCharaters = url => {
    const [ charaters, setCharaters ] = useState([]);
    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => setCharaters(data.results))
    }, [url]);
    return charaters;
};

export default useCharaters;