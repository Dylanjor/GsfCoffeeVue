<style>
@import url("../css/CoffeeDoor.css");
</style>
<template>
  <div>
    <transition name="el-fade-in">
      <el-backtop></el-backtop>
    </transition>
  <!-- 整整一页 -->
    <el-container>
    <!--左侧不可滑动-->
      <div width="30%" class="cof-aside">
        <!-- 左侧头 -->
          <div class="cof-top" id="cof-Top">
            <img class="logo" :src="logopic" @click="changemainright(0)">
            Coffee
            <img class="menu" v-on:click= "changeuser" :src="flag?menupic:crosspic">
            <!-- <i class="el-icon-s-operation,menu"></i> -->
          </div>
        <!-- 登陆注册入口-->
          <transition name="el-fade-in">
            <div class="cof-font" id="cof-Font" v-show="showldiv == 0">
              惬意生活，来杯咖啡
              <br>
              <el-button icon="el-icon-user" type="primary" plain @click ="ltrdrawer = true">登录</el-button>
              <el-button icon="el-icon-edit" type="success" plain @click ="drawer = true">注册</el-button>
            </div>
          </transition>
        <!-- 登陆后账号页 -->
          <transition name="el-fade-in">
            <div class="cof-font" v-show="showldiv == 1">
              账  号:{{this.sessionNum}}
              <br>
              用户名:{{this.sessionName}}
              <br>
              <el-button type="text" @click="dialogVisible=true">退出</el-button>
              <el-button type="text" @click="udpatedrawermothod">修改账户信息</el-button>
              <el-button type="text" @click="shoppingFormVisible=true">购物车</el-button>
              <el-button type="text" @click="showRegister" v-show="sessionName === 'admin'">用户管理信息</el-button>
              <el-button type="text" @click="showComm" v-show="sessionName === 'admin'">商品信息添加</el-button>
            </div>
          </transition>
        <!-- 菜单页 -->
          <transition name="el-fade-in">
          <div class="cof-main-right" v-show="showldiv == 2">
              <ul class="ul-menu">
                <!-- <li>{{ this.sessionName }}</li> -->
                <li>菜单
                  <ul>
                      <li><i @click="changemainright(1)">咖啡</i></li>
                      <li><i @click="changemainright(2)">美食</i></li>
                      <li><i @click="changemainright(3)">饮料</i></li>
                      <!-- <li><i @click="changemainright(4)">商品</i></li> -->
                  </ul>
                  </li>
              </ul>
          </div>
          </transition>
      </div>
    <!--右侧可滑动-->
      <!-- 主界面 -->
        <el-main id="rightel" v-show="this.showmain == 0" lazy>
          <!-- <el-main v-show="showmain"> -->
            <!--卡片走马灯-->
            <el-carousel :interval="4000" type="card">
              <el-carousel-item v-for="item in listpic" :key="item">
                <img :src='item' width="100%" height="100%">
              </el-carousel-item>
            </el-carousel>
            <div class="cof-main-Main">
              Coffee<br>
              <font>
                燕子飞回来了秋天是不是要开始了
              </font>
            </div>
            <div class="cof-main-Introduction">
              <!-- 网站简介 -->
              <el-steps :active="clickTimeNum" align-center>
                <el-step @click.native="clickTime(1)" title="念头" description="刚开始有一些念头"></el-step>
                <el-step @click.native="clickTime(2)" title="看书" description="初始了解咖啡的知识：咖啡豆主要出售阿拉比卡种和罗伯斯塔种"></el-step>
                <el-step @click.native="clickTime(3)" title="体验" description="准备去往地点：青岛、烟台、上海、杭州、北京"></el-step>
                <el-step @click.native="clickTime(4)" title="准备" description="确立装修风格与营销风格"></el-step>
              </el-steps>
            </div>
            <div class="cof-main-featured">
              <div class="cof-main-featured-one"></div>
              <div class="cof-main-featured-two"></div>
              <div class="cof-main-featured-three"></div>
            </div>
            <el-divider content-position="left">Coffee</el-divider>
            <div class="cof-main-big-img">
              <!-- <font>活动介绍</font> -->
            </div>
        </el-main>
      <!-- 咖啡页 -->
        <el-main id="rightcoffee" v-show="this.showmain == 1">
          <!-- 加个图片 -->
            <img :src="coffeelistbigimg" width="100%">
            <div class="rightcoffee-Cherry-blossoms">
              <span>早樱初绽</span><br>
              <font>早樱初绽的美好时节怎能错过。浓醇咖啡交织淡雅樱花般的清香，绵密奶泡与樱花风味酱
              协奏出丝绒般口感，这一杯饱满而清甜不腻的樱花初绽玛奇朵，带来樱花初绽般的清新典
              雅。而樱花初绽抹茶拿铁樱花般的清香包裹柔滑白巧克力般甜香搭配纯正抹茶，像初春的
              新叶陪衬粉嫩的花苞，尽享此刻樱开。</font>
            </div>
          <!-- 选择性卡片 -->
            <div class="block">
              <div class="block-left">
                <ul>
                  <!--  -->
                  <li class="block-left-one" style="background:white" v-if="changecoffeelistpic==0">
                      <font>小燕子系列</font><br>
                      <font style="font-size:10px;color:gray">Swallow Coffee</font>
                  </li>
                  <li class="block-left-one" @click="changecoffeelistpicf(0)" v-if="changecoffeelistpic!=0">
                      <font>小燕子系列</font><br>
                      <font style="font-size:10px;color:gray">Swallow Coffee</font>
                  </li>
                  <!--  -->
                  <li class="block-left-one" style="background:white" v-if="changecoffeelistpic==1">
                      <font>小松鼠系列</font><br>
                      <font style="font-size:10px;color:gray">Squirrel Coffee</font>
                  </li>
                  <li class="block-left-one" @click="changecoffeelistpicf(1)" v-if="changecoffeelistpic!=1">
                      <font>小松鼠系列</font><br>
                      <font style="font-size:10px;color:gray">Squirrel Coffee</font>
                  </li>
                  <!--  -->
                  <li class="block-left-one" style="background:white" v-if="changecoffeelistpic==2">
                      <font>老鹰系列</font><br>
                      <font style="font-size:10px;color:gray">Eagle Coffee</font>
                  </li>
                  <li class="block-left-one" @click="changecoffeelistpicf(2)" v-if="changecoffeelistpic!=2">
                      <font>老鹰系列</font><br>
                      <font style="font-size:10px;color:gray">Eagle Coffee</font>
                  </li>
                  <!--  -->
                  <li class="block-left-one" style="background:white" v-if="changecoffeelistpic==3">
                      <font>老虎系列</font><br>
                      <font style="font-size:10px;color:gray">Tigle Coffee</font>
                  </li>
                  <li class="block-left-one" @click="changecoffeelistpicf(3)" v-if="changecoffeelistpic!=3">
                      <font>老虎系列</font><br>
                      <font style="font-size:10px;color:gray">Tigle Coffee</font>
                  </li>
                </ul>
              </div>
              <el-carousel v-show="changecoffeelistpic==0">
                <el-carousel-item v-for="item in coffeelistpic" :key="item">
                  <img :src="item" width="100%" height="100%">
                </el-carousel-item>
              </el-carousel>
              <el-carousel v-show="changecoffeelistpic==1">
                <el-carousel-item v-for="item in coffeelistpictwo" :key="item">
                  <img :src="item" width="100%" height="100%">
                </el-carousel-item>
              </el-carousel>
              <el-carousel v-show="changecoffeelistpic==2">
                <el-carousel-item v-for="item in coffeelistpicthree" :key="item">
                  <img :src="item" width="100%" height="100%">
                </el-carousel-item>
              </el-carousel>
              <el-carousel v-show="changecoffeelistpic==3">
                <el-carousel-item v-for="item in coffeelistpicfour" :key="item">
                  <img :src="item" width="100%" height="100%">
                </el-carousel-item>
              </el-carousel>
            </div>
          <!-- allCoffee -->
            <el-divider content-position="left">All-Coffee</el-divider>
            <div class="rightcoffee-all-coffee">
              <font>所有新品</font>
              <div class="rightcoffee-all-coffee-block" v-for="fit in urlallcoffee" :key="fit.name">
                <span class="demonstration">{{ fit.name }}</span>
                <el-image
                  style="width: 150px; height: 150px"
                  :src="fit.url"
                  :fit="'contain'" @click="CommDialogVisible = true,CommId = fit.id,commUrl = fit.url,commMessage = fit.desc,CommUnitPrice = fit.sellingPrice,commName = fit.name"></el-image>
              </div>
            </div>
        </el-main>
      <!-- 美食页 -->
        <el-main id="rightmeishi" v-show="this.showmain == 2">
          <div>
            <span>烘培</span>
            <ul class="cof-rightyinliaoul" style="border-bottom: 1px solid rgb(192,196,204);">
              <li v-for="item in meishihongpei" :key="item.id" @click="CommDialogVisible = true,CommId = item.id,commMessage = item.desc,CommUnitPrice = item.sellingPrice,commUrl = item.commImage,commName = item.commodityName">
                <img :src="item.commImage">
                <font>{{item.commodityName}}</font>
              </li>
            </ul>
          </div>
          <div>
            <span>手工调制浓缩咖啡</span>
            <ul class="cof-rightyinliaoul" >
              <li v-for="item in coffeenongsuo" :key="item.id" @click="CommDialogVisible = true,CommId = item.id,commMessage = item.desc,CommUnitPrice = item.sellingPrice,commUrl = item.commImage,commName = item.commodityName">
                <img :src="item.commImage">
                <font>{{item.commodityName}}</font>
              </li>
            </ul>
          </div>
        </el-main>
      <!-- 饮料页 -->
        <el-main id="rightyinliao" v-show="this.showmain == 3">
          <!-- 想着可循环 -->
          <div>
            <span>咖啡融合冰淇淋</span>
            <ul class="cof-rightyinliaoul" style="border-bottom: 1px solid rgb(192,196,204);">
              <li v-for="item in coffeeronghebingjilin" :key="item.id" @click="CommDialogVisible = true,CommId = item.id,commMessage = item.desc,CommUnitPrice = item.sellingPrice,commUrl = item.commImage,commName = item.commodityName">
                <img :src="item.commImage">
                <font>{{item.commodityName}}</font>
              </li>
            </ul>
          </div>
          <div>
            <span>经典巧克力饮品</span>
            <ul class="cof-rightyinliaoul" style="border-bottom: 1px solid rgb(192,196,204);">
              <li v-for="item in coffeeqiaokeli" :key="item.id" @click="CommDialogVisible = true,CommId = item.id,commMessage = item.desc,CommUnitPrice = item.sellingPrice,commUrl = item.commImage,commName = item.commodityName">
                <img :src="item.commImage">
                <font>{{item.commodityName}}</font>
              </li>
            </ul>
          </div>
          <div>
            <span>星巴克冷萃咖啡系列</span>
            <ul class="cof-rightyinliaoul" style="border-bottom: 1px solid rgb(192,196,204);">
              <li v-for="item in coffeeronghebingjilin" :key="item.id" @click="CommDialogVisible = true,CommId = item.id,commMessage = item.desc,CommUnitPrice = item.sellingPrice,commUrl = item.commImage,commName = item.commodityName">
                <img :src="item.commImage">
                <font>{{item.commodityName}}</font>
              </li>
            </ul>
          </div>
          <div>
            <span>手工调制浓缩咖啡</span>
            <ul class="cof-rightyinliaoul" >
              <li v-for="item in coffeenongsuo" :key="item.id" @click="CommDialogVisible = true,CommId = item.id,commMessage = item.desc,CommUnitPrice = item.sellingPrice,commUrl = item.commImage,commName = item.commodityName">
                <img :src="item.commImage">
                <font>{{item.commodityName}}</font>
              </li>
            </ul>
          </div>
        </el-main>
      <!-- 商品页 -->
        <!-- <el-main id="rightshangpin" v-show="this.showmain == 4">
        </el-main> -->
    <!-- 注册、登录、修改账户信息 -->
      <!-- 注册 -->
        <el-drawer
          title="注册"
          direction="ltr"
          :visible.sync="drawer"
          :with-header="false">
          <el-form ref="form" :model="form" :rules="rules"  label-width="80px">
            <span class="cof-title">G S F</span>
            <el-form-item label="姓名" prop="name">
              <el-input v-model.trim="form.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <!-- <el-input type="textarea" v-model="form.desc"></el-input> -->
              <el-input :type="passw"  v-model.trim="form.password" autocomplete="off">
                <!-- input中加图标必须要有slot="suffix"属性，不然无法显示图标 -->
                <i slot="suffix" :class="icon" @click="showPass" ></i>
              </el-input>
            </el-form-item>
            <el-form-item label="性别" prop="resource">
              <el-radio-group v-model="form.resource">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="手机号码" prop="tel">
              <el-input v-model.number="form.tel"></el-input>
            </el-form-item>
            <el-form-item label="生日" prop="date">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="生日" value-format="yyyy-MM-dd" v-model="form.date" style="width: 100%;" :editable='false'></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="店面" prop="region">
              <el-select v-model="form.region" placeholder="店面选择">
                <el-option label="青岛" value="青岛"></el-option>
                <el-option label="烟台" value="烟台"></el-option>
                <el-option label="杭州" value="杭州"></el-option>
                <el-option label="上海" value="上海"></el-option>
                <el-option label="北京" value="北京"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="VIP" prop="delivery">
              <el-switch v-model="form.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="爱好" prop="type">
              <el-checkbox-group v-model="form.type">
                <el-checkbox label="咖啡" name="type"></el-checkbox>
                <el-checkbox label="奶茶" name="type"></el-checkbox>
                <el-checkbox label="书籍" name="type"></el-checkbox>
                <el-checkbox label="面包" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit" :loading="loading">立即创建</el-button>
              <el-button @click="drawer=false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-drawer>
      <!-- 登录 -->
        <el-drawer
        title="登录"
        direction="ltr"
        :visible.sync="ltrdrawer"
        :with-header="false">
          <el-form :model="logform" status-icon :rules="logrules" ref="logform" class="demo-ruleForm" label-width="80px">
            <span class="cof-title">G S F</span>
            <el-form-item label="账号" prop="numbering" placeholder="手机号或者编号"
            :rules="[
              { required: true, message: '账号不能为空'},
              { type: 'number', message: '账号必须为数字值'}
            ]">
              <el-input type='numbering' v-model.number="logform.numbering" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
            <el-input :type="logpassw"  v-model.trim="logform.password" autocomplete="off">
                <i slot="suffix" :class="logicon" @click="showlogPass" ></i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onlog" v-loading="loading">登录</el-button>
            <el-button @click="ltrdrawer=false">取消</el-button>
          </el-form-item>
          </el-form>
        </el-drawer>
      <!-- 修改 -->
        <el-drawer
          title="修改"
          direction="ltr"
          :visible.sync="udpatedrawer"
          :with-header="false">
          <el-form ref="updateform" :model="updateform" :rules="rules"  label-width="80px">
            <span class="cof-title">G S F</span>
            <el-form-item label="姓名" prop="name">
              <el-input v-model.trim="updateform.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <!-- <el-input type="textarea" v-model="form.desc"></el-input> -->
              <el-input :type="passw"  v-model.trim="updateform.password" autocomplete="off">
                <!-- input中加图标必须要有slot="suffix"属性，不然无法显示图标 -->
                <i slot="suffix" :class="icon" @click="showPass" ></i>
              </el-input>
            </el-form-item>
            <el-form-item label="性别" prop="resource">
              <el-radio-group v-model="updateform.resource">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="手机号码" prop="tel">
              <el-input v-model.number="updateform.tel"></el-input>
            </el-form-item>
            <el-form-item label="生日" prop="date">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="生日" v-model="updateform.date" value-format="yyyy-MM-dd"  style="width: 100%;" :editable='false'></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="店面" prop="region">
              <el-select v-model="updateform.region" placeholder="店面选择">
                <el-option label="青岛" value="青岛"></el-option>
                <el-option label="烟台" value="烟台"></el-option>
                <el-option label="杭州" value="杭州"></el-option>
                <el-option label="上海" value="上海"></el-option>
                <el-option label="北京" value="北京"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="VIP" prop="delivery">
              <el-switch v-model="updateform.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="爱好" prop="type">
              <el-checkbox-group v-model="updateform.type">
                <el-checkbox label="咖啡" name="type"></el-checkbox>
                <el-checkbox label="奶茶" name="type"></el-checkbox>
                <el-checkbox label="书籍" name="type"></el-checkbox>
                <el-checkbox label="面包" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="udpate" :loading="loading">修改</el-button>
              <el-button @click="udpatedrawer=false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-drawer>
    <!-- 提示框Dialog -->
      <!-- 退出提示 -->
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%">
        <span>是否要退出当前:{{this.sessionName}}账号</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="quit">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 商品显示信息 -->
      <el-dialog
        :title=this.commName
        :visible.sync="CommDialogVisible"
        width="40%"
        :before-close="ShoppingClose"
        center>
        <div class="CommDilog">
          <img :src="commUrl">
          <div class="CommDilog-Num">
            <span class="commMain">{{this.commMessage}}</span><br><br>
            <span class="commMain">单价:{{this.CommUnitPrice}}</span>
             <div class="commSpecification">
                  <el-radio-group v-model="Commspe" size="small" lable="规格">
                    <el-radio-button label="大杯"></el-radio-button>
                    <el-radio-button label="中杯"></el-radio-button>
                    <el-radio-button label="小杯"></el-radio-button>
                  </el-radio-group>
                <el-input-number v-model="Commnum" controls-position="right" @change="CommNumChange" :min="1" size="small"></el-input-number>
              </div>
          </div>
          <div style="width:100%;text-align:right">总价格:{{this.CommUnitPrice * this.Commnum}}  <el-button type="text" class="eb-insert" @click="InsertShopping">添加至购物车</el-button></div>
        </div>
        <!-- <span slot="footer" class="dialog-footer">
          <el-button @click="CommDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="CommDialogVisible = false">确 定</el-button>
        </span> -->
      </el-dialog>
      <!-- 购物车页 -->
      <el-dialog title="购物车" :visible.sync="shoppingFormVisible"
