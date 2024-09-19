// import store from '@/store/index'
import {createStore} from "vuex";
import {expect, afterEach, describe, it, beforeEach} from 'vitest'
import shoppingList from '@/store/modules/shoppingList'

describe('Vuex store', () => {
    let store;
    beforeEach( () => {
        store = createStore({
            modules: {
                shoppingList
            }
        })
        //Reset the budget to 0 and remove any items in the list
        store.commit('setBudget', 0)
        store.getters.getShoppingList.forEach( item => {
            store.commit('removeFromList', item)
        })
    })
    it('can set and get budget', () => {
        store.commit('setBudget', 15000)
        expect(store.getters.getBudget).toEqual(15000)
    })

    it('can sum the total price of items in the list', () => {
        [{
            name: 'Apples',
            price: 150,
            inBasket: false
        },
            {
                name: 'Pears',
                price: 130,
                inBasket: false
            },
            {
                name: 'Bread',
                price: 230,
                inBasket: false
            }].forEach(item => {
            store.commit('addItemToList', item)
        })
        expect(store.getters.getTotalPrice).toBe(510)
    })

    it('can add an item to the shopping list', () => {
        let item = {
            name: 'Apples',
            price: 150,
            inBasket: false
        }
        store.commit('addItemToList', item)
        expect(store.getters.getShoppingList.includes(item)).toBeTruthy()
    })

    it('can mark an item as in the shopping basket', () => {
        let item = {
            name: 'Bread',
            price: 230,
            inBasket: false
        }
        store.commit('addItemToList', item)
        store.commit('putItemInBasket', item)
        expect(store.getters.getShoppingList[store.getters.getShoppingList.indexOf(item)].inBasket).toBe(true)
    })

    it('can move item up the list', () => {
        let firstItem = {
            name: 'Apples',
            price: 150,
            inBasket: false
        }
        store.commit('addItemToList', firstItem)
        let secondItem = {
            name: 'Pears',
            price: 130,
            inBasket: false
        }
        store.commit('addItemToList', secondItem)
        let startIndex = store.getters.getShoppingList.indexOf(secondItem)
        store.commit('moveUpList', secondItem)
        expect(store.getters.getShoppingList.indexOf(secondItem)).toBe(startIndex - 1)
    })

    it('can move item down the list', () => {
        let firstItem = {
            name: 'Apples',
            price: 150,
            inBasket: false
        }
        store.commit('addItemToList', firstItem)
        let startIndex = store.getters.getShoppingList.indexOf(firstItem)
        let secondItem = {
            name: 'Pears',
            price: 130,
            inBasket: false
        }
        store.commit('addItemToList', secondItem)
        store.commit('moveDownList', firstItem)
        expect(store.getters.getShoppingList.indexOf(firstItem)).toBe(startIndex + 1)
    })
    it('resets the basket when resetBasket is called', () => {
        let item = {
            name: 'Apples',
            price: 150,
            inBasket: true
        }
        store.commit('addItemToList', item)
        store.commit('resetBasket')
        expect(store.getters.getShoppingList.find(item => item.inBasket)).toBeUndefined()
    })
})