import { mount } from "@vue/test-utils"
import { describe, it } from 'vitest'
import {createStore} from "vuex"
import ShoppingList from "@/store/modules/shoppingList";
import ShoppingListCard from "@/components/ShoppingListCard.vue";

describe('Components/ShoppingListCard.vue', () => {
    let wrapper
    let actions
    let getters
    let store
    beforeEach(() => {
        actions = {
            setBudget: vi.fn(),
            putInBasket: vi.fn()
        }
        getters = {
            getBudget: vi.fn(),
            isAboveBudget: vi.fn(),
            getTotalPrice: vi.fn(),
            getShoppingList: vi.fn()
        }
        store = createStore({
            modules: {
                ShoppingList: {
                    actions,
                    getters
                }
            }
        })
        wrapper = mount(ShoppingListCard, {
            global:{
                plugins: [store]
            }
        })
    })
    it('triggers setBudget action on button press', async () => {
        await wrapper.find('#budget-container button').trigger('click')
        expect(actions.setBudget).toHaveBeenCalled()
    })
})