<template>
  <div>
    <el-form
      ref="form"
      class="form-flex"
      :label-width="formLabelWidth"
      :disabled="formDisabled"
      :model="formData"
      :rules="formRules"
      :inline="inline"
    >
      <el-form-item
        v-for="(formItem, itemIndex) in formFields"
        v-show="!formItem.hidden"
        :key="itemIndex"
        :prop="formItem.prop"
        :label-width="formItem.type === 'button' ? '0px': formItem.labelWidth"
        :label="formItem.label"
        :class="formItem.class"
      >
        <div
          v-if="formItem.type === 'extraMention'"
          :class="formItem.class"
        >{{ formItem.prop }}</div>
        <!-- 仅展示的字段，普通div-->
        <div
          v-if="formItem.type === 'normalText'"
          :class="formItem.class"
        >
          {{ formData[formItem.prop] ||'--' }}
        </div>
        <!-- 输入框或者textarea-->
        <el-input
          v-if="formItem.type === 'input'"
          v-model="formData[formItem.prop]"
          :placeholder="formItem.placeholder"
          :disabled="formItem.disabled"
          :clearable="formItem.clearable"
          :style="{width: formItem.formChildWidth}"
          :maxlength="formItem.maxlength"
        >
          <template v-if="formItem.append" slot="append">{{ formItem.appendContent }}</template>
        </el-input>
        <el-input
          v-if="formItem.type === 'textarea'"
          v-model="formData[formItem.prop]"
          :placeholder="formItem.placeholder"
          type="textarea"
          :disabled="formItem.disabled"
          :style="{width: formItem.formChildWidth}"
          :clearable="formItem.clearable"
          :maxlength="formItem.maxlength"
          :autosize="formItem.autoSize"
          :rows="formItem.rows || 2"
        />
        <el-input
          v-if="formItem.type === 'number'"
          v-model.number="formData[formItem.prop]"
          :placeholder="formItem.placeholder"
          type="number"
          :disabled="formItem.disabled"
          :style="{width: formItem.formChildWidth}"
          :clearable="formItem.clearable"
          :min="formItem.min"
          :max="formItem.max"
        />
        <!-- 下拉框 -->
        <el-select
          v-if="formItem.type === 'select'"
          v-model="formData[formItem.prop]"
          :placeholder="formItem.placeholder"
          :disabled="formItem.disabled"
          :style="{width: formItem.formChildWidth}"
          :multiple="formItem.multiple"
          :filterable="formItem.filterable"
          :clearable="formItem.clearable"
          @change="val => selectChange(val, formItem.prop)"
        >
          <el-option
            v-for="(selectItem, index) in formItem.selectData"
            :key="index"
            :label="selectItem[formItem.labelProp || 'label']"
            :value="selectItem[formItem.valueProp || 'value']"
          />
        </el-select>
        <!-- 时间控件 -->
        <el-date-picker
          v-if="formItem.type === 'datePicker'"
          v-model="formData[formItem.prop]"
          :type="formItem.dateType"
          :value-format="formItem.valueFormat || 'yyyy-MM-dd HH:mm:ss'"
          :format="formItem.format || 'yyyy-MM-dd HH:mm:ss'"
          :placeholder="formItem.placeholder"
          :disabled="formItem.disabled"
          :style="{width: formItem.formChildWidth}"
          range-separator="至"
          :start-placeholder="formItem.placeholderStart"
          :end-placeholder="formItem.placeholderEnd"
          :class="formItem.class"
          :default-time="formItem.defaultTime"
          :picker-options="formItem.pickerOptions"
          :clearable="formItem.clearable || true"
        />
        <el-time-picker
          v-if="formItem.type === 'timePicker'"
          v-model="formData[formItem.prop]"
          value-format="HH:mm:ss"
          :placeholder="formItem.placeholder"
          :disabled="formItem.disabled"
          :style="{width: formItem.formChildWidth}"
        />
        <el-date-picker
          v-if="formItem.type === 'dateTimePiker'"
          v-model="formData[formItem.prop]"
          :value-format="formItem.valueFormat || 'yyyy-MM-dd HH:mm:ss'"
          :format="formItem.format || 'yyyy-MM-dd HH:mm:ss'"
          type="datetime"
          :disabled="formItem.disabled"
          :placeholder="formItem.placeholder"
          :style="{width: formItem.formChildWidth}"
        />
        <div v-if="formItem.type === 'dateZones'">
          <div v-for="(dateItem, dateIndex) in formItem.children" :key="dateIndex" class="date-zone">
            <el-form-item :prop="dateItem.prop">
              <el-date-picker
                v-if="dateItem.type === 'dataPicker'"
                v-model="formData[dateItem.prop]"
                value-format="yyyy-MM-dd"
                type="date"
                :placeholder="dateItem.placeholder"
                :disabled="dateItem.disabled"
                :style="{width: dateItem.formChildWidth}"
              />
            </el-form-item> <span v-if="dateIndex===0 && inline">至</span>
          </div>
        </div>
        <!-- switch切换 -->
        <el-switch
          v-if="formItem.type === 'switch'"
          v-model="formData[formItem.prop]"
          :disabled="formItem.disabled"
          :style="{width: formItem.formChildWidth}"
          @change="val => switchChange(val, formItem.prop)"
        />
        <!-- checkbox -->
        <el-checkbox-group
          v-if="formItem.type === 'checkbox'"
          v-model="formData[formItem.prop]"
          :disabled="formItem.disabled"
          :style="{width: formItem.formChildWidth}"
          @change="val => checkChange(val, formItem.prop)"
        >
          <el-checkbox
            v-for="(selectItem, index) in formItem.checkData"
            :key="index"
            :label="selectItem"
            name="type"
          />
        </el-checkbox-group>
        <!-- radio -->
        <el-radio-group
          v-if="formItem.type === 'radio'"
          v-model="formData[formItem.prop]"
          :disabled="formItem.disabled || false"
          :fill="formItem.fill || '#409EFF'"
          :text-color="formItem.textColor || '#ffffff'"
          :style="{width: formItem.formChildWidth}"
          @change="val => checkChange(val, formItem.prop)"
        >
          <el-radio
            v-for="(radioItem, index) in formItem.radioData"
            :key="index"
            :label="radioItem.label"
            :disabled="radioItem.disabled || false"
            :border="radioItem.border || false"
            :size="radioItem.size"
            :name="radioItem.primevalName || ''"
          >{{ radioItem.name || radioItem.label }}</el-radio>
        </el-radio-group>
        <!-- 普通标签 -->
        <div v-if="formItem.type === 'normalTag'" class="tag-fields">
          <el-tag
            v-for="(tagItem, index) in formData[formItem.prop]"
            :key="index"
            :closable="tagItem.closable || formItem.closable"
            :disable-transitions="tagItem.transitions"
            :size="tagItem.size"
            :effect="tagItem.effect"
            :type="tagItem.type"
            @close="tagClose(index, formData[formItem.prop], formItem, `${formItem.prop}TagClose`)"
          >{{ tagItem[formItem.nameProp || 'name'] }}
          </el-tag>
          <el-tag
            v-if="formItem.addTagBtnOption instanceof Object && !Array.isArray(formItem.addTagBtnOption)"
            v-show="!formItem.addTagBtnOption.hidden"
            :size="formItem.addTagBtnOption.size"
            class="add-tag-btn"
            @click="addTag(`${formItem.prop}AddTag`)"
          >{{ formItem.addTagBtnOption.name || '添加' }}</el-tag>
        </div>
        <!-- 图片标签 -->
        <div v-if="formItem.type === 'imageTag'" class="image-tag-fields-box">
          <draggable v-model="formData[formItem.prop]">
            <div
              v-for="(tagItem, index) in formData[formItem.prop]"
              :key="index"
              class="img-item-wrap"
            >
              <i
                v-if="!formItem.noDeleteIcon"
                class="el-icon-error delete-icon"
                @click="tagClose(index, formData[formItem.prop], formItem, `${formItem.prop}ImgTagClose`)"
              />
              <div
                class="img-item"
                @click="uploadPreview({ url: tagItem[formItem.urlProp || 'url'] })"
              >
                <img :src="tagItem[formItem.urlProp || 'url']" alt="暂无图片">
              </div>
              <el-popover
                v-if="tagItem[formItem.nameProp || 'name'] && tagItem[formItem.nameProp || 'name'].length > 8"
                placement="top-start"
                width="50"
                trigger="hover"
                :content="tagItem[formItem.nameProp || 'name']"
              >
                <div slot="reference" class="game-comment-content">
                  <span v-if="!formItem.noName">{{ tagItem[formItem.nameProp || 'name'] }}</span>
                </div>
              </el-popover>
              <span v-else>{{ tagItem[formItem.nameProp || 'name'] }}</span>
            </div>
          </draggable>
          <div v-if="!formItem.noAddBtn" class="img-item-wrap add-item" @click="addTag(`${formItem.prop}AddImgTag`)">
            <div class="img-item"><i class="el-icon-plus add-btn" /></div>
          </div>
        </div>
        <!-- 自定义表单域 -->
        <div v-if="formItem.type === 'customSlot'" v-show="!formItem.hidden" class="custom-slot-fields">
          <slot :name="`${formItem.prop}Slot`" />
        </div>
        <!--  upload 上传  -->
        <el-upload
          v-if="formItem.type === 'upload'"
          :ref="'uploadref'"
          :action="formItem.action"
          :headers="formItem.header"
          :multiple="formItem.multiple"
          :data="formItem.data"
          :name="formItem.name || 'file'"
          :with-credentials="formItem.withCredentials || false"
          :show-file-list="!(formItem.showFileList === false)"
          :drag="formItem.drag || false"
          :accept="formItem.accept"
          :on-preview="formItem.onPreview || uploadPreview"
          :on-remove="formItem.onRemove"
          :on-success="formItem.onSuccess"
          :on-error="formItem.onError"
          :on-progress="formItem.onProgress"
          :on-change="formItem.onChange"
          :before-upload="formItem.beforeUplaod"
          :before-remove="formItem.beforeRemove"
          :list-type="formItem.listType || 'picture-card'"
          :auto-upload="formItem.autoUpload || true"
          :file-list="formData[formItem.prop] || []"
          :http-request="formItem.httpRequest"
          :disabled="formItem.disabled || false"
          :limit="formItem.limit"
          :on-exceed="formItem.onExceed"
          :class="`${formItem.prop}-${formItem.class}`"
        >
          <slot v-if="formItem.listType !== 'text'" :name="`${formItem.prop}Upload`">
            <i class="el-icon-plus" />
          </slot>
          <!-- upload 插槽 -->
          <template #trigger>
            <slot :name="`${formItem.prop}Trigger`" />
          </template>
          <template #tip>
            <slot :name="`${formItem.prop}Tip`" />
          </template>
        </el-upload>
        <!-- 按钮 -->
        <div v-if="formItem.type === 'button'" v-show="!formItem.hidden" class="button-flex">
          <div v-for="(buttonItem, buttonIndex) in formItem.children" :key="buttonIndex" class="button-child-flex">
            <button-comp
              :button-item="buttonItem"
              v-on="{
                reset, confirm, cancel, search, exportFile
              }"
            >
              <slot
                v-if="buttonItem.type === 'custom'"
                :slot="`${buttonItem.name}BtnSlot`"
                :name="`${buttonItem.name}BtnSlot`"
              />
            </button-comp>
          </div>
        </div>
      </el-form-item>
    </el-form>

    <!-- 图片预览弹窗 -->
    <el-dialog :visible.sync="uploadDialogVisible" top="7vh" :append-to-body="true">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import buttonComp from './buttonComp'
