import React, { createContext, useEffect, useState } from "react";

import {
  advertOptionFetch,
  checkIsUserLogIn,
  downloadAllPaidOrdersCustomers,
  downloadAllUsers,
  downloadPaidOrder,
  fetchAdvertSlider,
  fetchCourses,
} from "../utils/sessions";

import { Role } from "../helpers/roles";

export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
  const [activeLineStepCheckout, setActiveLineStepCheckout] = useState("");
  const [activeLineSignIn, setActiveLineSignIn] = useState(false);
  const [activeLineShipping, setActiveLineShipping] = useState(false);
  const [activeLinePayment, setActiveLinePayment] = useState(false);
  const [advertOptions, setAdvertOptions] = useState("");
  const [allAdvertsSlider, setAllAdvertsSlider] = useState([]);
  const [adminPaidOrders, setAdminPaidOrders] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allBoughtCoursesByUser, setAllBoughtCoursesByUser] = useState([]);
  const [allPaidOrdersByUser, setAllPaidOrdersByUser] = useState([]);
  const [boughtCourses, setBoughtCourses] = useState([]);
  const [checkCanGoPayment, setCheckCanGoPayment] = useState(false);
  const [checkCanGoPlaceOrder, setCheckCanGoPlaceOrder] = useState(false);
  const [checkIsSignIn, setCheckIsSignIn] = useState(true);
  const [checkIsShippingCheckout, setCheckIsShippingCheckout] = useState(false);
  const [checkerShip, setCheckerShip] = useState(false);
  const [checkIsPaymentCheckout, setCheckIsPaymentCheckout] = useState(false);
  const [checkerPayment, setCheckerPayment] = useState(false);
  const [checkIsPlaceOrderCheckout, setCheckIsPlaceOrderCheckout] = useState(
    false
  );
  const [checkerPlaceOrder, setCheckerPlaceOrder] = useState(false);
  const [commentProduct, setCommentProduct] = useState([]);
  const [courses, setCourses] = useState([]);
  const [customerDetails, setCustomerDetails] = useState([]);
  const [drawIcon, setDrawIcon] = useState(false);
  const [errorServerMsg, setErrorServerMsg] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [isClickLogin, setisClickLogin] = useState(false);
  const [isloadFirstTimePage, setIsloadFirstTimePage] = useState(false);
  const [isOwnAdverts, setIsOwnAdverts] = useState(false);
  const [isTurnOnRegisterLogin, setIsTurnOnRegisterLogin] = useState(false);
  const [idUser, setIdUser] = useState(null);
  const [flag, setFlag] = useState(false);
  const [nameCheckers, setNameCheckers] = useState("");
  const [paidOrderDetails, setPaidOrderDetails] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [orginalCourses, setOrginalCourses] = useState([]);
  const [user, setUser] = useState(null);
  const [validationMsg, setValidationMsg] = useState("");

  const adjustValidationMsg = (message) => setValidationMsg(message);

  const copyDeepCart = (cart) => {
    let copyCart = [];
    cart.forEach((item) => {
      const singleItem = { ...item };
      copyCart = [...copyCart, singleItem];
    });
    return copyCart;
  };

  const fetchData = async (cart, setCart) => {
    const { data, status } = await fetchCourses();
    let product = [];

    if (status === 200) {
      data.forEach((item) => {
        const oneItem = { ...item };
        product = [...product, oneItem];
      });

      setCourses(product);
      setOrginalCourses(data);

      if (Boolean(cart)) {
        let cartCopy = copyDeepCart(cart);
        cartCopy.map((item1) => {
          let findedUpdateCourses = data.find(
            (item2) => item2._id === item1._id
          );

          if (
            findedUpdateCourses.amount >
            item1.amount + item1.totalQtyProduct
          ) {
            item1.amount = findedUpdateCourses.amount - item1.totalQtyProduct;
            localStorage.setItem("cart", JSON.stringify(cart));
            setCart(cart);
          }
        });
      }
    } else {
      setErrorServerMsg(data);
    }
  };

  const fetchAllUsers = async () => {
    const { data, status } = await downloadAllUsers();
    if (status === 200) {
      setAllUsers(data);
    } else {
      setErrorServerMsg(data);
    }
  };

  const fetchUserLogged = async () => {
    const data = await checkIsUserLogIn();
    if (data) {
      setUser(data);
      if (data.role === Role.Admin) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    }
  };

  const deepCopyPaidOrders = (paidProducts) => {
    let copyOrders = [];
    paidProducts.forEach((item) => {
      const singleOrder = { ...item };
      copyOrders = [...copyOrders, singleOrder];
    });
    return copyOrders;
  };

  const reduceProducts = (products) => {
    let result = products.reduce(
      (
        acc,
        {
          author,
          description,
          _id,
          imagePath,
          price,
          title,
          totalPriceProduct,
          totalQtyProduct,
        }
      ) => {
        let tempProduct = acc.find((pro) => pro._id === _id);
        if (!tempProduct) {
          acc = [
            ...acc,
            {
              author,
              description,
              _id,
              imagePath,
              price,
              title,
              totalPriceProduct,
              totalQtyProduct,
            },
          ];
        } else {
          tempProduct.totalQtyProduct += totalQtyProduct;
        }
        return acc;
      },
      []
    );

    return result;
  };

  const fetchPaidOrders = async () => {
    if (user.role !== Role.Admin) {
      const { data, status } = await downloadPaidOrder(user.userId);

      status !== 200 ? setErrorServerMsg(data) : null;

      let deepCopyOrdersPaid = deepCopyPaidOrders(data);

      if (status === 200 && data) {
        setPaidOrderDetails(data);

        let paidProducts = [];

        deepCopyOrdersPaid.forEach((item) => {
          item.cart.map((item1) => {
            paidProducts = [...paidProducts, item1];
            return item1;
          });
        });

        let resultReduceForUser = reduceProducts(paidProducts);

        setBoughtCourses(resultReduceForUser);
      }
    } else {
      const { data, status } = await downloadPaidOrder(idUser);

      status !== 200 ? setErrorServerMsg(data) : null;

      let deepCopyOrdersPaid = deepCopyPaidOrders(data);

      if (status === 200) {
        setPaidOrderDetails(data);

        let paidProducts = [];

        deepCopyOrdersPaid.forEach((item) => {
          item.cart.map((item1) => {
            paidProducts = [...paidProducts, item1];
            return item1;
          });
        });

        let resultReduceForAdmin = reduceProducts(paidProducts);

        setBoughtCourses(resultReduceForAdmin);
      }
    }
  };

  const fetchAdminOrders = async () => {
    const { data, status } = await downloadPaidOrder(user.userId);
    if (status === 200) {
      setAdminPaidOrders(data);
    }
  };

  const copyDeepAllPaidOrdersByUser = (data) => {
    let copyAllBoughtProducts = [];
    data.forEach((item) => {
      const singleOrder = { ...item };
      copyAllBoughtProducts = [...copyAllBoughtProducts, singleOrder];
    });

    return copyAllBoughtProducts;
  };

  const fetchAllPaidOrdersByUser = async () => {
    const { data, status } = await downloadAllPaidOrdersCustomers();

    if (status === 200) {
      const coppyBoughtProduct = copyDeepAllPaidOrdersByUser(data);
      setAllPaidOrdersByUser(coppyBoughtProduct);

      let mergedAllPaidOrders = coppyBoughtProduct.reduce(
        (acc, { cart, name, surname, userId }) => {
          let tempProduct = acc.find((pro) => pro.userId === userId);
          if (!tempProduct) {
            acc = [...acc, { cart, name, surname, userId }];
          } else {
            tempProduct.cart = [...tempProduct.cart, ...cart];

            const uniqueAddresses = Array.from(
              new Set(tempProduct.cart.map((a) => a._id))
            ).map((id) => {
              return tempProduct.cart.find((a) => a._id === id);
            });

            tempProduct.cart = uniqueAddresses;
          }
          return acc;
        },
        []
      );

      setAllBoughtCoursesByUser(mergedAllPaidOrders);
    } else {
      setErrorServerMsg(data);
    }
  };

  const fetchAllAdvertiseSlider = async () => {
    const { data, status } = await fetchAdvertSlider();

    status === 200 ? setAllAdvertsSlider(data) : setErrorServerMsg(data);
  };

  const downloadAdvertOptions = async () => {
    const { data, status } = await advertOptionFetch();
    if (Boolean(data)) {
      status === 200 ? setAdvertOptions(data.name) : setErrorServerMsg(data);
    }
  };

  useEffect(() => {
    fetchData();
    if (Boolean(user) && user.role === Role.Admin) {
      fetchAllUsers();
    }
  }, [user]);

  useEffect(() => {
    fetchUserLogged();
  }, []);

  useEffect(() => {
    if (Boolean(user)) {
      fetchPaidOrders();
    }
  }, [flag, user]);

  useEffect(() => {
    if (Boolean(user)) {
      fetchAllPaidOrdersByUser();
      fetchAdminOrders();
    }
  }, [flag, isAdmin]);

  useEffect(() => {
    downloadAdvertOptions();
    fetchAllAdvertiseSlider();
  }, []);

  return (
    <StoreContext.Provider
      value={{
        errorServerMsg,
        setErrorServerMsg,
        activeLineStepCheckout,
        activeLineSignIn,
        activeLineShipping,
        activeLinePayment,
        adminPaidOrders,
        adjustValidationMsg,
        advertOptions,
        allAdvertsSlider,
        allBoughtCoursesByUser,
        allPaidOrdersByUser,
        allUsers,
        boughtCourses,
        checkCanGoPayment,
        checkCanGoPlaceOrder,
        checkerPayment,
        checkerShip,
        checkIsShippingCheckout,
        checkIsPaymentCheckout,
        checkIsPlaceOrderCheckout,
        checkIsSignIn,
        checkerPlaceOrder,
        commentProduct,
        customerDetails,
        courses,
        drawIcon,
        isAdmin,
        isClickLogin,
        isloadFirstTimePage,
        isOwnAdverts,
        idUser,
        fetchData,
        flag,
        isTurnOnRegisterLogin,
        nameCheckers,
        orginalCourses,
        paidOrderDetails,
        setActiveLineStepCheckout,
        setActiveLineSignIn,
        setActiveLineShipping,
        setActiveLinePayment,
        setAdminPaidOrders,
        setAdvertOptions,
        setAllAdvertsSlider,
        setAllBoughtCoursesByUser,
        setAllPaidOrdersByUser,
        setAllUsers,
        setBoughtCourses,
        setCheckCanGoPayment,
        setCheckCanGoPlaceOrder,
        setCheckIsShippingCheckout,
        setCheckIsPaymentCheckout,
        setCheckIsPlaceOrderCheckout,
        setCheckerPlaceOrder,
        setCommentProduct,
        setCourses,
        setCustomerDetails,
        setDrawIcon,
        setFlag,
        setIsAdmin,
        setisClickLogin,
        setIsloadFirstTimePage,
        setIsOwnAdverts,
        setCheckerPayment,
        setCheckIsSignIn,
        setCheckerShip,
        setIdUser,
        setIsTurnOnRegisterLogin,
        setNameCheckers,
        setPaidOrderDetails,
        setUser,
        setValidationMsg,
        searchValue,
        setSearchValue,
        user,
        validationMsg,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
