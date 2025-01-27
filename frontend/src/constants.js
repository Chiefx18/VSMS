const constants ={};

constants.USER_TYPES = ['CUSTOMER','OPERATIONS'];

constants.BASE_URL='http://localhost:4000/'

constants.API_ROUTES={
    AUTH:{
        LOGIN:`${constants.BASE_URL}auth/login`,
        SIGNUP:`${constants.BASE_URL}auth/signup`,
        VERIFY_TOKEN:`${constants.BASE_URL}auth/verifyToken`,
    },
    USER:{
        GET_PROFILE:`${constants.BASE_URL}user`,
        ALL_USER_COMPLAINTS:`${constants.BASE_URL}user/complaints`,
        REGISTER_COMPLAINT:`${constants.BASE_URL}user/registerComplaint`,
        GET_ALL_COMPLAINTS:`${constants.BASE_URL}user/allComplaints`,
        PAY:`${constants.BASE_URL}user/pay`,
    },
    VEHICLE:{
        GET_VEHICLES:`${constants.BASE_URL}vehicle`,
        EDIT_VEHICLES:`${constants.BASE_URL}vehicle/edit`,
        ADD_VEHICLES:`${constants.BASE_URL}vehicle/add`,
        DELETE_VEHICLE:`${constants.BASE_URL}vehicle/delete`
    },
    COMPONENT:{
        GET_COMPONENTS:`${constants.BASE_URL}component`,
        GET_ALL_COMPONENTS:`${constants.BASE_URL}allComponent`,
        EDIT_COMPONENTS:`${constants.BASE_URL}component/edit`,
        ADD_COMPONENTS:`${constants.BASE_URL}component/add`,
        DELETE_COMPONENTS:`${constants.BASE_URL}component/delete`
    },
    OPERATIONS:{
        RESOLVE_COMPLAINT: `${constants.BASE_URL}operations/resolve`,
        REVENUE: `${constants.BASE_URL}operations/revenue`
    }
}

module.exports= constants;