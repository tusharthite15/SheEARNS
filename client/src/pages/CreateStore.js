import React, { useState,useEffect } from "react";
import axios from "axios";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useAuth0 } from "@auth0/auth0-react";
const CreateStore = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    image: null, // Use null for the file
  });
  const { user, isAuthenticated, isLoading } = useAuth0();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
  
    setFormData((prevData) => {
      const newData = { ...prevData };
  
      if (name === "image" && files && files.length > 0) {
        // Don't set the value directly for file input
        newData[name] = files[0];
      } else {
        newData[name] = value;
      }
  
      console.log("Updated FormData:", newData);
      return newData;
    });
  };
  
  

  // Event handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
 
    const formDataForBackend = new FormData();
    formDataForBackend.append("name", formData.name);
    formDataForBackend.append("category", formData.category);
    formDataForBackend.append("image", formData.image);
    formDataForBackend.append("user", user.email);

    console.log("Form Data:", formDataForBackend);
    try {
      // Make a POST request to your backend API endpoint
      const response = await axios.post("http://localhost:4000/api/v1/createShop", formDataForBackend);

      // Handle the response as needed
      console.log("Store created:", response.data);
    } catch (error) {
      // Handle errors
      console.error("Error creating store:", error);
    }
    console.log("After Axios request");
  };

  return (
    <>
      <Meta title={"Create Store"} />
      <BreadCrumb title="Create Store" />

      <Container class1="login-wrapper py-3 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Create Store</h3>
              <form onSubmit={handleSubmit} className="d-flex flex-column gap-15">
                <CustomInput
                  type="text"
                  name="name"
                  placeholder="Shop Name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <CustomInput
                  type="text"
                  name="category"
                  placeholder="Category"
                  value={formData.category}
                  onChange={handleChange}
                />
                <CustomInput
                  type="file"
                  name="image"
                  label="image"
                  
                  onChange={handleChange}
                />
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button type="submit" className="button border-0">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default CreateStore;
