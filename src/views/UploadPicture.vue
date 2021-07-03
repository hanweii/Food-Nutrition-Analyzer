<template>
  <div>
   <input type="file" @change="onFileChanged">
   <button @click="onUpload">Upload!</button>
  </div>
</template>

<script>
export default {
data() {
  return {
    selectedFile: null
  }
},
methods: {
  onFileChanged (event) {
    this.selectedFile = event.target.files[0]
  },
  onUpload() {
    // upload file, get it from this.selectedFile
    
  }
}
}
</script>

<style lang="scss" scoped>

</style>