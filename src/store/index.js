import { createStore } from 'vuex'
import shoppingList from './modules/shoppingList'

export default createStore({
    modules: [
        shoppingList
    ]
})