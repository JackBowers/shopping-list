const state = {
    budget: 0,
    items: []
}

const getters = {
    getBudget(state) {
        return state.budget
    },
    getShoppingList(state) {
        return state.items
    },
    getTotalPrice(state) {
        if(state.items.length > 0) {
            return state.items.reduce((acc, cur) => acc + cur.price, 0)
        }else{
            return 0;
        }
    },
    isAboveBudget(state, getters) {
        return (state.budget > 0 && getters.getTotalPrice > state.budget);
    }
}

const actions = {
    addItemToList({ commit, state }, item) {
        commit('addItemToList', {
            name: item.name,
            price: item.price,
            inBasket: false
        })
        commit('saveListToLocalStorage')
    },
    setBudget({ commit, state }, budget) {
        commit('setBudget', budget);
        commit('saveListToLocalStorage')
    },
    moveUpList({ commit, state }, item) {
        //Check that item is not already at the top of the list
        if(state.items.indexOf(item) > 0) {
            commit('moveUpList', item);
            commit('saveListToLocalStorage')
        }
    },
    moveDownList({ commit, state }, item) {
        commit('moveDownList', item);
        commit('saveListToLocalStorage')
    },
    removeFromList({ commit, state }, item) {
        commit('removeFromList', item);
        commit('saveListToLocalStorage')
    },
    loadFromLocalStorage({ commit }) {
        if(localStorage.getItem('shopping-list')){
            commit('loadFromLocalStorage')
        }
    },
    putItemInBasket({commit}, item){
        commit('putItemInBasket', item)
        commit('saveListToLocalStorage')
    },
    resetBasket({commit}){
        commit('resetBasket')
    }
}

const mutations = {
    addItemToList(state, item){
        state.items.push(item);
    },
    setBudget(state, budget) {
        state.budget = budget;
    },
    moveUpList(state, item) {
        let currentIndex = state.items.indexOf(item);
        state.items.splice(currentIndex, 1);
        state.items.splice(currentIndex - 1, 0, item);
    },
    moveDownList(state, item) {
        let currentIndex = state.items.indexOf(item);
        state.items.splice(currentIndex, 1);
        state.items.splice(currentIndex + 1, 0, item);
    },
    removeFromList(state, item) {
        state.items.splice(state.items.indexOf(item), 1);
    },
    saveListToLocalStorage(state){
        localStorage.setItem("shopping-list", JSON.stringify(state))
    },
    loadFromLocalStorage(state) {
        let data = JSON.parse(localStorage.getItem("shopping-list"))
        state.budget = data.budget
        data.items.forEach(item => {
            state.items.push(item)
        })
    },
    putItemInBasket(state, item){
        state.items[state.items.indexOf(item)].inBasket = true
    },
    resetBasket(state){
        state.items.forEach(item => {
            item.inBasket = false
        })
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}