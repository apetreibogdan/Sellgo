import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import user_image from "../../assets/images/tuat.png";

import { ENDPOINTS } from "../../api/Index";
import axios from "axios";

const Profile = () => {
    const userId = useSelector((state) => state.authRedux).user.id;
    const [user, setUser] = useState();
    const positions = ["Manager", "Salesman", "Admin"];
    useEffect(() => {
        // axios
        axios.get(`${ENDPOINTS.BASE_URL}${ENDPOINTS.USER}${userId}`).then(
            (response) => {
                setUser(response.data);
                console.log(user);
            },
            (error) => {
                console.log(error);
            }
        );
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            confirmPassword: user.password,
            [name]: value,
        });
    };

    const showPreview = (e) => {
        if (e.target.files && e.target.files[0]) {
            let imageFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (x) => {
                setUser({
                    ...user,
                    confirmPassword: user.password,
                    imageFile,
                    imageSrc: x.target.result,
                });
            };
            reader.readAsDataURL(imageFile);
        } else {
            setUser({
                ...user,
                confirmPassword: user.password,
                imageFile: null,
                imageSrc: user_image,
            });
        }
    };

    const handleFormSubmit = async (e) => {
        // e.preventDefault();
        // const formData = new FormData();
        // formData.append("firstName", user.firstName);
        // formData.append("lastName", user.lastName);
        // formData.append("password", user.password);
        // formData.append("confirmPassword", user.password);
        // formData.append("position", user.position);
        // formData.append("imageName", user.imageName);
        // formData.append("deals", user.deals);
        // formData.append("teamId", user.teamId);
        // formData.append("team", user.team);
        // formData.append("imageSrc", user.imageSrc);
        // formData.append("imageFile", user.imageFile);
        // formData.append("id", user.id);
        // formData.append("userName", user.userName);
        // formData.append("normalizedUserName", user.normalizedUserName);
        // formData.append("email", user.email);
        // formData.append("normalizedEmail", user.normalizedEmail);
        // formData.append("emailConfirmed", user.emailConfirmed);
        // formData.append("passwordHash", user.passwordHash);
        // formData.append("securityStamp", user.securityStamp);
        // formData.append("concurrencyStamp", user.concurrencyStamp);
        // formData.append("phoneNumber", user.phoneNumber);
        // formData.append("phoneNumberConfirmed", user.phoneNumberConfirmed);
        // formData.append("twoFactorEnabled", user.twoFactorEnabled);
        // formData.append("lockoutEnd", user.lockoutEnd);
        // formData.append("lockoutEnabled", user.lockoutEnabled);
        // formData.append("accessFailedCount", user.accessFailedCount);
        // console.log(formData);
        // await axios
        //     .put(`${ENDPOINTS.BASE_URL}${ENDPOINTS.USER}${userId}`, formData)
        //     .catch((err) => console.log(err));
        // window.location.reload();
    };

    return user !== undefined
        ? (console.log(user?.imageSrc),
          (
              <>
                  <div className="container">
                      <h2 className="page-header">Profile</h2>

                      <form
                          autoComplete="off"
                          noValidate
                          onSubmit={handleFormSubmit}
                      >
                          <div className="card">
                              <>
                                  {user?.imageSrc ==
                                  "https://localhost:44349/Images/" ? (
                                      <img
                                          src={user_image}
                                          className="user__image"
                                      />
                                  ) : (
                                      <img
                                          src={user?.imageSrc}
                                          className="user__image"
                                      />
                                  )}
                              </>
                              <div className="card-body">
                                  <div className="form-group">
                                      <input
                                          type="file"
                                          accept="image/*"
                                          className={"form-control-file"}
                                          onChange={showPreview}
                                          id="image-uploader"
                                      />
                                  </div>
                                  <br></br>
                                  <div className="form-group">
                                      {/* <input
                                          className={"form-control"}
                                          placeholder={user?.firstName}
                                          name="firstName"
                                          value={user?.firstName}
                                          onChange={handleInputChange}
                                      /> */}
                                      <p>Firstname: {user?.firstName}</p>
                                  </div>
                                  <div className="form-group">
                                      {/* <input
                                          className="form-control"
                                          placeholder={user?.lastName}
                                          name="lastName"
                                          value={user?.lastName}
                                          onChange={handleInputChange}
                                      /> */}
                                      <p>Lastname: {user?.lastName}</p>
                                  </div>
                                  <div className="form-group">
                                      <p>Email: {user?.email}</p>
                                  </div>
                                  <div className="form-group">
                                      <p>
                                          Position:{" "}
                                          {positions.at(user?.position)}
                                      </p>
                                  </div>
                                  <div className="form-group ">
                                      <button
                                          type="submit"
                                          className="btn btn-light"
                                      >
                                          Submit
                                      </button>
                                  </div>
                              </div>
                          </div>
                      </form>
                  </div>
              </>
          ))
        : "Loading";
};

export default Profile;
