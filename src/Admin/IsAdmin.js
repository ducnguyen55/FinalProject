import React, {Component} from 'react'
import jwt_decode from 'jwt-decode'
import {Link} from 'react-router-dom'

export const isAdmin = () =>{
	if(localStorage.length==0)
		return this.props.history.push('/');
	else{
		const token = jwt_decode(localStorage.usertoken);
		if(token.role!='admin');
		return this.props.history.push('/');
	}
	return this.props.history.push('/admin');
}