<<<<<<< HEAD
      width="40%">
=======
        width="40%">
>>>>>>> 7820f1b1f36f9e534187612d0b1b1f6b7e984926
         <el-checkbox v-model="shoppingcheckAll" @change="spCheckAllChange">全选</el-checkbox>
         <div class="gwcCommDilog" id="root">
              <div style="margin: 15px 0;"></div>
            <ul class="shopping-rightyinliaoul" style="border-bottom: 1px solid rgb(192,196,204);">
              <li v-for="item in shoppingxinxi" :key="item.name" >
                <el-checkbox class="shoppingchecked"  v-model="item.checkModel"  @change="sphCheckedChange"></el-checkbox>
                <img :src="item.url">
                <font>{{item.name}}</font>
<<<<<<< HEAD
                <font>{{item.danjia}}</font>
                <el-input-number v-model="item.qty" class="shoppingnum" @change="sphandleChange(item.qty)" :min="0" size="mini" label="数量"></el-input-number>
                <font>总：{{item.danjia*item.qty}}</font>
                <font>总：{{allnum = allnum + item.danjia*item.qty}}</font>
=======
                <font v-model="shoppingData.danjia"></font>
                <el-input-number v-model="item.qty" ref="one" class="shoppingnum" @change="sphandleChange(item.qty)" :min="0" size="mini" label="数量"></el-input-number>
                <font v-model="shoppingData.spzong">总：</font>
