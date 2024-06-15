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
  // 获得标题
  async generateTitle(UploadData) {
    try {
      const backend = await fetch("/get-title", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(UploadData),
      });
      console.log(JSON.stringify(UploadData));
      const jsonData = await backend.json();
      // 检查响应状态码
      if (!backend.ok) {
        throw new Error(`HTTP error! Status: ${backend.status}`);
      }
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
  // 新闻分类
  async classifynews(UploadData) {
    try {
      const backend = await fetch("/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(UploadData),
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
  //语音生成
  async generatespeech(UploadData) {
    try {
      console.log(
        "发布的内容：" + UploadData.text + "类型" + UploadData.voice_type
      );
      const backend = await fetch("/get-speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(UploadData),
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
  // 以下是一个get请求的例子
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
  },
};
