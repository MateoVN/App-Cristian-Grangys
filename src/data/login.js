export async function sendLoginRequest(formElement) {
    const url = "http://192.168.100.50:8000/login/";
    
    const formData = new FormData(formElement);
  
    const response = await fetch(url, {
      method: "POST",
      body: formData, 
    });

    if (!response.ok) {
      throw new Error(`Login failed: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  }
  



