const useFetch = () => {
  const request = (url, method = "GET", body, contentType) => {
    return new Promise(async (resolve, reject) => {
      try {
        const headers = {
          "Content-Type": contentType || "application/json",
        };
        const dataObj = {
          method,
          headers,
        };
        if (body) {
          dataObj["body"] =
            typeof body == "string" ? body : JSON.stringify(body);
        }
        const response = await fetch(url, dataObj);
        console.log(response, "response check");
        if (method === "DELETE") {
          resolve({ status: 204, message: "Item deleted successfully" });
        }
        if (response.ok) {
          console.log(response, "response");
          const json = await response.json();
          console.log(json, "json request");
          resolve({ status: 200, data: json });
        } else {
          const status = response.status;
          const error = await response.json();
          reject({ status, error });
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  return { request };
};

export default useFetch;
