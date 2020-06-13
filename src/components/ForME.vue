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
        <div id="F-Top-Main">
          <el-link v-for="item in DiaryType" :key="'type'+item.id" @click="DiaryTypeGetContent(item.typeName,item.id)">
            <i class="el-icon-sort-up "></i>{{item.typeName}}
          </el-link>
        </div>
        <el-link>
          <i class="el-icon-s-flag"></i>点击此处生崽
        </el-link>
    </div>
      <el-row>
        <el-col :span="7">
          <div class="F-Bottom-Left-Title">
            <div class="F-Bottom-Left-Title-t1">
              <i class="el-icon-s-promotion"></i>
              <font>{{this.DiaryTyprTitle}}</font>
          </div>
          <div class="F-Bottom-Left-Title-t">
            <span v-for="item in DiaryContent" :key="item.id" class="F-Bottom-Left-Title-t2">
              <el-link icon="el-icon-star-off" :underline="false" @click="GetDiaryContent(item)">{{item.title}}</el-link>
              <span class="F-Bottom-Left-Title-t2-span">{{item.dateTime}} {{item.mood}} {{item.person}}</span>
            </span>
          </div>
          </div>
        </el-col>
        <el-col :span="17">
          <el-link :underline="false">标题：</el-link><el-input v-model="form.title" placeholder="四字总结" class="input"></el-input>
          <el-link :underline="false">心情：</el-link><el-input v-model="form.mood" placeholder="每天要开开心心" class="input"></el-input>
          <el-link :underline="false">城市：</el-link><el-input v-model="form.address" placeholder='永远不会孤独的城市' class="input"></el-input>
          <el-link :underline="false">天气：</el-link><el-input v-model="form.weather" placeholder="晴朗的天愉快的♥" class="input"></el-input>
          <el-link :underline="false">小宝贝：</el-link><el-input v-model="form.person" placeholder="Who Are You" class="input"></el-input>
            <quill-editor  ref="text" v-model="form.diarycontent" class="myQuillEditor" :options="editorOption" />
            <el-button class="button-bottom" type="primary" @click="submit">提交</el-button>
        </el-col>
      </el-row>
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
      },
      form: {
        id: '',
        title: '',
        mood: '',
        address: '',
        weather: '',
        person: '',
        diarycontent: ''
      },
      DiaryType: [],
      DiaryTyprTitle: '',
      DiaryContent: [],
      editorOption: {}
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
    },
    DiaryTypeGetContent (typeName, Type) {
      this.DiaryTyprTitle = typeName
      var that = this
      this.$axios({
        method: 'GET',
        url: that.api.baseURL + 'ForMeClass/GetDiaryByTypeId?Type=' + Type,
        contentType: 'application/json; charset=utf-8'
      }).then((response) => { // 这里使用了ES6的语法
        that.DiaryContent = response.data.result.items
      })
    },
    // 获取日记
    GetDiaryContent (item) {
      this.form = item
    },
    submit () {
      console.log(this.$refs.text.value)
    },
    GetDiaryType () {
      var that = this
      this.$.ajax({
        type: 'POST',
        url: that.api.baseURL + 'ForMeClass/GetAll',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
          that.DiaryTyprTitle = response.result.items[0].typeName
          that.DiaryType = response.result.items
          that.DiaryTypeGetContent(that.DiaryType[0]['typeName'], that.DiaryType[0]['id'])
        }
      })
    }
  },
  mounted: function () {
    var _this = this
    this.timer = setInterval(function () {
      _this.Time()// 修改数据date
    }, 1000)
    this.GetDiaryType()
  },
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer) // 在vue实例销毁钱，清除我们的定时器
    }
  }
}
</script>
