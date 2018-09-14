import {HISTORY} from './type'

export const addHistory =(data)=> ({
    type:HISTORY,
    payload:data
})