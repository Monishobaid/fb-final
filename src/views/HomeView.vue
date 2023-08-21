<script>
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../firebase/index";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "App",
  data() {
    return {
      imageUpload: null,
      imageUrls: [],
      progress: 0,
    };
  },
  methods: {
    setImageUpload(event) {
      this.imageUpload = event.target.files[0];
    },
    uploadFile() {
      if (!this.imageUpload) return;
      const imageRef = ref(
        storage,
        `images/${this.imageUpload.name + uuidv4()}`
      );
      uploadBytes(imageRef, this.imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          this.imageUrls.push(url);
        });
      });
    },
  },
  mounted() {
    const imagesListRef = ref(storage, "images/");
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          this.imageUrls.push(url);
        });
      });
    });
  },
};
</script>

<template>
  <div class="csum-app">
    <input type="file" class="csum-input" @change="setImageUpload" />
    <button class="csum-button" @click="uploadFile">Upload Image</button>
    <div class="csum-image-container">
      <img
        v-for="(url, index) in imageUrls"
        :key="index"
        class="csum-image"
        :src="url"
      />
    </div>
  </div>
</template>

<style>
.csum-app {
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 20px;
}

.csum-input {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}

.csum-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-left: 10px;
  border-radius: 10px;
}

.csum-button:hover {
  background-color: #0056b3;
}

.csum-image-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  margin-top: 20px;
}

.csum-image {
  max-width: 100%;
  height: auto;
  border: 1px solid #ddd;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease-in-out;
}

.csum-image:hover {
  transform: scale(1.05);
}
</style>
