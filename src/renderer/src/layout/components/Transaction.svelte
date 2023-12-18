<script>
  export let price = 0;
  export let text = "";

</script>

<div class="transaction {price > 0 ? 'positive' : price < 0 ? 'negative' : ''}">
  <div id="Tran">
    <div id="top-bar">
      <div id="price">
        <span class="price">{price.toFixed(3)}</span>
        <span class="currency">BD</span>
      </div>
    </div>
    <!-- TODO: make tran content as textarea  -->
    <!-- <textarea on:input={handleChange} id="content" value={text} /> -->
    <div id="content">
      {text}
    </div>
    <div id="time">10:26 AM</div>
  </div>
</div>
