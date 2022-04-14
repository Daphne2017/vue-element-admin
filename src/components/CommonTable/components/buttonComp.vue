<template>
  <el-button
    :size="buttonItem.size || 'medium'"
    :type="buttonItem.btnType"
    :plain="buttonItem.plain || false"
    :round="buttonItem.round || false"
    :circle="buttonItem.circle || false"
    :loading="buttonItem.loading || false"
    :disabled="buttonItem.disabled || false"
    :icon="buttonItem.icon"
    @click="btnClick"
  >
    {{ buttonItem.btnText }}
  </el-button>
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
  methods: {
    btnClick() {
      this.$emit('clickFunc')
    },
  },
}
</script>
