import React, {Component} from "react";

class Contact extends Component {
    constructor(props){
        super(props);
        this.state = {name:"", gmail: "", subject:""};
    }

    handleSubmit = (event) => {
        event.preventDefault();
    };

    changeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]:value});
        console.log(this.state.name);
    };
    Submit = () => {
        let submit = false;
        var name = document.getElementById('fname').value;
        var gmail = document.getElementById('gmail').value;
        var message = document.getElementById('message').value;
        let format = /^[a-zA-Z0-9]*\@[a-zA-Z0-9]*\.[a-zA-Z0-9]*$/;
        var confirm = document.getElementById('confirm');
        if(name!=''&&format.test(gmail)&&message!=''){
            fetch('https://apiserver7th.herokuapp.com/contact/insert',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                api_key: localStorage.usertoken
            },
            body:JSON.stringify({
                name:this.state.name,
                gmail:this.state.gmail,
                message:this.state.message
            })
        }).then((res) => res.json())
            .then((json)=> {
                submit=true;
            })
            
            confirm.innerHTML='Cảm ơn vì đã liên lạc với chúng tôi';
            confirm.style.background="green";
            confirm.style.color="white";
        }
        else if(name!=''&&!format.test(gmail)&&message!=''){
            confirm.innerHTML='Vui lòng điền đúng format của gmail (@)';
            confirm.style.background="red";
            confirm.style.color="white";
        }
        else{
            confirm.innerHTML='Vui lòng điền đầy đủ thông tin';      
            confirm.style.background="red";
            confirm.style.color="white";
        }
        document.getElementById('fname').value='';
        document.getElementById('gmail').value='';
        document.getElementById('message').value='';
    };

    render() {

        return (
            <div className="Contact">
                <h2 className="ContactTitle">Contact</h2>
                <span id="confirm"></span>
                <form onClick={this.handleSubmit}>
                    <label htmlFor="fname">Name :</label>
                    <input type="text" id="fname" name="name" onChange={this.changeHandler} placeholder="Your name.." required/><br></br>
                    <label htmlFor="gmail">Gmail :</label>
                    <input type="text" id="gmail" name="gmail" onChange={this.changeHandler} placeholder="Gmail.." required/>
                    <label>Message :</label><br></br>
                    <textarea id="message" name="message" onChange={this.changeHandler} placeholder="Write something.." required></textarea>
                    <input type="submit" value="Submit" id="Submit" onClick={this.Submit}/>
                </form>
            </div>
        );
    }
}
export default Contact;