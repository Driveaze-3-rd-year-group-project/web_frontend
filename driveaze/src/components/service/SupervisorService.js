import axios from 'axios';

class SupervisorService {
    static BASE_URL = 'http://localhost:8082';

    static async getAllJobs(token){
        try{
            const response = await axios.get(`${SupervisorService.BASE_URL}/job-registry/get-all-jobs`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            // console.log(response);
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async getAllEntiesOfJobs(jobId,token){
        try{
            const response = await axios.get(`${SupervisorService.BASE_URL}/job-entry/get-all-entries-of-job/${jobId}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            // console.log(response);
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async getAllStaff(token){
        try{
            const response = await axios.get(`${SupervisorService.BASE_URL}/job-entry/get-technicians`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            // console.log(response);
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async getAllInventry(token){
        try{
            const response = await axios.get(`${SupervisorService.BASE_URL}/inventory/getAll`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            // console.log(response);
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async addEntry(payload,token){
        try{
            const response = await axios.post(`${SupervisorService.BASE_URL}/job-entry/save`,payload, {
                headers: {Authorization: `Bearer ${token}`}
            });
            // console.log(response);
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async deleteEntry(jobEntryId,token){
        try{
            const response = await axios.delete(`${SupervisorService.BASE_URL}/job-entry/delete/${jobEntryId}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            // console.log(response);
            return response.data;
            
        }catch(err){
            throw err;
        }
    }
    
}

export default SupervisorService;