import axios from "axios";

class RetrieveComplaintService {
  static BASE_URL = "http://localhost:8082";

  static async retrieveComplaintData(token) {
    try {
      const response = await axios.get(`${this.BASE_URL}/customer-complaint/retrieve`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        return { success: true, message: response.data.bookingList };
      } else {
        return { success: false, message: "Failed to retrieve data" };
      }
    } catch (err) {
      console.error("Error while retrieving complaints:", err);

      if (err.response) {
        return { success: false, message: err.response.data || "Server error occurred" };
      } else if (err.request) {
        return { success: false, message: "No response from server." };
      } else {
        return { success: false, message: err.message || "An error occurred." };
      }
    }
  }

  
}

export default RetrieveComplaintService;
