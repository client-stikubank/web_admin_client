import React from "react";
import { Redirect } from "react-router-dom";

// Profile
import UserProfile from "../pages/Authentication/user-profile";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";

// Dashboard
import Dashboard from "../pages/Dashboard/index";

// Carnival
import Carnival from "../pages/Carnival";
import CarnivalOverview from "../pages/Carnival/overview";

// Stock
import Stock from "../pages/Stock";

// Master Data
import Camp from "../pages/Camp";
import Coin from "../pages/Coin";
import User from "../pages/User";
import Role from "../pages/Role";
import Reward from "../pages/Reward";
import Gift from "../pages/Gift";
import Event from "../pages/Event";
import AssessmentQuestion from "../pages/AssessmentQuestion";
import Personality from "../pages/Personality";
import Assessment from "../pages/Assessment";
import GlobalSetting from "../pages/GlobalSetting";
import Questionnaire from "../pages/Questionnaire";
import Qrclue from "../pages/Qrclue";

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },

  // profile
  { path: "/profile", component: UserProfile },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
  { path: "/youthcamp", component: Carnival },
  { path: "/youthcamp/:id", component: CarnivalOverview },
  { path: "/stock", component: Stock },
  { path: "/camp", component: Camp },
  { path: "/coin", component: Coin },
  { path: "/user", component: User },
  { path: "/role", component: Role },
  { path: "/reward", component: Reward },
  { path: "/gift", component: Gift },
  { path: "/personality", component: Personality },
  { path: "/assessment-question", component: AssessmentQuestion },
  { path: "/assessment", component: Assessment },
  { path: "/event", component: Event },
  { path: "/global-setting", component: GlobalSetting },
  { path: "/questionnaire", component: Questionnaire },
  { path: "/qrclue", component: Qrclue },
];

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
];

export { publicRoutes, authProtectedRoutes };
