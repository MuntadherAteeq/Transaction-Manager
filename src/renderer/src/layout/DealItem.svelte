<script lang="ts">
  // import { Tray, nativeImage } from "electron";
  import avatar from "../../../../resources/Avatar.png?asset";
  // let tray = new Tray(nativeImage.createFromPath(avatar))
  console.log(avatar)
  // console.log(tray)
</script>

<div class="deal-item">
  <div class="avatar-container">
    <img alt="avatar" src={avatar} />
  </div>
  <div class="info-container">
    <div class="top">
      <div class="name">Muntadher Ahmed Ateeq</div>
    </div>
    <div class="bottom">
      <div class="date">2023</div>
      <div class="total positive">+30.000</div>
    </div>
  </div>
</div>
