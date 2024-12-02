import axios from "axios";

class BookingService {
    static BASE_URL = 'http://localhost:8082';


    static async retrieveUserBookings(token) {
      try {
        const response = await axios.get(`${this.BASE_URL}/booking/getCustomerBookings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("response-----",response.data);
        if (response.data.statusCode === 200 && response.data) {
          return { success: true, message: response.data.bookingList};  
        } else {
            console.log("FAILED TO GET DATA");
          return { success: false, message: "You haven't made" };
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

    static async createBooking(bookingData, token) {
        try {
            const response = await axios.post(
                `${BookingService.BASE_URL}/booking/add`,
                bookingData,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            if (response.status === 200) {
                return { success: true, message: "Your booking was created sucessfully!"};
            } else {
                return { success: false, message: "Failed to create your booking!" };
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

    static async updateBooking(bookingData, token) {
      try {

          const response = await axios.put(
              `${BookingService.BASE_URL}/booking/updateWaitingBooking`,
              bookingData,
              {
                  headers: { Authorization: `Bearer ${token}` }
              }
          );

          if (response.status === 200) {
              return { success: true, message: "Your booking was update sucessfully!"};
          } else {
              return { success: false, message: "Failed to update your booking!" };
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

  }
  export default BookingService;
  