<script>
  import DealProp from "./components/DealProp.svelte";
</script>

<div class="record-container">
  <div class="header">
    <div class="logo">Logo</div>
    <div class="name">Name</div>
  </div>
  <div class="prop-list">
    <DealProp lapel="Beget" />
  <DealProp lapel="Date" />
  <DealProp lapel="Tags" />
  <DealProp lapel="Email" />
  <DealProp lapel="Phone" />
  </div>
</div>

<style>
  .record-container {
    padding: 15px;
  }
  .prop-list{
    display: flex;
    flex-direction: column;
    gap: 10px;

  }
</style>
