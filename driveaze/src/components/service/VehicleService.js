import axios from 'axios';

class VehicleService{
    static BASE_URL = 'http://localhost:8082';

    static async saveCustomerVehicle(vehicleData, token){
        try{
            const response = await axios.post(`${VehicleService.BASE_URL}/customer-vehicle/save`, vehicleData, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }
}

export default VehicleService;