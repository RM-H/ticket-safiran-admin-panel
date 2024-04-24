


import {createSlice, createDraftSafeSelector} from '@reduxjs/toolkit'



const initialstate = {
    items: [],
    notifications :0 ,
    dashboard:[],
    env:1,

    status: ''
}




const userSlice = createSlice({
    name: 'user',
    initialState: initialstate,
    reducers: {
        adduserinfo(state,action){
            state.items=action.payload;
            state.status='done'
        },
        addnotif(state,action){
            state.notifications=action.payload;

        },
        addDashboard(state,action){
            state.dashboard=action.payload;

        }
        ,
        changeEnv(state,action){
            state.env=action.payload;

        }

    },

})



export default userSlice.reducer;
export const {adduserinfo,addnotif,addDashboard ,changeEnv} = userSlice.actions

// // ---------------------------------Selectors-----------------------------
export const userinfoSelector = createDraftSafeSelector(
    (state) => state,
    (state) => state.userinfo.items
)

export const notifSelector = createDraftSafeSelector(
    (state) => state,
    (state) => state.userinfo.notifications
)

export const dashboardSelector = createDraftSafeSelector(
    (state) => state,
    (state) => state.userinfo.dashboard
)



// changing between bilitim and safiran
export const environmentSelector = createDraftSafeSelector(
    (state) => state,
    (state) => state.userinfo.env
)