>>>>>>> 7820f1b1f36f9e534187612d0b1b1f6b7e984926
              </li>
            </ul>
          </div>
      <div slot="footer" class="dialog-footer">
      </div>
     <font class="shpzj">总计:</font>
      <div slot="footer" class="dialog-footer">
        <el-button @click="shoppingFormVisible = false">取 消</el-button>
        <el-button @click="shoppingFormVisible = false" type="primary">购买</el-button>
      </div>
     </el-dialog>
    </el-container>
  </div>
</template>
<script>
// 需要单独引用Message
import { Message } from 'element-ui'
const shpOptions = ['']
export default{
  // template: '<div @click="gwchandleClick">{{number}}</div>',
  data () {
    // 密码的判断
    // eslint-disable-next-line no-unused-vars
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    // 手机号的正则表达式
    // eslint-disable-next-line no-unused-vars
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        console.log(reg.test(value))
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的手机号'))
        }
      }
    }
    return {
      allchecked: false, // 全选
      clickTimeNum: 1,
      allnum: 0,
      flag: true,
      loading: false,
      showldiv: 0,
      showmain: 0,
      drawer: false,
      ltrdrawer: false,
      udpatedrawer: false,
      dialogVisible: false,
      passw: 'password',
      logpassw: 'password',
      udpatedata: '',
      icon: 'el-input__icon el-icon-view',
      logicon: 'el-input__icon el-icon-view',
      menupic: require('../picture/Menu.png'),
      crosspic: require('../picture/Cross.png'),
      logopic: require('../picture/coffeelogo.png'),
      listpic: [],
      sessionid: '',
      sessionName: '',
      sessionNum: '',
      sessionPass: '',
      commUrl: '',
      commMessage: '',
      commName: '',
      CommId: '',
      CommUnitPrice: '',
      CommDialogVisible: false,
      Commnum: 1,
      Commspe: '中杯',
      form: {
        name: '',
        region: '青岛',
        date: '',
        delivery: false,
        type: [],
        resource: '男',
        password: '',
        tel: ''
      },
      logform: {
        name: '',
        numbering: '',
        password: ''
      },
      updateform: {
        name: '',
        region: '',
        date: '',
        delivery: false,
        password: '',
        type: [],
        resource: '',
        tel: ''
      },
      // 购物车页面
      shoppingData: [{
        commodityId: '',
        qty: '',
        createTime: '',
        isBought: '',
        boughtTime: '',
        founderId: ''
      }],
      // 购物车全选框
      shoppingcheckAll: false,
      checkedSHP: [''],
      shp: shpOptions,
      // shoppingchecked: true,
      shoppingFormVisible: false,
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择店面', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: false, message: '生日可不填', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: false, message: '尽量选择一个爱好', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        password: [
          { required: true, validator: this.validatePass, message: '请输入密码', trigger: 'change' }
        ],
        tel: [
          // eslint-disable-next-line standard/object-curly-even-spacing
          { required: true, validator: checkPhone, message: '请输入正确的手机号', trigger: 'blur'}
        ]
      },
      logrules: {
        password: [
          {validator: this.validatePass, message: '请输入密码', trigger: 'blur'}
        ]
      },
      coffeelistpic: [],
      coffeelistpictwo: [],
      coffeelistpicthree: [],
      coffeelistpicfour: [],
      urlallcoffee: [],
      coffeelistbigimg: 'https://i2.tiimg.com/715304/6c23b5c2514c989d.png',
      changecoffeelistpic: 0,
      coffeeronghebingjilin: [],
      coffeeqiaokeli: [],
      coffeenongsuo: [],
      meishihongpei: [],
      shoppingxinxi: []
    }
  },
  methods: {
    // 跳转页面 这个方法没有按钮来实现 直接加个按钮就可以跳转了Register对应router下index.js的router路径
    goCoffeeRegister () {
      // eslint-disable-next-line standard/object-curly-even-spacing
      // this.$router.push({ name: 'Register'})
    },
    showRegister () {
      // eslint-disable-next-line standard/object-curly-even-spacing
      this.$router.push({ name: 'Register'})
    },
    showComm () {
      // eslint-disable-next-line standard/object-curly-even-spacing
      this.$router.push({ name: 'CommUser'})
    },
    // zongji () {
    //   // let sum = 0
    //   // this.shoppingxinxi.forEach((item) => {
    //   //   sum += item.danjia
    //   // })
    //   // // 返回
    //   // this.sum = sum
    //   var sum = 0
    //   for (var i = 0; i < this.shoppingxinxi.length; i++) {
    //     sum += parseInt(this.danjia[i])
    //   }
    //   this.sum = sum
    // },
    // 计数器
    sphandleChange (value) {
      console.log(value)
    },
    // 点击时间流
    clickTime (event) {
      this.clickTimeNum = event
    },
    // 初始化
    onload () {
      // alert(localStorage.getItem('username'))
      if (localStorage.getItem('username')) {
        this.sessionNum = localStorage.getItem('usernum')
        this.sessionName = localStorage.getItem('username')
        this.sessionid = localStorage.getItem('id')
        this.showldiv = 1
      }
      this.listpic = [
        'https://s1.ax1x.com/2020/04/22/JYrMaF.jpg',
        'https://s1.ax1x.com/2020/04/22/JYrKVU.jpg',
        'https://s1.ax1x.com/2020/04/22/JYrnbT.jpg',
        'https://s1.ax1x.com/2020/04/22/JYrE2n.jpg',
        'https://s1.ax1x.com/2020/04/22/JYrA8s.jpg',
        'https://s1.ax1x.com/2020/04/22/JYrkCj.jpg']
      this.coffeelistpic = [
        'https://i2.tiimg.com/715304/9bd7366ed88a3aee.jpg',
        'https://i2.tiimg.com/715304/479c5aaca7818f49.jpg',
        'https://i2.tiimg.com/715304/87fb69f67e512da1.jpg'
      ]
      this.coffeelistpictwo = [
        'https://i2.tiimg.com/715304/5dde0fd0b012c5fc.jpg',
        'https://i2.tiimg.com/715304/e686ac376e496800.jpg',
        'https://i2.tiimg.com/715304/f6a2acf22b044f58.jpg',
        'https://i2.tiimg.com/715304/a184eefa1554259b.jpg'
      ]
      this.coffeelistpicthree = [
        'https://i2.tiimg.com/715304/5dde0fd0b012c5fc.jpg',
        'https://i2.tiimg.com/715304/e686ac376e496800.jpg',
        'https://i2.tiimg.com/715304/f6a2acf22b044f58.jpg',
        'https://i2.tiimg.com/715304/479c5aaca7818f49.jpg',
        'https://i2.tiimg.com/715304/87fb69f67e512da1.jpg'
      ]
      this.coffeelistpicfour = [
        'https://i2.tiimg.com/715304/5dde0fd0b012c5fc.jpg',
        'https://i2.tiimg.com/715304/e686ac376e496800.jpg',
        'https://i2.tiimg.com/715304/f6a2acf22b044f58.jpg',
        'https://i2.tiimg.com/715304/a184eefa1554259b.jpg',
        'https://i2.tiimg.com/715304/479c5aaca7818f49.jpg',
        'https://i2.tiimg.com/715304/87fb69f67e512da1.jpg'
      ]
      this.urlallcoffee = [
        {'name': '樱花初绽玛奇朵', url: 'https://s1.ax1x.com/2020/04/22/JY6SDx.png'},
        {'name': '樱花初绽抹茶', url: 'https://s1.ax1x.com/2020/04/22/JYyzK1.png'},
        {'name': '樱花初绽抹茶拿铁', url: 'https://s1.ax1x.com/2020/04/22/JYyj29.png'},
        {'name': '落樱飘雪冷萃', url: 'https://s1.ax1x.com/2020/04/22/JYyX8J.png'},
        {'name': '春茶牛乳蛋糕', url: 'https://s1.ax1x.com/2020/04/22/JYyvvR.png'},
        {'name': '盛樱蛋糕（树莓风味）', url: 'https://s1.ax1x.com/2020/04/22/JY6pb6.png'},
        {'name': '粉樱乳酪卷（草莓味）', url: 'https://s1.ax1x.com/2020/04/22/JY6CVK.png'},
        {'name': '星巴克®春意礼赞综合咖啡豆', url: 'https://s1.ax1x.com/2020/04/22/JY6PUO.png'},
        {'name': '星巴克®单一产地系列苏拉维西托拉贾咖啡豆', url: 'https://s1.ax1x.com/2020/04/22/JY6i5D.png'},
        {'name': '星巴克臻选™肯尼亚 芭拉吉山 咖啡豆', url: 'https://s1.ax1x.com/2020/04/22/JY6kPe.jpg'},
        {'name': '星巴克臻选™卢旺达 穆洪多咖啡豆', url: 'https://s1.ax1x.com/2020/04/22/JY6A8H.jpg'},
        {'name': '星巴克臻选™巴西 加利福尼亚庄园', url: 'https://s1.ax1x.com/2020/04/22/JY6E2d.png'},
        {'name': '星巴克臻选™日晒埃塞俄比亚 耶加雪菲 雪冽图咖啡豆', url: 'https://s1.ax1x.com/2020/04/22/JY6VxA.png'},
        {'name': '17oz樱花小鹿款冷饮玻璃杯', url: 'https://s1.ax1x.com/2020/04/22/JY6eKI.png'},
        {'name': '12oz粉色野餐水球造型随行杯', url: 'https://s1.ax1x.com/2020/04/22/JY6nqP.jpg'},
        {'name': '14oz萌猫樱花款茶漏配玻璃杯', url: 'https://s1.ax1x.com/2020/04/22/JY6KVf.jpg'}
      ]
      var that = this
      that.$.ajax({
        type: 'POST',
        url: 'http://106.15.75.186:8080/api/services/app/Commodity/GetAllComm',
        data: {ProdSpec: 1},
        success: function (response) {
          that.meishihongpei = response.result.items
        }
      })
      that.$.ajax({
        type: 'POST',
        url: 'http://106.15.75.186:8080/api/services/app/Commodity/GetAllComm',
        data: {ProdSpec: 3},
        success: function (response) {
          that.coffeeronghebingjilin = response.result.items
        }
      })
      that.$.ajax({
        type: 'POST',
        url: 'http://106.15.75.186:8080/api/services/app/Commodity/GetAllComm',
        data: {ProdSpec: 2},
        success: function (response) {
          that.coffeenongsuo = response.result.items
        }
      })
      that.$.ajax({
        type: 'POST',
        url: 'http://106.15.75.186:8080/api/services/app/Commodity/GetAllComm',
        data: {ProdSpec: 4},
        success: function (response) {
          that.coffeeqiaokeli = response.result.items
        }
      })
      // 购物车
      this.shoppingxinxi = [
        {'checkModel': false, 'name': '麦芽冷翠', 'danjia': 2, 'qty': '1', url: 'https://www.starbucks.com.cn/images/products/cappuccino.jpg'},
        {'checkModel': false, 'name': '麦芽冷翠1', 'danjia': 2, 'qty': '1', url: 'https://www.starbucks.com.cn//images/products/vanilla-flavored-cream-frappuccino-blended-beverage.jpg'},
        {'checkModel': false, 'name': '麦芽冷翠2', 'danjia': 3, 'qty': '1', url: 'https://www.starbucks.com.cn/images/products/cold-foam-cold-brew.jpg'},
        {'checkModel': false, 'name': '麦芽冷翠2', 'danjia': 4, 'qty': '1', url: 'https://www.starbucks.com.cn/images/products/cold-foam-cold-brew.jpg'},
        {'checkModel': false, 'name': '麦芽冷翠2', 'danjia': 4, 'qty': '1', url: 'https://www.starbucks.com.cn/images/products/cold-foam-cold-brew.jpg'}
      ]
    },
    // 注册提交
    onSubmit () {
      this.loading = true
      // eslint-disable-next-line no-unused-vars
      var that = this
      var registerParams = {
        'Name': that.form.name,
        'Region': that.form.region,
        'Date': that.form.date,
        'Delivery': that.form.delivery,
        'Type': that.form.type.join(), // 将数组转化为字符串join(),字符串转换为数组split(',')
        'Resource': that.form.resource,
        'PassWord': that.form.password,
        'Tel': that.form.tel,
        'Deprecated': false,
        'DeprecatedTime': ''
      }
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$.ajax({
            type: 'POST',
            url: 'http://106.15.75.186:8080/api/services/app/GsfInit/Register',
            data: JSON.stringify(registerParams),
            contentType: 'application/json',
            success: function (response) {
              that.sessionid = response.result // id
              that.$alert('您注册的ID是' + response.result + '。点击确定获取您登录用的账号', '注册成功', {
                confirmButtonText: '确定',
                callback: action => {
                  // eslint-disable-next-line no-unused-vars
                  that.$.ajax({
                    type: 'GET',
                    url: 'http://106.15.75.186:8080/api/services/app/GsfInit/GetByid?id=' + parseInt(response.result),
                    success: function (response) {
                      that.$message({
                        type: 'info',
                        message: `编号: ${response.result}`
                      })
                      that.sessionName = that.form.name // 名称
                      that.sessionNum = response.result // 编号
                      that.sessionPass = that.form.password
                      that.$refs['form'].resetFields()
                      that.drawer = false
                      that.loading = false
                      that.showldiv = 1
                      // 设置localStroage值
                      localStorage.setItem('username', that.form.name)
                      localStorage.setItem('usernum', response.result)
                      localStorage.setItem('id', that.sessionid)
                    }
                  })
                }
              })
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
              alert('XMLHttpRequest:' + XMLHttpRequest.status + ',textStatus:' + XMLHttpRequest.readyState + ',errorThrown:' + textStatus)
              that.loading = false
            }
          })
        } else {
          console.log('error submit!!')
          that.loading = false
          return false
        }
      })
    },
    // 显示注册密码
    showPass () {
      // 点击图标是密码隐藏或显示
      // eslint-disable-next-line eqeqeq
      if (this.passw == 'text') {
        this.passw = 'password'
        // 更换图标
        this.icon = 'el-input__icon el-icon-view'
      } else {
        this.passw = 'text'
        this.icon = 'el-input__icon el-icon-loading'
      };
    },
    // 显示登录的密码
    showlogPass () {
      // 点击图标是密码隐藏或显示
      // eslint-disable-next-line eqeqeq
      if (this.logpassw == 'text') {
        this.logpassw = 'password'
        // 更换图标
        this.logicon = 'el-input__icon el-icon-view'
      } else {
        this.logpassw = 'text'
        this.logicon = 'el-input__icon el-icon-loading'
      };
    },
    ShoppingClose () {
      this.CommDialogVisible = false
      this.Commnum = 1
    },
    // 登录
    onlog () {
      // eslint-disable-next-line no-unused-vars
      var that = this
      var params = {
        'Num': that.logform.numbering, // 需要用Numbering来登录了
        'pwd': that.logform.password
      }
      this.$refs['logform'].validate((valid) => {
        if (valid) {
          const loadingruntime = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          this.$.ajax({
            type: 'POST',
            url: 'http://106.15.75.186:8080/api/services/app/GsfInit/Login',
            data: params,
            success: function (response) {
              // alert(JSON.stringify(response.result.items))
              var i = response.result.items
              if (i.length === 0) {
                Message.error('账号或者密码是错误的,请您再思考思考')
                loadingruntime.close()
              } else {
                that.ltrdrawer = false
                that.showldiv = 1
                localStorage.setItem('username', i[0].name)
                localStorage.setItem('usernum', i[0].numbering)
                localStorage.setItem('id', i[0].id)
                that.sessionNum = localStorage.getItem('usernum')
                that.sessionName = localStorage.getItem('username')
                that.sessionid = localStorage.getItem('id')
                if (i[0].resource === '男') {
                  Message({
                    message: '欢迎您' + i[0].name + '先生',
                    type: 'success'
                  })
                  loadingruntime.close()
                } else {
                  Message({
                    message: '欢迎您' + i[0].name + '女士',
                    type: 'success'
                  })
                  loadingruntime.close()
                }
                that.logform.password = ''
              }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
              loadingruntime.close()
              alert('XMLHttpRequest:' + XMLHttpRequest.status + ',textStatus:' + XMLHttpRequest.readyState + ',errorThrown:' + textStatus)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 改变页面信息从登录
    changeuser () {
      this.flag = !this.flag
      if (this.showldiv === 0 && this.sessionName === '') {
        this.showldiv = 2
      } else if (this.showldiv === 2 && this.sessionName === '') {
        this.showldiv = 0
      } else if (this.showldiv === 2 && this.sessionName !== '') {
        this.showldiv = 1
      } else if (this.showldiv === 1) {
        this.showldiv = 2
      }
    },
    changemainright (event) {
      this.showmain = event
    },
    changecoffeelistpicf (event) {
      this.changecoffeelistpic = event
    },
    quit () {
      this.dialogVisible = false
      this.showldiv = 0
      this.sessionid = ''
      Message({
        message: `${this.sessionName}欢迎您下次光临`,
        type: 'success'
      })
      this.sessionName = ''
      localStorage.clear()
      // localStorage.setItem('username', '')
      // localStorage.setItem('usernum', '')
      // localStorage.setItem('id', '')
    },
    udpatedrawermothod () {
      this.udpatedrawer = true
      var that = this
      this.$.ajax({
        type: 'Get',
        url: 'http://106.15.75.186:8080/api/services/app/GsfInit/UpdateLogin?Num=' + that.sessionNum,
        success: function (response) {
          var i = response.result.items
          that.udpatedata = {
            Id: that.sessionid,
            numbering: that.sessionNum,
            name: i[0].name,
            passWord: i[0].passWord,
            region: i[0].region,
            date: i[0].date,
            delivery: i[0].delivery,
            type: i[0].type,
            resource: i[0].resource,
            tel: i[0].tel
          }
          that.updateform.region = i[0].region
          that.updateform.date = i[0].date
          that.updateform.delivery = i[0].delivery
          that.updateform.name = i[0].name
          that.updateform.password = i[0].passWord
          that.updateform.type = i[0].type.split(',')
          that.updateform.resource = i[0].resource
          that.updateform.tel = i[0].tel
        }
      })
    },
    // 修改账户信息
    udpate () {
      this.loading = true
      var that = this
      this.$refs['updateform'].validate((valid) => {
        if (valid) {
          var udpatedatapost = {
            Id: parseInt(localStorage.getItem('id')),
            numbering: that.sessionNum,
            name: that.updateform.name,
            passWord: that.updateform.password,
            region: that.updateform.region,
            date: that.updateform.date,
            delivery: that.updateform.delivery,
            type: that.updateform.type.join(),
            resource: that.updateform.resource,
            tel: that.updateform.tel,
            Deprecated: false,
            DeprecatedTime: ''
          }
          that.$.ajax({
            type: 'POST',
            url: 'http://106.15.75.186:8080/api/services/app/GsfInit/Updateasync',
            data: JSON.stringify(udpatedatapost),
            contentType: 'application/json',
            success: function () {
              that.$message({
                type: 'success',
                message: `修改成功编号: ${that.sessionNum}`
              })
              that.loading = false
              that.sessionName = that.updateform.name
              localStorage.setItem('username', that.updateform.name)
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
              alert('XMLHttpRequest:' + XMLHttpRequest.status + ',textStatus:' + XMLHttpRequest.readyState + ',errorThrown:' + textStatus)
              that.loading = false
            }
          })
          that.udpatedrawer = false
        } else {
          console.log('error submit!!')
          that.loading = false
          return false
        }
        that.loading = false
      })
    },
    CommNumChange () {
      console.log(this.Commnum)
    },
    // 添加至购物车
    InsertShopping () {
      if (!localStorage.getItem('id')) {
        this.$message({
          type: 'info',
          message: '请先登录账号'
        })
      } else {
        var shoppingCartTable = {
          commodityId: this.CommId,
          qty: this.Commnum,
          founderId: localStorage.getItem('id'),
          totalCost: 0,
          specification: this.Commspe,
          unitPrice: this.CommUnitPrice,
          isBought: false,
          desc: ''
        }
        var that = this
        this.$.ajax({
          type: 'POST',
          url: 'http://106.15.75.186:8080/api/services/app/ShoppingCart/UpdateShoppingQty',
          data: JSON.stringify(shoppingCartTable),
          contentType: 'application/json',
          success: function () {
            that.$message({
              type: 'success',
              message: '添加成功'
            })
          }
        })
      }
    },
    // 购物车页面全选
    spCheckAllChange (val) {
      this.shoppingxinxi.map((item, i) => {
        item.checkModel = val
      })
    },
    sphCheckedChange (val) {
      for (let i = 0, l = this.shoppingxinxi.length; i < l; i++) {
        if (this.shoppingxinxi[i].checkModel !== val) {
          this.shoppingcheckAll = false
          return
        }
      }
    },
    _isMobile () {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag
    }
  },
  // 延迟加载
  created () {
    // 延迟
    this.onload()
    if (this._isMobile()) {
      alert('手机端暂不适配')
      // this.$router.replace('/m_index'); // 跳转至手机端页面
    } else {
      // alert("pc端");
      // this.$router.replace('/pc_index');
    }
  }
}
</script>
