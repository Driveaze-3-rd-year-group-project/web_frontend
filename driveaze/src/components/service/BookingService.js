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
          return { success: false, message: "No reservations!" };
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

    static async retrieveAllBookings(token) {
        try {
          const response = await axios.get(`${this.BASE_URL}/booking/getAll`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("response-----",response.data);
          if (response.data.statusCode === 200 && response.data) {
            return { success: true, message: response.data.bookingList};  
          } else {
            return { success: false, message: "No reservations!" };
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

            if (response.data.statusCode === 200) {
                return { success: true, message: "Your booking was created successfully!" };
            } else if (response.data.statusCode === 409) {
                return { success: false, message: "Booking already exists, please select a different vehicle!" };
            } else if(response.data.statusCode===300){
                return { success: false, message: "Selected date has too many reservations, Please select another date!" };
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
          if (response.data.statusCode === 200) {
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

    static async deleteBooking(bookingData, token) {
      try {
          const response = await axios.post(
              `${BookingService.BASE_URL}/booking/deleteWaitingBooking`,
              bookingData,
              {
                  headers: { Authorization: `Bearer ${token}` }
              }
          );

          if (response.data.statusCode === 200) {
              return { success: true, message: "Your booking was cancelled sucessfully!"};
          } else {
              return { success: false, message: "Failed to cancel your booking!" };
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
  