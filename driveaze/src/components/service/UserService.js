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

            const response = await axios.post(`${UserService.BASE_URL}/auth/customer-register`, {
                userData
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async employeerRegister(userData, token){
        try{

            const response = await axios.post(`${UserService.BASE_URL}/auth/register`, {
                userData,
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async getAllEmployees(token){
        try{

            const response = await axios.get(`${UserService.BASE_URL}/admin/get-all-employees`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async getAllCustomers(token){
        try{

            const response = await axios.get(`${UserService.BASE_URL}/admin/get-all-customers`, {
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

            const response = await axios.get(`${UserService.BASE_URL}/admin/get-user/${userId}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async deleteUser(userId, token){
        try{

            const response = await axios.delete(`${UserService.BASE_URL}/admin/delete/${userId}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async updateUser(userId, userData, token){
        try{

            const response = await axios.put(`${UserService.BASE_URL}/admin/update/${userId}`, userData,
            {
                headers: {Authorization: `Bearer ${token}`}
            });
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
}

export default UserService;