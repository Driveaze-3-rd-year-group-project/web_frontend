import axios from "axios";



class CustomerComplaintService{
    static BASE_URL = 'http://localhost:8082';

    
    static async sendComplaintData(complaintData,token){
        try{

            const response = await axios.post(`${CustomerComplaintService.BASE_URL}/customer-complaint/save`, complaintData,
                {headers: {Authorization: `Bearer ${token}`}}
            );
            return response.data;
            
        }catch(err){
            throw err;
        }
    }


}

export default CustomerComplaintService;