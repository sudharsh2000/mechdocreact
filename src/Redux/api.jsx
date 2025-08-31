import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { store } from "./store";

export const homeapi = "http://localhost:8000/api/";
export const loginapi = homeapi+"login/";
export const signupapi = homeapi+"signup/";
export const gettokenapi =  "token/";
export const refreshtokenapi = homeapi+"refresh/";
export const usersapi = homeapi + "allusers/";
export const userbyidapi = homeapi + "userbyid/";
export const logoutapi=homeapi+"logout/"
 // your base api urls

// axios instance

