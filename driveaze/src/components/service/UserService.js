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
    

    static async verifyOTP(otpData){
        try{
            const response = await axios.post(`${UserService.BASE_URL}/auth/verify-otp`, otpData, {
                headers: {
                'Content-Type': 'application/json'
                }
            });
            console.log("Response", response)
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

    static async deleteCustomerAccount(userId, token){
        try{

            const response = await axios.delete(`${UserService.BASE_URL}/customer/delete-account/${userId}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async updateCustomerAccount(userId, userData, token){
        try{

            const response = await axios.put(`${UserService.BASE_URL}/customer/update-account/${userId}`, userData,
            {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async updatePassword(userId, userData, token){
        try{

            const response = await axios.put(`${UserService.BASE_URL}/anyuser/update-password/${userId}`, userData,
            {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async updateEmployees(userId, userData, token){
        try{

            const response = await axios.put(`${UserService.BASE_URL}/employees/update/${userId}`, userData,
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

    static async getAllJobsWithPagination(offset, token){
        try{

            const response = await axios.get(`${UserService.BASE_URL}/job-registry/paginationAndSort/${offset}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            // console.log(response);
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async getAllJobsWithPaginationByVehicleId(vehicleId, offset, token) {
        try {
            const params = new URLSearchParams();
            params.append("vehicleId", vehicleId);

            const response = await axios.get(
                `${UserService.BASE_URL}/job-registry/pagination-and-sort-and-get-with-vehicle-id/${offset}`,
                {
                    params: { vehicleId }, // Include vehicleId as a query parameter
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    // static async getAllVehiclesWithPaginationAndStatusesByCustomerPhoneNo(phoneNo, offset, token) {
    //     try {
    //         // Create query parameters
    //         const params = new URLSearchParams();
    //         params.append("phoneNo", phoneNo);
    
    //         // Make API call to the updated endpoint
    //         const response = await axios.get(
    //             `${UserService.BASE_URL}/customer-vehicle/paginationAndSortAndGetWithCustomerPhone/${offset}`,
    //             {
    //                 params: { phoneNo }, // This is a cleaner way to pass query parameters
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 }
    //             }
    //         );
    
    //         return response.data;
    //     } catch (err) {
    //         throw err;
    //     }
    // }

    /***Job Entries */
    

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

    static async getAllVehiclesWithPagination(offset, token){
        try{

            const response = await axios.get(`${UserService.BASE_URL}/customer-vehicle/paginationAndSort/${offset}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            // console.log(response);
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

     /***Bills */
     static async addNewBill(billData, token){
        try{

            const response = await axios.post(`${UserService.BASE_URL}/bill/save`, billData, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async updateBill(billId, billData, token){
        try{

            const response = await axios.put(`${UserService.BASE_URL}/bill/update/${billId}`, billData, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async updateBillStatus(billId, status, token) {
        try {
            const response = await axios.put(
                `${UserService.BASE_URL}/bill/updatebillstatus/${billId}`,
                status,  // Send the status as a plain integer (no object)
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',  // Correct content type
                    },
                }
            );
            return response.data;
        } catch (err) {
            throw err;
        }
    }
    

    static async deleteBill(billId, token){
        try{

            const response = await axios.delete(`${UserService.BASE_URL}/bill/delete/${billId}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async getBillById(billId, token){
        try{

            const response = await axios.get(`${UserService.BASE_URL}/bill/get-bill/${billId}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async getAllBills(token){
        try{

            const response = await axios.get(`${UserService.BASE_URL}/bill/get-all-bills`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            // console.log(response);
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async getAllBillsWithPaginationAndStatuses(statuses, offset, token) {
        try {
            const params = new URLSearchParams();
            statuses.forEach(status => params.append("statuses", status)); // Add statuses as query params
    
            const response = await axios.get(
                `${UserService.BASE_URL}/bill/paginationAndSort/${offset}?${params.toString()}`, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async getAllBillsWithPaginationAndStatusesByCustomerPhoneNo(phoneNo, statuses, offset, token) {
        try {
            const params = new URLSearchParams();
            params.append("phoneNo", phoneNo); // Add phoneNo as a query param
            statuses.forEach(status => params.append("statuses", status)); // Add statuses as query params
    
            const response = await axios.get(
                `${UserService.BASE_URL}/bill/paginationAndSortAndGetWithCustomerPhone/${offset}?${params.toString()}`, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            return response.data;
        } catch (err) {
            throw err;
        }
    }    

    static async getAllVehiclesWithPaginationAndStatusesByCustomerPhoneNo(phoneNo, offset, token) {
        try {
            // Create query parameters
            const params = new URLSearchParams();
            params.append("phoneNo", phoneNo);
    
            // Make API call to the updated endpoint
            const response = await axios.get(
                `${UserService.BASE_URL}/customer-vehicle/paginationAndSortAndGetWithCustomerPhone/${offset}`,
                {
                    params: { phoneNo }, // This is a cleaner way to pass query parameters
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
    
            return response.data;
        } catch (err) {
            throw err;
        }
    }
    

    static async downloadBill(billId, token) {
        try {
            // Notice: removed /api/ from the URL
            const response = await axios.get(`${UserService.BASE_URL}/bill/${billId}/download`, {
                responseType: 'blob',
                headers: { 
                    Authorization: `Bearer ${token}`,
                    accept: '*/*'  // Match the exact header from curl
                }
            });
    
            const pdfBlob = response.data;
            const link = document.createElement('a');
            link.href = URL.createObjectURL(pdfBlob);
            link.download = `bill-${billId}.pdf`;
    
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
    
            return { success: true, message: 'Bill downloaded successfully' };
        } catch (error) {
            console.error('Error downloading the bill:', {
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data
            });
            throw error;
        }
    }
    
    

     /***Bill Entries */
     static async addNewBillEntry(billEntryData, token){
        try{

            const response = await axios.post(`${UserService.BASE_URL}/bill-entry/save`, billEntryData, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async updateBillEntry(billEntryId, billEntryData, token){
        try{

            const response = await axios.put(`${UserService.BASE_URL}/bill-entry/update/${billEntryId}`, billEntryData, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async deleteBillEntry(billEntryId, token){
        try{

            const response = await axios.delete(`${UserService.BASE_URL}/bill-entry/delete/${billEntryId}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async getBillEntryById(billEntryId, token){
        try{

            const response = await axios.get(`${UserService.BASE_URL}/bill-entry/get-bill-entry/${billEntryId}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async getAllBillEntries(token){
        try{

            const response = await axios.get(`${UserService.BASE_URL}/bill-entry/get-all-bill-entries`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            // console.log(response);
            return response.data;
            
        }catch(err){
            throw err;
        }
    }
    
    static async getAllBillEntriesByBillId(billId, token){
        try{

            const response = await axios.get(`${UserService.BASE_URL}/bill-entry/get-all-bill-entries-by-bill-id/${billId}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            // console.log(response);
            return response.data;
            
        }catch(err){
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

    /**Vehicle Brands */
    static async addNewVehicleBrand(brandData, token){
        try{

            const response = await axios.post(`${UserService.BASE_URL}/vehicle-brand/save`, brandData, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async updateVehicleBrand(brandId, brandData, token){
        try{

            const response = await axios.put(`${UserService.BASE_URL}/vehicle-brand/update/${brandId}`, brandData, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async deleteVehicleBrand(brandId, token){
        try{

            const response = await axios.delete(`${UserService.BASE_URL}/vehicle-brand/delete/${brandId}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async getVehicleBrandById(brandId, token){
        try{

            const response = await axios.get(`${UserService.BASE_URL}/vehicle-brand/get-vehicle-brand/${brandId}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async getAllVehicleBrands(token){
        try{

            const response = await axios.get(`${UserService.BASE_URL}/vehicle-brand/get-all-vehicle-brands`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            // console.log(response);
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    /**Vehicle Models */
    static async addNewVehicleModel(modelData, token){
        try{

            const response = await axios.post(`${UserService.BASE_URL}/vehicle-model/save`, modelData, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async updateVehicleModel(modelId, modelData, token){
        try{

            const response = await axios.put(`${UserService.BASE_URL}/vehicle-model/update/${modelId}`, modelData, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async deleteVehicleModel(modelId, token){
        try{

            const response = await axios.delete(`${UserService.BASE_URL}/vehicle-model/delete/${modelId}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async getVehicleModelById(modelId, token){
        try{

            const response = await axios.get(`${UserService.BASE_URL}/vehicle-model/get-vehicle-model/${modelId}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async getAllVehicleModels(token){
        try{

            const response = await axios.get(`${UserService.BASE_URL}/vehicle-model/get-all-vehicle-models`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            // console.log(response);
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async getAllVehicleModelsWithVehicleBrandId(brandId, token){
        try{

            const response = await axios.get(`${UserService.BASE_URL}/vehicle-model/get-all-vehicle-models-with-brand-id/${brandId}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            // console.log(response);
            return response.data;
            
        }catch(err){
            throw err;
        }
    }
    //Announcements
    static async getAllAnnouncement( token){
        try{

            const response = await axios.get(`${UserService.BASE_URL}/announcement/get-all-announcements`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            console.log(response);
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async addAnnouncement(currentDetail,token){
        try{
            // console.log(currentDetail);
            const response = await axios.post(`${UserService.BASE_URL}/announcement/save`, currentDetail,{
                headers: {Authorization: `Bearer ${token}`}
            });
            // console.log(response);
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async updateAnnouncement(announcementId, currentDetail, token){
        try{
            console.log(currentDetail);
            const response = await axios.put(`${UserService.BASE_URL}/announcement/update/${announcementId}`, currentDetail,{
                headers: {Authorization: `Bearer ${token}`}
            });
            // console.log(response);
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async deleteAnnouncement(announcementId, token){
        try{
            // console.log(ItemId);
            const response = await axios.delete(`${UserService.BASE_URL}/announcement/delete/${announcementId}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

     /**Suppliers */
     static async addNewSupplier(supplierData, token){
        try{

            const response = await axios.post(`${UserService.BASE_URL}/supplier/save`, supplierData, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async updateSuppliers(supplierId, supplierData, token){
        try{

            const response = await axios.put(`${UserService.BASE_URL}/supplier/update/${supplierId}`, supplierData, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async deleteSuppliers(supplierId, token){
        try{

            const response = await axios.delete(`${UserService.BASE_URL}/supplier/delete/${supplierId}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async getSupplierById(supplierId, token){
        try{

            const response = await axios.get(`${UserService.BASE_URL}/supplier/get-supplier/${supplierId}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async getAllSuppliers(token){
        try{

            const response = await axios.get(`${UserService.BASE_URL}/supplier/get-all-suppliers`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            // console.log(response);
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async getAllSuppliersWithPagination(offset, token){
        try{

            const response = await axios.get(`${UserService.BASE_URL}/supplier/paginationAndSort/${offset}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            // console.log(response);
            return response.data;
            
        }catch(err){
            throw err;
        }
    }


    /***ServiceTypes */
    static async addNewServiceType(serviceData, token){
    try{

        const response = await axios.post(`${UserService.BASE_URL}/service-type/save`, serviceData, {
            headers: {Authorization: `Bearer ${token}`}
        });
        return response.data;
        
        }catch(err){
            throw err;
        }
    }

    static async updateServiceType(serviceId, serviceData, token){
        try{

            const response = await axios.put(`${UserService.BASE_URL}/service-type/update/${serviceId}`, serviceData, {
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

    static async getAllServiceTypesWithPagination(offset, token){
        try{

            const response = await axios.get(`${UserService.BASE_URL}/service-type/paginationAndSort/${offset}`, {
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

    static isPhoneNumberVerified(){
        console.log(localStorage.getItem('phoneNoVerified'));
        console.log(localStorage.getItem('role'));
        return localStorage.getItem('phoneNoVerified') === 'true';
    }
}

export default UserService;