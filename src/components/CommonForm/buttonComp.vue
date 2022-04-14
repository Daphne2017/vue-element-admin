<template>
  <div>
    <el-button
      v-if="haveBtn(buttonItem.type)"
      v-show="!buttonItem.hidden"
      :size="buttonItem.size || 'medium'"
      :type="buttonItem.btnType || itemOption.type"
      :plain="buttonItem.plain || false"
      :round="buttonItem.round || false"
      :circle="buttonItem.circle || false"
      :loading="buttonItem.loading || false"
      :disabled="buttonItem.disabled || false"
      :icon="buttonItem.icon || itemOption.icon"
      @click="btnClick"
    >
      {{ buttonItem.btnText || itemOption.text }}
    </el-button>
    <slot v-else :name="`${buttonItem.name}BtnSlot`" />
  </div>

</template>

<script>
export default {
  name: 'ButtonComp',
  props: {
    buttonItem: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      defaultOption: { // 按钮默认配置
        reset: {
          icon: 'el-icon-refresh-left', type: 'warning', text: '重 置', emit: 'reset',
        },
        confirm: {
          icon: 'el-icon-circle-check', type: 'primary', text: '确 定', emit: 'confirm',
        },
        cancel: {
          icon: 'el-icon-circle-close', type: 'warning', text: '取 消', emit: 'cancel',
        },
        search: {
          icon: 'el-icon-search', type: 'primary', text: '查 询', emit: 'search',
        },
        export: {
          icon: 'el-icon-folder-opened', type: 'info', text: '导 出', emit: 'exportFile',
        },
      },
    }
  },
  computed: {
    itemOption() {
      return this.defaultOption[this.buttonItem.type]
    },
  },
  methods: {
    haveBtn(type) {
      // eslint-disable-next-line no-prototype-builtins
      return this.defaultOption.hasOwnProperty(type)
    },
    btnClick() {
      this.$emit(this.itemOption.emit, this.buttonItem)
    },
  },
}
</script>
