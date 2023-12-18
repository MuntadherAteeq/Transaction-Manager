<script lang="ts">
  import { getActive } from "../States/Activities";
  import sidebar_resize from "../tools/sidebar-resizer";
  import DealRecord from "./DealItem.svelte";
</script>

<div class="l-side-bar" use:sidebar_resize={"right"}>
  <div class="tab-title">
    <span>{$getActive}</span>
  </div>
  <div class="content">
    <DealRecord />
    <DealRecord />
  </div>
</div>
