import axios from 'axios';

export const axiosInstance = axios.create({});

export const apiConnector = async (method,url,bodyData,headers,params) => {
    try{
        const response = await axiosInstance({
            method: `${method}`,
            url: `${url}`,
            data: bodyData  ? bodyData : null,
            headers: headers ? headers : null,
            params: params ? params : null,
        })
        return response;
    }catch(error){
         // Handle errors
         if (error.response) {
            // Server responded with a status other than 200 range
            console.error('Response error:', error.response.status, error.response.data);
        } else if (error.request) {
            // Request was made but no response was received
            console.error('Request error:', error.request);
        } else {
            // Something happened in setting up the request
            console.error('Setup error:', error.message);
        }
        throw error; // Re-throw the error so it can be caught where the function is called
    }
    
}