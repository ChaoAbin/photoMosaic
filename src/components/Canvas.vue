<template>
  <div>
    <img :src="b64" />
  </div>
</template>

<script>

export default {
  name: 'Canvas',
  props: {
  },
  data: function () {
      return {
          b64: ''
      }
  },
  methods: {
  },
  mounted() {
  }
}
</script>

<style scoped>
</style>
