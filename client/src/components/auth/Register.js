import React , { StyleSheet, Fragment, useState} from 'react';
import { connect } from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {setAlert} from '../../actions/alert'; 
import {register} from '../../actions/auth'; 
import PropTypes from 'prop-types'; 
import {Card, ListGroup, ListGroupItem,Button} from 'react-bootstrap'; 
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';

import image from '../../img/pexels-photo-2108813.jpeg';


const styles = {
  cover : {
    alignSelf: 'center',
    height: 150,
    width: 150,
    borderWidth: 1,
    borderRadius: 75
  },
  button: {
    width: 10
  }
}; 

const Register = ({ setAlert, register, isAuthenticated} ) => {
    const [formData, setFormData] = useState({
        name : '',
        email : '',
        password: '',
        password2: ''
    });

    const {name,email,password,password2} = formData;  
   
    const onChange = e => setFormData({ ...formData, [e.target.name] : e.target.value});
    const onSubmit = async e => {
        e.preventDefault();
        if(password !== password2){
           setAlert('Password do not match', 'danger');
        }else {
            register({name,email,password});
        }
    };

    if(isAuthenticated){
      return <Redirect to="/" />
    }
    return ( 
      <Card style={{ width: '20rem',   justifyContent: 'center',
      alignItems: 'center',}} >
  <Card.Img variant="top" src={image} style={styles.cover} />
  <p className="h5 text-center mb-4">Register</p>
            <div className="grey-text">
    <MDBInput
              
            type="text"
            icon="user"
            group
            error="wrong"
            success="right"
            label="name"
            placeholder="Name"
            name="name"
            onChange={e => {onChange(e)}}
            required
      />
      <MDBInput
              
              type="text"
              icon="envelope"
              group
              error="wrong"
              success="right"
              label="email"
              placeholder="Email"
              name="email"
              onChange={e => {onChange(e)}}
              required
        />

         <MDBInput
              
              type="password"
              icon="lock"
              group
              error="wrong"
              success="right"
              label="password"
              placeholder="password"
              name="password"
              onChange={e => {onChange(e)}}
              required
        />
    
         <MDBInput
              
              type="password"
              icon="exclamation-triangle"
              group
              error="wrong"
              success="right"
              label="password2"
              placeholder="Confirm your password"
              name="password2"
              onChange={e => {onChange(e)}}
              required
        />
        </div>
        
    

  <br/>
    <Button type="submit" size="sm" variant="success" styles={styles.button} onClick={e=>onSubmit(e)}> Submit </Button> 
   
  <Card.Body>
    <Card.Text>
    Already Have an account?
    </Card.Text>
    <Card.Link href="/login">Login</Card.Link>
  </Card.Body>
</Card>
    ); 
      
};

Register.propTypes = {
    setAlert : PropTypes.func.isRequired,
    register : PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated : state.auth.isAuthenticated
});
export default connect(mapStateToProps, {setAlert, register} )(Register); 