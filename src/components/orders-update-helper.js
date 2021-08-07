import React, {useState, useEffect, useParams} from "react";
import axios from 'axios';

function ordersupdatehelper(_id) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/update-orders?_id=${encodeURIComponent(_id)}`, {
        method: "GET"
        })
        .then (data => {
            return data.json;
        })
        .then (data => {
            this.state.setState({ orders: data})
            console.log(this.state);
            
        })
    }, []);

}
  export default ordersupdatehelper;