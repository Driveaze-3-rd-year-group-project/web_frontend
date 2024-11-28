import axios from "axios";

class UpdateComplaintService {
    static BASE_URL = 'http://localhost:8082';

    static async updateComplaintStatus(complaintData, token) {
        try {
            const response = await axios.put(
                `${UpdateComplaintService.BASE_URL}/customer-complaint/update`,
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
                return { success: false, message: "No response from server." };
            } else {
                // Something else triggered the error
                return { success: false, message: err.message || "An error occurred." };
            }
        }
    }
}

export default UpdateComplaintService;
