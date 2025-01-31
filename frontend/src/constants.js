const constants ={};

constants.USER_TYPES = ['CUSTOMER','OPERATIONS'];

constants.BASE_URL='http://localhost:8000/api/'

constants.API_ROUTES={
    AUTH:{
        LOGIN:`${constants.BASE_URL}auth/login/`,
        SIGNUP:`${constants.BASE_URL}auth/signup/`,
    },
    USER:{
        GET_PROFILE:`${constants.BASE_URL}user/`,
        ALL_USER_COMPLAINTS:`${constants.BASE_URL}user/userComplaints/`,
        REGISTER_COMPLAINT:`${constants.BASE_URL}user/registerComplaint/`,
        GET_ALL_COMPLAINTS:`${constants.BASE_URL}user/allComplaints/`,
        PAY:`${constants.BASE_URL}user/payComplaint/`,
    },
    VEHICLE:{
        GET_VEHICLES:`${constants.BASE_URL}vehicle/all/`,
        EDIT_VEHICLES:`${constants.BASE_URL}vehicle/edit/`,
        ADD_VEHICLES:`${constants.BASE_URL}vehicle/add/`,
        DELETE_VEHICLE:`${constants.BASE_URL}vehicle/delete/`
    },
    COMPONENT:{
        GET_COMPONENTS:`${constants.BASE_URL}component/`,
        GET_ALL_COMPONENTS:`${constants.BASE_URL}component/all/`,
        EDIT_COMPONENTS:`${constants.BASE_URL}component/edit/`,
        ADD_COMPONENTS:`${constants.BASE_URL}component/add/`,
        DELETE_COMPONENTS:`${constants.BASE_URL}component/delete/`
    },
    OPERATIONS:{
        RESOLVE_COMPLAINT: `${constants.BASE_URL}operations/resolveComplaint/`,
        REVENUE: `${constants.BASE_URL}operations/getRevenue/`
    }
}

module.exports= constants;