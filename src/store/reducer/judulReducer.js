import {GET_JUDUL} from '../type';

const initialState = {
    judul:[],
    loading:true,
    mencari:""
}

export default function(state = initialState, action){

    switch(action.type){

        case GET_JUDUL:
        return {
            ...state,
            judul:action.payload,
            loading:false

        }
        // case CARI:
        // return {
        //     ...state,
        //     mencari: action.payLoad
        // }
        default: return state
    }

}