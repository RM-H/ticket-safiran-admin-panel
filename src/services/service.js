import axios from "axios";


export const url = 'https://ticket.metamax.network/api/v1'

// bearer
// const config = {
//    headers: {
//       Authorization: `Bearer ${user.user.token}`
//    }
// }

export const adminlogin = (d) => {
   return  axios.post(`${url}/login`,d)
}


export const webpageoptions = (bear)=>{
   return axios.get(`${url}/admin/option/index`,bear)
}


export const updateWebpageoptions = (data,bear)=>{
   return axios.post(`${url}/admin/option/update`,data,bear)
}

export const getMessages = (bear)=>{
   return axios.get(`${url}/admin/contact/index`,bear)
}

export const getFAQ = (bear)=>{
   return axios.get(`${url}/admin/faq/index`,bear)
}

export const getSingers = (bear)=>{
   return axios.get(`${url}/admin/singer/index`,bear)
}

export const getCities = (bear)=>{
   return axios.get(`${url}/admin/city/index`,bear)
}

export const getDashboard = (bear)=>{
   return axios.get(`${url}/admin/dashboard/index`,bear)
}

export const getSalone = (bear)=>{
   return axios.get(`${url}/admin/location/index`,bear)
}

export const getSingleSalone = (bear,id)=>{
   return axios.get(`${url}/admin/location/info/${id}`,bear)
}



export const getEvents = (bear)=>{
   return axios.get(`${url}/admin/concert/index`,bear)
}

export const getSingleEvent = (bear,id)=>{
   return axios.get(`${url}/admin/concert/info/${id}`,bear)
}


export const getSans = (bear)=>{
   return axios.get(`${url}/admin/sans/index`,bear)
}

export const getSingleSans = (bear,id)=>{
   return axios.get(`${url}/admin/sans/info/${id}`,bear)
}

export const getTicketordersList = (bear)=>{
   return axios.get(`${url}/admin/order/tickets`,bear)
}

export const getvideoOrdersList = (bear)=>{
   return axios.get(`${url}/admin/order/videos`,bear)
}


export const getVideosList = (bear)=>{
   return axios.get(`${url}/admin/video/index`,bear)
}
export const getSingleVideo = (bear,id)=>{
   return axios.get(`${url}/admin/video/info/${id}`,bear)
}
