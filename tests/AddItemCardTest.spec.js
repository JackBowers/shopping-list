import { mount } from "@vue/test-utils"
import { describe, it } from 'vitest'
import AddItemCard from "@/components/AddItemCard.vue";
import {createStore} from "vuex"
import ShoppingList from "@/store/modules/shoppingList";

describe('Components/AddItemCard.vue', () => {
    let wrapper
    let actions
    let store
    beforeEach(() => {
        actions = {
            addItemToList: vi.fn()
        }
        store = createStore({
            modules: {
                ShoppingList: {
                    actions
                }
            }
        })
        wrapper = mount(AddItemCard, {
            global:{
                plugins: [store]
            }
        })
    })

    it('renders correctly', () => {
        let title = wrapper.find('h3');
        expect(title.text()).toBe('Add an item to your shopping list')
    })
    it('triggers the addItemToList action on button press', async () => {
        wrapper.find('input[type=text]').value = "Chocolate"
        wrapper.find('input[type=number]').value = 300
        await wrapper.find('button').trigger('click')
        expect(actions.addItemToList).toHaveBeenCalled()
    })
    it('triggers the addItemToList action when enter inside input box', async () => {
        await wrapper.find('input[type=text]').trigger('keyup.enter')
        expect(actions.addItemToList).toHaveBeenCalled()
    })
})