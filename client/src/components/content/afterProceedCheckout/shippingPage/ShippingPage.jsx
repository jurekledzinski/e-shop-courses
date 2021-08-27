import React, { useContext, useEffect, useRef, useState } from "react";

import { useHistory } from "react-router-dom";

import { StoreContext } from "../../../../store/StoreProvider";
import {
  downloadCustomerDetails,
  saveShippingDetails,
} from "../../../../utils/sessions";

import "./ShippingPage.scss";

import ShippingPageForm from "./ShippingPageForm";
import ProcessBar from "../processBar/ProcessBar";

const ShippingPage = ({ location }) => {
  const {
    adjustValidationMsg,
    checkCanGoPayment,
    checkCanGoPlaceOrder,
    customerDetails,
    setActiveLinePayment,
    setActiveLineStepCheckout,
    setActiveLineShipping,
    setCheckCanGoPayment,
    setCheckIsPaymentCheckout,
    setCheckIsPlaceOrderCheckout,
    setCheckIsShippingCheckout,
    setCheckIsSignIn,
    setCheckerPayment,
    setCheckerPlaceOrder,
    setCheckerShip,
    setCustomerDetails,
    setDrawIcon,
    setErrorServerMsg,
    setNameCheckers,
    user,
    validationMsg,
  } = useContext(StoreContext);

  const [nameValue, setName] = useState({
    customerName: "",
  });
  const [surnameValue, setSurname] = useState({
    customerSurname: "",
  });
  const [streetNameValue, setStreet] = useState({
    streetCustomer: "",
  });
  const [streetNumberValue, setStreetNumber] = useState({
    streetNumber: "",
  });
  const [stateDepartmentValue, setStateDepartement] = useState({
    stateDepartment: "",
  });
  const [postCodeValue, setPostCode] = useState({
    code: "",
  });
  const [cityValue, setCity] = useState({
    cityCustomer: "",
  });
  const [countryValue, setCountry] = useState({
    countryCustomer: "",
  });
  const [phoneValue, setPhoneNumber] = useState({
    customerPhone: "",
  });

  const history = useHistory();
  const isMounted = useRef(false);

  const handleShippingForm = async (e) => {
    e.preventDefault();

    const shippingDetails = {
      name: nameValue.customerName,
      surname: surnameValue.customerSurname,
      street: streetNameValue.streetCustomer,
      numberStreet: streetNumberValue.streetNumber,
      departmentState: stateDepartmentValue.stateDepartment,
      postCode: postCodeValue.code,
      city: cityValue.cityCustomer,
      country: countryValue.countryCustomer,
      phone: phoneValue.customerPhone,
      paymentMethod: "",
      userId: user.userId,
      email: user.email,
      shipMethod: "",
      isShipped: false,
      isDelivered: false,
      isPayed: false,
      cart: [],
      totalQtyCart: 0,
      totalPriceCart: 0,
      totalPriceOrder: 0,
      shippingPrice: 0,
    };

    const { data, status } = await saveShippingDetails(shippingDetails);

    if (status === 200 && isMounted.current) {
      adjustValidationMsg("");
      setCheckCanGoPayment(true);
      setCheckIsShippingCheckout(true);
      setCheckIsSignIn(false);
      setActiveLineStepCheckout("lineShipping");
      setNameCheckers("shippingChecker");
      setCustomerDetails([data]);
      window.scrollTo({ top: 0, behavior: "smooth" });
      history.push("/payment");
    } else {
      adjustValidationMsg(data.alert);
      setErrorServerMsg(data);
    }
  };

  const handleOnChange = ({ target: { name, value } }) => {
    adjustValidationMsg("");
    setName({ ...nameValue, [name]: value });
    setSurname({ ...surnameValue, [name]: value });
    setStreet({ ...streetNameValue, [name]: value });
    setStreetNumber({ ...streetNumberValue, [name]: value });
    setStateDepartement({ ...stateDepartmentValue, [name]: value });
    setPostCode({ ...postCodeValue, [name]: value });
    setCity({ ...cityValue, [name]: value });
    setCountry({ ...countryValue, [name]: value });
    setPhoneNumber({ ...phoneValue, [name]: value });
    setActiveLineStepCheckout("");
    setCheckIsShippingCheckout(false);
    setCheckerShip(false);
    setNameCheckers("");
    setActiveLineShipping(false);
    setActiveLinePayment(false);
    setCheckIsPaymentCheckout(false);
    setCheckerPayment(false);
    setCheckIsPlaceOrderCheckout(false);
    setCheckerPlaceOrder(false);
    setDrawIcon(false);
  };

  const setFormValuesBeforeRefresh = () => {
    setName({ customerName: customerDetails[0].name });
    setSurname({ customerSurname: customerDetails[0].surname });
    setStreet({ streetCustomer: customerDetails[0].street });
    setStreetNumber({ streetNumber: customerDetails[0].numberStreet });
    setStateDepartement({
      stateDepartment: customerDetails[0].departmentState,
    });
    setPostCode({ code: customerDetails[0].postCode });
    setCity({ cityCustomer: customerDetails[0].city });
    setCountry({ countryCustomer: customerDetails[0].country });
    setPhoneNumber({ customerPhone: customerDetails[0].phone });
  };

  useEffect(() => {
    if (customerDetails.length > 0) {
      setFormValuesBeforeRefresh();
    }
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);

  const setValuesInFormAfterRefresh = (data) => {
    setName({ customerName: data.name });
    setSurname({ customerSurname: data.surname });
    setStreet({ streetCustomer: data.street });
    setStreetNumber({ streetNumber: data.numberStreet });
    setStateDepartement({
      stateDepartment: data.departmentState,
    });
    setPostCode({ code: data.postCode });
    setCity({ cityCustomer: data.city });
    setCountry({ countryCustomer: data.country });
    setPhoneNumber({ customerPhone: data.phone });
  };

  function clearForm() {
    setName({ customerName: "" });
    setSurname({ customerSurname: "" });
    setStreet({ streetCustomer: "" });
    setStreetNumber({ streetNumber: "" });
    setStateDepartement({
      stateDepartment: "",
    });
    setPostCode({ code: "" });
    setCity({ cityCustomer: "" });
    setCountry({ countryCustomer: "" });
    setPhoneNumber({ customerPhone: "" });
  }

  const fetchDetailsCustomer = async () => {
    clearForm();
    const { data, status } = await downloadCustomerDetails(user.userId);
    if (status === 200 && isMounted.current) {
      setCustomerDetails([data]);
      setValuesInFormAfterRefresh(data);
    } else {
      adjustValidationMsg(data.alert);
      setErrorServerMsg(data);
    }
  };

  useEffect(() => {
    if (Boolean(user)) {
      fetchDetailsCustomer();
    }
  }, [user]);

  return (
    <section>
      <ProcessBar
        checkCanGoPayment={checkCanGoPayment}
        checkCanGoPlaceOrder={checkCanGoPlaceOrder}
        endpoint={location.pathname}
      />
      <div className="shipping">
        <h1 className="shipping__title">Shipping Details</h1>
        <ShippingPageForm
          cityValue={cityValue.cityCustomer}
          countryValue={countryValue.countryCustomer}
          handleOnChange={handleOnChange}
          handleShippingForm={handleShippingForm}
          nameValue={nameValue.customerName}
          phoneValue={phoneValue.customerPhone}
          postCodeValue={postCodeValue.code}
          streetNameValue={streetNameValue.streetCustomer}
          streetNumberValue={streetNumberValue.streetNumber}
          stateDepartmentValue={stateDepartmentValue.stateDepartment}
          surnameValue={surnameValue.customerSurname}
          validationMsg={validationMsg}
        />
      </div>
    </section>
  );
};

export default ShippingPage;
