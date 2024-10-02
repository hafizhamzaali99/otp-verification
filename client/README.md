## OTP Verification Frontend

This project is a simple OTP verification screen built with React.js. It includes a 6-digit OTP input, a timer for resending the OTP, and two buttons for verifying the entered OTP and resending the OTP. The design is clean and minimal, with a focus on ease of use and visual clarity.

## How to Run the Project

# Prerequisites

Ensure that you have the following installed on your system:

- Node.js
- npm or yarn

* Clone the repository to your local machine:

  - `git clone https://github.com/hafizhamzaali99/otp-verification.git`
  - cd path/to/otp-verification/client

* Install the required dependencies:

  - npm install OR yarn install

* Start the development server:

  - npm start OR yarn start

* Open your web browser and navigate to `http://localhost:3000` to view the application.

## Design Considerations

- **Clean Layout**:

  - Focused on minimalism and user clarity.
  - Centered layout with ample white space for visual appeal and ease of use.

- **Responsive Design**:

  - Ensures a smooth experience on mobile and tablet devices.

- **Colors and Gradients**:

  - Warm gradient (orange to yellow) applied to the title for a friendly appearance.
  - Buttons feature a modern gradient style for interactivity.

- **Interaction**:

  - OTP input fields auto-focus on the next field for seamless user flow.
  - Timer prevents OTP resending before a set interval (e.g., 30 seconds).
  - Verify Button are disabled until all OTP fields are filled to ensure proper validation.

- **Box Shadow & Focus States**:

  - Inputs and buttons have subtle box shadows and focus states for improved accessibility and visual feedback.

- **Error Handling**:
  - React Toastify is integrated for error alerts and feedback, ensuring the user stays informed.
