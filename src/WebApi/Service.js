import React, { useEffect,useState ,useRef} from 'react';
import {View,useColorScheme,} from 'react-native';
import {  useSelector, useDispatch } from 'react-redux';
// import * as types  from '../redux/types';


 export const baseUrl = 'http://54.153.75.225/backend/api/v1/'
// shop/eat
//API END POINT LISTS  

export const register = 'auth/register'
export const login = 'auth/login'
export const verify_otp = 'auth/verify-otp'
export const shop_eat = 'shop/eat'
export const vendor_lists_subcat ='shop/eat/vendor-lists?subcat='
export const shop_eat_business = 'shop/eat/business'
export const shop_eat_business_id = 'shop/eat/business/id/'
export const shop_eat_menu_userid = 'shop/eat/vendor-menu/'
export const shop_eat_cart = 'shop/eat/cart'
export const shop_eat_cart_id = 'shop/eat/cart/id/'
export const shop_eat_coupons_userid = 'shop/eat/coupons/userid/'
export const shop_eat_cart_apply_coupon=`shop/eat/cart/apply-coupon`;
export const user_payment_method=`user/payment-method`;
export const user_address=`user/address`;
export const shop_eat_cart_place_order=`shop/eat/cart/place-order`;
export const shop_eat_cart_book_dining=`shop/eat/cart/book-dining`;
export const shop_eat_cart_book_table=`shop/eat/cart/book-table`;
export const shop_eat_orders=`shop/eat/orders`;
export const delete_Update_Address=`user/address/id/`; 
export const cancelOrders=`orders`;
export const vendor_reviews=`vendor/reviews`;
export const shop_eat_menu=`shop/eat/menu/userid/`;
export const auth_send_otp=`auth/send-otp`;
export const profile = 'user/profile'
export const menu_AllCategoryNames=`menu/AllCategoryNames`; 
export const menu_categorySearch_attribute_name=`menu/categorySearch?attribute_name=`; 
export const  driver_reviews=`user/review`; 
export const shop_remove_coupon=`shop/eat/cart/remove-coupon`;
export const  notification_list=`/user/notification/list`;
export const  shop_eat_cart_charges=`shop/eat/cart/charges/?business_id=`;
export const  user_selectedAddress=`user/selectedAddress`;
export const  selectAddress_id=`user/selectAddress/id/`; 
export const  shop_eat_order_id=`shop/eat/order/id/`;

export const  connect_dating_profile=`connect/dating/profile`;
export const  connect_dating_editprofile=`connect/dating/profile`; 
export const  common_master_attributes=`common/master-attributes?master_type=`; 
export const  connect_dating_location=`connect/dating/location`; 
export const  connect_dating_profile_list=`connect/dating/profile-list`;
export const connect_dating_active_status = 'connect/dating/status'
export const connect_dating_home_data = 'connect/dating/home?';
export const connect_dating_swipe_profile = 'connect/dating/swipe-profile';
export const connect_dating_profile_imageupload = 'connect/dating/profile-image';
export const connect_dating_profile_image_get = 'connect/dating/profile-image'; 
export const connect_dating_swipe_profile_id_delete  = 'connect/dating/swipe-profile/id';
export const connect_dating_delete_profile_image = 'connect/dating/profile-image/';

export const connect_dating_dele_image = 'connect/dating/profile-image/';  
export const driver_fuel_cost = 'driver/fuel_cost'
export const driver_referral_earning = 'driver/referral_earning'
export const driver_change_account_status = 'driver/change_account_status'

