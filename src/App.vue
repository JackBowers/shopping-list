<script>
import 'bootstrap'
import AddItemCard from "@/components/AddItemCard.vue";
import ShoppingListCard from "@/components/ShoppingListCard.vue";
import {mapActions} from "vuex";

export default {
  components: {ShoppingListCard, AddItemCard},
  methods: {
    ...mapActions([
        'loadFromLocalStorage'
    ])
  },
  created() {
    this.loadFromLocalStorage();
  }
}
</script>

<template>

  <main class="container">
    <shopping-list-card></shopping-list-card>
    <add-item-card></add-item-card>
  </main>
</template>

<style>
@import 'bootstrap/dist/css/bootstrap.min.css';
@import 'bootstrap-icons';
</style>
