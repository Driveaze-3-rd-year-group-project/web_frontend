import axios from 'axios';

class DashboardService {
    static BASE_URL = 'http://localhost:8082';

    static async getManagerStatistic(token){
        try{
            const response = await axios.get(`${DashboardService.BASE_URL}/dashboard/man-statistic`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            console.log(response);
            return response.data;
            
        }catch(err){
            throw err;
        }
    }
    
    static async getReceptionistStatistic(token){
        try{
            const response = await axios.get(`${DashboardService.BASE_URL}/dashboard/recp-statistic`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            console.log(response);
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async getCustomerStatistics(id,contact,token){
        try{
            const response = await axios.get(`${DashboardService.BASE_URL}/dashboard/cus-statistic/${id}/${contact}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            console.log(response);
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

}

export default DashboardService;