<script lang="ts">
  import sidebar_resize from "../tools/sidebar-resizer";
  import DealRecord from "./DealRecord.svelte";
</script>

<div class="r-side-bar" use:sidebar_resize={"left"}>
  <div class="tab-title">
    <span>Record</span>
  </div>
  <DealRecord/>
</div>

