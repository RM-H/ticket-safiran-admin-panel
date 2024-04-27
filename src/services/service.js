import axios from "axios";


export const url = 'https://api.bilitim.net/api/v1'
export const baseurl = 'https://api.bilitim.net'

// bearer
// const config = {
//    headers: {
//       Authorization: `Bearer ${user.user.token}`
//    }
// }

export const adminlogin = (d) => {
   return  axios.post(`${url}/login`,d)
}


export const getBlogs = (bear)=>{
   return axios.get(`${url}/admin/blog/index`,bear)
}

export const getSingleBlog = (bear,id)=>{
   return axios.get(`${url}/admin/blog/info/${id}`,bear)
}

export const getSafiranSliders = (bear)=>{
   return axios.get(`${url}/admin/safiranslider/index`,bear)
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

export const getBiltimFAQ = (bear)=>{
   return axios.get(`${url}/admin/faq/index`,bear)
}

export const getSafiranFAQ = (bear)=>{
   return axios.get(`${url}/admin/safiranfaq/index`,bear)
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
