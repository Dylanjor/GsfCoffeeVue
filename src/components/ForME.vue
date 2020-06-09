<style>
@import url("../css/ForME.css");
</style>
<template>
<div>
    <div id="F-Top">
        <div id="F-Top-Left">
            <span class="Clock">{{this.clock.Y}}</span>
            <span class="Clock">{{this.clock.M}}</span>
            <span class="Clock">{{this.clock.D}}</span>
            <span class="Clock">{{this.clock.H}}</span>
            <span>:</span>
            <span class="Clock">{{this.clock.Mi}}</span>
            <span>:</span>
            <span class="Clock">{{this.clock.S}}</span>
        </div>
        <div id="F-Top-Left-Second">
            <i class="el-icon-user "></i><span>代礼家</span><br>
            <i class="el-icon-sort-up "></i><span>男神</span><br>
            <i class="el-icon-phone "></i><span>1505309****</span><br>
            <i class="el-icon-star-off "></i><span>IT</span><br>
            <i class="el-icon-location-outline "></i><span>山东</span><br>
            <i class="el-icon-ice-cream-round "></i><span>20</span><br>
        </div>
    </div>
</div>
</template>
<script>
export default {
  name: 'ForME',
  data () {
    return {
      clock: {
        Y: '',
        M: '',
        D: '',
        H: '',
        Mi: '',
        S: ''
      }
    }
  },
  methods: {
    Time () {
      // eslint-disable-next-line one-var
      var myDate = new Date(),
        // eslint-disable-next-line no-unused-vars
        Year = myDate.getFullYear(),
        // eslint-disable-next-line no-unused-vars
        Month = myDate.getMonth() + 1,
        // eslint-disable-next-line no-unused-vars
        Day = myDate.getDate(),
        H = myDate.getHours(),
        M = myDate.getMinutes(),
        S = myDate.getSeconds()
      this.clock.Y = Year
      if (H < 10) {
        this.clock.H = '0' + H
      } else {
        this.clock.H = H
      }
      if (Month < 10) {
        this.clock.M = '0' + Month
      } else {
        this.clock.M = Month
      }
      if (Day < 10) {
        this.clock.D = '0' + Day
      } else {
        this.clock.D = Day
      }
      if (M < 10) {
        this.clock.Mi = '0' + M
      } else {
        this.clock.Mi = M
      }
      if (S < 10) {
        this.clock.S = '0' + S
      } else {
        this.clock.S = S
      }
    }
  },
  mounted: function () {
    var _this = this;
    this.timer = setInterval(function () {
      _this.Time()// 修改数据date
    }, 1000)
  },
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer); // 在vue实例销毁钱，清除我们的定时器
    }
  }
}
</script>
