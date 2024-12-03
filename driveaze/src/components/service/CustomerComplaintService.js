import axios from "axios";

class CustomerComplaintService {
    static BASE_URL = 'http://localhost:8082';

    static async sendComplaintData(complaintData, token) {
        try {
            const response = await axios.post(
                `${this.BASE_URL}/customer-complaint/save`,
                complaintData,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            if (response.status === 201) {
                return { success: true, message: response.data };
            } else {
                return { success: false, message: "Failed to send complaint." };
            }
        } catch (err) {
            console.error("Error while sending complaint:", err);
            if (err.response) {
                // Server returned an error response
                return { success: false, message: err.response.data || "Server error occurred" };
            } else if (err.request) {
                // Request was made but no response received
                return { success: false, message: "No response from server." };
            } else {
                // Something else triggered the error
                return { success: false, message: err.message || "An error occurred." };
            }
        }
    }

    
  static async retrieveComplaintData(token) {
    try {
      const response = await axios.get(`${this.BASE_URL}/customer-complaint/retrieveUserComplaints`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        return { success: true, message: response.data};
      } else {
        return { success: false, message: "Failed to retrieve complaint data" };
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

  static async retrieveAllComplaints(token) {
    try {
      const response = await axios.get(`${this.BASE_URL}/customer-complaint/retrieve`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        return { success: true, message: response.data};
      } else {
        return { success: false, message: "Failed to retrieve complaint data" };
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

  static async updateComplaintStatus(complaintData, token) {
    try {
        const response = await axios.put(
            `${this.BASE_URL}/customer-complaint/update`,
            complaintData,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );

        if (response.status === 200) {
            return { success: true, message: response.data };
        } else {
            return { success: false, message: "Failed to update complaint." };
        }
    } catch (err) {
        console.error("Error while updating complaint:", err);
        if (err.response) {
            // Server returned an error response
            return { success: false, message: err.response.data || "Server error occurred" };
        } else if (err.request) {
            // Request was made but no response received
    x
            return { success: false, message: "No response from server." };
        } else {
            // Something else triggered the error
            return { success: false, message: err.message || "An error occurred." };
        }
    }
}

}

export default CustomerComplaintService;
