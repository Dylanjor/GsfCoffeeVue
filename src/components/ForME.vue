<style>
@import url("../css/ForME.css");
@import 'quill/dist/quill.core.css';
@import 'quill/dist/quill.snow.css';
@import 'quill/dist/quill.bubble.css';
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
        <div class="F-Top-Help">
          <el-link>
            <i class="el-icon-caret-left" style="margin-left:10px" ></i>写生活经历、感悟、体会、反思
          </el-link>
          <el-link>
            <i class="el-icon-caret-left" style="margin-left:10px" ></i>写工作经历、感悟、体会、反思
          </el-link><el-link>
            <i class="el-icon-caret-left" style="margin-left:10px" ></i>写恋爱日记
          </el-link><el-link>
            <i class="el-icon-caret-left" style="margin-left:10px" ></i>写心情日记
          </el-link><el-link>
            <i class="el-icon-caret-left" style="margin-left:10px" ></i>写观察日记
          </el-link><el-link>
            <i class="el-icon-caret-left" style="margin-left:10px" ></i>写吐槽日记
          </el-link><el-link>
            <i class="el-icon-caret-left" style="margin-left:10px" ></i>写自然日记
          </el-link><el-link>
            <i class="el-icon-caret-left" style="margin-left:10px" ></i>一句话，一段时光....
          </el-link><el-link>
            <i class="el-icon-caret-left" style="margin-left:10px" ></i>总之，记录最真的自己
          </el-link>
        </div>
        <div class="F-Top-Click">
          <el-link @click="showEdit = false" v-show="showEdit">
            <i class="el-icon-s-flag" style="margin-left:10px" ></i>点击此处生崽
          </el-link>
          <el-link @click="showEdit = true" v-show="!showEdit">
            <i class="el-icon-s-flag" style="margin-left:10px" ></i>崽子回去了
          </el-link>
        </div>
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
              <el-link icon="el-icon-star-off" :underline="false" @click="GetDiaryContent(item),showEdit = true">{{item.title}}</el-link>
              <span class="F-Bottom-Left-Title-t2-span">{{item.dateTime}} {{item.mood}} {{item.person}}</span>
            </span>
          </div>
          </div>
        </el-col>
        <el-col :span="17" v-show="showEdit">
          <div class = 'DiaryView'>
            <div class="DiaryViewTop">
              <el-link icon="el-icon-s-opportunity" :underline="false" style="font-weight:bold;font-size:20px;margin-left:20px;margin-right:20px">{{form.title}}</el-link>
              <el-link icon="el-icon-user-solid" :underline="false" style="margin-right:10px">{{form.person}}</el-link>
              <el-link icon="el-icon-map-location" :underline="false" style="margin-right:10px">{{form.address}}</el-link>
              <el-link icon="el-icon-timer" :underline="false" style="margin-right:10px">{{form.dateTime}}</el-link>
              <el-link icon="el-icon-chat-round" :underline="false" style="margin-right:10px">{{form.mood}}</el-link>
              <el-link icon="el-icon-sunny" :underline="false" style="margin-right:10px">{{form.weather}}</el-link>
            </div>
            <div class="DiaryContent">
              <quill-editor
              v-model="form.diarycontent"
              ref='content'
              :options="editorOption"
              @ready="onEditorFocus($event)">
            </quill-editor>
            </div>
          </div>
        </el-col>
        <el-col :span="17" v-show="!showEdit">
          <el-link :underline="false">标题：</el-link><el-input size="small"  v-model="newForm.title" placeholder="四字总结"  style="width:200px;margin-top:30px;margin-bottom:30px;"></el-input>
          <el-link :underline="false">心情：</el-link><el-input size="small" prop="mood" v-model="newForm.mood" placeholder="每天要开开心心" style="width:200px"></el-input>
          <el-link :underline="false">城市：</el-link><el-input size="small" prop="address" v-model="newForm.address" placeholder='永远不会孤独的城市' style="width:200px"></el-input>
          <el-link :underline="false">天气：</el-link><el-input size="small" prop="weather" v-model="newForm.weather" placeholder="晴朗的天愉快的♥" style="width:200px"></el-input>
          <el-link :underline="false">小宝贝：</el-link><el-input size="small" prop="person" v-model="newForm.person" placeholder="Who Are You" style="width:200px"></el-input>
            <quill-editor  ref="text" prop="diarycontent" v-model="newForm.diarycontent" class="myQuillEditor" :options="editorOption" />
            <el-button type="primary" @click="submit" style="margin-top:30px;width:100px">提交</el-button>
        </el-col>
      </el-row>
</div>
</template>
<script>
export default {
  inject: ['reload'],
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
        diarycontent: '',
        dateTime: ''
      },
      newForm: {
        title: '',
        mood: '',
        address: '',
        weather: '',
        person: '',
        diarycontent: '',
        dateTime: '',
        diaryType: 1
      },
      DiaryType: [],
      DiaryTyprTitle: '',
      DiaryContent: [],
      editorOption: {},
      showEdit: true,
      nowType: 0
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
      this.nowType = Type
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
    onEditorFocus (event) {
      event.enable(false)
    }, // 获得焦点事件
    getNowFormatDate () { // 获取当前时间
      var date = new Date()
      var seperator1 = '-'
      var seperator2 = ':'
      var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      var strDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + ' ' + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds()
      return currentdate
    },
    submit () {
      // console.log(this.$refs.text.value)
      var that = this
      that.newForm.dateTime = that.getNowFormatDate()
      that.newForm.diaryType = that.nowType
      if (!that.newForm.title || !that.newForm.mood || !that.newForm.person || !that.newForm.weather || !that.newForm.address || !that.newForm.diarycontent) {
        that.$message({
          type: 'error',
          message: '小犊子填完整再提交'
        })
      } else {
        this.$axios({
          method: 'POST',
          url: that.api.baseURL + 'ForMeClass/InsertDiary',
          data: that.newForm,
          contentType: 'application/json; charset=utf-8'
        }).then((response) => { // 这里使用了ES6的语法
          that.$message({
            type: 'info',
            message: '保存成功'
          })
          that.reload()
        })
      }
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
