import axios from "axios"

const instance =  axios.create({
  validateStatus: () => true,
})

export default instance