import draggable from 'vuedraggable'
export default {
  components: {
    buttonComp,
    draggable,
  },
  props: {
    formLabelWidth: { // 表单label宽度
      type: String,
      default: '200px',
    },
    formData: { // 表单数据
      type: Object,
      default: null,
    },
    formDisabled: { // 是否禁用表单
      type: Boolean,
      default: false,
    },
    formRules: { // 表单验证规则
      type: Object,
      default: null,
    },
    // 设置json数据
    formFields: { // 表单项配置信息
      type: Array,
      default: () => [],
    },
    inline: { // 表单横向竖向控制
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialogImageUrl: '',
      uploadDialogVisible: false,
    }
  },
  methods: {
    reset() {
      this.$refs['form'].resetFields()
      this.$emit('reset')
    },
    exportFile(buttonItem) {
      this.$emit('exportFile', buttonItem)
    },
    cancel() {
      this.$emit('cancel')
    },
    confirm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 传事件到父亲组件
          this.$emit('confirm')
        } else {
          return false
        }
      })
    },
    // 下拉
    selectChange(val, prop) {
      this.$emit(`select${prop}`, val)
    },
    // switch切换
    switchChange(val, prop) {
      this.$emit(`switch${prop}`, val)
    },
    // 选中
    checkChange(val, prop) {
      this.$emit(`check${prop}`, val)
    },
    // 标签关闭事件
    tagClose(index, tagData, formItem, emitType) {
      const deleteItem = Object.assign(tagData[index]) // 暂存被删除项
      !formItem.donotDefaultDelete && tagData.splice(index, 1) // donotDefaultDelete是否拒绝默认删除
      this.$emit(emitType, deleteItem)
    },
    // 标签新增事件
    addTag(emit) {
      this.$emit(emit)
    },
    // 查询
    search() {
      this.$emit('search')
    },
    // 上传图片预览
    uploadPreview(file) {
      this.dialogImageUrl = file.url
      file.url && (this.uploadDialogVisible = true) // 有url则预览
    },
  },
}
</script>
<style lang="scss" scoped>
  .button-flex {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
  }
  .button-child-flex {
    flex: 1;
    margin-right: 10px;
  }
  .date-zone {
    margin-bottom: 20px;
  }
  .tag-fields{
    display: flex;
    flex-wrap: wrap;
    ::v-deep .el-tag{
      margin: 0 10px 10px 0;
      &.add-tag-btn{
        color: #606266;
        background: #ffffff;
        border-color: #DCDFE6;
      }
      &.add-tag-btn:hover {
        color: #409EFF;
        border-color: #c6e2ff;
        background-color: #ecf5ff;
        cursor:pointer;
      }
    }
  }
</style>