export const requestPostApi = async (endPoint,body,method,token) => 
{
  console.log('the token is :-',token)
  var header = {}
  if(token!='' && token!=undefined)
  {
    header = {'Content-Type': 'application/json','Authorization': 'Bearer '+ token,'Cache-Control': 'no-cache'}
  }else{
    header = {"Content-Type": "application/json",'Accept':'application/json'}
  }

  var url = baseUrl + endPoint
  console.log('post Request Url:-' + url + '\n')
  console.log('the body data',body)
  // console.log(header + '\n')
  try {
    
      let response = await fetch(url, {
          method: method,
          body: body=='' ? '' : JSON.stringify(body),
          headers:header,
      }
      )
      let code = await response.status 
      console.log('the api responce is',code)
      //  let responseJ = await response.json();
      //  console.log('the api responce is',responseJ.headers)
      if(code==200){
        let responseJson = await response.json();
        console.log( responseJson)
        return {responseJson:responseJson,err:null}
      }else if(code == 400 || code == 402)
      {
        let responseJson = await response.json();
        //Completion block 
        return {responseJson:responseJson,err:responseJson.headers.message}
      }else{
        let responseJson = await response.json();
          // console.log(responson)
        return {responseJson:responseJson,err:responseJson.headers.message}
      }
    } catch (error) {
      console.log('the error is',error)
      return {responseJson:null,err:'Something Went Wrong! Please check your internet connection.'}
   // return {responseJson:null,err:error}
    }
  }

  export const requestGetApi = async (endPoint,body,method,token) => 
{
  console.log('the token is :-',token)
  var header = {}
  var url = baseUrl + endPoint

  if(token!='' && token!=undefined)
  {
    header = {'Content-Type': 'multipart/form-data','Accept':'application/json','Authorization': 'Bearer '+ token,'Cache-Control': 'no-cache'}
  }else{
    header = {}
  }

   //url = url + objToQueryString(body)
  console.log('Request Url:-' + url + '\n')
  try {
      let response = await fetch(url, {
        method: method,
        headers:header,
      }
      )
      let code = await response.status
      console.log(code)   
      if(code==200){
        let responseJson = await response.json();
        console.log('Code 200==>>',responseJson)
        return {responseJson:responseJson,err:null,code:code}
      }else if(code == 400)
      {
        return {responseJson:null,err:responseJson.message,code:code}

      }else if(code == 500)
      {
        console.log(response)   

        return {responseJson:null,err:'Something Went Wrong',code:code}

      }else{
        console.log(response)   

        return {responseJson:null,err:'Something went wrong!',code:code}
      }
    } catch (error) {
      console.error(error);
      return {responseJson:null,err:'Something Went Wrong! Please check your internet connection.',code:500}
      
    }
  }

  export const requestPostApiMedia = async (endPoint,formData,method,token) => 
{
  var header = {}
 
  if(token!='' && token!=undefined)
  {
    header = {'Content-type': 'multipart/form-data','apitoken':token,'Cache-Control': 'no-cache'
  }
  }else{
    if(endPoint != signUpApi){
      header = { 'Content-type': 'multipart/form-data' , 'Cache-Control': 'no-cache'
    }
  }
  }

  var url = baseUrl + endPoint
  console.log('Request Url:-' + url + '\n')
  console.log(formData + '\n')

  try {
      let response = await fetch(url, {
        method: method,
        body:formData,
        
        headers:header,
       
      }
      )

      let code = await response.status
      console.log(code )   

      if(code==200){
        let responseJson = await response.json();
        console.log( responseJson)
        return {responseJson:responseJson,err:null}
      }else if(code == 400)
      {
        let responseJson = await response.json();
        return {responseJson:null,err:responseJson.message}

      }else{

        return {responseJson:null,err:'Something went wrong!'}
      }
    } catch (error) {
      console.error('the error of the uploade image is ==>>',error);
      return {responseJson:null,err:'Something Went Wrong! Please check your internet connection.'}
      
    }
  }

  export const requestPostApiSignUp = async (endPoint,formData,method) => 
  {
    var url = baseUrl + endPoint
    console.log('Request Url:-' + url + '\n')
    console.log(formData + '\n')
  
    try {
        let response = await fetch(url, {
          method: method,
          body:formData,
        }
        )
  
        let code = await response.status
        console.log(code )   
  
        if(code==200){
          let responseJson = await response.json();
          console.log( responseJson)
          return {responseJson:responseJson,err:null}
        }else if(code == 400 || 402)
        {
          let responseJson = await response.json();
          console.log( responseJson)

          return {responseJson:null,err:responseJson.msg}
  
        }else{
  
          return {responseJson:null,err:'Something went wrong!'}
        }
      } catch (error) {
  
        return {responseJson:null,err:'Something Went Wrong! Please check your internet connection.'}
        console.error(error);
      }
    }  
  
  const objToQueryString=(obj)=> {

    const keyValuePairs = [];
    for (const key in obj) {
      keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
    return keyValuePairs.length==0 ? '' :  '?'+  keyValuePairs.join('&');
  }



  //function : get api
export const getApi = endPoint =>
axios
  .get(`${baseUrl}${endPoint}`)
  .then(res => {
    return res;
  })
  .catch(error => {
    if (error == `Error: Network Error`) {
      Alert.alert(
        '',
        `Internet connection appears to be offline. Please check your internet connection and try again.`,
      );
    }
    console.log('data', error.response.data);
    console.log('status', error.response.status);
    console.log('headers', error.response.headers);
    return error;
  });
//function : post api
export const postApi = (endPoint, data) =>
axios
  .post(`${baseUrl}${endPoint}`, data)
  .then(res => {
    return res;
  })
  .catch(error => {
    if (error == `Error: Network Error`) {
      Alert.alert(
        '',
        `Internet connection appears to be offline. Please check your internet connection and try again.`,
      );
    }
    console.log('data', error.response.data);
    console.log('status', error.response.status);
    console.log('headers', error.response.headers);
    return error;
  });
//function : get api with token
export const getApiWithToken = (token, endPoint) =>
axios
  .get(`${baseUrl}${endPoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(res => {
    return res;
  })
  .catch(error => {
    if (error == `Error: Network Error`) {
      Alert.alert(
        '',
        `Internet connection appears to be offline. Please check your internet connection and try again.`,
      );
    }
    console.log('data', error.response.data);
    console.log('status', error.response.status);
    console.log('headers', error.response.headers);
    return error;
  });
//function : post api with token
export const postApiWithToken = (token, endPoint, data) =>
axios
  .post(`${baseUrl}${endPoint}`, data, {
    headers: {
      Authorization: `Bearer${token}`,
    },
  })
  .then(res => {
    return res;
  })
  .catch(error => {
    if (error == `Error: Network Error`) {
      Alert.alert(
        '',
        `Internet connection appears to be offline. Please check your internet connection and try again.`,
      );
    }
    console.log('data', error.response.data);
    console.log('status', error.response.status);
    console.log('headers', error.response.headers);
    return error;
  });
//function : put api with token
export const putApiWithToken = (token, endPoint, data) =>
axios
  .put(`${baseUrl}${endPoint}`, data, {
    headers: {
      Authorization: `Bearer${token}`,
    },
  })
  .then(res => {
    return res;
  })
  .catch(error => {
    if (error == `Error: Network Error`) {
      Alert.alert(
        '',
        `Internet connection appears to be offline. Please check your internet connection and try again.`,
      );
    }
    console.log('data', error.response.data);
    console.log('status', error.response.status);
    console.log('headers', error.response.headers);
    return error;
  });
