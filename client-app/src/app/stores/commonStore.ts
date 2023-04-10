import React from 'react'
import { serverErrorr } from '../models/serverError'
import { makeAutoObservable } from 'mobx';

export default class CommonStore {
    error: serverErrorr | null = null;
    constructor(){
      makeAutoObservable(this);
    }
    setServerError(error:serverErrorr){
      this.error = error;
    }
}
