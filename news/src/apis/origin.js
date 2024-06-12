export default {
  // 创建一个函数
  // async testPost(postData) {
  //   try {
  //     const response = await fetch("/api/testPost", {
  //       method: "POST",
  //       body: postData,
  //       mode: "cors"
  //     });
    
  //     const data = await response.json();
  //     console.log("后端响应:", data);
  //     return data;
  //   }
  //   catch (error) {
  //     throw error;
  //   }
  // },
  async generateTitle(UploadData) {
    try {
      const backend = await fetch("/get-title", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(UploadData),
      });
      const jsonData =await backend.json();
      console.log("jsonData: ", jsonData);  
      if (jsonData.response.isError) {
        console.log(jsonData.response.msg);
        throw new Error("网络请求错误");
      }
      return jsonData.response.data;
    } catch (error) {
      throw error;
    }
  },
  async classifynews(UploadData) {
    try {
      const backend = await fetch("/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(UploadData)
      });
      const jsonData = await backend.json();
      console.log("jsonData: ", jsonData); 
      if (jsonData.response.isError) {
        console.log(jsonData.response.msg);
        throw new Error("网络请求错误");
      }
      return jsonData.response.data;
    } catch (error) {
      throw error;
    }
  },
  async getAllLikes() {
    try {
      const backend = await fetch("/api/getAllLikes");
      const jsonData = await backend.json();
      console.log("getAllLikes: ", jsonData); 
      if (jsonData.response.isError) {
        console.log(jsonData.response.msg);
        throw new Error("网络请求错误");
      }
      return jsonData.response.data;
    } catch (error) {
      throw error;
    }
  }
}
