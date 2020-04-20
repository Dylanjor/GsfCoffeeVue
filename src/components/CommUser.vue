<style>
@import url("../css/CommUser.css");
</style>
<template>
    <div>
        <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="商品名字">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="商品规格">
                <el-select v-model="form.specification" placeholder="请选择商品规格">
                    <el-option label="大杯" value="大杯"></el-option>
                    <el-option label="中杯" value="中杯"></el-option>
                    <el-option label="小杯" value="小杯"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品类型">
                <el-input v-model="form.type"></el-input>
            </el-form-item>
            <el-form-item label="是否是成品">
                <el-switch v-model="form.IsBom"></el-switch>
            </el-form-item>
            <el-form-item label="商品进价">
                <el-input v-model="form.purchasePrice" :disabled="form.IsBom"></el-input>
            </el-form-item>
            <el-form-item label="商品售价">
                <el-input v-model="form.sellingPrice" :disabled="!form.IsBom"></el-input>
            </el-form-item>
            <el-form-item label="商品数量">
                <el-input v-model="form.qty"></el-input>
            </el-form-item>
            <el-form-item label="商品图片">
                <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :auto-upload ="false"
                    :on-change="imgPreview">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import { message } from 'element-ui'
export default {
  name: 'CommUser',
  data () {
    return {
      imageUrl: '',
      form: {
        name: '',
        IsBom: true,
        type: '',
        specification: '',
        purchasePrice: '',
        sellingPrice: '',
        qty: ''
      }
    }
  },
  methods: {
    onSubmit () {
      var CommParams = {
        commodityName: this.form.name,
        commImage: this.imageUrl,
        specification: this.form.specification,
        commodityType: this.form.type,
        isBom: this.form.isBom,
        purchasePrice: this.form.purchasePrice,
        qty: this.form.qty,
        sellingPrice: this.form.sellingPrice,
        isDeleted: false
      }
      this.$.ajax({
        type: 'post',
        url: 'http://106.15.75.186:8080/api/services/app/Commodity/insertComm',
        data: JSON.stringify(CommParams),
        contentType: 'application/json',
        success: function () {
          alert('success')
        }
      })
    },
    // 读取本地图片
    imgPreview (file, fileList) {
      let fileName = file.name
      let regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/
      if (regex.test(fileName.toLowerCase())) {
        // this.imageUrl = URL.createObjectURL(file.raw)
        this.getBase64(file.raw).then(res => {
          this.imageUrl = res
        })
      } else {
        this.$message.error('请选择图片文件')
      }
    },
    // 将图片转换为base64(成功)
    getBase64 (file) {
      return new Promise(function (resolve, reject) {
        let reader = new FileReader()
        let imgResult = ''
        reader.readAsDataURL(file)
        reader.onload = function () {
          imgResult = reader.result
        }
        reader.onerror = function (error) {
          reject(error)
        }
        reader.onloadend = function () {
          resolve(imgResult)
        }
      })
    }
  },
  computed: {
    NewIsBom () {
      return this.form.IsBom
    }
  },
  watch: {
    NewIsBom (val) {
      if (val === false) {
        this.form.sellingPrice = ''
      } else {
        this.form.purchasePrice = ''
      }
    }
  }
}
</script>
