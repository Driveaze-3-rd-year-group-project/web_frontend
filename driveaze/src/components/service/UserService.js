import axios from 'axios';

class UserService{
    static BASE_URL = 'http://localhost:8082';

    static async login(email, password){
        try{

            const response = await axios.post(`${UserService.BASE_URL}/auth/login`, {
                email,
                password
            });
            return response.data;

        }catch(err){
            throw err;
        }
    }

    static async customerRegister(userData){
        try{

            const response = await axios.post(`${UserService.BASE_URL}/auth/customer-register`, userData);
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async employeeRegister(userData, token){
        try{

            const response = await axios.post(`${UserService.BASE_URL}/auth/employee-register`, userData, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    /***USERS */
    static async getAllEmployees(token){
        try{

            const response = await axios.get(`${UserService.BASE_URL}/superuser/get-all-employees`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async getAllStaff(token){
        try{

            const response = await axios.get(`${UserService.BASE_URL}/superuser/get-all-staff`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async getAllCustomers(token){
        try{

            const response = await axios.get(`${UserService.BASE_URL}/superuser/get-all-customers`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    
    static async getYourProfile(token){
        try{

            const response = await axios.get(`${UserService.BASE_URL}/anyuser/get-profile`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async getUserById(userId, token){
        try{

            const response = await axios.get(`${UserService.BASE_URL}/superuser/get-user/${userId}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async deleteUser(userId, token){
        try{

            const response = await axios.delete(`${UserService.BASE_URL}/superuser/delete/${userId}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async updateUser(userId, userData, token){
        try{

            const response = await axios.put(`${UserService.BASE_URL}/superuser/update/${userId}`, userData,
            {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async searchSupervisors(query, token) {
        try {
            const response = await axios.get(`${UserService.BASE_URL}/superuser/search-supervisors`, {
                params: { query },
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    /***JOB */
    static async createJob(jobData, token){
        try{

            const response = await axios.post(`${UserService.BASE_URL}/job-registry/create`, jobData, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async updateJob(jobId, jobData, token){
        try{

            const response = await axios.put(`${UserService.BASE_URL}/job-registry/update/${jobId}`, jobData, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async deleteJob(jobId, token){
        try{

            const response = await axios.delete(`${UserService.BASE_URL}/job-registry/delete/${jobId}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async getJobById(jobId, token){
        try{

            const response = await axios.get(`${UserService.BASE_URL}/job-registry/get-job/${jobId}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async getAllJobs(token){
        try{

            const response = await axios.get(`${UserService.BASE_URL}/job-registry/get-all-jobs`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            // console.log(response);
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    /***CustomerVehicle */
    static async addCustomerVehicle(vehicleData, token){
        try{

            const response = await axios.post(`${UserService.BASE_URL}/customer-vehicle/save`, vehicleData, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async updateCustomerVehicle(vehicleId, vehicleData, token){
        try{

            const response = await axios.put(`${UserService.BASE_URL}/customer-vehicle/update/${vehicleId}`, vehicleData, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async deleteCustomerVehicle(vehicleId, token){
        try{

            const response = await axios.delete(`${UserService.BASE_URL}/customer-vehicle/delete/${vehicleId}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async getCustomerVehicleById(vehicleId, token){
        try{

            const response = await axios.get(`${UserService.BASE_URL}/customer-vehicle/get-vehicle/${vehicleId}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async getAllCustomerVehicles(token){
        try{

            const response = await axios.get(`${UserService.BASE_URL}/customer-vehicle/get-all-vehicles`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            // console.log(response);
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async searchVehicles(query, token) {
        try {
            const response = await axios.get(`${UserService.BASE_URL}/customer-vehicle/search`, {
                params: { query },
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    /***SERVICE TYPES */
    static async addNewServiceType(serviceTypeData, token){
        try{

            const response = await axios.post(`${UserService.BASE_URL}/service-type/save`, serviceTypeData, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async updateServiceType(serviceId, serviceTypeData, token){
        try{

            const response = await axios.put(`${UserService.BASE_URL}/service-type/update/${serviceId}`, serviceTypeData, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async deleteServiceType(serviceId, token){
        try{

            const response = await axios.delete(`${UserService.BASE_URL}/service-type/delete/${serviceId}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async getServiceTypeById(serviceId, token){
        try{

            const response = await axios.get(`${UserService.BASE_URL}/service-type/get-service-type/${serviceId}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async getAllServiceTypes(token){
        try{

            const response = await axios.get(`${UserService.BASE_URL}/service-type/get-all-service-types`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            // console.log(response);
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    /**AUTHENTICATION CHECKER */
    static logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    }

    static isAuthenticated(){
        const token = localStorage.getItem('token');
        return !!token;
    }

    static isAdmin(){
        const role = localStorage.getItem('role');
        return role === 'ADMIN';
    }

    static isSuperUser(){
        const role = localStorage.getItem('role');
        return role === 'ADMIN' || role === 'MANAGER';
    }

    static isCustomer(){
        const role = localStorage.getItem('role');
        return role === 'CUSTOMER';
    }

    static isSupervisor(){
        const role = localStorage.getItem('role');
        return role === 'SUPERVISOR';
    }

    static isReceptionist(){
        const role = localStorage.getItem('role');
        return role === 'RECEPTIONIST';
    }

    static isManager(){
        const role = localStorage.getItem('role');
        return role === 'MANAGER';
    }

    static isTechnician(){
        const role = localStorage.getItem('role');
        return role === 'TECHNICIAN';
    }

    static isWarehouseKeeper(){
        const role = localStorage.getItem('role');
        return role === 'WAREHOUSE_KEEPER';
    }

    static userType(){
        const role = localStorage.getItem('role');
        return role;
    }

    static isUser(){
        const role = localStorage.getItem('role');
        return role === 'USER';
    }

    static adminOnly(){
        return this.isAuthenticated() && this.isAdmin();
    }

    static superUserOnly(){
        return this.isAuthenticated() && this.isSuperUser();
    }
}

export default UserService;