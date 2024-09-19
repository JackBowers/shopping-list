<script>
import { mapActions } from 'vuex'

export default{
  name: 'AddItemCard',
  data() {
    return {
      newItem: {
        name: '',
        price: 0
      }
    }
  },
  methods: {
    ...mapActions(['addItemToList']),
    addItem() {
      this.addItemToList({
        name: this.newItem.name,
        price: this.newItem.price * 100
      });
      this.newItem.name = '';
      this.newItem.price = 0;
    }
  }
}
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h3 class="card-title">Add an item to your shopping list</h3>
      <div class="row">
        <div class="col">
          <input class="form-control" id="name" type="text" v-model="newItem.name" v-on:keyup.enter="addItem"/>
        </div>
        <div class="col">
          <div class="input-group">
            <div class="input-group-text">£</div>
            <input class="form-control" type="number" id="price" v-model="newItem.price" v-on:keyup.enter="addItem"/>
            <label for="price" class="visually-hidden">Price</label>
          </div>
        </div>
      </div>
      <button class="btn btn-primary" @click="addItem">Click</button>
    </div>
  </div>
</template>

<style scoped>

</style>