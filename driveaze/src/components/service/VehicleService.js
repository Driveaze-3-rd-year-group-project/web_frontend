import axios from "axios";

class VehicleService{

    static BASE_URL = 'http://localhost:8082';


    static async getVehicleBrands(token) {
      try {
        const response = await axios.get(`${this.BASE_URL}/vehicle-brand/get-all-vehicle-brands`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("response-----",response.data);
        if (response.data.statusCode === 200 && response.data) {
          return { success: true, message: response.data.vehicleBrandList};  
        } else {
          return { success: false, message: "No vehicle brands found" };
        }
  
      } catch (err) {
        if (err.response) {
          return { success: false, message: err.response.data || "Server error occurred" };
        } else if (err.request) {
          return { success: false, message: "No response from server." };
        } else {
          return { success: false, message: err.message || "An error occurred." };
        }
      }
    }

    static async getVehicleModels(token) {
        try {
          const response = await axios.get(`${this.BASE_URL}/vehicle-model/get-all-vehicle-models`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("response-----",response.data);
          if (response.data.statusCode === 200 && response.data) {
            return { success: true, message: response.data.vehicleModelList};  
          } else {
            return { success: false, message: "No vehicle models found" };
          }
    
        } catch (err) {
          if (err.response) {
            return { success: false, message: err.response.data || "Server error occurred" };
          } else if (err.request) {
            return { success: false, message: "No response from server." };
          } else {
            return { success: false, message: err.message || "An error occurred." };
          }
        }
      }

    static async getBrandsWithModels(token) {
        try {
          const [brandsResponse, modelsResponse] = await Promise.all([
            this.getVehicleBrands(token),
            this.getVehicleModels(token),
          ]);
      
          if (!brandsResponse.success) {
            return { success: false, message: brandsResponse.message };
          }
          if (!modelsResponse.success) {
            return { success: false, message: modelsResponse.message };
          }
      
          const brands = brandsResponse.message; // List of brands
          const models = modelsResponse.message; // List of models
      
          const brandsWithModels = brands.map((brand) => {
            const associatedModels = models.filter((model) => model.brandId === brand.brandId);
            return {
              ...brand,
              models: associatedModels, // Attach models to the brand
            };
          });
      
          return { success: true, message: brandsWithModels };
        } catch (err) {
          return { success: false, message: "An error occurred while processing data." };
        }
    }

}
export default VehicleService