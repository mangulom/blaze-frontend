var productshelper = {
    orders: function() {
    
      var url = 'http://localhost:8080/api/products';
  
      return fetch(url)
      .then(function(response) {
        return response.json()
      })
      .then(function(json) {
        return json
      })
      .catch(function(error) {
        console.log('error', error)
      })
    }
  }

  export default productshelper;