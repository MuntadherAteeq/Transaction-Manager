<script lang="ts">
  import IconBasket from "../../assets/Icon-Basket.svelte";
  export let lapel = "Budget"
</script>

<div class="deal-prop">
  <div class="type">
    <div class="logo">
      <IconBasket />
    </div>
    <p class="label">{lapel}</p>
  </div>
  <div class="value">
    <input class="tag" type="text" />
    <!-- <span class="text">Hello</span>
    <span class="date">Hello</span>
    <span class="phone">Hello</span>
    <span class="email">Hello</span>
    <span class="long-text">Hello</span> -->
  </div>
</div>
