<script>
import {mapActions, mapGetters} from "vuex";
import {formatPenceAsString} from "../helper/currency.js";

export default {
  name: 'ShoppingListCard',
  data() {
    return {
      budget: this.getBudget
    }
  },
  methods: {
    formatPenceAsString,
    ...mapActions([
        'setBudget',
        'moveUpList',
        'moveDownList',
        'removeFromList',
        'putItemInBasket',
        'resetBasket'
    ]),
    moveUpClick(item){
      this.moveUpList(item)
    },
    moveDownClickS(item){
      this.moveDownList(item)
    },
    remove(item){
      this.removeFromList(item)
    },
    inBasketButton(item){
      this.putItemInBasket(item)
    },
    setBudgetClick(){
      this.setBudget(this.budget * 100)
    }
  },
  computed: {
    ...mapGetters([
        'getTotalPrice',
        'getShoppingList',
        'isAboveBudget',
        'getBudget'
    ])
  },
  created() {
    this.budget = this.getBudget / 100
  }
}


</script>

<template>
  <div class="card">
    <div class="card-header">
      <h2>Your Shopping List</h2>
      <button class="btn btn-warning float-end" @click="resetBasket()">Reset Basket</button>
      <p class="total-price" :class="[isAboveBudget? 'above-budget':'']">Shopping List Total: {{ formatPenceAsString(getTotalPrice) }}</p>
      <div id="budget-container">
        <label for="budget">Set Budget</label>
        <div class="input-group my-2">
          <div class="input-group-prepend">
            <div class="input-group-text">£</div>
          </div>
          <input type="number" class="form-control" v-model="budget" id="budget">
          <button class="btn btn-secondary" @click="setBudgetClick">Set</button>
        </div>
      </div>
    </div>
    <div class="card-body">
      <table class="table">
        <thead>
          <tr>
            <td style="width: 60%">Item</td>
            <td>Price</td>
            <td style="width: 120px">Move</td>
            <td>Remove From List</td>
            <td>In Basket</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in getShoppingList">
            <td :class="[item.inBasket? 'in-basket':'']">{{ item.name }}</td>
            <td :class="[item.inBasket? 'in-basket':'']">{{ formatPenceAsString(item.price) }}</td>
            <td>
              <button
                  v-if="getShoppingList.indexOf(item) > 0"
                  class="btn btn-secondary mx-1"
                  @click="moveUpList(item)">
                <i class="bi bi-arrow-up"></i>
              </button>
              <button
                  v-if="getShoppingList.indexOf(item) < getShoppingList.length - 1"
                  class="btn btn-secondary mx-1 float-end"
                  @click="moveDownList(item)">
                <i class="bi bi-arrow-down"></i>
              </button>
            </td>
            <td>
              <button
                  class="btn btn-danger"
                  @click="remove(item)"
              >
                <i class="bi bi-trash"></i>
              </button>
            </td>
            <td>
              <button
                v-if="!item.inBasket"
                class="btn btn-success put-in-basket"
                @click="inBasketButton(item)"
                >
                Put in Basket
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.in-basket{
  text-decoration: line-through;
}
.total-price{
  display:inline-block;
  padding: 5px;
  border-radius: 4px;
}
.above-budget{
  background-color: red;
  color: white;
}
</style>