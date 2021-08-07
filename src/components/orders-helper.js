var ordershelper = {
    orders: function(id) {
    
      var url = 'http://localhost:8080/api/orders';
  
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

  export default ordershelper;