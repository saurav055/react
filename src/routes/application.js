import React from "react";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";

import {
  NoMatch,
  Home,
  Login,
  AstroRegister,
  AstroBankDetail,
  AstroTransaction,
  EditAstroProfile,
  AstroDashProfile,
  Transaction,
  OrderHistory,
  UserProfile,
  Notifications,
  AddMoneyToWallet,
  AstrologerProfile,
  ForgetPasssword,
  AstrologerList,
  ConfirmOTP,
  UserLogin,
  ChatIntakeForm,
  FixedEnquires,
  CustomerChat,
  AstrologerDashboard,
  AstrologerChat,
  AstrologerEnquires,
  MessageBroadCast,
  SuccessPage,
} from "screens";
import { AstroLayout } from "components";
import AboutAstrology from "screens/NonAuth/AboutAstrology";
import ChatListing from "screens/NonAuth/ChatListing";
import AboutUs from "screens/NonAuth/AboutUs";
import { useDispatch, useSelector } from "react-redux";
import hit from "service";
import { user } from "service/endpoints";
import { setAstrolist } from "redux_store/features/astrolist";
import { getServicesListThunk } from "redux_store/features/services";
import {
  collection,
  setDoc,
  doc,
  query,
  onSnapshot,
  orderBy,
  addDoc,
  increment,
} from "firebase/firestore";
import { db } from "../firebase_config";
import { setOnlineUserData } from "redux_store/features/onlineusers";
import moment from "moment";

const CheckRoutes = () => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let t = 0;
  const updateUserOnlineTimeStamp = (user) => {
    t = setInterval(() => {
      setDoc(doc(db, "onlines", user?._id), {
        lastOnline: moment().unix(),
        _id: user?._id,
      });
    }, 10000);
  };

  React.useEffect(() => {
    onSnapshot(
      collection(db, "onlines"),
      (snapshot) => {
        let users = [];
        snapshot.forEach((doc) => {
          users.push(doc.data());
        });
        dispatch(setOnlineUserData(users));
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  React.useEffect(() => {
    if (auth.authorize && auth?.user?.type == "Astrologer") {
      navigate("/astrologer", { replace: true });
      dispatch(getServicesListThunk({}));
      updateUserOnlineTimeStamp(auth?.user);
    } else if (!auth.authorize) {
      navigate("/", { replace: true });
      clearInterval(t);
    }
    getAstrologerList();

    return () => {
      clearInterval(t);
    };
  }, [auth]);

  const getAstrologerList = async () => {
    try {
      let res = await hit(user.astros, "post", {});
      if (!res.err) {
        dispatch(setAstrolist(res.data));
      } else {
      }
    } catch (Err) {
    } finally {
    }
  };

  return (
    <>
      <Outlet />
    </>
  );
};

export default function ApplicationRoutes(props) {
  return (
    <Routes>
      <Route element={<CheckRoutes />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/astro_register" element={<AstroRegister />} />
        <Route path="/user_login" element={<UserLogin />} />
        <Route path="/astro_profile" element={<AstrologerProfile />} />
        <Route path="/confirm_otp" element={<ConfirmOTP />} />
        <Route path="/forget_password" element={<ForgetPasssword />} />
        <Route path="/chat_intake_form" element={<ChatIntakeForm />} />
        <Route path="/fixed_enquiry/:title" element={<FixedEnquires />} />
        <Route path="/astrolger_list" element={<AstrologerList />} />
        <Route path="/transactions" element={<Transaction />} />
        <Route path="/add_money" element={<AddMoneyToWallet />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/order_history" element={<Transaction />} />
        <Route path="/user_profile" element={<UserProfile />} />
        <Route path="/chat" element={<CustomerChat />} />
        <Route path="/SuccessPage" element={<SuccessPage />} />

        <Route path="/about_us" element={<AboutUs />} />
        <Route path="/about_astrology" element={<AboutAstrology />} />

        <Route path="/astrologerchat" element={<AstrologerChat />} />
        <Route path="/astrologer" element={<AstroLayout />}>
          <Route index element={<AstrologerDashboard />} />
          <Route path="profile" element={<AstroDashProfile />} />
          <Route path="edit_profile" element={<EditAstroProfile />} />
          <Route path="transaction" element={<AstroTransaction />} />
          <Route path="chat_list" element={<ChatListing />} />
          <Route path="services" element={<AstrologerEnquires />} />
          <Route path="broadcast" element={<MessageBroadCast />} />
          <Route path="bank" element={<AstroBankDetail />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}
