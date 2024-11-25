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
}

export default SupervisorService;