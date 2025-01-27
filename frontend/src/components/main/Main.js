import React from 'react'
import constants from '../../constants';
import Customer from '../Dashboard/Customer/Customer';
import Operations from '../Dashboard/Operations/Operations';

export default function main() {
  const userType = localStorage.getItem('userType');
  return (
    <>
    {userType === constants.USER_TYPES[0] && <Customer/>}
    {userType === constants.USER_TYPES[1] && <Operations/>}
    {!userType && <h1>Please Login Again</h1>}
    </>
  )
}
