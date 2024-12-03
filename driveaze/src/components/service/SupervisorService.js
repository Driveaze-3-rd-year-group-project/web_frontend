import axios from 'axios';

class SupervisorService {
    static BASE_URL = 'http://localhost:8082';

    static async getJobs(token){
        try{
            const response = await axios.get(`${SupervisorService.BASE_URL}/job-registry/get-jobs`, {
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
        // console.log(payload.inventoryItemList);
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

    static async updateEntry(jobEntryId, payload, token){
        try{
            const response = await axios.put(`${SupervisorService.BASE_URL}/job-entry/update/${jobEntryId}`,payload, {
                headers: {Authorization: `Bearer ${token}`}
            });
            // console.log(response);
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async getAllJobsEntriesWithPagination(jobId, offset, token){
        try{
            const response = await axios.get(`${SupervisorService.BASE_URL}/job-entry/paginationAndSort/${jobId}/${offset}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            // console.log(response);
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async completeJob(jobId, payload, token){
        try{
            const response = await axios.put(`${SupervisorService.BASE_URL}/job-registry/update/${jobId}`,payload, {
                headers: {Authorization: `Bearer ${token}`}
            });
            // console.log(response);
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async getSupervisorStatistic(token){
        try{
            const response = await axios.get(`${SupervisorService.BASE_URL}/dashboard/sup-statistic`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            console.log(response);
            return response.data;
            
        }catch(err){
            throw err;
        }
    }
    
}

export default SupervisorService;