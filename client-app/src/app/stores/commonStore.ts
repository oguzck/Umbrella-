import React from 'react'
import { serverErrorr } from '../models/serverError'
import { makeAutoObservable, reaction } from 'mobx';

export default class CommonStore {
    error: serverErrorr | null = null;
    token : string | null = localStorage.getItem('jwt');
    appLoaded = false;
    constructor(){
      makeAutoObservable(this);

      reaction(
        () => this.token,
        token=>{
          if (token) {
            localStorage.setItem('jwt',token)
            
          }else{
            localStorage.removeItem('jwt')
          }
        }
      )
    }
    setServerError(error:serverErrorr){
      this.error = error;
    }
    setToken = (token:string|null)=>{
      this.token = token;
    }
    setAppLoaded = () =>{
      this.appLoaded=true
    }
}
