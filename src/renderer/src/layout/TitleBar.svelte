<script lang="ts">
  import IconX from "../assets/Icon-X.svelte";
  import IconMinus from "../assets/Icon-Minus.svelte";
  import IconSquare from "../assets/Icon-Square.svelte";
  import LogoBlue from "../assets/logo-Blue.svelte";
  import IconSearch from "../assets/Icon-Search.svelte";
</script>

<div class="title-bar">
  <div class="options">
    <LogoBlue />
    <button>New</button>
  </div>
  <button class="search"><IconSearch /> Search</button>
  <div class="actions">
    <IconMinus />
    <IconSquare />
    <IconX />
  </div>
</div>
