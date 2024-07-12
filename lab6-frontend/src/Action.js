import { useEffect } from 'react';
import axios from 'axios';

/**
 * Functional component for fetching actions from a server at intervals.
 *
 * @param {Object} props - Props object containing setActions function.
 */
function Action({ setActions }) {
    useEffect(() => {
        /**
         * Function to fetch actions from the server asynchronously.
         */
        const fetchActions = async () => {
            try {
                const result = await axios.get('http://localhost:8080/clicks');
                setActions(result.data);
            } catch (error) {
                console.error('Error fetching actions:', error);
            }
        };

        /**
         * Sets up interval to fetch actions every 1000 milliseconds (1 second).
         */
        const interval = setInterval(fetchActions, 1000);

        /**
         * Cleans up interval when component unmounts or dependencies change.
         */
        return () => clearInterval(interval);
    }, [setActions]);

    return null;
}

export default Action;