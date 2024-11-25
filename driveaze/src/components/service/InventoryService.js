import axios from 'axios';

class InventoryService{
    static BASE_URL = 'http://localhost:8082';

    static async getAllItems(token){
        try{
            const response = await axios.get(`${InventoryService.BASE_URL}/inventory/getAll`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            // console.log(response);
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async addItem(currentDetail,token){
        try{
            // console.log(currentDetail);
            const response = await axios.post(`${InventoryService.BASE_URL}/inventory/add`, currentDetail,{
                headers: {Authorization: `Bearer ${token}`}
            });
            console.log(response);
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async updateItem(currentDetail,token){
        try{
            // console.log(currentDetail);
            const response = await axios.put(`${InventoryService.BASE_URL}/inventory/update`, currentDetail,{
                headers: {Authorization: `Bearer ${token}`}
            });
            console.log(response);
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async deleteItem(ItemId, token){
        try{
            console.log(ItemId);
            const response = await axios.delete(`${InventoryService.BASE_URL}/inventory/delete/${ItemId}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async refillItem(itemId, quantity, token) {
        try {
            const response = await axios.post(`${InventoryService.BASE_URL}/inventory/refill`, null, {
                params: {
                    itemId,
                    quantity
                },
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }
}

export default InventoryService;