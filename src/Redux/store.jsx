
import { configureStore } from '@reduxjs/toolkit'

import userreducer from './User'
import adminreducer from './Admin'
export const store=configureStore({
    reducer:{
        counter:userreducer,
        admincounter:adminreducer
    }
})
