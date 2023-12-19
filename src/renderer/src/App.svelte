<script>
  import ActivityBar from './layout/ActivityBar.svelte'
  import Editor from './layout/Editor.svelte'
  import L_Sidebar from './layout/L-Sidebar.svelte'
  import R_Sidebar from './layout/R-Sidebar.svelte'
  import TitleBar from './layout/TitleBar.svelte'
</script>

<TitleBar />
<div class="app-container">
  <ActivityBar />
  <L_Sidebar />
  <Editor />
  <R_Sidebar />
</div>
