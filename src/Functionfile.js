import {Link} from 'react-router-dom'
import React, {Component} from 'react'
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

export const CheckLogin = () =>{
		if(localStorage.length==0){
			history.push("/");
		}
	};

