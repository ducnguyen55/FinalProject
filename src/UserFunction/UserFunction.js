import axios from '../AxiosServer'

export const register = newUser => {
	return axios
		.post('/user/register',{
			full_name: newUser.full_name,
			gmail: newUser.gmail,
			password: newUser.password,
			role: newUser.role
		})
		.then(res => {
			console.log('Registered!')
		})
}

export const login = user => {
	return axios
		.post('/user/login',{
			gmail: user.gmail,
			password: user.password
		})
		.then(res => {
			if(res.data.error == "User does not exist")
				{
					var confirm = document.getElementById('confirm');
		            confirm.innerHTML='Tài khoản không tồn tại';
            		confirm.style.color="red";
				}
			else if(res.data.error == "Wrong password")
				{
					var confirm = document.getElementById('confirm');
		            confirm.innerHTML='Sai mật khẩu';
            		confirm.style.color="red";
				}
			else if(res.data.length > 100){
				localStorage.setItem('usertoken',res.data);
				return res.data;
			}
		})
		.catch(err => {
			console.log(err)
		})
}